"use client"

import { useState, useEffect } from "react"
import { Code } from "lucide-react"
import ProjectCard from "./ProjectCard"
import { queryNotionDatabase, SIDE_PROJECTS_DATABASE_ID, transformProject } from "@/lib/notion-morphic"
import { Project } from "@/app/types/types"

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await queryNotionDatabase(SIDE_PROJECTS_DATABASE_ID)
        const projectsData = data.results.map(transformProject)
        
        console.log("Notion fetch successful:", projectsData.length, "projects")

        // Sort projects initially: featured ones first
        const sortedProjects = [...projectsData].sort((a: Project, b: Project) => {
          if (a.featured === b.featured) return 0;
          return a.featured ? -1 : 1;
        });
        
        setProjects(sortedProjects)
        setFilteredProjects(sortedProjects)
      } catch (err) {
        console.error("Error fetching projects:", err)
        const errorMessage = err instanceof Error ? err.message : "Failed to load projects. Please try again later."
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Helper function to generate unique tags from projects
  const getAllTags = (projectsList: Project[]): string[] => {
    const allTagsList: string[] = []
    for (let i = 0; i < projectsList.length; i++) {
      const project = projectsList[i]
      for (let j = 0; j < project.tags.length; j++) {
        allTagsList.push(project.tags[j])
      }
    }
    return Array.from(new Set(allTagsList))
  }

  // Get unique tags from all projects
  const allTags = getAllTags(projects)

  // Filter projects by tag
  const filterProjects = (filter: string) => {
    setActiveFilter(filter)
    if (filter === "all") {
      setFilteredProjects(projects)
    } else if (filter === "featured") {
      setFilteredProjects(projects.filter((project) => project.featured))
    } else {
      setFilteredProjects(projects.filter((project) => project.tags.includes(filter)))
    }
  }

  // Render filter buttons
  const renderFilterButtons = () => {
    return (
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <button
          onClick={() => filterProjects("all")}
          className={`px-4 py-2 rounded-full transition-all ${
            activeFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          All
        </button>
        <button
          onClick={() => filterProjects("featured")}
          className={`px-4 py-2 rounded-full transition-all ${
            activeFilter === "featured" ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Featured
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => filterProjects(tag)}
            className={`px-4 py-2 rounded-full transition-all ${
              activeFilter === tag ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    )
  }

  return (
    <section id="projects" className="py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-center mb-4 text-white">PROJECTS</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my side projects and personal endeavors that showcase my passion for technology and innovation.
          </p>
        </div>

        {/* Filter buttons */}
        {renderFilterButtons()}

        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-400 mb-8">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredProjects.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No projects found with the selected filter.</p>
          </div>
        )}

        
      </div>
    </section>
  )
}
