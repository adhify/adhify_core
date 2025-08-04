"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Database, Server, Globe } from "lucide-react"

export function UsageAnalytics() {
  const platformStats = [
    {
      resource: "Total Projects",
      current: 3456,
      limit: 5000,
      icon: <Globe className="h-4 w-4" />,
      color: "blue",
    },
    {
      resource: "Total Apps",
      current: 8234,
      limit: 15000,
      icon: <Globe className="h-4 w-4" />,
      color: "green",
    },
    {
      resource: "Total Databases",
      current: 2145,
      limit: 5000,
      icon: <Database className="h-4 w-4" />,
      color: "purple",
    },
    {
      resource: "Total Services",
      current: 1876,
      limit: 3000,
      icon: <Server className="h-4 w-4" />,
      color: "orange",
    },
  ]

  const resourceUsage = [
    {
      plan: "Free",
      users: 856,
      projects: 856,
      apps: 2568,
      databases: 856,
      storage: "2.1 TB",
      bandwidth: "45.6 TB",
    },
    {
      plan: "Pro",
      users: 234,
      projects: 1456,
      apps: 3892,
      databases: 892,
      storage: "12.8 TB",
      bandwidth: "156.3 TB",
    },
    {
      plan: "Enterprise",
      users: 45,
      projects: 1144,
      apps: 1774,
      databases: 397,
      storage: "89.2 TB",
      bandwidth: "234.7 TB",
    },
  ]

  const topTeams = [
    {
      name: "TechCorp Inc",
      plan: "Enterprise",
      projects: 45,
      apps: 156,
      databases: 23,
      storage: "12.4 GB",
      usage: 89,
    },
    {
      name: "StartupXYZ",
      plan: "Pro",
      projects: 12,
      apps: 34,
      databases: 8,
      storage: "3.2 GB",
      usage: 67,
    },
    {
      name: "DevAgency",
      plan: "Pro",
      projects: 18,
      apps: 42,
      databases: 12,
      storage: "5.8 GB",
      usage: 78,
    },
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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Usage Analytics</h2>
        <p className="text-muted-foreground">Monitor platform usage, resource consumption, and performance metrics</p>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map((stat) => (
          <Card key={stat.resource}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.resource}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.current.toLocaleString()}</div>
              <div className="mt-2">
                <Progress value={(stat.current / stat.limit) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.current.toLocaleString()} / {stat.limit.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Usage by Plan */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Usage by Plan</CardTitle>
          <CardDescription>Breakdown of resource consumption across subscription plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Plan</th>
                  <th className="text-left p-2">Users</th>
                  <th className="text-left p-2">Projects</th>
                  <th className="text-left p-2">Apps</th>
                  <th className="text-left p-2">Databases</th>
                  <th className="text-left p-2">Storage</th>
                  <th className="text-left p-2">Bandwidth</th>
                </tr>
              </thead>
              <tbody>
                {resourceUsage.map((usage) => (
                  <tr key={usage.plan} className="border-b">
                    <td className="p-2">
                      <Badge className={`${getPlanColor(usage.plan)}`}>{usage.plan}</Badge>
                    </td>
                    <td className="p-2">{usage.users.toLocaleString()}</td>
                    <td className="p-2">{usage.projects.toLocaleString()}</td>
                    <td className="p-2">{usage.apps.toLocaleString()}</td>
                    <td className="p-2">{usage.databases.toLocaleString()}</td>
                    <td className="p-2">{usage.storage}</td>
                    <td className="p-2">{usage.bandwidth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Resource Consumers */}
      <Card>
        <CardHeader>
          <CardTitle>Top Resource Consumers</CardTitle>
          <CardDescription>Teams with highest resource usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topTeams.map((team) => (
              <div key={team.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{team.name}</div>
                    <Badge className={`text-xs ${getPlanColor(team.plan)}`}>{team.plan}</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Projects</div>
                      <div className="font-medium">{team.projects}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Apps</div>
                      <div className="font-medium">{team.apps}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Databases</div>
                      <div className="font-medium">{team.databases}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Storage</div>
                      <div className="font-medium">{team.storage}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Usage</div>
                  <div className="flex items-center gap-2">
                    <Progress value={team.usage} className="w-20 h-2" />
                    <span className="text-sm font-medium">{team.usage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Month-over-month growth metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>New Teams</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">+12%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>New Projects</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">+18%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Revenue</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">+15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Platform health and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>API Response Time</span>
                <span className="font-medium">145ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Uptime</span>
                <span className="font-medium text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Error Rate</span>
                <span className="font-medium">0.02%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
