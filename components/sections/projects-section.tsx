import { Github, Star } from "lucide-react"

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

const fallbackProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "https://github.com/example/ecommerce",
    featured: true
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features. Includes drag-and-drop functionality and real-time synchronization.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "https://github.com/example/taskmanager",
    featured: true
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "A responsive weather dashboard with location-based forecasts and interactive charts. Features 7-day forecasts, real-time weather updates, and beautiful data visualizations.",
    tags: ["Vue.js", "Chart.js", "Weather API", "Tailwind CSS"],
    github: "https://github.com/example/weather-dashboard",
    featured: false
  },
  {
    id: "4",
    title: "Social Media Analytics Tool",
    description: "Comprehensive analytics dashboard for tracking social media performance across multiple platforms. Real-time data processing and custom reporting features.",
    tags: ["Python", "React", "PostgreSQL", "Redis"],
    github: "https://github.com/example/social-analytics",
    featured: false
  }
]

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const projects = data && data.length > 0 ? data : fallbackProjects
  const useNotionData = data && data.length > 0

  const extractDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '')
      return domain
    } catch {
      return 'github.com'
    }
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <div className="text-sm text-gray-600 mb-2">
            About {projects.length} results
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h2>
          {useNotionData && (
            <p className="text-sm text-green-600">✓ Live data from Notion</p>
          )}
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group"
            >
              <div className="flex items-start gap-3 mb-1">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 mt-1"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                      <Github className="w-4 h-4 text-gray-600" />
                    </div>
                  </a>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-600 truncate">
                      {project.github ? extractDomain(project.github) : 'github.com'}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <h3 className="text-xl font-normal text-blue-600 hover:underline decoration-blue-600 mb-2 leading-tight">
                        {project.title}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="text-xl font-normal text-blue-800 mb-2 leading-tight">
                      {project.title}
                    </h3>
                  )}

                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-xs">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-gray-700 bg-gray-100 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a
            href="https://github.com/codejedi-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">View all projects on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}