# Darcy's Portfolio — GitHub Pages (Static Frontend)

A fast, lightweight static portfolio site deployed on GitHub Pages that fetches data from the Vercel backend API. Built with Next.js, React, TypeScript, and Tailwind CSS.

🌐 **Live Site**: [https://codejedi-ai.github.io](https://codejedi-ai.github.io)  
🔗 **Backend API**: [https://codejedi-ai.vercel.app](https://codejedi-ai.vercel.app)

## 🎯 Overview

This is a **static export** of a Next.js application that runs on GitHub Pages. It serves as the primary frontend for the portfolio, calling the backend API hosted on Vercel for all dynamic content (projects, skills, work experience, certificates, images).

### Architecture

```
codejedi-ai.github.io (Static Site)
    ↓ (API calls)
codejedi-ai.vercel.app (Backend + Fallback Frontend)
```

## 🚀 Features

- **Static Export**: Pre-built HTML/CSS/JS, no server required — deployed directly to GitHub Pages
- **Fast Load Times**: CDN-backed GitHub Pages deployment with instant global distribution
- **API-Driven**: Fetches all dynamic content from Vercel backend
- **Error Resilience**: Built-in guards for empty payloads; error boundary with Vercel redirect fallback
- **Synced UI**: Identical visual design to Vercel via shared constants
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Theme**: Gradient-based UI with cyan/blue/purple accents
- **Smooth Animations**: CSS transitions, fade effects, and interactive elements
- **Accessible**: ARIA labels, semantic HTML, keyboard navigation

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages + GitHub Actions
- **Backend**: Vercel (API + fallback frontend)

## 📁 Project Structure

```
codejedi-ai.github.io/
├── app/
│   ├── components/           # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── NavBar.tsx
│   │   ├── WhoAmI.tsx        # About section with carousel
│   │   ├── Skills.tsx
│   │   ├── WorkExperience.tsx
│   │   ├── Certificates.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── types/
│   │   └── types.ts          # TypeScript interfaces
│   ├── error.tsx             # Global error boundary
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── lib/
│   ├── api-config.ts         # API endpoint configuration
│   ├── constants.ts          # Shared constants (CERTIFICATES_BG_URL)
│   ├── cors.ts               # CORS utilities
│   └── utils.ts              # Helper functions
├── public/                   # Static assets (images, favicon)
├── .github/
│   └── workflows/
│       └── nextjs.yml        # GitHub Actions deployment
├── docs/                     # Documentation
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 📡 API Contract

All endpoints expect responses in this format:

| Endpoint | Response |
|----------|----------|
| `/api/work-experience` | `{ workExperience: [...] }` |
| `/api/skills` | `{ skills: [...] }` |
| `/api/projects` | `{ projects: [...] }` |
| `/api/certificates` | `{ certificates: [...] }` |
| `/api/about-images` | `{ aboutImages: [...] }` |
| `/api/health` | `{ status: "ok" }` |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
git clone https://github.com/codejedi-ai/codejedi-ai.github.io.git
cd codejedi-ai.github.io
pnpm install
```

### Development

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build Static Export

```bash
pnpm run build
```

Output is in `out/` directory, ready for deployment.

## 📝 Environment Variables

Create `.env.local`:

```bash
# Optional: override API host (defaults to https://codejedi-ai.vercel.app)
NEXT_PUBLIC_API_URL=https://codejedi-ai.vercel.app
```

## 🔧 Available Scripts

```bash
pnpm run dev      # Start dev server
pnpm run build    # Build static export
pnpm run start    # Start production server (local testing)
pnpm run lint     # Run ESLint
```

## 🚢 Deployment

Automatic via GitHub Actions on push to `main`:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Deployment typically completes in 2–5 minutes.

## 🔐 API & CORS

The backend (Vercel) includes CORS headers for `https://codejedi-ai.github.io`. Responses include:

```
Access-Control-Allow-Origin: https://codejedi-ai.github.io
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

If deploying elsewhere, update the backend's CORS allowlist.

## ⚠️ Error Handling

- **Empty Payloads**: Components check `Array.isArray()` before rendering; show "No data available"
- **API Failures**: Error boundary (`app/error.tsx`) offers retry or redirect to Vercel site
- **Network Issues**: Graceful fallback UI with user-friendly messages

## 🎨 Customization

### Update API Host

Edit `lib/api-config.ts`:

```typescript
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-api.com"
```

### Shared Constants

Keep both sites in sync via `lib/constants.ts`:

```typescript
export const CERTIFICATES_BG_URL = "https://..."
```

### Styling

- `tailwind.config.ts` — Colors, animations, gradients
- `app/globals.css` — Global styles and custom CSS

## 📊 Troubleshooting

### API calls fail (CORS)

```bash
# Check backend is running and accessible
curl -i https://codejedi-ai.vercel.app/api/health
```

Expected: `200 OK` with CORS headers

### Data doesn't render

1. Open DevTools → Network tab
2. Check API response structure matches expected format
3. Verify response includes required keys (e.g., `{ skills: [...] }`)

### Build errors

```bash
pnpm run build
```

Common fixes:
- `pnpm add -D @types/node` — Missing Node types
- Remove unused imports or prefix with `_`

## 🤝 Sync with Vercel

Keep `codejedi-ai.github.io` and `codejedi-ai.vercel.app` in sync:

1. **UI Changes**: Edit components in **both** repos
2. **Constants**: Update `lib/constants.ts` in **both** repos
3. **API Contracts**: Keep response shapes aligned

## 📄 License

Proprietary — Darcy Liu

## 👤 Author

**Darcy Liu (CodeJedi)**

- Live Portfolio: https://codejedi-ai.github.io
- Vercel Backend: https://codejedi-ai.vercel.app
- GitHub: https://github.com/codejedi-ai

---

Built with ❤️ using Next.js & GitHub Pages
