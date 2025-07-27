"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Settings,
  CreditCard,
  Users,
  Building2,
  Calendar,
  Activity,
  UserCheck,
} from "lucide-react"

export function TeamsManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<any>(null)

  const teams = [
    {
      id: "1",
      name: "TechCorp Inc",
      slug: "techcorp-inc",
      owner: "John Smith",
      ownerEmail: "john@techcorp.com",
      plan: "Enterprise",
      status: "active",
      members: 25,
      projects: 12,
      createdAt: "2023-01-15",
      lastActivity: "2 hours ago",
      revenue: "$299/month",
    },
    {
      id: "2",
      name: "StartupXYZ",
      slug: "startupxyz",
      owner: "Jane Doe",
      ownerEmail: "jane@startupxyz.com",
      plan: "Pro",
      status: "active",
      members: 8,
      projects: 5,
      createdAt: "2023-03-22",
      lastActivity: "1 day ago",
      revenue: "$49/month",
    },
    {
      id: "3",
      name: "DevAgency",
      slug: "devagency",
      owner: "Mike Johnson",
      ownerEmail: "mike@devagency.com",
      plan: "Pro",
      status: "payment_failed",
      members: 15,
      projects: 8,
      createdAt: "2023-02-10",
      lastActivity: "3 days ago",
      revenue: "$49/month",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "payment_failed":
        return "bg-red-100 text-red-800"
      case "trial":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  const handleImpersonate = (team: any) => {
    console.log("Impersonating team:", team.name)
    // Implement impersonation logic
  }

  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Teams Management</h2>
          <p className="text-muted-foreground">Manage all teams, subscriptions, and user access</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams..."
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

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{team.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <CardDescription>{team.slug}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getStatusColor(team.status)}`}>{team.status}</Badge>
                  <Badge className={`text-xs ${getPlanColor(team.plan)}`}>{team.plan}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedTeam(team)} className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleImpersonate(team)} className="gap-2">
                        <UserCheck className="h-4 w-4" />
                        Impersonate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <CreditCard className="h-4 w-4" />
                        Billing
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Owner:</span>
                  <div className="font-medium">{team.owner}</div>
                  <div className="text-xs text-muted-foreground">{team.ownerEmail}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Revenue:</span>
                  <div className="font-medium text-green-600">{team.revenue}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-2 bg-blue-50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="text-sm font-bold">{team.members}</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Building2 className="h-3 w-3 text-purple-600" />
                  </div>
                  <div className="text-sm font-bold">{team.projects}</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Activity className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="text-sm font-bold">Active</div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Created {team.createdAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  <span>{team.lastActivity}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Team Details: {team.name}</DialogTitle>
                      <DialogDescription>Comprehensive team information and management options</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Team Name</label>
                          <p className="text-sm text-muted-foreground">{team.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Slug</label>
                          <p className="text-sm text-muted-foreground">{team.slug}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Owner</label>
                          <p className="text-sm text-muted-foreground">
                            {team.owner} ({team.ownerEmail})
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Plan</label>
                          <Badge className={`text-xs ${getPlanColor(team.plan)}`}>{team.plan}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => handleImpersonate(team)} className="gap-2">
                          <UserCheck className="h-4 w-4" />
                          Impersonate Team
                        </Button>
                        <Button variant="outline" className="gap-2 bg-transparent">
                          <CreditCard className="h-4 w-4" />
                          Manage Billing
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button onClick={() => handleImpersonate(team)} size="sm" className="gap-1">
                  <UserCheck className="h-3 w-3" />
                  Impersonate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
