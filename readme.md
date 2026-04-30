# Darcy's Portfolio — Vercel (Backend API + Fallback Frontend)

The backend API and fallback frontend for the portfolio. Provides REST endpoints for portfolio content and serves as a dynamic fallback if the static GitHub Pages site has issues.

🌐 **Live Backend**: [https://codejedi-ai.vercel.app](https://codejedi-ai.vercel.app)  
🔗 **Static Frontend**: [https://codejedi-ai.github.io](https://codejedi-ai.github.io)

## 🎯 Overview

This repository contains two parts:

1. **Backend API** (`/app/api/*`) — REST endpoints providing portfolio data (projects, skills, work experience, certificates, images)
2. **Fallback Frontend** (`/app/components/*`) — Full-featured Next.js site for backup access if GitHub Pages is unavailable

### Architecture

```
GitHub Pages (Static Frontend)
    ↓ (API calls)
Vercel (Backend API + Fallback)
    ↓
Static Data / Notion (future)
```

## 🚀 Features

**Backend API:**
- RESTful endpoints with CORS support
- OPTIONS preflight handling for all routes
- Aligned response shapes (`{ projects: [...] }`, `{ skills: [...] }`, etc.)
- Health check endpoint (`/api/health`)
- Static data fallback (no external dependencies)

**Fallback Frontend:**
- Identical UI to GitHub Pages
- Fully responsive and interactive
- All components fetch via API endpoints
- Error guards for empty/missing payloads
- Modal project details, carousel images, timeline timeline

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Data**: Static data in `lib/staticData.ts`

## 📁 Project Structure

```
codejedi-ai.vercel.app/
├── app/
│   ├── api/                      # REST API endpoints
│   │   ├── health/               # Health check
│   │   ├── projects/
│   │   ├── skills/
│   │   ├── work-experience/
│   │   ├── certificates/
│   │   ├── about-images/
│   │   └── contacts/
│   ├── components/               # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── NavBar.tsx
│   │   ├── WhoAmI.tsx            # About section with carousel
│   │   ├── Skills.tsx
│   │   ├── WorkExperience.tsx
│   │   ├── Certificates.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── contexts/                 # React contexts (if any)
│   ├── types/
│   │   └── types.ts              # TypeScript interfaces
│   ├── error.tsx                 # Error boundary (fallback frontend)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── lib/
│   ├── api-config.ts             # API endpoint configuration
│   ├── constants.ts              # Shared constants
│   ├── cors.ts                   # CORS utilities
│   ├── notion-api.ts             # Notion API client (future)
│   ├── notion-config.ts          # Notion configuration
│   ├── notion-databases.ts       # Notion database IDs
│   ├── staticData.ts             # Hardcoded portfolio data
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets (images, favicon)
├── vercel.json                   # Vercel configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 📡 API Endpoints

All endpoints accept `GET` requests with CORS support and respond with structured JSON:

### GET /api/health
Health check for uptime monitoring.

**Response:**
```json
{
  "status": "ok"
}
```

### GET /api/projects
Portfolio projects with filtering.

**Response:**
```json
{
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "longDescription": "string",
      "image": "url",
      "tags": ["string"],
      "tech": ["string"],
      "link": "url",
      "github": "url",
      "featured": true,
      "technical": false,
      "icon": "emoji or url",
      "iconType": "emoji"
    }
  ]
}
```

### GET /api/skills
Technical skills and competencies.

**Response:**
```json
{
  "skills": [
    {
      "id": "string",
      "title": "string",
      "icon": "lucide-icon-name",
      "skills": ["skill1", "skill2"]
    }
  ]
}
```

### GET /api/work-experience
Work experience timeline.

**Response:**
```json
{
  "workExperience": [
    {
      "id": "string",
      "title": "string",
      "company": "string",
      "location": "string",
      "startDate": "ISO-date",
      "endDate": "ISO-date",
      "year": "2024",
      "emoji": "💼",
      "link": "url"
    }
  ]
}
```

### GET /api/certificates
Certifications and achievements.

**Response:**
```json
{
  "certificates": [
    {
      "id": "string",
      "name": "string",
      "image": "url",
      "alt": "string",
      "date": "string"
    }
  ]
}
```

### GET /api/about-images
Images for the About section carousel.

**Response:**
```json
{
  "aboutImages": [
    {
      "id": "string",
      "src": "url",
      "alt": "string"
    }
  ]
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
git clone https://github.com/codejedi-ai/codejedi-ai.vercel.app.git
cd codejedi-ai.vercel.app
pnpm install
```

### Development

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Backend API available at `http://localhost:3000/api/*`.

### Build

```bash
pnpm run build
pnpm run start  # local production test
```

## 📝 Environment Variables

Create `.env.local`:

```bash
# Optional: Notion integration (for future dynamic content)
NOTION_INTEGRATION_SECRET=your_token
```

## 🔧 Available Scripts

```bash
pnpm run dev      # Start dev server
pnpm run build    # Build for production
pnpm run start    # Start production server locally
pnpm run lint     # Run ESLint
```

## 🚢 Deployment

### Deploy to Vercel (Automatic)

Push to GitHub; Vercel auto-deploys:

```bash
git add .
git commit -m "Update portfolio backend"
git push origin main
```

### Manual Deployment

```bash
npm i -g vercel
vercel login
vercel deploy
```

## 🔐 CORS Configuration

By default, CORS is configured for:
- `https://codejedi-ai.github.io` (GitHub Pages frontend)
- `localhost:3000` (development)

Update `lib/constants.ts` to add more origins:

```typescript
export const ALLOWED_ORIGINS = [
  "https://codejedi-ai.github.io",
  "https://codejedi.ai",
  "https://www.codejedi.ai",
  "http://localhost:3000",
  // Add more origins here
];
```

## 📊 Data Management

### Static Data

All portfolio data is stored in `lib/staticData.ts`:

```typescript
export const staticProjects = { ... }
export const staticSkills = { ... }
export const staticWorkExperience = { ... }
export const staticCertificates = { ... }
export const staticAboutImages = { ... }
```

To update content, edit these exports directly.

### Future: Notion Integration

Notion API utilities are in place (`lib/notion-*.ts`) for future migration to dynamic content management.

## 🤝 Sync with GitHub Pages

Keep `codejedi-ai.vercel.app` and `codejedi-ai.github.io` in sync:

1. **API Response Shapes**: Maintain consistent response formats (both repos expect same JSON structure)
2. **Shared Constants**: Update `lib/constants.ts` in **both** repos (e.g., `CERTIFICATES_BG_URL`)
3. **UI Components**: Keep component logic aligned between repos

## ⚠️ Error Handling

Frontend components guard against:
- Empty or missing API payloads
- Network failures
- Invalid response structures

Backend API returns appropriate HTTP status codes:
- `200` — Success
- `400` — Bad request
- `500` — Server error

## 📄 License

Proprietary — Darcy Liu

## 👤 Author

**Darcy Liu (CodeJedi)**

- Live Backend: https://codejedi-ai.vercel.app
- Static Frontend: https://codejedi-ai.github.io
- GitHub: https://github.com/codejedi-ai

---

Built with ❤️ using Next.js & Vercel

## 👤 Author

**Darcy Liu (CodeJedi)**

- Portfolio: [https://codejedi-ai.github.io/](https://codejedi-ai.github.io/)
- LinkedIn: [codejediatuw](https://www.linkedin.com/in/codejediatuw/)
- Email: d273liu@uwaterloo.ca

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Deployed on [Vercel](https://vercel.com)
- Content managed with [Notion](https://notion.so)
- Icons by [Lucide](https://lucide.dev)

---

Made with ❤️ and Next.js
