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
import {
  Search,
  Plus,
  Server,
  MoreHorizontal,
  Activity,
  Cpu,
  HardDrive,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Trash2,
  Square,
  RotateCcw,
  Eye,
  Users,
  Globe,
} from "lucide-react"

export function ServersManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const servers = [
    {
      id: "1",
      name: "prod-server-1",
      hostname: "prod-1.example.com",
      ipAddress: "192.168.1.100",
      region: "us-east-1",
      provider: "DIGITALOCEAN",
      status: "ACTIVE",
      healthStatus: "HEALTHY",
      cpu: 4,
      memory: 8,
      storage: 160,
      bandwidth: 5000,
      cpuUsage: 45,
      memoryUsage: 62,
      storageUsage: 38,
      allocatedTeams: 3,
      deployments: 12,
      hourlyCost: 0.48,
      lastHealthCheck: "2 minutes ago",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      name: "staging-server-1",
      hostname: "staging-1.example.com",
      ipAddress: "192.168.1.101",
      region: "us-west-2",
      provider: "AWS",
      status: "ACTIVE",
      healthStatus: "HEALTHY",
      cpu: 2,
      memory: 4,
      storage: 80,
      bandwidth: 2000,
      cpuUsage: 23,
      memoryUsage: 41,
      storageUsage: 55,
      allocatedTeams: 2,
      deployments: 8,
      hourlyCost: 0.24,
      lastHealthCheck: "1 minute ago",
      createdAt: "2024-01-12",
    },
    {
      id: "3",
      name: "dev-server-1",
      hostname: "dev-1.example.com",
      ipAddress: "192.168.1.102",
      region: "eu-west-1",
      provider: "HETZNER",
      status: "MAINTENANCE",
      healthStatus: "WARNING",
      cpu: 2,
      memory: 4,
      storage: 40,
      bandwidth: 1000,
      cpuUsage: 15,
      memoryUsage: 28,
      storageUsage: 72,
      allocatedTeams: 1,
      deployments: 4,
      hourlyCost: 0.12,
      lastHealthCheck: "15 minutes ago",
      createdAt: "2024-01-15",
    },
  ]

  const serverGroups = [
    {
      id: "1",
      name: "Production Tier",
      description: "High-performance servers for production workloads",
      region: "us-east-1",
      provider: "DIGITALOCEAN",
      serverCount: 5,
      autoScaling: true,
      minServers: 2,
      maxServers: 10,
      targetCpuUsage: 70,
      loadBalancerEnabled: true,
    },
    {
      id: "2",
      name: "Development Tier",
      description: "Cost-effective servers for development and testing",
      region: "us-west-2",
      provider: "HETZNER",
      serverCount: 3,
      autoScaling: false,
      minServers: 1,
      maxServers: 5,
      targetCpuUsage: 80,
      loadBalancerEnabled: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800"
      case "INACTIVE":
        return "bg-gray-100 text-gray-800"
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800"
      case "ERROR":
        return "bg-red-100 text-red-800"
      case "PROVISIONING":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getHealthIcon = (health: string) => {
    switch (health) {
      case "HEALTHY":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "WARNING":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "CRITICAL":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
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
      case "VULTR":
        return "bg-purple-100 text-purple-800"
      case "LINODE":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredServers = servers.filter((server) => {
    const matchesSearch =
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.hostname.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProvider = selectedProvider === "all" || server.provider === selectedProvider
    const matchesStatus = selectedStatus === "all" || server.status === selectedStatus
    return matchesSearch && matchesProvider && matchesStatus
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Server Management</h2>
          <p className="text-muted-foreground">Manage servers, server groups, and resource allocation</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Settings className="h-4 w-4" />
                Server Groups
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Server Groups</DialogTitle>
                <DialogDescription>Manage server groups and auto-scaling configuration</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {serverGroups.map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          <CardDescription>{group.description}</CardDescription>
                        </div>
                        <Badge className={getProviderColor(group.provider)}>{group.provider}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Servers:</span>
                          <div className="font-medium">{group.serverCount}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Auto Scaling:</span>
                          <div className="font-medium">{group.autoScaling ? "Enabled" : "Disabled"}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Range:</span>
                          <div className="font-medium">
                            {group.minServers} - {group.maxServers}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Target CPU:</span>
                          <div className="font-medium">{group.targetCpuUsage}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Server
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Server</DialogTitle>
                <DialogDescription>Provision a new server for the platform</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="server-name">Server Name</Label>
                    <Input id="server-name" placeholder="prod-server-2" />
                  </div>
                  <div>
                    <Label htmlFor="hostname">Hostname</Label>
                    <Input id="hostname" placeholder="prod-2.example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="provider">Provider</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AWS">Amazon Web Services</SelectItem>
                        <SelectItem value="DIGITALOCEAN">DigitalOcean</SelectItem>
                        <SelectItem value="HETZNER">Hetzner</SelectItem>
                        <SelectItem value="VULTR">Vultr</SelectItem>
                        <SelectItem value="LINODE">Linode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                        <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                        <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                        <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4">
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
                  <div>
                    <Label htmlFor="bandwidth">Bandwidth (GB)</Label>
                    <Input id="bandwidth" type="number" placeholder="5000" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="server-group">Server Group</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select server group" />
                    </SelectTrigger>
                    <SelectContent>
                      {serverGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button>Provision Server</Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="bg-transparent">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search servers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedProvider} onValueChange={setSelectedProvider}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Providers</SelectItem>
            <SelectItem value="AWS">AWS</SelectItem>
            <SelectItem value="DIGITALOCEAN">DigitalOcean</SelectItem>
            <SelectItem value="HETZNER">Hetzner</SelectItem>
            <SelectItem value="VULTR">Vultr</SelectItem>
            <SelectItem value="LINODE">Linode</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
            <SelectItem value="ERROR">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Servers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServers.map((server) => (
          <Card key={server.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{server.name}</CardTitle>
                    <CardDescription>{server.hostname}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getHealthIcon(server.healthStatus)}
                  <Badge className={`text-xs ${getStatusColor(server.status)}`}>{server.status}</Badge>
                  <Badge className={`text-xs ${getProviderColor(server.provider)}`}>{server.provider}</Badge>
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
                        <RotateCcw className="h-4 w-4" />
                        Restart
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Square className="h-4 w-4" />
                        Stop
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-red-600">
                        <Trash2 className="h-4 w-4" />
                        Terminate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Server Specs */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Region:</span>
                  <div className="font-medium">{server.region}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">IP Address:</span>
                  <div className="font-medium font-mono text-xs">{server.ipAddress}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">CPU:</span>
                  <div className="font-medium">{server.cpu} cores</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Memory:</span>
                  <div className="font-medium">{server.memory} GB</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Storage:</span>
                  <div className="font-medium">{server.storage} GB</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Cost:</span>
                  <div className="font-medium">${server.hourlyCost}/hr</div>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-1">
                      <Cpu className="h-3 w-3" />
                      <span>CPU Usage</span>
                    </div>
                    <span className="font-medium">{server.cpuUsage}%</span>
                  </div>
                  <Progress value={server.cpuUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span>Memory Usage</span>
                    </div>
                    <span className="font-medium">{server.memoryUsage}%</span>
                  </div>
                  <Progress value={server.memoryUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-1">
                      <HardDrive className="h-3 w-3" />
                      <span>Storage Usage</span>
                    </div>
                    <span className="font-medium">{server.storageUsage}%</span>
                  </div>
                  <Progress value={server.storageUsage} className="h-2" />
                </div>
              </div>

              {/* Allocation Stats */}
              <div className="grid grid-cols-2 gap-4 text-center pt-2 border-t">
                <div className="p-2 bg-blue-50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="text-sm font-bold">{server.allocatedTeams}</div>
                  <div className="text-xs text-muted-foreground">Teams</div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Globe className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="text-sm font-bold">{server.deployments}</div>
                  <div className="text-xs text-muted-foreground">Deployments</div>
                </div>
              </div>

              {/* Server Info */}
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                <span>Health check: {server.lastHealthCheck}</span>
                <span>Created: {server.createdAt}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Server Details: {server.name}</DialogTitle>
                      <DialogDescription>Comprehensive server information and management</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      {/* Server Overview */}
                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Server Information</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Name:</span>
                                <div className="font-medium">{server.name}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Hostname:</span>
                                <div className="font-medium">{server.hostname}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">IP Address:</span>
                                <div className="font-medium font-mono">{server.ipAddress}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Region:</span>
                                <div className="font-medium">{server.region}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Provider:</span>
                                <Badge className={getProviderColor(server.provider)}>{server.provider}</Badge>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Status:</span>
                                <Badge className={getStatusColor(server.status)}>{server.status}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Resource Specifications</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">CPU Cores:</span>
                                <div className="font-medium">{server.cpu}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Memory:</span>
                                <div className="font-medium">{server.memory} GB</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Storage:</span>
                                <div className="font-medium">{server.storage} GB</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Bandwidth:</span>
                                <div className="font-medium">{server.bandwidth} GB/month</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Hourly Cost:</span>
                                <div className="font-medium">${server.hourlyCost}</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Monthly Est.:</span>
                                <div className="font-medium">${(server.hourlyCost * 24 * 30).toFixed(2)}</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button className="gap-2">
                          <Settings className="h-4 w-4" />
                          Configure Server
                        </Button>
                        <Button variant="outline" className="gap-2 bg-transparent">
                          <RotateCcw className="h-4 w-4" />
                          Restart
                        </Button>
                        <Button variant="outline" className="gap-2 bg-transparent">
                          <Activity className="h-4 w-4" />
                          View Metrics
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Settings className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServers.length === 0 && (
        <div className="text-center py-12">
          <Server className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No servers found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? "Try adjusting your search terms" : "Get started by provisioning your first server"}
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Server
          </Button>
        </div>
      )}
    </div>
  )
}
