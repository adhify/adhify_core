"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Plus, Globe, TestTube, Wrench } from "lucide-react"

interface Environment {
  id: string
  name: string
  type: "production" | "staging" | "development"
  status: "active" | "inactive"
}

export function EnvironmentSwitcher() {
  const [currentEnv, setCurrentEnv] = useState<Environment>({
    id: "1",
    name: "Production",
    type: "production",
    status: "active",
  })

  const environments: Environment[] = [
    { id: "1", name: "Production", type: "production", status: "active" },
    { id: "2", name: "Staging", type: "staging", status: "active" },
    { id: "3", name: "Development", type: "development", status: "active" },
  ]

  const getEnvIcon = (type: string) => {
    switch (type) {
      case "production":
        return <Globe className="h-4 w-4" />
      case "staging":
        return <TestTube className="h-4 w-4" />
      case "development":
        return <Wrench className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getEnvColor = (type: string) => {
    switch (type) {
      case "production":
        return "bg-green-100 text-green-800"
      case "staging":
        return "bg-yellow-100 text-yellow-800"
      case "development":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          {getEnvIcon(currentEnv.type)}
          <span>{currentEnv.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Switch Environment</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {environments.map((env) => (
          <DropdownMenuItem key={env.id} onClick={() => setCurrentEnv(env)} className="flex items-center gap-2">
            {getEnvIcon(env.type)}
            <div className="flex-1">
              <div className="font-medium">{env.name}</div>
            </div>
            <Badge className={`text-xs ${getEnvColor(env.type)}`}>{env.type}</Badge>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <Plus className="h-4 w-4" />
          Add Environment
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
