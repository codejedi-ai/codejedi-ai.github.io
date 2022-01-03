import { NextRequest, NextResponse } from "next/server"
import { getCorsHeaders } from "@/lib/cors"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ version: string; path: string[] }> }
) {
  return handleRequest(request, await params)
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ version: string; path: string[] }> }
) {
  return handleRequest(request, await params)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ version: string; path: string[] }> }
) {
  return handleRequest(request, await params)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ version: string; path: string[] }> }
) {
  return handleRequest(request, await params)
}

export async function OPTIONS(request: NextRequest) {
  const headers = getCorsHeaders(request)
  return new NextResponse(null, { status: 200, headers })
}

async function handleRequest(
  request: NextRequest,
  { version, path }: { version: string; path: string[] }
) {
  try {
    const filteredPath = path[0] === "v1" ? path.slice(1) : path
    const notionPath = filteredPath.join("/")
    const searchParams = request.nextUrl.searchParams.toString()
    const url = `https://api.notion.com/v1/${notionPath}${searchParams ? `?${searchParams}` : ""}`

    console.log(`[Notion Proxy] ${request.method} ${url}`)
    
    const apiKey = process.env.NOTION_INTEGRATION_SECRET || process.env.NOTION_API_KEY
    if (!apiKey) {
      console.error("[Notion Proxy] API key missing")
      return NextResponse.json(
        { error: "Notion API key not configured" },
        { status: 500, headers: getCorsHeaders(request) }
      )
    }

    const headers = new Headers()
    headers.set("Authorization", `Bearer ${apiKey}`)
    headers.set("Notion-Version", version)
    
    const contentType = request.headers.get("content-type")
    if (contentType) {
      headers.set("Content-Type", contentType)
    }

    let body: string | undefined = undefined
    if (request.method !== "GET" && request.method !== "HEAD") {
      body = await request.text()
    }

    const response = await fetch(url, {
      method: request.method,
      headers,
      body,
    })

    const responseContentType = response.headers.get("content-type")
    let data: any
    
    if (responseContentType && responseContentType.includes("application/json")) {
      data = await response.json()
    } else {
      data = { message: await response.text() }
    }

    console.log(`[Notion Proxy] Response Status: ${response.status}`)

    return NextResponse.json(data, {
      status: response.status,
      headers: getCorsHeaders(request),
    })
  } catch (error) {
    console.error("[Notion Proxy] Error:", error)
    return NextResponse.json(
      { 
        error: "Failed to proxy request to Notion", 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500, headers: getCorsHeaders(request) }
    )
  }
}
