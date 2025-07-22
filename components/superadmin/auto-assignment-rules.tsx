"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Settings,
  Activity,
  Cpu,
  HardDrive,
  Users,
  Crown,
  Zap,
  AlertTriangle,
  CheckCircle,
  Edit,
  Save,
} from "lucide-react"

export function AutoAssignmentRules() {
  const [rules, setRules] = useState([
    {
      id: "1",
      planTier: "FREE",
      planName: "Free Plan",
      enabled: true,
      maxServersAllocated: 3,
      currentServersAllocated: 2,
      maxTeamsPerServer: 10,
      resourceThresholds: {
        cpu: 25,
        memory: 25,
        storage: 25,
      },
      assignmentStrategy: "LOWEST_USAGE", // LOWEST_USAGE, ROUND_ROBIN, REGION_BASED
      regionPreference: "us-east-1",
      autoScaling: false,
      serverSpecs: {
        minCpu: 2,
        minMemory: 4,
        minStorage: 80,
      },
      costLimit: 200, // Monthly cost limit
    },
    {
      id: "2",
      planTier: "PRO",
      planName: "Pro Plan",
      enabled: true,
      maxServersAllocated: 10,
      currentServersAllocated: 6,
      maxTeamsPerServer: 5,
      resourceThresholds: {
        cpu: 25,
        memory: 25,
        storage: 25,
      },
      assignmentStrategy: "LOWEST_USAGE",
      regionPreference: "us-east-1",
      autoScaling: true,
      serverSpecs: {
        minCpu: 4,
        minMemory: 8,
        minStorage: 160,
      },
      costLimit: 2000,
    },
    {
      id: "3",
      planTier: "ENTERPRISE",
      planName: "Enterprise Plan",
      enabled: true,
      maxServersAllocated: -1, // Unlimited
      currentServersAllocated: 8,
      maxTeamsPerServer: 1, // Dedicated servers
      resourceThresholds: {
        cpu: 100,
        memory: 100,
        storage: 100,
      },
      assignmentStrategy: "DEDICATED",
      regionPreference: "us-east-1",
      autoScaling: true,
      serverSpecs: {
        minCpu: 8,
        minMemory: 32,
        minStorage: 500,
      },
      costLimit: -1, // No limit
    },
  ])

  const [editingRule, setEditingRule] = useState<any>(null)

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

  const getStrategyDescription = (strategy: string) => {
    switch (strategy) {
      case "LOWEST_USAGE":
        return "Assign to server with lowest resource usage"
      case "ROUND_ROBIN":
        return "Distribute teams evenly across servers"
      case "REGION_BASED":
        return "Assign based on geographic proximity"
      case "DEDICATED":
        return "Each team gets a dedicated server"
      default:
        return "Unknown strategy"
    }
  }

  const updateRule = (ruleId: string, updates: any) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, ...updates } : rule)))
  }

  const saveRule = (updatedRule: any) => {
    setRules((prev) => prev.map((rule) => (rule.id === updatedRule.id ? updatedRule : rule)))
    setEditingRule(null)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Auto-Assignment Rules</h2>
          <p className="text-muted-foreground">
            Configure automatic server assignment rules for each subscription plan
          </p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      {/* Assignment Rules */}
      <div className="space-y-6">
        {rules.map((rule) => (
          <Card key={rule.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rule.planTier === "ENTERPRISE" && <Crown className="h-5 w-5 text-purple-600" />}
                  <div>
                    <CardTitle className="text-xl">{rule.planName}</CardTitle>
                    <CardDescription>
                      {rule.currentServersAllocated} of{" "}
                      {rule.maxServersAllocated === -1 ? "∞" : rule.maxServersAllocated} servers allocated
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getPlanColor(rule.planTier)}>{rule.planTier}</Badge>
                  <Switch checked={rule.enabled} onCheckedChange={(enabled) => updateRule(rule.id, { enabled })} />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setEditingRule(rule)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Edit Assignment Rules: {rule.planName}</DialogTitle>
                        <DialogDescription>Configure server assignment rules and resource limits</DialogDescription>
                      </DialogHeader>
                      {editingRule && (
                        <div className="space-y-6">
                          {/* Basic Settings */}
                          <div className="grid grid-cols-2 gap-6">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Server Allocation</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <Label>Max Servers Allocated</Label>
                                  <Input
                                    type="number"
                                    value={
                                      editingRule.maxServersAllocated === -1 ? "" : editingRule.maxServersAllocated
                                    }
                                    onChange={(e) =>
                                      setEditingRule({
                                        ...editingRule,
                                        maxServersAllocated:
                                          e.target.value === "" ? -1 : Number.parseInt(e.target.value),
                                      })
                                    }
                                    placeholder="Unlimited"
                                  />
                                </div>
                                <div>
                                  <Label>Max Teams per Server</Label>
                                  <Input
                                    type="number"
                                    value={editingRule.maxTeamsPerServer}
                                    onChange={(e) =>
                                      setEditingRule({
                                        ...editingRule,
                                        maxTeamsPerServer: Number.parseInt(e.target.value),
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Assignment Strategy</Label>
                                  <Select
                                    value={editingRule.assignmentStrategy}
                                    onValueChange={(value) =>
                                      setEditingRule({ ...editingRule, assignmentStrategy: value })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="LOWEST_USAGE">Lowest Usage</SelectItem>
                                      <SelectItem value="ROUND_ROBIN">Round Robin</SelectItem>
                                      <SelectItem value="REGION_BASED">Region Based</SelectItem>
                                      <SelectItem value="DEDICATED">Dedicated</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Label>Auto Scaling</Label>
                                  <Switch
                                    checked={editingRule.autoScaling}
                                    onCheckedChange={(checked) =>
                                      setEditingRule({ ...editingRule, autoScaling: checked })
                                    }
                                  />
                                </div>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Resource Thresholds</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                <div>
                                  <Label>CPU Threshold: {editingRule.resourceThresholds.cpu}%</Label>
                                  <Slider
                                    value={[editingRule.resourceThresholds.cpu]}
                                    onValueChange={([value]) =>
                                      setEditingRule({
                                        ...editingRule,
                                        resourceThresholds: { ...editingRule.resourceThresholds, cpu: value },
                                      })
                                    }
                                    max={100}
                                    step={5}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Memory Threshold: {editingRule.resourceThresholds.memory}%</Label>
                                  <Slider
                                    value={[editingRule.resourceThresholds.memory]}
                                    onValueChange={([value]) =>
                                      setEditingRule({
                                        ...editingRule,
                                        resourceThresholds: { ...editingRule.resourceThresholds, memory: value },
                                      })
                                    }
                                    max={100}
                                    step={5}
                                    className="mt-2"
                                  />
                                </div>
                                <div>
                                  <Label>Storage Threshold: {editingRule.resourceThresholds.storage}%</Label>
                                  <Slider
                                    value={[editingRule.resourceThresholds.storage]}
                                    onValueChange={([value]) =>
                                      setEditingRule({
                                        ...editingRule,
                                        resourceThresholds: { ...editingRule.resourceThresholds, storage: value },
                                      })
                                    }
                                    max={100}
                                    step={5}
                                    className="mt-2"
                                  />
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Server Specifications */}
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Minimum Server Specifications</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label>Min CPU Cores</Label>
                                  <Input
                                    type="number"
                                    value={editingRule.serverSpecs.minCpu}
                                    onChange={(e) =>
                                      setEditingRule({
                                        ...editingRule,
                                        serverSpecs: {
                                          ...editingRule.serverSpecs,
                                          minCpu: Number.parseInt(e.target.value),
                                        },
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Min Memory (GB)</Label>
                                  <Input
                                    type="number"
                                    value={editingRule.serverSpecs.minMemory}
                                    onChange={(e) =>
                                      setEditingRule({
                                        ...editingRule,
                                        serverSpecs: {
                                          ...editingRule.serverSpecs,
                                          minMemory: Number.parseInt(e.target.value),
                                        },
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label>Min Storage (GB)</Label>
                                  <Input
                                    type="number"
                                    value={editingRule.serverSpecs.minStorage}
                                    onChange={(e) =>
                                      setEditingRule({
                                        ...editingRule,
                                        serverSpecs: {
                                          ...editingRule.serverSpecs,
                                          minStorage: Number.parseInt(e.target.value),
                                        },
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="flex gap-2">
                            <Button onClick={() => saveRule(editingRule)}>Save Changes</Button>
                            <Button variant="outline" onClick={() => setEditingRule(null)} className="bg-transparent">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Rule Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Teams per Server</span>
                  </div>
                  <div className="text-lg font-bold">{rule.maxTeamsPerServer}</div>
                  <div className="text-xs text-muted-foreground">
                    {rule.planTier === "ENTERPRISE" ? "Dedicated" : "Shared"}
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Resource Threshold</span>
                  </div>
                  <div className="text-lg font-bold">{Math.max(...Object.values(rule.resourceThresholds))}%</div>
                  <div className="text-xs text-muted-foreground">Max usage before assignment</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">Auto Scaling</span>
                  </div>
                  <div className="text-lg font-bold">{rule.autoScaling ? "ON" : "OFF"}</div>
                  <div className="text-xs text-muted-foreground">Automatic server provisioning</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Settings className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-600">Strategy</span>
                  </div>
                  <div className="text-sm font-bold">{rule.assignmentStrategy.replace("_", " ")}</div>
                  <div className="text-xs text-muted-foreground">{getStrategyDescription(rule.assignmentStrategy)}</div>
                </div>
              </div>

              {/* Server Specifications */}
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-3">Minimum Server Specifications</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span>{rule.serverSpecs.minCpu} CPU cores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span>{rule.serverSpecs.minMemory} GB RAM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    <span>{rule.serverSpecs.minStorage} GB Storage</span>
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex items-center gap-4">
                {rule.enabled ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Auto-assignment enabled</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">Auto-assignment disabled</span>
                  </div>
                )}
                {rule.costLimit !== -1 && (
                  <div className="text-sm text-muted-foreground">Monthly cost limit: ${rule.costLimit}</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assignment Algorithm Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Assignment Algorithm</CardTitle>
          <CardDescription>How the automatic server assignment works</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <h4 className="font-medium text-blue-900 mb-2">1. Plan Detection</h4>
              <p className="text-sm text-blue-800">
                When a team signs up, their subscription plan is detected (Free, Pro, or Enterprise).
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <h4 className="font-medium text-green-900 mb-2">2. Server Pool Selection</h4>
              <p className="text-sm text-green-800">
                The system selects the appropriate server pool based on the plan tier and minimum specifications.
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <h4 className="font-medium text-purple-900 mb-2">3. Optimal Server Selection</h4>
              <p className="text-sm text-purple-800">
                Within the pool, the server with the lowest resource usage (CPU, memory, storage) below the threshold is
                selected.
              </p>
            </div>
            <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
              <h4 className="font-medium text-orange-900 mb-2">4. Assignment & Monitoring</h4>
              <p className="text-sm text-orange-800">
                The team is assigned to the selected server and resource usage is continuously monitored for future
                assignments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
