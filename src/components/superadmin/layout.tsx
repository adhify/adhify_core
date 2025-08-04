"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Shield,
  Users,
  CreditCard,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Crown,
  AlertTriangle,
  Globe,
  Activity,
  Server,
} from "lucide-react"

interface SuperAdminLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function SuperAdminLayout({ children, activeTab, onTabChange }: SuperAdminLayoutProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: <Shield className="h-4 w-4" /> },
    { id: "teams", label: "Teams", icon: <Users className="h-4 w-4" />, badge: "1,234" },
    { id: "plans", label: "Plans & Billing", icon: <CreditCard className="h-4 w-4" /> },
    { id: "servers", label: "Servers", icon: <Server className="h-4 w-4" />, badge: "12" },
    { id: "plan-allocation", label: "Plan Allocation", icon: <Activity className="h-4 w-4" /> },
    { id: "assignment-rules", label: "Assignment Rules", icon: <Settings className="h-4 w-4" /> },
    { id: "allocation", label: "Resource Allocation", icon: <Activity className="h-4 w-4" /> },
    { id: "deployments", label: "Deployments", icon: <Globe className="h-4 w-4" />, badge: "45" },
    { id: "usage", label: "Usage Analytics", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "audit", label: "Audit Logs", icon: <FileText className="h-4 w-4" /> },
    { id: "settings", label: "System Settings", icon: <Settings className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-red-600 text-white flex items-center justify-center font-bold">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-semibold text-lg">SuperAdmin</span>
              <Badge className="bg-red-100 text-red-800 text-xs">ADMIN PANEL</Badge>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge className="bg-yellow-100 text-yellow-800 gap-1">
              <AlertTriangle className="h-3 w-3" />
              Production Environment
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs bg-red-100 text-red-800">SA</AvatarFallback>
                  </Avatar>
                  <span>Super Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-yellow-600" />
                    <div>
                      <div className="font-medium">Super Admin</div>
                      <div className="text-sm text-muted-foreground">admin@appcloud.com</div>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <Settings className="h-4 w-4" />
                  Admin Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-red-600">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="border-b bg-white">
        <div className="px-6">
          <div className="flex items-center gap-1 py-2 overflow-x-auto">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
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

      {/* Main Content */}
      <main className="bg-white min-h-[calc(100vh-8rem)]">{children}</main>
    </div>
  )
}
