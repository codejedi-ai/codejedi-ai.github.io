import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ALLOWED_ORIGINS } from "@/lib/constants"

/**
 * Get CORS headers for API responses
 */
export function getCorsHeaders(request?: NextRequest): Record<string, string> {
  const origin = request?.headers.get("origin") ?? ""
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin as (typeof ALLOWED_ORIGINS)[number]) ? origin : ALLOWED_ORIGINS[0]

  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept, Origin, X-HTTP-Method-Override, x-notion-token",
    "Access-Control-Max-Age": "86400",
    "Access-Control-Expose-Headers": "Content-Length, Content-Type",
  }

  void request

  return headers
}

/**
 * Create a CORS-enabled response
 */
export function corsResponse(
  data: unknown,
  status: number = 200,
  request?: NextRequest
): NextResponse {
  const headers = getCorsHeaders(request)
  return NextResponse.json(data, { status, headers })
}

/**
 * Handle OPTIONS preflight request
 */
export function handleOptions(request: NextRequest): NextResponse {
  const headers = getCorsHeaders(request)
  return new NextResponse(null, { status: 204, headers })
}
