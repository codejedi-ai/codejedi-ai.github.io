/**
 * API Configuration for the static frontend.
 * Point `NEXT_PUBLIC_API_URL` to whatever backend hosts the API.
 */

// Ensure TypeScript recognizes process in environments without @types/node
declare const process: any

// Default to same-origin API routes so a single deployment can serve both UI and API.
// For external backend usage (e.g. GitHub Pages), set NEXT_PUBLIC_API_URL.
const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL
export const API_BASE_URL = configuredApiUrl ? String(configuredApiUrl).trim().replace(/\/$/, "") : ""

export const API_ENDPOINTS = {
  notion: (version: string, path: string) => `${API_BASE_URL}/api/notion/${version}/${path}`,
} as const
