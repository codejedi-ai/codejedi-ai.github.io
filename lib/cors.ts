import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Get CORS headers for API responses
 */
export function getCorsHeaders(request?: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
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
