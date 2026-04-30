"use client"

import { Component } from "react"
import Link from "next/link"
import { Github, ExternalLink, Video, Twitter } from "lucide-react"
import ProgressiveImage from "./ProgressiveImage"

interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  tech: string[]
  link: string
  github: string
  demoVideo?: string
  twitter?: string
  tryMe?: string
  featured: boolean
  technical: boolean
  icon?: string | null
  iconType?: string | null
}

interface ProjectCardProps {
  project: Project
}

export default class ProjectCard extends Component<ProjectCardProps> {
  render() {
    const { project } = this.props

    const normalizedUrl = (value?: string) => {
      const url = value && value.trim() ? value.trim() : ""
      if (!url || url === "/" || url === "#") return ""
      return url
    }

    const codeUrl = normalizedUrl(project.github)
    const hasCode = !!codeUrl

    const demoVideoUrl = normalizedUrl(project.demoVideo)
    const hasDemoVideo = !!demoVideoUrl

    const twitterUrl = normalizedUrl(project.twitter)
    const hasTwitter = !!twitterUrl

    const tryMeUrl = normalizedUrl(project.tryMe || project.link)
    const hasTryMe = !!tryMeUrl

    return (
      <div
        className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col h-full group"
        role="article"
      >
        <div className="relative h-48 overflow-hidden">
          <ProgressiveImage
            src={project.image || "/placeholder.svg?height=400&width=600&query=project"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            containerClassName="h-full w-full"
          />
          {project.featured && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded z-20">
              Featured
            </div>
          )}
        </div>
        <div className="p-6 flex-grow">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            {project.icon && project.iconType === "emoji" && (
              <span className="text-2xl">{project.icon}</span>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {project.icon && project.iconType !== "emoji" && (
              <img src={project.icon} alt="Project icon" className="w-6 h-6 object-contain" />
            )}
            <span>{project.title}</span>
          </h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech && project.tech.length > 0 ? (
              project.tech.map((techItem) => (
                <span
                  key={`${project.id}-tech-${techItem}`}
                  className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                >
                  {techItem}
                </span>
              ))
            ) : (
              // Fallback to tags if tech is not available (for backward compatibility)
              project.tags.map((tag) => (
                <span
                  key={`${project.id}-tag-${tag}`}
                  className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))
            )}
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="grid grid-cols-4">
          {hasCode ? (
              <Link
                href={codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                title="Github"
                className="flex min-h-10 items-center justify-center text-gray-300 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                title="Github unavailable"
                className="flex min-h-10 items-center justify-center text-gray-500 opacity-50"
              >
                <Github className="h-4 w-4" />
              </span>
            )}
            {hasDemoVideo ? (
              <Link
                href={demoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Demo Video"
                title="Demo Video"
                className="flex min-h-10 items-center justify-center text-gray-300 transition-colors hover:text-white"
              >
                <Video className="h-4 w-4" />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                title="Demo Video unavailable"
                className="flex min-h-10 items-center justify-center text-gray-500 opacity-50"
              >
                <Video className="h-4 w-4" />
              </span>
            )}
            {hasTwitter ? (
              <Link
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                title="Twitter"
                className="flex min-h-10 items-center justify-center text-gray-300 transition-colors hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                title="Twitter unavailable"
                className="flex min-h-10 items-center justify-center text-gray-500 opacity-50"
              >
                <Twitter className="h-4 w-4" />
              </span>
            )}
            {hasTryMe ? (
              <Link
                href={tryMeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Try me"
                title="Try me"
                className="flex min-h-10 items-center justify-center text-gray-300 transition-colors hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            ) : (
              <span
                aria-disabled="true"
                title="Try me unavailable"
                className="flex min-h-10 items-center justify-center text-gray-500 opacity-50"
              >
                <ExternalLink className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
}
