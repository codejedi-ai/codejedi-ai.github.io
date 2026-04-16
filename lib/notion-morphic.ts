import { 
  Project, 
  Skill, 
  WorkExperienceItem, 
  Certificate, 
  AboutImage, 
  BlogPost 
} from "@/app/types/types"
import { API_BASE_URL } from "./api-config"

// Database IDs
export const SIDE_PROJECTS_DATABASE_ID = "8845d571-4240-4f4d-9e67-e54f552c4e2e"
export const SKILLS_DATABASE_ID = "93762143-ef43-4c4b-be97-cb7e7d2dd2f4"
export const WORK_EXPERIENCE_DATABASE_ID = "ce4d8010-744e-4fc7-90d5-f1ca4e481955"
export const CERTIFICATES_DATABASE_ID = "7ad088a9-fa3e-4261-8eb4-d140952aaa3f"
export const ABOUT_IMAGES_DATABASE_ID = "c8c11443-ac59-4f07-899a-1c0604751414"
export const IMAGES_DATABASE_ID = "911ef9d8-89c2-41ad-bf82-a2a9cc41e231"
export const BLOGS_DATABASE_ID = "311b3a0811614102b265b91425edf4df"
export const CONTACTS_DATABASE_ID = "46fdbe9f-11ca-4f7e-9123-8f2e9025c66d"

// Hardcoded data that was previously in API routes
export const HUGGING_FACE_CERTIFICATES = [
  {
    id: "hugging-face-agents-fundamentals",
    name: "Fundamentals of Agents",
    fullName: "Certificate of Achievement - Fundamentals of Agents",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI-Agents-XFoMGnpSB1R3YGGoQvE9VJKu5nYYS8.webp",
    alt: "Hugging Face Agents Course - Unit 1: Foundations of Agents Certificate",
    date: "17 April 2025",
    description:
      "Successfully completed Unit 1: Foundations of Agents in the Hugging Face Agents Course. This unit covered the fundamental concepts of AI agents, their architecture, and basic implementation principles.",
    skills: ["AI Agents", "Agent Architecture", "Foundations", "Hugging Face"],
    courseUnit: "Unit 1",
    featured: false,
  },
  {
    id: "mcp-course-unit1",
    name: "The MCP Course: Unit 1",
    fullName: "Certificate of Achievement - The MCP Course: Unit 1",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MCP-Cert-KEcApO1IElKuUmbwg4tfO1OPK1tUMv.webp",
    alt: "The MCP Course Unit 1 - Fundamentals of MCP Certificate",
    date: "7 June 2025",
    description:
      "Completed the fundamentals of Model Context Protocol (MCP), learning about context management, protocol design, and implementation strategies for AI systems.",
    skills: ["Model Context Protocol", "MCP", "Context Management", "AI Systems"],
    courseUnit: "Unit 1",
    featured: false,
  },
  {
    id: "hugging-face-agents-course",
    name: "Hugging Face AI Agents Course",
    fullName: "Certificate of Excellence - Hugging Face Agents Course",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hugging%20Face%20Agents%20Course%20Certificate-h7by0WgWsn0t2ppzw1UJSwuqagcWUR.webp",
    alt: "Hugging Face Agents Course Certificate of Excellence",
    date: "19 June 2025",
    description:
      "Achieved Certificate of Excellence for successfully completing the comprehensive Hugging Face Agents Course. This course covered advanced topics in AI agent development, deployment, and optimization using the Hugging Face ecosystem.",
    skills: ["AI Agents", "Hugging Face", "Agent Development", "Machine Learning", "NLP"],
    courseUnit: "Complete Course",
    featured: true,
  },
]

export const CONTACTS_DATA = [
  {
    id: "linkedin",
    name: "LinkedIn",
    value: "codejediatuw",
    icon: "Linkedin",
    href: "https://www.linkedin.com/in/codejediatuw/",
    color: "bg-primary-blue",
    qr: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    value: "darcyldx",
    icon: "Instagram",
    href: "https://www.instagram.com/darcyldx/",
    color: "bg-primary-purple",
    qr: true,
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    value: "@darsboi_cjd",
    icon: "Twitter",
    href: "https://twitter.com/darsboi_cjd",
    color: "bg-dark-lighter",
    qr: true,
  },
  {
    id: "email",
    name: "Email",
    value: "d273liu@uwaterloo.ca",
    icon: "Mail",
    href: "mailto:d273liu@uwaterloo.ca",
    color: "bg-primary-pink",
    qr: false,
  },
  {
    id: "calendly",
    name: "Schedule a Meeting",
    value: "Calendly",
    icon: "Calendar",
    href: "https://calendly.com/d273liu/one-on-one",
    color: "bg-primary-cyan",
    qr: false,
  },
  {
    id: "discord",
    name: "Discord",
    value: "codejedi",
    icon: "MessageSquare",
    href: "#",
    color: "bg-primary-purple",
    qr: false,
  },
]

// Unified fetcher function
export async function queryNotionDatabase(databaseId: string, queryBody: any = {}) {
  const baseUrl = API_BASE_URL || ""
  const response = await fetch(`${baseUrl}/api/notion/2022-06-28/databases/${databaseId}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(queryBody),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to query Notion database')
  }

  return response.json()
}

// Unified submission function
export async function createNotionPage(data: any) {
  const baseUrl = API_BASE_URL || ""
  const response = await fetch(`${baseUrl}/api/notion/2022-06-28/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to create Notion page')
  }

  return response.json()
}

// Helper to normalize URLs
const normalizeUrl = (url: string | undefined | null): string => {
  if (!url) return "#"
  const trimmed = String(url).trim()
  if (!trimmed || trimmed === "#" || trimmed === "/") return "#"
  const hasScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)
  return hasScheme ? trimmed : `https://${trimmed}`
}

// Helper to retrieve a URL from Notion properties
const getUrlProperty = (
  props: Record<string, any>,
  candidates: string[],
): string | undefined => {
  const extract = (val: any): string | undefined => {
    if (!val) return undefined
    return val.url || val.rich_text?.[0]?.plain_text || val.plain_text || val.title?.[0]?.plain_text
  }

  for (const name of candidates) {
    const val = extract(props[name]) || extract(props[name.toLowerCase()])
    if (val) return val
  }
  
  const norm = (s: string) => s.toLowerCase().replace(/[\s_-]+/g, "")
  const candidateNorms = candidates.map(norm)
  for (const [key, value] of Object.entries(props)) {
    if (candidateNorms.includes(norm(key))) {
      const val = extract(value)
      if (val) return val
    }
  }
  return undefined
}

// Transformers
export function transformProject(page: any): Project {
  const properties = page.properties as Record<string, any>

  const title =
    properties.Title?.title?.[0]?.plain_text ||
    properties.title?.title?.[0]?.plain_text ||
    properties.Name?.title?.[0]?.plain_text ||
    properties["Project Name"]?.title?.[0]?.plain_text ||
    "Untitled Project"

  const description =
    properties.Description?.rich_text?.[0]?.plain_text ||
    properties.Description?.plain_text ||
    properties.Summary?.rich_text?.[0]?.plain_text ||
    properties.About?.rich_text?.[0]?.plain_text ||
    ""

  const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || []
  const tech =
    properties.Tech?.multi_select?.map((t: any) => t.name) ||
    properties.Technologies?.multi_select?.map((t: any) => t.name) ||
    properties.Skills?.multi_select?.map((t: any) => t.name) ||
    []

  const link = normalizeUrl(getUrlProperty(properties, ["Link", "URL", "Live URL", "Demo URL"]))
  const github = normalizeUrl(getUrlProperty(properties, ["GitHub", "github", "Source Code", "Repository"]))

  const featured = properties.Featured?.checkbox || properties.Highlight?.checkbox || properties.Important?.checkbox || false
  const technical = properties.Technical?.checkbox || false

  let image = "/placeholder.svg"
  const imageProperty =
    properties.Image?.files?.[0]?.file?.url ||
    properties.Image?.files?.[0]?.external?.url ||
    properties.Screenshot?.files?.[0]?.file?.url ||
    properties.Preview?.files?.[0]?.file?.url ||
    properties.Cover?.files?.[0]?.file?.url ||
    page.cover?.file?.url ||
    page.cover?.external?.url

  if (imageProperty) {
    image = imageProperty
  }

  const pageIcon = page.icon?.emoji || page.icon?.file?.url || page.icon?.external?.url || null
  const iconType = page.icon?.type || null

  return {
    id: page.id,
    title,
    description,
    image,
    tags,
    tech,
    link,
    github,
    featured,
    technical,
    icon: pageIcon,
    iconType,
  }
}

export function transformSkill(page: any) {
  const properties = page.properties as Record<string, any>
  const name = 
    properties.Name?.title?.[0]?.plain_text ||
    properties.name?.title?.[0]?.plain_text ||
    "Untitled Skill"
  
  const category = 
    properties.category?.select?.name ||
    properties.Category?.select?.name ||
    "Uncategorized"
  
  const icon = 
    properties.icon?.rich_text?.[0]?.plain_text ||
    properties.Icon?.rich_text?.[0]?.plain_text ||
    "Code"

  return { name, category, icon }
}

export function groupSkills(skillsData: { name: string; category: string; icon: string }[]): Skill[] {
  const skillsMap: Record<string, { id: string; title: string; icon: string; skills: string[] }> = {}

  skillsData.forEach((item) => {
    const { name, category, icon } = item
    if (category !== "Uncategorized" && category) {
      if (!skillsMap[category]) {
        const categoryId = category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/[^a-z0-9-]/g, '')
        skillsMap[category] = {
          id: categoryId,
          title: category,
          icon: icon,
          skills: []
        }
      }
      skillsMap[category].skills.push(name)
    }
  })

  const groupSkillsIntelligently = (skills: string[]): string[] => {
    if (skills.length === 0) return []
    if (skills.length > 6) {
      const chunks: string[] = []
      for (let i = 0; i < skills.length; i += 3) {
        chunks.push(skills.slice(i, i + 3).join(", "))
      }
      return chunks
    } else if (skills.length > 3) {
      const chunks: string[] = []
      for (let i = 0; i < skills.length; i += 2) {
        chunks.push(skills.slice(i, i + 2).join(", "))
      }
      return chunks
    } else {
      return skills.length <= 2 ? [skills.join(", ")] : skills
    }
  }

  return Object.values(skillsMap).map((category) => {
    const groupedSkills = groupSkillsIntelligently(category.skills)
    return {
      ...category,
      skills: groupedSkills.length > 0 ? groupedSkills : category.skills
    }
  })
}

export function transformWorkExperience(page: any): WorkExperienceItem {
  const properties = page.properties as Record<string, any>

  const title =
    properties.title?.title?.[0]?.plain_text ||
    properties.Title?.title?.[0]?.plain_text ||
    properties["Job Title"]?.title?.[0]?.plain_text ||
    properties.Position?.title?.[0]?.plain_text ||
    ""

  const company =
    properties.company?.rich_text?.[0]?.plain_text ||
    properties.Company?.rich_text?.[0]?.plain_text ||
    properties["Company Name"]?.rich_text?.[0]?.plain_text ||
    ""

  const location =
    properties.location?.rich_text?.[0]?.plain_text ||
    properties.Location?.rich_text?.[0]?.plain_text ||
    properties["Work Location"]?.rich_text?.[0]?.plain_text ||
    ""

  const link =
    properties.link?.url || properties.Link?.url || properties["Company URL"]?.url || properties.Website?.url || ""

  const dateRange =
    properties["Due date"]?.date ||
    properties.date?.date ||
    properties.Date?.date ||
    properties["Employment Period"]?.date ||
    properties.Tenure?.date ||
    null

  const tenure =
    properties.tenure?.number ||
    properties.Tenure?.number ||
    properties.Duration?.number ||
    properties.Length?.number ||
    0

  const startDate = dateRange?.start || ""
  const endDate = dateRange?.end || dateRange?.start || ""
  const year = startDate ? new Date(startDate).getFullYear().toString() : ""

  const pageIcon = page.icon?.emoji || page.icon?.file?.url || page.icon?.external?.url || null
  const iconType = page.icon?.type || null
  const emoji = pageIcon || "💎"

  return {
    id: page.id,
    title,
    company,
    location,
    startDate,
    endDate,
    link,
    emoji: emoji,
    year,
    icon: pageIcon,
    iconType,
  }
}

export function transformCertificate(page: any): Certificate {
  const properties = page.properties as Record<string, any>

  const name =
    properties.Title?.title?.[0]?.plain_text ||
    properties.title?.title?.[0]?.plain_text ||
    properties.Name?.title?.[0]?.plain_text ||
    properties["Certificate Name"]?.title?.[0]?.plain_text ||
    "Untitled Certificate"

  const dateProperty =
    properties.Date?.date?.start ||
    properties.date?.date?.start ||
    properties["Issue Date"]?.date?.start ||
    properties["Certification Date"]?.date?.start ||
    null

  let formattedDate = ""
  if (dateProperty) {
    const date = new Date(dateProperty)
    formattedDate = date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
  }

  let image = "/placeholder.svg"
  if (page.cover) {
    image = page.cover.external?.url || page.cover.file?.url || image
  }

  if (image === "/placeholder.svg") {
    const imageProperty =
      properties.Image?.files?.[0]?.file?.url ||
      properties.Image?.files?.[0]?.external?.url ||
      properties.Screenshot?.files?.[0]?.file?.url ||
      properties.Preview?.files?.[0]?.file?.url ||
      properties.Certificate?.files?.[0]?.file?.url

    if (imageProperty) {
      image = imageProperty
    }
  }

  const altText =
    properties.Alt?.rich_text?.[0]?.plain_text ||
    properties.alt?.rich_text?.[0]?.plain_text ||
    properties["Alt Text"]?.rich_text?.[0]?.plain_text ||
    `${name} Certificate`

  return {
    id: page.id,
    name,
    image,
    alt: altText,
    date: formattedDate || "Date not specified",
  }
}

export function transformAboutImage(page: any): AboutImage {
  const properties = page.properties as Record<string, any>

  const id = 
    properties.id?.title?.[0]?.plain_text ||
    properties["userDefined:id"]?.title?.[0]?.plain_text ||
    properties.Name?.title?.[0]?.plain_text ||
    properties.Title?.title?.[0]?.plain_text ||
    page.id

  const alt = 
    properties.alt?.rich_text?.[0]?.plain_text ||
    properties.Alt?.rich_text?.[0]?.plain_text ||
    properties["Alt Text"]?.rich_text?.[0]?.plain_text ||
    ""

  let src = 
    properties.src?.rich_text?.[0]?.plain_text ||
    properties.Src?.rich_text?.[0]?.plain_text ||
    properties.URL?.rich_text?.[0]?.plain_text ||
    properties.url?.rich_text?.[0]?.plain_text ||
    null

  if (!src && page.cover) {
    src = page.cover.external?.url || page.cover.file?.url || null
  }

  return {
    id,
    src: src || "",
    alt,
  }
}
