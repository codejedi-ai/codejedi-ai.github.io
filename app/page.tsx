import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section-ssr"
import ExperienceSection from "@/components/sections/experience-section-ssr"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/layout/footer"

// Force dynamic rendering (SSR) - this prevents static generation
export const dynamic = 'force-dynamic'

// Notion Configuration - Environment variables with schema-based fallbacks
const NOTION_CONFIG = {
  API_KEY: process.env.NOTION_API_KEY || "",
  SKILLS_DATABASE_ID: process.env.NOTION_SKILLS_DATABASE_ID || "93762143ef434c4bbe97cb7e7d2dd2f4",
  EXPERIENCE_DATABASE_ID: process.env.NOTION_EXPERIENCE_DATABASE_ID || "ce4d8010744e4fc790d5f1ca4e481955",
  PROJECTS_DATABASE_ID: process.env.NOTION_PROJECTS_DATABASE_ID || "8845d571-4240-4f4d-9e67-e54f552c4e2e",
  CONTACTS_DATABASE_ID: process.env.NOTION_CONTACTS_DATABASE_ID || "46fdbe9f11ca4f7e91238f2e9025c66d"
}

// Server-side data fetching functions using correct schema
async function getSkillsData() {
  try {
    if (!NOTION_CONFIG.API_KEY || !NOTION_CONFIG.SKILLS_DATABASE_ID) {
      console.log('Notion not configured for skills, using fallback data')
      return null
    }

    console.log('🔍 Fetching skills from Notion database')

    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_CONFIG.SKILLS_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        sorts: [
          {
            property: 'category',
            direction: 'ascending',
          },
          {
            property: 'Name',
            direction: 'ascending',
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Notion API error:', response.status, response.statusText, errorText)
      return null
    }

    const data = await response.json()
    console.log('✅ Skills API response received, processing', data.results?.length || 0, 'items')

    if (!data.results || data.results.length === 0) {
      return null
    }

    return data.results.map((page: any) => {
      const properties = page.properties
      
      return {
        id: page.id,
        name: properties.Name?.title?.[0]?.plain_text || properties.Name?.title?.[0]?.text?.content || '',
        category: properties.category?.select?.name || 'Other',
        level: 85, // Default level since no level property exists in schema
        description: `${properties.Name?.title?.[0]?.plain_text || ''} - ${properties.category?.select?.name || 'Technology'}`,
        icon: properties.icon?.rich_text?.[0]?.plain_text || properties.icon?.rich_text?.[0]?.text?.content || ''
      }
    })
  } catch (error) {
    console.error('❌ Error fetching skills from Notion:', error)
    return null
  }
}

async function getExperienceData() {
  try {
    if (!NOTION_CONFIG.API_KEY || !NOTION_CONFIG.EXPERIENCE_DATABASE_ID) {
      console.log('Notion not configured for experience, using fallback data')
      return null
    }

    console.log('🔍 Fetching experience from Notion database')

    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_CONFIG.EXPERIENCE_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        sorts: [
          {
            property: 'date',
            direction: 'descending',
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Notion API error:', response.status, response.statusText, errorText)
      return null
    }

    const data = await response.json()
    console.log('✅ Experience API response received, processing', data.results?.length || 0, 'items')

    if (!data.results || data.results.length === 0) {
      return null
    }

    return data.results.map((page: any) => {
      const properties = page.properties
      
      return {
        id: page.id,
        company: properties.company?.rich_text?.[0]?.plain_text || properties.company?.rich_text?.[0]?.text?.content || '',
        position: properties.title?.title?.[0]?.plain_text || properties.title?.title?.[0]?.text?.content || '',
        startDate: properties.date?.date?.start || '',
        endDate: properties.date?.date?.end || undefined,
        description: `${properties.title?.title?.[0]?.plain_text || ''} at ${properties.company?.rich_text?.[0]?.plain_text || ''}. ${properties.tenure?.formula?.number ? `${Math.round(properties.tenure.formula.number / 30)} months` : 'Professional'} of experience.`,
        technologies: [], // No technologies property in this database schema
        location: properties.location?.rich_text?.[0]?.plain_text || properties.location?.rich_text?.[0]?.text?.content || '',
        link: properties.link?.url || ''
      }
    })
  } catch (error) {
    console.error('❌ Error fetching experience from Notion:', error)
    return null
  }
}

async function getProjectsData() {
  try {
    if (!NOTION_CONFIG.API_KEY || !NOTION_CONFIG.PROJECTS_DATABASE_ID) {
      console.log('Notion not configured for projects, using fallback data')
      return null
    }

    console.log('🔍 Fetching projects from Notion database')

    const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_CONFIG.PROJECTS_DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_CONFIG.API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        filter: {
          property: 'Featured',
          checkbox: {
            equals: true
          }
        },
        sorts: [
          {
            property: 'Title',
            direction: 'ascending',
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Notion API error:', response.status, response.statusText, errorText)
      return null
    }

    const data = await response.json()
    console.log('✅ Projects API response received, processing', data.results?.length || 0, 'items')

    if (!data.results || data.results.length === 0) {
      return null
    }

    return data.results.map((page: any) => {
      const properties = page.properties
      
      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || properties.Title?.title?.[0]?.text?.content || '',
        description: properties.Description?.rich_text?.[0]?.plain_text || properties.Description?.rich_text?.[0]?.text?.content || '',
        tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
        github: properties.GitHub?.url || '',
        featured: properties.Featured?.checkbox || false
      }
    })
  } catch (error) {
    console.error('❌ Error fetching projects from Notion:', error)
    return null
  }
}

// This is now a Server Component that runs on each request (SSR)
export default async function Home() {
  console.log('🚀 SSR: Fetching fresh data from Notion on server...')
  
  // Fetch data on the server for each request
  const [skillsData, experienceData, projectsData] = await Promise.all([
    getSkillsData(),
    getExperienceData(),
    getProjectsData()
  ])

  console.log('✅ SSR: Data fetched, rendering page...')
  console.log(`📊 Skills: ${skillsData?.length || 0} items`)
  console.log(`💼 Experience: ${experienceData?.length || 0} items`)
  console.log(`🚀 Projects: ${projectsData?.length || 0} items`)

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <ExperienceSection data={experienceData} />
      <ProjectsSection data={projectsData} />
      <SkillsSection data={skillsData} />
      <ContactSection />
      <Footer />
    </div>
  )
}