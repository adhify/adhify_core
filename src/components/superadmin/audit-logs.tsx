"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, User, Building2, Database, Server, Settings, Trash2, Plus, Edit } from "lucide-react"

export function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [resourceFilter, setResourceFilter] = useState("all")

  const auditLogs = [
    {
      id: "1",
      timestamp: "2024-01-15T10:30:00Z",
      action: "create",
      resource: "project",
      resourceId: "proj_123",
      user: "John Smith",
      userEmail: "john@techcorp.com",
      team: "TechCorp Inc",
      details: {
        projectName: "E-commerce Platform",
        environment: "production",
      },
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    },
    {
      id: "2",
      timestamp: "2024-01-15T10:25:00Z",
      action: "update",
      resource: "app",
      resourceId: "app_456",
      user: "Jane Doe",
      userEmail: "jane@startupxyz.com",
      team: "StartupXYZ",
      details: {
        appName: "Frontend App",
        changes: ["environment variables updated"],
      },
      ipAddress: "10.0.0.50",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
    {
      id: "3",
      timestamp: "2024-01-15T10:20:00Z",
      action: "delete",
      resource: "database",
      resourceId: "db_789",
      user: "Mike Johnson",
      userEmail: "mike@devagency.com",
      team: "DevAgency",
      details: {
        databaseName: "Test Database",
        type: "PostgreSQL",
      },
      ipAddress: "172.16.0.25",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
    },
    {
      id: "4",
      timestamp: "2024-01-15T10:15:00Z",
      action: "impersonate",
      resource: "team",
      resourceId: "team_101",
      user: "Super Admin",
      userEmail: "admin@appcloud.com",
      team: "TechCorp Inc",
      details: {
        reason: "Customer support - billing issue",
        duration: "15 minutes",
      },
      ipAddress: "203.0.113.10",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    },
  ]

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <Plus className="h-4 w-4 text-green-600" />
      case "update":
        return <Edit className="h-4 w-4 text-blue-600" />
      case "delete":
        return <Trash2 className="h-4 w-4 text-red-600" />
      case "impersonate":
        return <User className="h-4 w-4 text-purple-600" />
      default:
        return <Eye className="h-4 w-4 text-gray-600" />
    }
  }

  const getResourceIcon = (resource: string) => {
    switch (resource) {
      case "project":
        return <Building2 className="h-4 w-4" />
      case "app":
        return <Server className="h-4 w-4" />
      case "database":
        return <Database className="h-4 w-4" />
      case "team":
        return <User className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800"
      case "update":
        return "bg-blue-100 text-blue-800"
      case "delete":
        return "bg-red-100 text-red-800"
      case "impersonate":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesResource = resourceFilter === "all" || log.resource === resourceFilter

    return matchesSearch && matchesAction && matchesResource
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Logs</h2>
          <p className="text-muted-foreground">Track all system activities and user actions</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter audit logs by action, resource, or search terms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="impersonate">Impersonate</SelectItem>
              </SelectContent>
            </Select>
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Resource" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="app">App</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>Showing {filteredLogs.length} entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  {getActionIcon(log.action)}
                  {getResourceIcon(log.resource)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-xs ${getActionColor(log.action)}`}>{log.action}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {log.resource}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {log.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{log.user}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{log.team}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {log.action === "create" &&
                      `Created ${log.resource} "${log.details.projectName || log.details.appName || log.details.databaseName}"`}
                    {log.action === "update" && `Updated ${log.resource} "${log.details.appName}"`}
                    {log.action === "delete" &&
                      `Deleted ${log.resource} "${log.details.databaseName}" (${log.details.type})`}
                    {log.action === "impersonate" &&
                      `Impersonated team for ${log.details.duration} - ${log.details.reason}`}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    IP: {log.ipAddress} • {log.userAgent.split(" ")[0]}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No audit logs found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
