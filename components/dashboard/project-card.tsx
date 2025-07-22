"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  ExternalLink,
  Settings,
  Trash2,
  Activity,
  Database,
  Server,
  Globe,
  Users,
  Calendar,
  FolderOpen,
} from "lucide-react"

interface ProjectCardProps {
  project: {
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
  }
  onView?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function ProjectCard({ project, onView, onEdit, onDelete }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "running":
        return "bg-green-100 text-green-800"
      case "inactive":
      case "stopped":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "deploying":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalResources = project.apps.length + project.databases.length + project.services.length
  const runningResources = [
    ...project.apps.filter((a) => a.status === "running"),
    ...project.databases.filter((d) => d.status === "running"),
    ...project.services.filter((s) => s.status === "running"),
  ].length

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <FolderOpen className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${getStatusColor(project.status)}`}>{project.status}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView?.(project.id)} className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open Project
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(project.id)} className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete?.(project.id)} className="gap-2 text-red-600">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resource Summary */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Globe className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Apps</span>
            </div>
            <div className="text-lg font-bold">{project.apps.length}</div>
            <div className="text-xs text-muted-foreground">
              {project.apps.filter((a) => a.status === "running").length} running
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Database className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">DBs</span>
            </div>
            <div className="text-lg font-bold">{project.databases.length}</div>
            <div className="text-xs text-muted-foreground">
              {project.databases.filter((d) => d.status === "running").length} running
            </div>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Server className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Services</span>
            </div>
            <div className="text-lg font-bold">{project.services.length}</div>
            <div className="text-xs text-muted-foreground">
              {project.services.filter((s) => s.status === "running").length} running
            </div>
          </div>
        </div>

        {/* Recent Resources */}
        <div>
          <h4 className="text-sm font-medium mb-2">Recent Resources</h4>
          <div className="space-y-2">
            {/* Show recent apps */}
            {project.apps.slice(0, 2).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Globe className="h-3 w-3 text-blue-600" />
                  <span className="text-sm font-medium">{app.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getStatusColor(app.status)}`}>{app.status}</Badge>
                  {app.url && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                </div>
              </div>
            ))}
            {/* Show recent databases */}
            {project.databases.slice(0, 1).map((db) => (
              <div key={db.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Database className="h-3 w-3 text-purple-600" />
                  <span className="text-sm font-medium">{db.name}</span>
                  <span className="text-xs text-muted-foreground">({db.type})</span>
                </div>
                <Badge className={`text-xs ${getStatusColor(db.status)}`}>{db.status}</Badge>
              </div>
            ))}
            {totalResources > 3 && (
              <div className="text-xs text-muted-foreground text-center py-1">+{totalResources - 3} more resources</div>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{project.team}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created {project.createdAt}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="h-3 w-3" />
            <span>{project.lastActivity}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => onView?.(project.id)}>
            <ExternalLink className="h-3 w-3 mr-1" />
            Open
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
