import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getCorsHeaders } from "@/lib/cors"

const DEFAULT_VERCEL_BACKEND = "https://codejedi-ai.vercel.app"

function hasNotionCredentials(): boolean {
  return Boolean(process.env.NOTION_INTEGRATION_SECRET || process.env.NOTION_API_KEY)
}

function getFallbackBackendBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL || process.env.VERCEL_BACKEND_URL || DEFAULT_VERCEL_BACKEND
  return String(configured).trim().replace(/\/$/, "")
}

export async function fallbackToVercelWhenNoNotion(
  request: NextRequest,
  apiPath: string,
): Promise<NextResponse | null> {
  if (hasNotionCredentials()) {
    return null
  }

  const baseUrl = getFallbackBackendBaseUrl()
  const targetUrl = new URL(`${baseUrl}${apiPath}`)
  targetUrl.search = request.nextUrl.search

  // Avoid accidental self-proxy loops when the fallback URL matches current origin.
  if (targetUrl.origin === request.nextUrl.origin) {
    return null
  }

  const method = request.method.toUpperCase()
  const hasBody = method !== "GET" && method !== "HEAD"
  const body = hasBody ? await request.text() : undefined

  const upstreamHeaders: Record<string, string> = {
    Accept: request.headers.get("accept") || "application/json",
  }
  const contentType = request.headers.get("content-type")
  if (contentType) {
    upstreamHeaders["Content-Type"] = contentType
  }

  const upstreamResponse = await fetch(targetUrl.toString(), {
    method,
    headers: upstreamHeaders,
    body: hasBody ? body : undefined,
    cache: "no-store",
  })

  const responseBody = await upstreamResponse.text()
  const headers = getCorsHeaders(request)
  const upstreamContentType = upstreamResponse.headers.get("content-type")
  if (upstreamContentType) {
    headers["Content-Type"] = upstreamContentType
  }

  console.warn(`Notion credentials missing; proxied ${method} ${request.nextUrl.pathname} to ${targetUrl}`)

  return new NextResponse(responseBody, {
    status: upstreamResponse.status,
    headers,
  })
}
