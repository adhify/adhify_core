"use client"

import { ProjectCard } from "./project-card"
import { Button } from "@/components/ui/button"
import { Plus, FolderOpen } from "lucide-react"

interface ProjectsGridProps {
  projects: Array<{
    id: string
    name: string
    description: string
    status: "active" | "inactive" | "deploying"
    lastActivity: string
    createdAt: string
    team: string
    apps: Array<{
      id: string
      name: string
      status: "running" | "stopped" | "error" | "deploying"
      url?: string
    }>
    databases: Array<{
      id: string
      name: string
      type: string
      status: "running" | "stopped" | "error"
    }>
    services: Array<{
      id: string
      name: string
      type: string
      status: "running" | "stopped" | "error"
    }>
    environments: string[]
  }>
  onProjectView?: (id: string) => void
  onProjectEdit?: (id: string) => void
  onProjectDelete?: (id: string) => void
}

export function ProjectsGrid({ projects, onProjectView, onProjectEdit, onProjectDelete }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">No projects found</h3>
        <p className="text-muted-foreground mb-6">Get started by creating your first project</p>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Project
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onView={onProjectView}
          onEdit={onProjectEdit}
          onDelete={onProjectDelete}
        />
      ))}
    </div>
  )
}
