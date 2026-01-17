# API Fetch Debugging Guide

## Endpoints
All React components read endpoints from [lib/api-config.ts](lib/api-config.ts). Set `NEXT_PUBLIC_API_URL` to your backend host (example: `https://codejedi-ai.vercel.app`).


## Quick Checks
- Console: look for CORS or network errors.
- Network tab: requests should hit `<API_BASE_URL>/api/...` and return 200.
- Logs: components log the full fetch URL when requesting data.

## Common Issues
- **CORS blocked**: allow `https://codejedi-ai.github.io` on the backend.
- **Mixed content**: ensure the backend is served over HTTPS.
- **404**: confirm the route exists on the backend.

## Verify with curl
```bash
curl -i $NEXT_PUBLIC_API_URL/api/skills/
```

## Checklist
- [ ] Build succeeds (`pnpm run build`).
- [ ] `NEXT_PUBLIC_API_URL` set in the build environment.
- [ ] Browser logs show correct API URLs.
- [ ] Backend responses include CORS headers for the Pages origin.
