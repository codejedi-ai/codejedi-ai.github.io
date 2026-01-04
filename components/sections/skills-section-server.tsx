import { Client } from "@notionhq/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NotionSkill {
  id: string
  name: string
  category: string
  level: number
  description?: string
}

// Fallback skills data
const fallbackSkills = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 90 },
      { name: "Tailwind CSS", level: 85 }
    ]
  },
  {
    title: "Backend Development", 
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 75 },
      { name: "Express.js", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 70 },
      { name: "Authentication", level: 85 }
    ]
  },
  {
    title: "Database & Tools",
    skills: [
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "Git", level: 90 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Vercel", level: 85 }
    ]
  }
]

async function getSkillsFromNotion(): Promise<NotionSkill[]> {
  try {
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_SKILLS_DATABASE_ID) {
      console.log('Notion not configured, using fallback skills data')
      return []
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
    return []
  }
}

export default async function SkillsSection() {
  const notionSkills = await getSkillsFromNotion()
  
  // Use Notion data if available, otherwise use fallback
  const useNotionData = notionSkills.length > 0
  
  // Group Notion skills by category
  const groupedNotionSkills = notionSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, NotionSkill[]>)

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My technical skills and expertise across various technologies and frameworks.
          </p>
        </div>

        {useNotionData ? (
          // Render Notion data
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {Object.entries(groupedNotionSkills).map(([category, categorySkills]) => (
              <Card key={category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                        {skill.description && (
                          <p className="text-xs text-gray-500 mt-1">{skill.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Render fallback data
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {fallbackSkills.map((category) => (
              <Card key={category.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* All skills as badges - only for Notion data */}
        {useNotionData && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 text-center">
                All Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 justify-center">
                {notionSkills.map((skill) => (
                  <Badge 
                    key={skill.id} 
                    variant="outline" 
                    className="px-3 py-1 text-sm hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    title={skill.description || `${skill.level}% proficiency`}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
