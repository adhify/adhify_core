"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Switch } from "@/components/ui/switch"
import {
  Search,
  Plus,
  MoreHorizontal,
  Activity,
  Cpu,
  HardDrive,
  Settings,
  Trash2,
  Eye,
  Users,
  Crown,
  AlertTriangle,
  CheckCircle,
  Edit,
} from "lucide-react"

export function PlanServerAllocation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlan, setSelectedPlan] = useState("all")

  // Server pools organized by plan tiers
  const serverPools = [
    {
      planTier: "FREE",
      planName: "Free Plan",
      description: "Shared servers for free tier users",
      serverCount: 3,
      allocatedServers: 2,
      maxTeamsPerServer: 10,
      autoAssignment: true,
      resourceThreshold: 25, // Assign to servers with <25% usage
      servers: [
        {
          id: "free-1",
          name: "free-shared-1",
          region: "us-east-1",
          provider: "HETZNER",
          cpu: 2,
          memory: 4,
          storage: 80,
          cpuUsage: 18,
          memoryUsage: 22,
          storageUsage: 15,
          assignedTeams: 4,
          maxTeams: 10,
          status: "ACTIVE",
          costPerHour: 0.08,
        },
        {
          id: "free-2",
          name: "free-shared-2",
          region: "us-west-2",
          provider: "HETZNER",
          cpu: 2,
          memory: 4,
          storage: 80,
          cpuUsage: 32,
          memoryUsage: 28,
          storageUsage: 20,
          assignedTeams: 6,
          maxTeams: 10,
          status: "ACTIVE",
          costPerHour: 0.08,
        },
        {
          id: "free-3",
          name: "free-shared-3",
          region: "eu-west-1",
          provider: "HETZNER",
          cpu: 2,
          memory: 4,
          storage: 80,
          cpuUsage: 45,
          memoryUsage: 38,
          storageUsage: 25,
          assignedTeams: 8,
          maxTeams: 10,
          status: "MAINTENANCE",
          costPerHour: 0.08,
        },
      ],
    },
    {
      planTier: "PRO",
      planName: "Pro Plan",
      description: "Dedicated resources for pro users",
      serverCount: 8,
      allocatedServers: 6,
      maxTeamsPerServer: 5,
      autoAssignment: true,
      resourceThreshold: 25,
      servers: [
        {
          id: "pro-1",
          name: "pro-server-1",
          region: "us-east-1",
          provider: "DIGITALOCEAN",
          cpu: 4,
          memory: 8,
          storage: 160,
          cpuUsage: 15,
          memoryUsage: 18,
          storageUsage: 12,
          assignedTeams: 2,
          maxTeams: 5,
          status: "ACTIVE",
          costPerHour: 0.24,
        },
        {
          id: "pro-2",
          name: "pro-server-2",
          region: "us-west-2",
          provider: "DIGITALOCEAN",
          cpu: 4,
          memory: 8,
          storage: 160,
          cpuUsage: 28,
          memoryUsage: 35,
          storageUsage: 22,
          assignedTeams: 3,
          maxTeams: 5,
          status: "ACTIVE",
          costPerHour: 0.24,
        },
        {
          id: "pro-3",
          name: "pro-server-3",
          region: "eu-west-1",
          provider: "DIGITALOCEAN",
          cpu: 4,
          memory: 8,
          storage: 160,
          cpuUsage: 42,
          memoryUsage: 45,
          storageUsage: 38,
          assignedTeams: 4,
          maxTeams: 5,
          status: "ACTIVE",
          costPerHour: 0.24,
        },
        {
          id: "pro-4",
          name: "pro-server-4",
          region: "us-east-1",
          provider: "DIGITALOCEAN",
          cpu: 4,
          memory: 8,
          storage: 160,
          cpuUsage: 8,
          memoryUsage: 12,
          storageUsage: 5,
          assignedTeams: 1,
          maxTeams: 5,
          status: "ACTIVE",
          costPerHour: 0.24,
        },
        {
          id: "pro-5",
          name: "pro-server-5",
          region: "ap-southeast-1",
          provider: "DIGITALOCEAN",
          cpu: 4,
          memory: 8,
          storage: 160,
          cpuUsage: 0,
          memoryUsage: 0,
          storageUsage: 0,
          assignedTeams: 0,
          maxTeams: 5,
          status: "STANDBY",
          costPerHour: 0.24,
        },
        {
          id: "pro-6",
          name: "pro-server-6",
          region: "eu-central-1",
          provider: "DIGITALOCEAN",
          cpu: 4,
          memory: 8,
          storage: 160,
          cpuUsage: 0,
          memoryUsage: 0,
          storageUsage: 0,
          assignedTeams: 0,
          maxTeams: 5,
          status: "STANDBY",
          costPerHour: 0.24,
        },
      ],
    },
    {
      planTier: "ENTERPRISE",
      planName: "Enterprise Plan",
      description: "Dedicated servers for enterprise customers",
      serverCount: 12,
      allocatedServers: 8,
      maxTeamsPerServer: 1, // 1 team per server for enterprise
      autoAssignment: true,
      resourceThreshold: 100, // Can use full server
      servers: [
        {
          id: "ent-1",
          name: "enterprise-1",
          region: "us-east-1",
          provider: "AWS",
          cpu: 8,
          memory: 32,
          storage: 500,
          cpuUsage: 35,
          memoryUsage: 28,
          storageUsage: 15,
          assignedTeams: 1,
          maxTeams: 1,
          status: "ACTIVE",
          costPerHour: 1.2,
        },
        {
          id: "ent-2",
          name: "enterprise-2",
          region: "us-west-2",
          provider: "AWS",
          cpu: 8,
          memory: 32,
          storage: 500,
          cpuUsage: 52,
          memoryUsage: 48,
          storageUsage: 32,
          assignedTeams: 1,
          maxTeams: 1,
          status: "ACTIVE",
          costPerHour: 1.2,
        },
        {
          id: "ent-3",
          name: "enterprise-3",
          region: "eu-west-1",
          provider: "AWS",
          cpu: 8,
          memory: 32,
          storage: 500,
          cpuUsage: 0,
          memoryUsage: 0,
          storageUsage: 0,
          assignedTeams: 0,
          maxTeams: 1,
          status: "STANDBY",
          costPerHour: 1.2,
        },
        {
          id: "ent-4",
          name: "enterprise-4",
          region: "ap-southeast-1",
          provider: "AWS",
          cpu: 8,
          memory: 32,
          storage: 500,
          cpuUsage: 0,
          memoryUsage: 0,
          storageUsage: 0,
          assignedTeams: 0,
          maxTeams: 1,
          status: "STANDBY",
          costPerHour: 1.2,
        },
      ],
    },
  ]

  // Recent assignments
  const recentAssignments = [
    {
      id: "1",
      teamName: "TechCorp Inc",
      plan: "ENTERPRISE",
      assignedServer: "enterprise-1",
      assignedAt: "2024-01-15T10:30:00Z",
      reason: "New enterprise signup",
      status: "ACTIVE",
    },
    {
      id: "2",
      teamName: "StartupXYZ",
      plan: "PRO",
      assignedServer: "pro-server-4",
      assignedAt: "2024-01-15T09:15:00Z",
      reason: "Lowest resource usage (8% CPU)",
      status: "ACTIVE",
    },
    {
      id: "3",
      teamName: "DevAgency",
      plan: "FREE",
      assignedServer: "free-shared-1",
      assignedAt: "2024-01-15T08:45:00Z",
      reason: "Lowest resource usage (18% CPU)",
      status: "ACTIVE",
    },
  ]

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "FREE":
        return "bg-gray-100 text-gray-800"
      case "PRO":
        return "bg-blue-100 text-blue-800"
      case "ENTERPRISE":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "STANDBY":
        return "bg-yellow-100 text-yellow-800"
      case "MAINTENANCE":
        return "bg-orange-100 text-orange-800"
      case "ERROR":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "AWS":
        return "bg-orange-100 text-orange-800"
      case "DIGITALOCEAN":
        return "bg-blue-100 text-blue-800"
      case "HETZNER":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOptimalServer = (servers: any[], threshold: number) => {
    return servers
      .filter((s) => s.status === "ACTIVE" && s.assignedTeams < s.maxTeams)
      .sort((a, b) => {
        const aUsage = Math.max(a.cpuUsage, a.memoryUsage, a.storageUsage)
        const bUsage = Math.max(b.cpuUsage, b.memoryUsage, b.storageUsage)
        return aUsage - bUsage
      })[0]
  }

  const filteredPools = serverPools.filter((pool) => {
    const matchesSearch = pool.planName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlan = selectedPlan === "all" || pool.planTier === selectedPlan
    return matchesSearch && matchesPlan
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Plan-Based Server Allocation</h2>
          <p className="text-muted-foreground">
            Manage server pools and automatic assignment based on subscription plans
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Server Pool
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Server to Pool</DialogTitle>
              <DialogDescription>Add a new server to a specific plan tier</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="plan-tier">Plan Tier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FREE">Free Plan</SelectItem>
                    <SelectItem value="PRO">Pro Plan</SelectItem>
                    <SelectItem value="ENTERPRISE">Enterprise Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="server-name">Server Name</Label>
                  <Input id="server-name" placeholder="pro-server-7" />
                </div>
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us-east-1">US East</SelectItem>
                      <SelectItem value="us-west-2">US West</SelectItem>
                      <SelectItem value="eu-west-1">EU West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cpu">CPU Cores</Label>
                  <Input id="cpu" type="number" placeholder="4" />
                </div>
                <div>
                  <Label htmlFor="memory">Memory (GB)</Label>
                  <Input id="memory" type="number" placeholder="8" />
                </div>
                <div>
                  <Label htmlFor="storage">Storage (GB)</Label>
                  <Input id="storage" type="number" placeholder="160" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Add Server</Button>
                <Button variant="outline" className="bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Plan Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {serverPools.map((pool) => {
          const activeServers = pool.servers.filter((s) => s.status === "ACTIVE").length
          const totalTeams = pool.servers.reduce((sum, s) => sum + s.assignedTeams, 0)
          const totalCapacity = pool.servers.reduce((sum, s) => sum + s.maxTeams, 0)
          const avgCpuUsage = pool.servers.reduce((sum, s) => sum + s.cpuUsage, 0) / pool.servers.length || 0
          const monthlyCost = pool.servers.reduce((sum, s) => sum + s.costPerHour * 24 * 30, 0)

          return (
            <Card key={pool.planTier} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {pool.planTier === "ENTERPRISE" && <Crown className="h-5 w-5 text-purple-600" />}
                      {pool.planName}
                    </CardTitle>
                    <CardDescription>{pool.description}</CardDescription>
                  </div>
                  <Badge className={getPlanColor(pool.planTier)}>{pool.planTier}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Pool Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Servers:</span>
                    <div className="font-medium">
                      {activeServers}/{pool.serverCount}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Teams:</span>
                    <div className="font-medium">
                      {totalTeams}/{totalCapacity}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg CPU:</span>
                    <div className="font-medium">{avgCpuUsage.toFixed(1)}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Monthly Cost:</span>
                    <div className="font-medium">${monthlyCost.toFixed(0)}</div>
                  </div>
                </div>

                {/* Capacity Usage */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Team Capacity</span>
                    <span className="font-medium">
                      {totalTeams}/{totalCapacity} ({((totalTeams / totalCapacity) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={(totalTeams / totalCapacity) * 100} className="h-2" />
                </div>

                {/* Auto Assignment Status */}
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Auto Assignment</div>
                    <div className="text-xs text-muted-foreground">Threshold: {pool.resourceThreshold}% usage</div>
                  </div>
                  <Switch checked={pool.autoAssignment} />
                </div>

                {/* Optimal Server Recommendation */}
                {(() => {
                  const optimal = getOptimalServer(pool.servers, pool.resourceThreshold)
                  return optimal ? (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Next Assignment</span>
                      </div>
                      <div className="text-sm text-green-700">
                        {optimal.name} ({Math.max(optimal.cpuUsage, optimal.memoryUsage, optimal.storageUsage)}% usage)
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">No Available Servers</span>
                      </div>
                      <div className="text-sm text-yellow-700">All servers are at capacity or offline</div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search server pools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedPlan} onValueChange={setSelectedPlan}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="FREE">Free</SelectItem>
            <SelectItem value="PRO">Pro</SelectItem>
            <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Detailed Server Pools */}
      <div className="space-y-6">
        {filteredPools.map((pool) => (
          <Card key={pool.planTier}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {pool.planTier === "ENTERPRISE" && <Crown className="h-5 w-5 text-purple-600" />}
                    {pool.planName} Servers
                  </CardTitle>
                  <CardDescription>
                    {pool.servers.length} servers • Max {pool.maxTeamsPerServer} team(s) per server
                  </CardDescription>
                </div>
                <Badge className={getPlanColor(pool.planTier)}>{pool.planTier}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {pool.servers.map((server) => (
                  <Card key={server.id} className="hover:shadow-sm transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{server.name}</CardTitle>
                          <CardDescription>{server.region}</CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge className={getProviderColor(server.provider)} variant="outline">
                            {server.provider}
                          </Badge>
                          <Badge className={getStatusColor(server.status)}>{server.status}</Badge>
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
                                Configure
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Limits
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
                    <CardContent className="space-y-3">
                      {/* Server Specs */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">{server.cpu}</div>
                          <div className="text-muted-foreground">CPU</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">{server.memory}GB</div>
                          <div className="text-muted-foreground">RAM</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-medium">{server.storage}GB</div>
                          <div className="text-muted-foreground">Storage</div>
                        </div>
                      </div>

                      {/* Resource Usage */}
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-1">
                              <Cpu className="h-3 w-3" />
                              <span>CPU</span>
                            </div>
                            <span className="font-medium">{server.cpuUsage}%</span>
                          </div>
                          <Progress value={server.cpuUsage} className="h-1" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-1">
                              <Activity className="h-3 w-3" />
                              <span>Memory</span>
                            </div>
                            <span className="font-medium">{server.memoryUsage}%</span>
                          </div>
                          <Progress value={server.memoryUsage} className="h-1" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-1">
                              <HardDrive className="h-3 w-3" />
                              <span>Storage</span>
                            </div>
                            <span className="font-medium">{server.storageUsage}%</span>
                          </div>
                          <Progress value={server.storageUsage} className="h-1" />
                        </div>
                      </div>

                      {/* Team Assignment */}
                      <div className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>Teams</span>
                        </div>
                        <span className="font-medium">
                          {server.assignedTeams}/{server.maxTeams}
                        </span>
                      </div>

                      {/* Cost */}
                      <div className="text-center text-xs text-muted-foreground">
                        ${server.costPerHour}/hr • ${(server.costPerHour * 24 * 30).toFixed(0)}/month
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Assignments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Auto-Assignments</CardTitle>
          <CardDescription>Latest automatic server assignments based on resource usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{assignment.teamName}</div>
                    <div className="text-sm text-muted-foreground">Assigned to {assignment.assignedServer}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getPlanColor(assignment.plan)}>{assignment.plan}</Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(assignment.assignedAt).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">{assignment.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
