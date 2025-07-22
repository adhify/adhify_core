"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Users, Building2, Database, Server, HardDrive, Wifi, Globe, Crown } from "lucide-react"

export function PlansManagement() {
  const [plans, setPlans] = useState([
    {
      id: "1",
      name: "free",
      displayName: "Free Plan",
      description: "Perfect for getting started",
      price: 0,
      interval: "monthly",
      isActive: true,
      subscribers: 856,
      limits: {
        projects: 1,
        apps: 3,
        databases: 1,
        services: 1,
        teamMembers: 3,
        storageGB: 1,
        bandwidthGB: 10,
        environments: 2,
      },
    },
    {
      id: "2",
      name: "pro",
      displayName: "Pro Plan",
      description: "For growing teams and businesses",
      price: 4900, // $49.00 in cents
      interval: "monthly",
      isActive: true,
      subscribers: 234,
      limits: {
        projects: 10,
        apps: 25,
        databases: 10,
        services: 15,
        teamMembers: 10,
        storageGB: 50,
        bandwidthGB: 500,
        environments: 5,
      },
    },
    {
      id: "3",
      name: "enterprise",
      displayName: "Enterprise Plan",
      description: "For large organizations with advanced needs",
      price: 29900, // $299.00 in cents
      interval: "monthly",
      isActive: true,
      subscribers: 45,
      limits: {
        projects: -1, // unlimited
        apps: -1,
        databases: -1,
        services: -1,
        teamMembers: -1,
        storageGB: 1000,
        bandwidthGB: 5000,
        environments: -1,
      },
    },
  ])

  const [editingPlan, setEditingPlan] = useState<any>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`
  }

  const formatLimit = (limit: number) => {
    return limit === -1 ? "Unlimited" : limit.toString()
  }

  const getLimitIcon = (type: string) => {
    switch (type) {
      case "projects":
        return <Building2 className="h-4 w-4" />
      case "apps":
        return <Globe className="h-4 w-4" />
      case "databases":
        return <Database className="h-4 w-4" />
      case "services":
        return <Server className="h-4 w-4" />
      case "teamMembers":
        return <Users className="h-4 w-4" />
      case "storageGB":
        return <HardDrive className="h-4 w-4" />
      case "bandwidthGB":
        return <Wifi className="h-4 w-4" />
      default:
        return <Crown className="h-4 w-4" />
    }
  }

  const getPlanColor = (planName: string) => {
    switch (planName) {
      case "free":
        return "bg-gray-100 text-gray-800"
      case "pro":
        return "bg-blue-100 text-blue-800"
      case "enterprise":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Plans & Billing Management</h2>
          <p className="text-muted-foreground">Manage subscription plans, pricing, and resource limits</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Plan</DialogTitle>
              <DialogDescription>Define a new subscription plan with custom limits and pricing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="planName">Plan Name</Label>
                  <Input id="planName" placeholder="e.g., premium" />
                </div>
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" placeholder="e.g., Premium Plan" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Plan description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (in cents)</Label>
                  <Input id="price" type="number" placeholder="9900" />
                </div>
                <div>
                  <Label htmlFor="interval">Billing Interval</Label>
                  <select className="w-full p-2 border rounded">
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Create Plan</Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="bg-transparent">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl">{plan.displayName}</CardTitle>
                    <Badge className={`text-xs ${getPlanColor(plan.name)}`}>{plan.name}</Badge>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={plan.isActive} />
                  <Button variant="ghost" size="sm" onClick={() => setEditingPlan(plan)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-3xl font-bold">{formatPrice(plan.price)}</div>
                <div className="text-sm text-muted-foreground">per {plan.interval}</div>
                <div className="text-sm text-muted-foreground mt-1">{plan.subscribers} subscribers</div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Resource Limits</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(plan.limits).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      {getLimitIcon(key)}
                      <span className="capitalize">{key.replace(/([A-Z])/g, " $1").toLowerCase()}:</span>
                      <span className="font-medium">{formatLimit(value as number)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Plan: {plan.displayName}</DialogTitle>
                      <DialogDescription>Modify plan details and resource limits</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Display Name</Label>
                          <Input defaultValue={plan.displayName} />
                        </div>
                        <div>
                          <Label>Price (cents)</Label>
                          <Input type="number" defaultValue={plan.price} />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea defaultValue={plan.description} />
                      </div>
                      <div className="space-y-3">
                        <Label>Resource Limits</Label>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(plan.limits).map(([key, value]) => (
                            <div key={key}>
                              <Label className="capitalize">{key.replace(/([A-Z])/g, " $1").toLowerCase()}</Label>
                              <Input type="number" defaultValue={value === -1 ? "" : value} placeholder="Unlimited" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button>Save Changes</Button>
                        <Button variant="outline" className="bg-transparent">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly recurring revenue breakdown by plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => {
              const monthlyRevenue = (plan.price / 100) * plan.subscribers
              return (
                <div key={plan.id} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`text-xs ${getPlanColor(plan.name)}`}>{plan.displayName}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-green-600">${monthlyRevenue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{plan.subscribers} subscribers</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
