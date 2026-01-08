# CORS Issue - Failed to Fetch

## Problem
When the GitHub Pages site (`codejedi-ai.github.io`) tries to fetch data from the Vercel API (`codejedi-ai.vercel.app`), the browser blocks the requests due to CORS (Cross-Origin Resource Sharing) policy violations.

## Root Cause
The API routes in the Vercel deployment (`bolt-codejedi-ai`) do not include CORS headers in their responses. When making cross-origin requests, browsers require the server to explicitly allow the request by including appropriate CORS headers.

## Solution
The API routes in `bolt-codejedi-ai` need to be updated to include CORS headers. Each API route should return headers like:

```typescript
return NextResponse.json(data, {
  status: 200,
  headers: {
    'Access-Control-Allow-Origin': '*', // Or specific domain: 'https://codejedi-ai.github.io'
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
})
```

## Affected API Routes
- `/api/skills/`
- `/api/work-experience/`
- `/api/projects/`
- `/api/about-images/`
- `/api/certificates/`
- `/api/contacts/submit`

## Temporary Workaround
All API calls have been updated to use trailing slashes (matching the Vercel redirect behavior), but this won't fix the CORS issue. The API routes themselves need to be updated in the `bolt-codejedi-ai` repository.

## Next Steps
1. Update all API route handlers in `bolt-codejedi-ai/app/api/**/route.ts` to include CORS headers
2. Optionally create a middleware to add CORS headers to all API routes
3. Test the API calls from the GitHub Pages domain
