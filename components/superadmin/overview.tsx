"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Building2,
  CreditCard,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

export function SuperAdminOverview() {
  const stats = [
    {
      title: "Total Teams",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      title: "Active Users",
      value: "8,567",
      change: "+8%",
      changeType: "positive" as const,
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Monthly Revenue",
      value: "$45,678",
      change: "+15%",
      changeType: "positive" as const,
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "Stable",
      changeType: "neutral" as const,
      icon: <Activity className="h-4 w-4" />,
    },
  ]

  const recentActivity = [
    {
      id: "1",
      action: "New team registration",
      team: "TechCorp Inc",
      time: "2 minutes ago",
      status: "success" as const,
    },
    {
      id: "2",
      action: "Plan upgrade",
      team: "StartupXYZ",
      time: "15 minutes ago",
      status: "success" as const,
    },
    {
      id: "3",
      action: "Payment failed",
      team: "DevAgency",
      time: "1 hour ago",
      status: "error" as const,
    },
    {
      id: "4",
      action: "Support ticket created",
      team: "BigCorp Ltd",
      time: "2 hours ago",
      status: "warning" as const,
    },
  ]

  const systemAlerts = [
    {
      id: "1",
      message: "Database connection pool at 85% capacity",
      severity: "warning" as const,
      time: "5 minutes ago",
    },
    {
      id: "2",
      message: "Scheduled maintenance in 2 hours",
      severity: "info" as const,
      time: "1 hour ago",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">SuperAdmin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage the entire platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-muted-foreground"
                }`}
              >
                {stat.changeType === "positive" && <TrendingUp className="inline h-3 w-3 mr-1" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3">
                  {getStatusIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.team}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important system notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>{alert.severity}</Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col gap-2">
              <Users className="h-5 w-5" />
              Manage Teams
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <CreditCard className="h-5 w-5" />
              Billing Overview
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Activity className="h-5 w-5" />
              System Health
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
