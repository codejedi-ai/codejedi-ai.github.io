import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section-ssr"
import ExperienceSection from "@/components/sections/experience-section-ssr"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/layout/footer"

// Force dynamic rendering (SSR) - this prevents static generation
export const dynamic = 'force-dynamic'

// Notion Configuration - Environment variables only
const NOTION_CONFIG = {
  API_KEY: process.env.NOTION_API_KEY || "",
  SKILLS_DATABASE_ID: process.env.NOTION_SKILLS_DATABASE_ID || "",
  EXPERIENCE_DATABASE_ID: process.env.NOTION_EXPERIENCE_DATABASE_ID || ""
}

// Server-side data fetching functions using direct fetch
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
        level: 85, // Default level since no level property exists
        description: `${properties.Name?.title?.[0]?.plain_text || ''} - ${properties.category?.select?.name || 'Technology'}`,
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
        description: `${properties.title?.title?.[0]?.plain_text || ''} at ${properties.company?.rich_text?.[0]?.plain_text || ''}. Professional experience in technology.`,
        technologies: [], // No technologies property in this database
        location: properties.location?.rich_text?.[0]?.plain_text || properties.location?.rich_text?.[0]?.text?.content || '',
      }
    })
  } catch (error) {
    console.error('❌ Error fetching experience from Notion:', error)
    return null
  }
}

// This is now a Server Component that runs on each request (SSR)
export default async function Home() {
  console.log('🚀 SSR: Fetching fresh data from Notion on server...')
  
  // Fetch data on the server for each request
  const [skillsData, experienceData] = await Promise.all([
    getSkillsData(),
    getExperienceData()
  ])

  console.log('✅ SSR: Data fetched, rendering page...')
  console.log(`📊 Skills: ${skillsData?.length || 0} items, Experience: ${experienceData?.length || 0} items`)

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <AboutSection />
      <ExperienceSection data={experienceData} />
      <ProjectsSection />
      <SkillsSection data={skillsData} />
      <ContactSection />
      <Footer />
    </div>
  )
}