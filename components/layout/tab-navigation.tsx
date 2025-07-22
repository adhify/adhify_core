"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FolderOpen, Database, Server, Settings, Activity, Users } from "lucide-react"

interface Tab {
  id: string
  label: string
  icon: React.ReactNode
  badge?: string | number
  disabled?: boolean
}

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tabId: string) => void
  projectName?: string
}

export function TabNavigation({ activeTab, onTabChange, projectName }: TabNavigationProps) {
  const tabs: Tab[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      id: "apps",
      label: "Apps",
      icon: <Server className="h-4 w-4" />,
      badge: 3,
    },
    {
      id: "databases",
      label: "Databases",
      icon: <Database className="h-4 w-4" />,
      badge: 2,
    },
    {
      id: "services",
      label: "Services",
      icon: <Server className="h-4 w-4" />,
      badge: 1,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <Activity className="h-4 w-4" />,
    },
    {
      id: "team",
      label: "Team",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  return (
    <div className="border-b bg-white">
      <div className="px-6">
        {projectName && (
          <div className="py-4 border-b">
            <h1 className="text-2xl font-bold">{projectName}</h1>
            <p className="text-muted-foreground">Manage your project resources and settings</p>
          </div>
        )}
        <div className="flex items-center gap-1 py-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              disabled={tab.disabled}
              onClick={() => onTabChange(tab.id)}
              className={cn("gap-2 whitespace-nowrap", activeTab === tab.id && "bg-muted text-foreground")}
            >
              {tab.icon}
              {tab.label}
              {tab.badge && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {tab.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
