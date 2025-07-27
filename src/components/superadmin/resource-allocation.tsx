"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  Server,
  MoreHorizontal,
  Activity,
  Cpu,
  HardDrive,
  Settings,
  Trash2,
  Eye,
  Globe,
  Database,
} from "lucide-react"

export function ResourceAllocation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedServer, setSelectedServer] = useState("all")

  const allocations = [
    {
      id: "1",
      teamId: "team-1",
      teamName: "TechCorp Inc",
      teamPlan: "Enterprise",
      serverId: "server-1",
      serverName: "prod-server-1",
      allocatedCpu: 2.0,
      allocatedMemory: 4096,
      allocatedStorage: 51200,
      currentCpuUsage: 1.2,
      currentMemoryUsage: 2048,
      currentStorageUsage: 25600,
      priority: "HIGH",
      deployments: [
        { type: "APP", name: "Frontend App", status: "RUNNING" },
        { type: "DATABASE", name: "User DB", status: "RUNNING" },
        { type: "SERVICE", name: "Redis Cache", status: "RUNNING" },
      ],
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      teamId: "team-2",
      teamName: "StartupXYZ",
      teamPlan: "Pro",
      serverId: "server-1",
      serverName: "prod-server-1",
      allocatedCpu: 1.0,
      allocatedMemory: 2048,
      allocatedStorage: 20480,
      currentCpuUsage: 0.6,
      currentMemoryUsage: 1024,
      currentStorageUsage: 12288,
      priority: "NORMAL",
      deployments: [
        { type: "APP", name: "Marketing Site", status: "RUNNING" },
        { type: "DATABASE", name: "Content DB", status: "RUNNING" },
      ],
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      teamId: "team-3",
      teamName: "DevAgency",
      teamPlan: "Pro",
      serverId: "server-2",
      serverName: "staging-server-1",
      allocatedCpu: 0.5,
      allocatedMemory: 1024,
      allocatedStorage: 10240,
      currentCpuUsage: 0.2,
      currentMemoryUsage: 512,
      currentStorageUsage: 5120,
      priority: "NORMAL",
      deployments: [{ type: "APP", name: "Test App", status: "STOPPED" }],
      createdAt: "2024-01-15",
    },
  ]

  const servers = [
    { id: "server-1", name: "prod-server-1", totalCpu: 4, totalMemory: 8192, totalStorage: 163840 },
    { id: "server-2", name: "staging-server-1", totalCpu: 2, totalMemory: 4096, totalStorage: 81920 },
    { id: "server-3", name: "dev-server-1", totalCpu: 2, totalMemory: 4096, totalStorage: 40960 },
  ]

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Free":
        return "bg-gray-100 text-gray-800"
      case "Pro":
        return "bg-blue-100 text-blue-800"
      case "Enterprise":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "LOW":
        return "bg-gray-100 text-gray-800"
      case "NORMAL":
        return "bg-blue-100 text-blue-800"
      case "HIGH":
        return "bg-orange-100 text-orange-800"
      case "CRITICAL":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDeploymentIcon = (type: string) => {
    switch (type) {
      case "APP":
        return <Globe className="h-3 w-3" />
      case "DATABASE":
        return <Database className="h-3 w-3" />
      case "SERVICE":
        return <Server className="h-3 w-3" />
      default:
        return <Server className="h-3 w-3" />
    }
  }

  const filteredAllocations = allocations.filter((allocation) => {
    const matchesSearch =
      allocation.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      allocation.serverName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesServer = selectedServer === "all" || allocation.serverId === selectedServer
    return matchesSearch && matchesServer
  })

  // Calculate server utilization
  const serverUtilization = servers.map((server) => {
    const serverAllocations = allocations.filter((a) => a.serverId === server.id)
    const totalAllocatedCpu = serverAllocations.reduce((sum, a) => sum + a.allocatedCpu, 0)
    const totalAllocatedMemory = serverAllocations.reduce((sum, a) => sum + a.allocatedMemory, 0)
    const totalAllocatedStorage = serverAllocations.reduce((sum, a) => sum + a.allocatedStorage, 0)

    return {
      ...server,
      cpuUtilization: (totalAllocatedCpu / server.totalCpu) * 100,
      memoryUtilization: (totalAllocatedMemory / server.totalMemory) * 100,
      storageUtilization: (totalAllocatedStorage / server.totalStorage) * 100,
      teamCount: serverAllocations.length,
    }
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resource Allocation</h2>
          <p className="text-muted-foreground">Manage server resource allocation across teams and projects</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Allocation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Resource Allocation</DialogTitle>
              <DialogDescription>Allocate server resources to a team</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="team">Team</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team-1">TechCorp Inc</SelectItem>
                      <SelectItem value="team-2">StartupXYZ</SelectItem>
                      <SelectItem value="team-3">DevAgency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="server">Server</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select server" />
                    </SelectTrigger>
                    <SelectContent>
                      {servers.map((server) => (
                        <SelectItem key={server.id} value={server.id}>
                          {server.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cpu">CPU Cores</Label>
                  <Input id="cpu" type="number" step="0.1" placeholder="1.0" />
                </div>
                <div>
                  <Label htmlFor="memory">Memory (MB)</Label>
                  <Input id="memory" type="number" placeholder="2048" />
                </div>
                <div>
                  <Label htmlFor="storage">Storage (MB)</Label>
                  <Input id="storage" type="number" placeholder="20480" />
                </div>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button>Create Allocation</Button>
                <Button variant="outline" className="bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Server Utilization Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serverUtilization.map((server) => (
          <Card key={server.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{server.name}</CardTitle>
                <Badge variant="outline">{server.teamCount} teams</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-1">
                    <Cpu className="h-3 w-3" />
                    <span>CPU</span>
                  </div>
                  <span className="font-medium">{server.cpuUtilization.toFixed(1)}%</span>
                </div>
                <Progress value={server.cpuUtilization} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    <span>Memory</span>
                  </div>
                  <span className="font-medium">{server.memoryUtilization.toFixed(1)}%</span>
                </div>
                <Progress value={server.memoryUtilization} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-1">
                    <HardDrive className="h-3 w-3" />
                    <span>Storage</span>
                  </div>
                  <span className="font-medium">{server.storageUtilization.toFixed(1)}%</span>
                </div>
                <Progress value={server.storageUtilization} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search allocations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedServer} onValueChange={setSelectedServer}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Server" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Servers</SelectItem>
            {servers.map((server) => (
              <SelectItem key={server.id} value={server.id}>
                {server.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Allocations List */}
      <div className="space-y-4">
        {filteredAllocations.map((allocation) => (
          <Card key={allocation.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{allocation.teamName.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{allocation.teamName}</CardTitle>
                    <CardDescription>
                      {allocation.serverName} • Created {allocation.createdAt}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPlanColor(allocation.teamPlan)}>{allocation.teamPlan}</Badge>
                  <Badge className={getPriorityColor(allocation.priority)}>{allocation.priority}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Settings className="h-4 w-4" />
                        Modify Allocation
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-red-600">
                        <Trash2 className="h-4 w-4" />
                        Remove Allocation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Resource Allocation */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">CPU</span>
                  </div>
                  <div className="text-lg font-bold">{allocation.allocatedCpu} cores</div>
                  <div className="text-xs text-muted-foreground">
                    Using {allocation.currentCpuUsage} (
                    {((allocation.currentCpuUsage / allocation.allocatedCpu) * 100).toFixed(1)}%)
                  </div>
                  <Progress value={(allocation.currentCpuUsage / allocation.allocatedCpu) * 100} className="h-1 mt-1" />
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Memory</span>
                  </div>
                  <div className="text-lg font-bold">{(allocation.allocatedMemory / 1024).toFixed(1)} GB</div>
                  <div className="text-xs text-muted-foreground">
                    Using {(allocation.currentMemoryUsage / 1024).toFixed(1)} GB (
                    {((allocation.currentMemoryUsage / allocation.allocatedMemory) * 100).toFixed(1)}%)
                  </div>
                  <Progress
                    value={(allocation.currentMemoryUsage / allocation.allocatedMemory) * 100}
                    className="h-1 mt-1"
                  />
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HardDrive className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">Storage</span>
                  </div>
                  <div className="text-lg font-bold">{(allocation.allocatedStorage / 1024).toFixed(1)} GB</div>
                  <div className="text-xs text-muted-foreground">
                    Using {(allocation.currentStorageUsage / 1024).toFixed(1)} GB (
                    {((allocation.currentStorageUsage / allocation.allocatedStorage) * 100).toFixed(1)}%)
                  </div>
                  <Progress
                    value={(allocation.currentStorageUsage / allocation.allocatedStorage) * 100}
                    className="h-1 mt-1"
                  />
                </div>
              </div>

              {/* Deployments */}
              <div>
                <h4 className="text-sm font-medium mb-2">Active Deployments ({allocation.deployments.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {allocation.deployments.map((deployment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                      {getDeploymentIcon(deployment.type)}
                      <span className="font-medium">{deployment.name}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ml-auto ${deployment.status === "RUNNING" ? "text-green-600" : "text-gray-600"}`}
                      >
                        {deployment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Settings className="h-3 w-3 mr-1" />
                  Modify
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Activity className="h-3 w-3 mr-1" />
                  Metrics
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Eye className="h-3 w-3 mr-1" />
                  Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAllocations.length === 0 && (
        <div className="text-center py-12">
          <Server className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No allocations found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? "Try adjusting your search terms" : "Create your first resource allocation"}
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Allocation
          </Button>
        </div>
      )}
    </div>
  )
}
