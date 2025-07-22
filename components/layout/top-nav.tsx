"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Settings, LogOut, CreditCard, Users, Plus } from "lucide-react"

interface Team {
  id: string
  name: string
  plan: "free" | "pro" | "enterprise"
  avatar?: string
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export function TopNav() {
  const [currentTeam, setCurrentTeam] = useState<Team>({
    id: "1",
    name: "Acme Corp",
    plan: "pro",
  })

  const user: User = {
    id: "1",
    name: "John Doe",
    email: "john@acme.com",
  }

  const teams: Team[] = [
    { id: "1", name: "Acme Corp", plan: "pro" },
    { id: "2", name: "Personal", plan: "free" },
  ]

  const getPlanColor = (plan: string) => {
    switch (plan) {
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
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-black text-white flex items-center justify-center font-bold">A</div>
            <span className="font-semibold text-lg">AppCloud</span>
          </div>

          {/* Team Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-3">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{currentTeam.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{currentTeam.name}</span>
                <Badge className={`text-xs ${getPlanColor(currentTeam.plan)}`}>{currentTeam.plan}</Badge>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Switch Team</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {teams.map((team) => (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => setCurrentTeam(team)}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">{team.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{team.name}</div>
                  </div>
                  <Badge className={`text-xs ${getPlanColor(team.plan)}`}>{team.plan}</Badge>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Plus className="h-4 w-4" />
                Create Team
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <CreditCard className="h-4 w-4" />
            Upgrade
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Users className="h-4 w-4" />
                Team Settings
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
  )
}
