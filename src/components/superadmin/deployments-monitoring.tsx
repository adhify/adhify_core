"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Server,
  MoreHorizontal,
  Activity,
  Globe,
  Database,
  Play,
  Square,
  RotateCcw,
  Eye,
  Settings,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react"

export function DeploymentsMonitoring() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  const deployments = [
    {
      id: "1",
      resourceType: "APP",
      resourceName: "Frontend App",
      teamName: "TechCorp Inc",
      serverName: "prod-server-1",
      status: "RUNNING",
      containerName: "frontend-app-prod",
      containerImage: "node:18-alpine",
      cpuUsage: 0.3,
      cpuLimit: 0.5,
      memoryUsage: 256,
      memoryLimit: 512,
      internalPort: 3000,
      externalPort: 80,
      domain: "app.techcorp.com",
      sslEnabled: true,
      healthStatus: "HEALTHY",
      uptime: "15 days",
      restarts: 0,
      createdAt: "2024-01-10T10:30:00Z",
      updatedAt: "2024-01-10T10:30:00Z",
    },
    {
      id: "2",
      resourceType: "DATABASE",
      resourceName: "User Database",
      teamName: "TechCorp Inc",
      serverName: "prod-server-1",
      status: "RUNNING",
      containerName: "postgres-userdb",
      containerImage: "postgres:15",
      cpuUsage: 0.1,
      cpuLimit: 0.2,
      memoryUsage: 512,
      memoryLimit: 1024,
      internalPort: 5432,
      externalPort: null,
      domain: null,
      sslEnabled: false,
      healthStatus: "HEALTHY",
      uptime: "15 days",
      restarts: 0,
      createdAt: "2024-01-10T10:25:00Z",
      updatedAt: "2024-01-10T10:25:00Z",
    },
    {
      id: "3",
      resourceType: "SERVICE",
      resourceName: "Redis Cache",
      teamName: "TechCorp Inc",
      serverName: "prod-server-1",
      status: "RUNNING",
      containerName: "redis-cache",
      containerImage: "redis:7-alpine",
      cpuUsage: 0.05,
      cpuLimit: 0.1,
      memoryUsage: 128,
      memoryLimit: 256,
      internalPort: 6379,
      externalPort: null,
      domain: null,
      sslEnabled: false,
      healthStatus: "HEALTHY",
      uptime: "15 days",
      restarts: 1,
      createdAt: "2024-01-10T10:20:00Z",
      updatedAt: "2024-01-12T14:15:00Z",
    },
    {
      id: "4",
      resourceType: "APP",
      resourceName: "Marketing Site",
      teamName: "StartupXYZ",
      serverName: "prod-server-1",
      status: "FAILED",
      containerName: "marketing-site",
      containerImage: "nginx:alpine",
      cpuUsage: 0,
      cpuLimit: 0.2,
      memoryUsage: 0,
      memoryLimit: 256,
      internalPort: 80,
      externalPort: 8080,
      domain: "startupxyz.com",
      sslEnabled: true,
      healthStatus: "UNHEALTHY",
      uptime: "0 minutes",
      restarts: 3,
      createdAt: "2024-01-15T09:00:00Z",
      updatedAt: "2024-01-15T09:15:00Z",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RUNNING":
        return "bg-green-100 text-green-800"
      case "STOPPED":
        return "bg-gray-100 text-gray-800"
      case "FAILED":
        return "bg-red-100 text-red-800"
      case "DEPLOYING":
        return "bg-blue-100 text-blue-800"
      case "SCALING":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "HEALTHY":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "UNHEALTHY":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "UNKNOWN":
        return <Clock className="h-4 w-4 text-gray-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "APP":
        return <Globe className="h-4 w-4 text-blue-600" />
      case "DATABASE":
        return <Database className="h-4 w-4 text-purple-600" />
      case "SERVICE":
        return <Server className="h-4 w-4 text-orange-600" />
      default:
        return <Server className="h-4 w-4 text-gray-600" />
    }
  }

  const getResourceColor = (type: string) => {
    switch (type) {
      case "APP":
        return "bg-blue-100 text-blue-800"
      case "DATABASE":
        return "bg-purple-100 text-purple-800"
      case "SERVICE":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredDeployments = deployments.filter((deployment) => {
    const matchesSearch =
      deployment.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deployment.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deployment.serverName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || deployment.status === selectedStatus
    const matchesType = selectedType === "all" || deployment.resourceType === selectedType
    return matchesSearch && matchesStatus && matchesType
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Deployments Monitoring</h2>
          <p className="text-muted-foreground">Monitor all resource deployments across servers</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deployments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.length}</div>
            <p className="text-xs text-muted-foreground">
              {deployments.filter((d) => d.status === "RUNNING").length} running
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.filter((d) => d.resourceType === "APP").length}</div>
            <p className="text-xs text-muted-foreground">
              {deployments.filter((d) => d.resourceType === "APP" && d.status === "RUNNING").length} running
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Databases</CardTitle>
            <Database className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.filter((d) => d.resourceType === "DATABASE").length}</div>
            <p className="text-xs text-muted-foreground">
              {deployments.filter((d) => d.resourceType === "DATABASE" && d.status === "RUNNING").length} running
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Server className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deployments.filter((d) => d.resourceType === "SERVICE").length}</div>
            <p className="text-xs text-muted-foreground">
              {deployments.filter((d) => d.resourceType === "SERVICE" && d.status === "RUNNING").length} running
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search deployments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="APP">Applications</SelectItem>
            <SelectItem value="DATABASE">Databases</SelectItem>
            <SelectItem value="SERVICE">Services</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="RUNNING">Running</SelectItem>
            <SelectItem value="STOPPED">Stopped</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="DEPLOYING">Deploying</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Deployments List */}
      <div className="space-y-4">
        {filteredDeployments.map((deployment) => (
          <Card key={deployment.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">{getResourceIcon(deployment.resourceType)}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{deployment.resourceName}</CardTitle>
                      <Badge className={getResourceColor(deployment.resourceType)}>{deployment.resourceType}</Badge>
                    </div>
                    <CardDescription>
                      {deployment.teamName} • {deployment.serverName}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getHealthIcon(deployment.healthStatus)}
                  <Badge className={`text-xs ${getStatusColor(deployment.status)}`}>{deployment.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Logs
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Settings className="h-4 w-4" />
                        Configure
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Restart
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Square className="h-4 w-4" />
                        Stop
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-red-600">
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Container Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Container:</span>
                  <div className="font-medium font-mono text-xs">{deployment.containerName}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Image:</span>
                  <div className="font-medium font-mono text-xs">{deployment.containerImage}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Uptime:</span>
                  <div className="font-medium">{deployment.uptime}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Restarts:</span>
                  <div className="font-medium">{deployment.restarts}</div>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">CPU</span>
                  </div>
                  <div className="text-lg font-bold">
                    {deployment.cpuUsage} / {deployment.cpuLimit} cores
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((deployment.cpuUsage / deployment.cpuLimit) * 100).toFixed(1)}% utilized
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Memory</span>
                  </div>
                  <div className="text-lg font-bold">
                    {deployment.memoryUsage} / {deployment.memoryLimit} MB
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((deployment.memoryUsage / deployment.memoryLimit) * 100).toFixed(1)}% utilized
                  </div>
                </div>
              </div>

              {/* Network & Access */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Internal Port:</span>
                  <div className="font-medium">{deployment.internalPort}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">External Port:</span>
                  <div className="font-medium">{deployment.externalPort || "N/A"}</div>
                </div>
                {deployment.domain && (
                  <>
                    <div>
                      <span className="text-muted-foreground">Domain:</span>
                      <div className="font-medium">{deployment.domain}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">SSL:</span>
                      <div className="font-medium">{deployment.sslEnabled ? "Enabled" : "Disabled"}</div>
                    </div>
                  </>
                )}
              </div>

              {/* Timestamps */}
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                <span>Created: {formatDate(deployment.createdAt)}</span>
                <span>Updated: {formatDate(deployment.updatedAt)}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="h-3 w-3 mr-1" />
                  Logs
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Settings className="h-3 w-3 mr-1" />
                  Configure
                </Button>
                {deployment.status === "RUNNING" ? (
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Square className="h-3 w-3 mr-1" />
                    Stop
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDeployments.length === 0 && (
        <div className="text-center py-12">
          <Server className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No deployments found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? "Try adjusting your search terms" : "No deployments are currently active"}
          </p>
        </div>
      )}
    </div>
  )
}
