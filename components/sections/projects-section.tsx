import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

interface NotionProject {
  id: string
  title: string
  description: string
  tags: string[]
  github: string
  featured: boolean
}

interface ProjectsSectionProps {
  data: NotionProject[] | null
}

// Fallback projects data
const fallbackProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "https://github.com/example/ecommerce",
    featured: true
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/example/taskmanager",
    featured: true
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A responsive weather dashboard with location-based forecasts and interactive charts.",
    tags: ["Vue.js", "Chart.js", "Weather API", "Tailwind CSS"],
    github: "https://github.com/example/weather-dashboard",
    featured: false
  }
]

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  // Use Notion data if available, otherwise use fallback
  const projects = data && data.length > 0 ? data : fallbackProjects
  const useNotionData = data && data.length > 0

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience 
            in full-stack development.
            {useNotionData && <span className="block text-sm text-green-600 mt-2">✅ Live data from Notion</span>}
            {!useNotionData && <span className="block text-sm text-blue-600 mt-2">📋 Fallback data (Notion not configured)</span>}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-blue-100">Technical Project</p>
                </div>
                {project.featured && (
                  <Badge className="absolute top-4 left-4 bg-yellow-500 text-yellow-900">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-3">
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a 
              href="https://github.com/codejedi-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-5 w-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}