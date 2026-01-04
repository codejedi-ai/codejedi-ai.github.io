import { Client } from "@notionhq/client"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import SkillsSection from "@/components/sections/skills-section-ssr"
import ExperienceSection from "@/components/sections/experience-section-ssr"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/layout/footer"

// Force dynamic rendering (SSR) - this prevents static generation
export const dynamic = 'force-dynamic'

// Server-side data fetching functions
async function getSkillsData() {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_SKILLS_DATABASE_ID) {
      console.log('Notion not configured for skills, using fallback data')
      return null
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY })
    
    const response = await notion.request({
      path: `databases/${process.env.NOTION_SKILLS_DATABASE_ID}/query`,
      method: 'post',
      body: {
        sorts: [
          {
            property: 'Level',
            direction: 'descending',
          },
        ],
      },
    })

    return (response as any).results.map((page: any) => {
      const properties = page.properties
      
      return {
        id: page.id,
        name: properties.Name?.title?.[0]?.text?.content || '',
        category: properties.Category?.select?.name || '',
        level: properties.Level?.number || 0,
        description: properties.Description?.rich_text?.[0]?.text?.content || '',
      }
    })
  } catch (error) {
    console.error('Error fetching skills from Notion:', error)
    return null
  }
}

async function getExperienceData() {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_EXPERIENCE_DATABASE_ID) {
      console.log('Notion not configured for experience, using fallback data')
      return null
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY })
    
    const response = await notion.request({
      path: `databases/${process.env.NOTION_EXPERIENCE_DATABASE_ID}/query`,
      method: 'post',
      body: {
        sorts: [
          {
            property: 'Start Date',
            direction: 'descending',
          },
        ],
      },
    })

    return (response as any).results.map((page: any) => {
      const properties = page.properties
      
      return {
        id: page.id,
        company: properties.Company?.title?.[0]?.text?.content || '',
        position: properties.Position?.rich_text?.[0]?.text?.content || '',
        startDate: properties['Start Date']?.date?.start || '',
        endDate: properties['End Date']?.date?.start || undefined,
        description: properties.Description?.rich_text?.[0]?.text?.content || '',
        technologies: properties.Technologies?.multi_select?.map((tech: any) => tech.name) || [],
        location: properties.Location?.rich_text?.[0]?.text?.content || '',
      }
    })
  } catch (error) {
    console.error('Error fetching experience from Notion:', error)
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