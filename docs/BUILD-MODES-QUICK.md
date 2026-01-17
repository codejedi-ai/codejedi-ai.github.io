# Quick Start

## Commands
```bash
pnpm run dev      # local dev (static)
pnpm run build    # static export → ./out
```

## Environment
- Set `NEXT_PUBLIC_API_URL` to your backend API host (example: `https://codejedi-ai.vercel.app`).

## Deploy
- GitHub Actions builds and deploys `./out` to GitHub Pages on pushes to `main`.

## Troubleshooting
- If data does not load, confirm `NEXT_PUBLIC_API_URL` is set and that the backend allows CORS from `https://codejedi-ai.github.io`.

## Related Docs
- [BUILD-MODES.md](BUILD-MODES.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
- [API-DEBUGGING.md](API-DEBUGGING.md)
