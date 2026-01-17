# Build Configuration Summary

- This repo builds a static Next.js export for GitHub Pages.
- `pnpm run build` produces `./out` for deployment.
- `NEXT_PUBLIC_API_URL` must be set to the external backend host.
- No server-side API routes or platform-specific deployment configuration remain in this project.

## Commands
- `pnpm run dev` — local dev (static)
- `pnpm run build` — static export

## Files of Interest
- `next.config.ts` — static export settings
- `.github/workflows/nextjs.yml` — Pages deployment workflow
- `lib/api-config.ts` — API host configuration

## Notes
- Ensure your backend allows CORS from the GitHub Pages origin.
- Secrets stay on the backend; only `NEXT_PUBLIC_*` vars are exposed to the client.
