"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EnvironmentSwitcher } from "../layout/environment-switcher"
import { Plus, Search, Filter, Server, Settings, Trash2, Activity, Zap } from "lucide-react"

interface ServicesTabProps {
  projectId: string
}

export function ServicesTab({ projectId }: ServicesTabProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data based on project ID
  const getProjectServices = (id: string) => {
    const servicesMap = {
      "1": [
        {
          id: "6",
          name: "Redis Cache",
          type: "Redis",
          status: "running" as const,
          environment: "production",
          lastDeployed: "1 week ago",
          description: "Redis caching service for session management",
          version: "7.0",
          connections: 24,
          uptime: "99.9%",
        },
        {
          id: "7",
          name: "Email Service",
          type: "SMTP",
          status: "running" as const,
          environment: "production",
          lastDeployed: "2 weeks ago",
          description: "SMTP email service for notifications",
          version: "2.1",
          connections: 5,
          uptime: "99.8%",
        },
      ],
      "2": [],
      "3": [
        {
          id: "14",
          name: "Auth Service",
          type: "OAuth",
          status: "running" as const,
          environment: "staging",
          lastDeployed: "3 days ago",
          description: "OAuth authentication service",
          version: "1.0",
          connections: 8,
          uptime: "99.5%",
        },
      ],
    }

    return servicesMap[id as keyof typeof servicesMap] || []
  }

  const services = getProjectServices(projectId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800"
      case "stopped":
        return "bg-gray-100 text-gray-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "redis":
        return "bg-red-100 text-red-800"
      case "smtp":
        return "bg-blue-100 text-blue-800"
      case "oauth":
        return "bg-green-100 text-green-800"
      case "webhook":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredServices = services.filter((service) => service.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Services</h2>
          <p className="text-muted-foreground">
            {services.length} services in this project • {services.filter((s) => s.status === "running").length} running
          </p>
        </div>
        <div className="flex items-center gap-3">
          <EnvironmentSwitcher />
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Service
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription className="capitalize">
                      {service.type} {service.version} • {service.environment}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getTypeColor(service.type)}`}>{service.type}</Badge>
                  <Badge className={`text-xs ${getStatusColor(service.status)}`}>{service.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Server className="h-4 w-4" />
                        Connect
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Activity className="h-4 w-4" />
                        Logs
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
              <p className="text-sm text-muted-foreground">{service.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Connections:</span>
                  <div className="font-medium flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {service.connections}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Uptime:</span>
                  <div className="font-medium flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {service.uptime}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span>Last deployed: {service.lastDeployed}</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Connect
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "Try adjusting your search terms" : "Get started by adding your first service"}
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Service
          </Button>
        </div>
      )}
    </div>
  )
}
