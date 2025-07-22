"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Save, Mail, Shield, Globe, Server, Bell } from "lucide-react"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    maintenance: {
      enabled: false,
      message: "System maintenance in progress. Please check back later.",
      scheduledStart: "",
      scheduledEnd: "",
    },
    security: {
      enforceSSL: true,
      sessionTimeout: 24,
      maxLoginAttempts: 5,
      requireEmailVerification: true,
    },
    email: {
      provider: "smtp",
      smtpHost: "smtp.appcloud.com",
      smtpPort: 587,
      smtpUser: "noreply@appcloud.com",
      fromName: "AppCloud",
      fromEmail: "noreply@appcloud.com",
    },
    limits: {
      maxTeamsPerUser: 5,
      maxProjectsPerTeam: 100,
      maxAppsPerProject: 50,
      maxDatabasesPerProject: 20,
      defaultStorageLimit: 10, // GB
      defaultBandwidthLimit: 100, // GB
    },
    notifications: {
      systemAlerts: true,
      billingNotifications: true,
      maintenanceNotifications: true,
      securityAlerts: true,
    },
  })

  const handleSave = () => {
    console.log("Saving system settings:", settings)
    // Implement save logic
  }

  const systemHealth = {
    database: { status: "healthy", responseTime: "12ms" },
    redis: { status: "healthy", responseTime: "3ms" },
    storage: { status: "healthy", usage: "67%" },
    api: { status: "healthy", responseTime: "145ms" },
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure platform-wide settings and system parameters</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            System Health
          </CardTitle>
          <CardDescription>Current status of system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(systemHealth).map(([component, health]) => (
              <div key={component} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{component}</span>
                  <Badge className={`text-xs ${getHealthColor(health.status)}`}>{health.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {health.responseTime && `Response: ${health.responseTime}`}
                  {health.usage && `Usage: ${health.usage}`}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Mode */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Maintenance Mode
          </CardTitle>
          <CardDescription>Control system maintenance and downtime</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenance-enabled">Enable Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">Temporarily disable user access to the platform</p>
            </div>
            <Switch
              id="maintenance-enabled"
              checked={settings.maintenance.enabled}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  maintenance: { ...settings.maintenance, enabled: checked },
                })
              }
            />
          </div>
          {settings.maintenance.enabled && (
            <div className="space-y-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div>
                <Label htmlFor="maintenance-message">Maintenance Message</Label>
                <Textarea
                  id="maintenance-message"
                  value={settings.maintenance.message}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maintenance: { ...settings.maintenance, message: e.target.value },
                    })
                  }
                  placeholder="Message to display to users during maintenance"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maintenance-start">Scheduled Start</Label>
                  <Input
                    id="maintenance-start"
                    type="datetime-local"
                    value={settings.maintenance.scheduledStart}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maintenance: { ...settings.maintenance, scheduledStart: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="maintenance-end">Scheduled End</Label>
                  <Input
                    id="maintenance-end"
                    type="datetime-local"
                    value={settings.maintenance.scheduledEnd}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maintenance: { ...settings.maintenance, scheduledEnd: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>Configure security policies and authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enforce SSL</Label>
                <p className="text-sm text-muted-foreground">Require HTTPS for all connections</p>
              </div>
              <Switch
                checked={settings.security.enforceSSL}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    security: { ...settings.security, enforceSSL: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Email Verification</Label>
                <p className="text-sm text-muted-foreground">Users must verify email addresses</p>
              </div>
              <Switch
                checked={settings.security.requireEmailVerification}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    security: { ...settings.security, requireEmailVerification: checked },
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
              <Input
                id="session-timeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: { ...settings.security, sessionTimeout: Number.parseInt(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
              <Input
                id="max-login-attempts"
                type="number"
                value={settings.security.maxLoginAttempts}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: { ...settings.security, maxLoginAttempts: Number.parseInt(e.target.value) },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Configuration
          </CardTitle>
          <CardDescription>Configure email delivery settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email-provider">Email Provider</Label>
              <Select
                value={settings.email.provider}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, provider: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smtp">SMTP</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                  <SelectItem value="ses">Amazon SES</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input
                id="smtp-host"
                value={settings.email.smtpHost}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, smtpHost: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input
                id="smtp-port"
                type="number"
                value={settings.email.smtpPort}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, smtpPort: Number.parseInt(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="from-name">From Name</Label>
              <Input
                id="from-name"
                value={settings.email.fromName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, fromName: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="from-email">From Email</Label>
              <Input
                id="from-email"
                type="email"
                value={settings.email.fromEmail}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: { ...settings.email, fromEmail: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Limits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Platform Limits
          </CardTitle>
          <CardDescription>Configure default resource limits and quotas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="max-teams">Max Teams per User</Label>
              <Input
                id="max-teams"
                type="number"
                value={settings.limits.maxTeamsPerUser}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    limits: { ...settings.limits, maxTeamsPerUser: Number.parseInt(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="max-projects">Max Projects per Team</Label>
              <Input
                id="max-projects"
                type="number"
                value={settings.limits.maxProjectsPerTeam}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    limits: { ...settings.limits, maxProjectsPerTeam: Number.parseInt(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="max-apps">Max Apps per Project</Label>
              <Input
                id="max-apps"
                type="number"
                value={settings.limits.maxAppsPerProject}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    limits: { ...settings.limits, maxAppsPerProject: Number.parseInt(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="max-databases">Max Databases per Project</Label>
              <Input
                id="max-databases"
                type="number"
                value={settings.limits.maxDatabasesPerProject}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    limits: { ...settings.limits, maxDatabasesPerProject: Number.parseInt(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="storage-limit">Default Storage Limit (GB)</Label>
              <Input
                id="storage-limit"
                type="number"
                value={settings.limits.defaultStorageLimit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    limits: { ...settings.limits, defaultStorageLimit: Number.parseInt(e.target.value) },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="bandwidth-limit">Default Bandwidth Limit (GB)</Label>
              <Input
                id="bandwidth-limit"
                type="number"
                value={settings.limits.defaultBandwidthLimit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    limits: { ...settings.limits, defaultBandwidthLimit: Number.parseInt(e.target.value) },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure system-wide notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>System Alerts</Label>
                <p className="text-sm text-muted-foreground">Critical system notifications</p>
              </div>
              <Switch
                checked={settings.notifications.systemAlerts}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, systemAlerts: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Billing Notifications</Label>
                <p className="text-sm text-muted-foreground">Payment and subscription alerts</p>
              </div>
              <Switch
                checked={settings.notifications.billingNotifications}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, billingNotifications: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Notifications</Label>
                <p className="text-sm text-muted-foreground">Scheduled maintenance alerts</p>
              </div>
              <Switch
                checked={settings.notifications.maintenanceNotifications}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, maintenanceNotifications: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Security Alerts</Label>
                <p className="text-sm text-muted-foreground">Security-related notifications</p>
              </div>
              <Switch
                checked={settings.notifications.securityAlerts}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, securityAlerts: checked },
                  })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
