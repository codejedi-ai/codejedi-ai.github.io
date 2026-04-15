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
  workExperience: `${API_BASE_URL}/api/work-experience/`,
  aboutImages: `${API_BASE_URL}/api/about-images/`,
  skills: `${API_BASE_URL}/api/skills/`,
  projects: `${API_BASE_URL}/api/projects/`,
  certificates: `${API_BASE_URL}/api/certificates/`,
  contacts: `${API_BASE_URL}/api/contacts/`,
  contactsSubmit: `${API_BASE_URL}/api/contacts/submit/`,
  hugginFaceCertificates: `${API_BASE_URL}/api/hugging-face-certificates/`,
  images: `${API_BASE_URL}/api/images/`,
} as const
