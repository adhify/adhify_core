"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SubscriptionBanner } from "./subscription-banner"
import { Plus, Search, Filter } from "lucide-react"

interface DashboardHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function DashboardHeader({ searchQuery, onSearchChange }: DashboardHeaderProps) {
  const subscriptionData = {
    plan: "free" as const,
    usage: {
      projects: { current: 2, limit: 3 },
      apps: { current: 7, limit: 10 },
      databases: { current: 4, limit: 5 },
    },
  }

  return (
    <div className="p-6 space-y-6">
      <SubscriptionBanner plan={subscriptionData.plan} usage={subscriptionData.usage} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your applications, databases, and services</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
    </div>
  )
}
