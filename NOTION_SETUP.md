# Notion Integration Setup

This portfolio uses Server-Side Rendering (SSR) to fetch fresh data from Notion databases on every page load.

## Environment Variables

Add these to your deployment platform (Vercel, Netlify, etc.) or `.env.local` for local development:

```env
NOTION_API_KEY=your_notion_integration_secret_here
NOTION_SKILLS_DATABASE_ID=your_skills_database_id_here
NOTION_EXPERIENCE_DATABASE_ID=your_experience_database_id_here
```

## Database Schema

### Skills Database Properties:
- **Name** (Title) - The skill name
- **category** (Select) - The skill category
- **icon** (Rich Text) - Optional icon

### Experience Database Properties:
- **title** (Title) - The job title
- **company** (Rich Text) - Company name
- **date** (Date) - Start and end dates with range support
- **location** (Rich Text) - Job location
- **link** (URL) - Company website link
- **tenure** (Formula) - Calculated tenure in days

## Deployment

This SSR setup requires a platform that supports server-side rendering:
- ✅ Vercel (Recommended)
- ✅ Netlify
- ✅ Railway
- ❌ GitHub Pages (static only)

## Technical Implementation

- **API Method**: Direct `fetch()` calls to Notion API
- **Authentication**: Bearer token with Notion Integration API key
- **Sorting**: Skills by Name (ascending), Experience by date (descending)
- **Error Handling**: Graceful fallback to static data on API failures
- **Logging**: Comprehensive server-side logging for debugging