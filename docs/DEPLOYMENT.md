# Deployment

The repository produces a static frontend that is deployed to GitHub Pages. All dynamic data must be fetched from an external API host that you configure via `NEXT_PUBLIC_API_URL`.

## Frontend (GitHub Pages)
- **Build**: Next.js static export
- **Deploy**: GitHub Actions workflow in `.github/workflows/nextjs.yml`
- **Output**: `./out`
- **URL**: https://codejedi-ai.github.io/

## Backend (External)
- Hosted separately from this repo (any platform is fine)
- Expose routes under `/api/...`
- Enable CORS for the GitHub Pages origin

## Configuration

### Frontend Environment
```
NEXT_PUBLIC_API_URL=https://api.codejedi.ai
```

### Directory Hints
```
/app            # Frontend components only
/public         # Static assets
/lib            # Utilities, API config, CORS helpers
/.github        # Pages deployment workflow
```

## Local Development
```bash
pnpm install
pnpm dev
```
- Runs on http://localhost:3000
- Uses `NEXT_PUBLIC_API_URL` for API calls

## Production Build
```bash
pnpm build
ls out/   # static export ready for Pages
```

## Deployment Flow
- Push to `main` → GitHub Actions builds and deploys `./out` to Pages.
- Ensure the external API host is reachable and configured for CORS.

## Notes
- This repo contains no server-side API routes.
- Secrets remain on your backend; only `NEXT_PUBLIC_*` vars are exposed.
