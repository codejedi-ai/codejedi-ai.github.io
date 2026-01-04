import { Client } from "@notionhq/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Building } from "lucide-react"

interface NotionExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  technologies: string[]
  location?: string
}

// Fallback experience data
const fallbackExperience = [
  {
    id: "1",
    company: "Tech Innovations Inc.",
    position: "Senior Full-Stack Developer",
    startDate: "2022-01-01",
    endDate: undefined,
    description: "Lead development of modern web applications using React, Node.js, and cloud technologies. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
    location: "San Francisco, CA"
  },
  {
    id: "2", 
    company: "Digital Solutions LLC",
    position: "Frontend Developer",
    startDate: "2020-06-01",
    endDate: "2021-12-31",
    description: "Developed responsive web applications and improved user experience across multiple platforms. Implemented modern frontend frameworks and optimization techniques.",
    technologies: ["React", "JavaScript", "CSS3", "Webpack", "Jest"],
    location: "Remote"
  },
  {
    id: "3",
    company: "StartupXYZ",
    position: "Junior Developer",
    startDate: "2019-03-01", 
    endDate: "2020-05-31",
    description: "Built and maintained web applications in a fast-paced startup environment. Gained experience in full-stack development and agile methodologies.",
    technologies: ["Vue.js", "Python", "Django", "MySQL", "Docker"],
    location: "New York, NY"
  }
]

async function getExperienceFromNotion(): Promise<NotionExperience[]> {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_EXPERIENCE_DATABASE_ID) {
      console.log('Notion not configured, using fallback experience data')
      return []
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
    return []
  }
}

export default async function ExperienceSection() {
  const notionExperience = await getExperienceFromNotion()
  
  // Use Notion data if available, otherwise use fallback
  const experiences = notionExperience.length > 0 ? notionExperience : fallbackExperience

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = formatDate(startDate)
    const end = endDate ? formatDate(endDate) : 'Present'
    return `${start} - ${end}`
  }

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My professional journey and the experiences that have shaped my career in software development.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience) => (
            <Card key={experience.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {experience.position}
                    </CardTitle>
                    <div className="flex items-center text-blue-600 mb-2">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="font-semibold">{experience.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end text-sm text-gray-600">
                    <div className="flex items-center mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{formatDateRange(experience.startDate, experience.endDate)}</span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {experience.description}
                </p>
                
                {experience.technologies.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
