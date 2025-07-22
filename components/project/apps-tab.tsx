"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EnvironmentSwitcher } from "../layout/environment-switcher"
import { Plus, Search, Filter, Globe, ExternalLink, Settings, Trash2, Activity, GitBranch } from "lucide-react"

interface AppsTabProps {
  projectId: string
}

export function AppsTab({ projectId }: AppsTabProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data based on project ID
  const getProjectApps = (id: string) => {
    const appsMap = {
      "1": [
        {
          id: "1",
          name: "Frontend App",
          status: "running" as const,
          url: "https://shop.example.com",
          environment: "production",
          lastDeployed: "2 hours ago",
          description: "Main React e-commerce application",
          framework: "Next.js",
          deployments: 24,
          branch: "main",
        },
        {
          id: "2",
          name: "Admin Dashboard",
          status: "running" as const,
          url: "https://admin.shop.example.com",
          environment: "production",
          lastDeployed: "1 day ago",
          description: "Admin panel for managing products",
          framework: "React",
          deployments: 18,
          branch: "main",
        },
        {
          id: "3",
          name: "API Server",
          status: "running" as const,
          environment: "production",
          lastDeployed: "1 day ago",
          description: "Node.js REST API server",
          framework: "Node.js",
          deployments: 32,
          branch: "main",
        },
      ],
      "2": [
        {
          id: "8",
          name: "Marketing Site",
          status: "running" as const,
          url: "https://example.com",
          environment: "production",
          lastDeployed: "1 day ago",
          description: "Company marketing website",
          framework: "Next.js",
          deployments: 15,
          branch: "main",
        },
        {
          id: "9",
          name: "Blog Platform",
          status: "running" as const,
          url: "https://blog.example.com",
          environment: "production",
          lastDeployed: "3 days ago",
          description: "Company blog and content platform",
          framework: "Gatsby",
          deployments: 8,
          branch: "main",
        },
      ],
      "3": [
        {
          id: "11",
          name: "Employee Portal",
          status: "deploying" as const,
          environment: "staging",
          lastDeployed: "5 minutes ago",
          description: "Internal employee dashboard",
          framework: "Vue.js",
          deployments: 5,
          branch: "develop",
        },
        {
          id: "12",
          name: "Analytics Dashboard",
          status: "stopped" as const,
          environment: "development",
          lastDeployed: "2 days ago",
          description: "Internal analytics and reporting",
          framework: "React",
          deployments: 3,
          branch: "feature/analytics",
        },
      ],
    }

    return appsMap[id as keyof typeof appsMap] || appsMap["1"]
  }

  const apps = getProjectApps(projectId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800"
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

  const filteredApps = apps.filter((app) => app.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Applications</h2>
          <p className="text-muted-foreground">
            {apps.length} apps in this project • {apps.filter((a) => a.status === "running").length} running
          </p>
        </div>
        <div className="flex items-center gap-3">
          <EnvironmentSwitcher />
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New App
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => (
          <Card key={app.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <CardDescription className="capitalize">
                      {app.framework} • {app.environment}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getStatusColor(app.status)}`}>{app.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-red-600">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <p className="text-sm text-muted-foreground">{app.description}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <GitBranch className="h-3 w-3" />
                  <span>{app.branch}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Activity className="h-3 w-3" />
                  <span>{app.deployments} deployments</span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">Last deployed {app.lastDeployed}</div>

              <div className="flex gap-2">
                {app.url && (
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                    <ExternalLink className="h-3 w-3" />
                    Visit
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Deploy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No applications found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first application"}
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New App
          </Button>
        </div>
      )}
    </div>
  )
}
