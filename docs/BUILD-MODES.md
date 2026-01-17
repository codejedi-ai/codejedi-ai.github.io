# Build Mode

The static site build is the only supported mode for this repository.

## Commands
- `pnpm run build` → static export to `./out`
- `pnpm run dev` → local dev server (still uses `NEXT_PUBLIC_API_URL` for data)

## Environment
- `NEXT_PUBLIC_API_URL` must point to your backend API host (e.g., `https://codejedi-ai.vercel.app`).

## Deployment
- GitHub Actions runs `pnpm run build` and deploys `./out` to GitHub Pages.
- No serverless/API routes are shipped from this repo; they live on your external backend.

## Troubleshooting
- CORS errors: allow the GitHub Pages origin on your backend.
- Missing data: verify `NEXT_PUBLIC_API_URL` is set in the environment used for the build.
