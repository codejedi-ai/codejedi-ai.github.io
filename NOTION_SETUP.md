# Notion Integration Setup

This portfolio uses Server-Side Rendering (SSR) to fetch fresh data from Notion databases on every page load.

## Environment Variables

Add these to your deployment platform (Vercel, Netlify, etc.) or `.env.local` for local development:

```env
NOTION_API_KEY=your_notion_integration_secret_here
NOTION_SKILLS_DATABASE_ID=93762143ef434c4bbe97cb7e7d2dd2f4
NOTION_EXPERIENCE_DATABASE_ID=ce4d8010744e4fc790d5f1ca4e481955
NOTION_PROJECTS_DATABASE_ID=8845d571-4240-4f4d-9e67-e54f552c4e2e
NOTION_CONTACTS_DATABASE_ID=46fdbe9f11ca4f7e91238f2e9025c66d
```

## Database Schema (Based on Provided Schema)

### Skills Database (🤹 skills)
- **Name** (Title) - The skill name
- **category** (Select) - Options: ["Programming Languages", "Developer Tools", "Libraries & Frameworks", "DevOps", "Database", "Cloud", "Backend"]
- **icon** (Text) - Optional icon representation

### Experience Database (💼 work-experience)
- **title** (Title) - The job title/position
- **company** (Text) - Company name
- **location** (Text) - Job location
- **date** (Date) - Employment date range
- **link** (URL) - Company website
- **tenure** (Formula) - Calculated tenure

### Projects Database (⚙️ side-projects-technical)
- **Title** (Title) - Project name
- **Description** (Text) - Project description
- **Tags** (Multi-select) - Options: ["AI", "Optimization", "Algorithm"]
- **GitHub** (URL) - GitHub repository link
- **Featured** (Checkbox) - Whether to feature the project

### Contacts Database (☎️ contacts)
- **Name** (Title) - Contact name/platform
- **Platform** (Select) - Options: ["Email", "Phone", "Instagram", "LinkedIn", "Discord"]
- **Handle** (Text) - Username/handle
- **Email Address** (Email) - Email contact
- **Phone Number** (Phone) - Phone contact
- **URL** (URL) - Profile/contact URL

### AWS Certificates Database (AWS certs)
- **title** (Title) - Certificate name
- **date** (Date) - Certification date
- **image** (Text) - Certificate image URL
- **alt** (Text) - Image alt text

### Hugging Face Certificates Database (🤗 hugging-face-certificates)
- **Name** (Title) - Certificate name

## Data Mapping

The application maps Notion properties to the expected interface:

```typescript
// Skills mapping
{
  name: properties.Name?.title?.[0]?.plain_text,
  category: properties.category?.select?.name,
  icon: properties.icon?.rich_text?.[0]?.plain_text,
  level: 85 // Default level
}

// Experience mapping
{
  company: properties.company?.rich_text?.[0]?.plain_text,
  position: properties.title?.title?.[0]?.plain_text,
  startDate: properties.date?.date?.start,
  endDate: properties.date?.date?.end,
  location: properties.location?.rich_text?.[0]?.plain_text,
  link: properties.link?.url
}

// Projects mapping (Featured only)
{
  title: properties.Title?.title?.[0]?.plain_text,
  description: properties.Description?.rich_text?.[0]?.plain_text,
  tags: properties.Tags?.multi_select?.map(tag => tag.name),
  github: properties.GitHub?.url,
  featured: properties.Featured?.checkbox
}
```

## Sorting & Filtering

- **Skills**: Sorted by category (ascending), then by name (ascending)
- **Experience**: Sorted by date (descending) - most recent first
- **Projects**: Filtered to show only Featured projects, sorted by title (ascending)

## Fallback Data

If Notion is not configured or fails, the site will show static fallback data automatically with clear indicators.

## Deployment

This SSR setup requires a platform that supports server-side rendering:
- ✅ Vercel (Recommended)
- ✅ Netlify
- ✅ Railway
- ❌ GitHub Pages (static only)

## Technical Implementation

- **API Method**: Direct `fetch()` calls to Notion API
- **Authentication**: Bearer token with Notion Integration API key
- **Error Handling**: Graceful fallback to static data on API failures
- **Logging**: Comprehensive server-side logging for debugging
- **Performance**: Parallel data fetching for optimal load times

## Available Databases

Your Notion workspace contains 16 databases total. The portfolio currently integrates:

1. **🤹 skills** - Technical skills and categories
2. **💼 work-experience** - Professional work history
3. **⚙️ side-projects-technical** - Featured technical projects
4. **☎️ contacts** - Contact information and social links
5. **AWS certs** - AWS certifications
6. **🤗 hugging-face-certificates** - Hugging Face certifications

Additional databases available for future integration:
- 👪 Non-technical side projects
- 🧬 Life
- 🏘️ Communities
- ✏️ Blogs
- 🖼️ Images & About Images
- 🥅 Goals
- 💬 Quotes
- And more...