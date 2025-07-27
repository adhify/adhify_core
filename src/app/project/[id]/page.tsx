"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { TopNav } from "@/components/layout/top-nav"
import { ProjectNavigation } from "@/components/layout/project-navigation"
import { ProjectOverview } from "@/components/project/project-overview"
import { AppsTab } from "@/components/project/apps-tab"
import { DatabasesTab } from "@/components/project/databases-tab"
import { ServicesTab } from "@/components/project/services-tab"
import { AnalyticsTab } from "@/components/project/analytics-tab"
import { TeamTab } from "@/components/project/team-tab"
import { SettingsTab } from "@/components/project/settings-tab"

// Mock function to get project data by ID
function getProjectById(id: string) {
  const projects = {
    "1": {
      id: "1",
      name: "E-commerce Platform",
      description: "Full-stack e-commerce solution with React and Node.js",
      status: "active" as const,
      lastActivity: "2 hours ago",
      createdAt: "2 weeks ago",
      team: "Frontend Team",
      environments: ["production", "staging", "development"],
      stats: {
        apps: 3,
        databases: 2,
        services: 2,
      },
    },
    "2": {
      id: "2",
      name: "Marketing Website",
      description: "Company marketing site with CMS integration",
      status: "active" as const,
      lastActivity: "1 day ago",
      createdAt: "1 month ago",
      team: "Marketing Team",
      environments: ["production", "staging"],
      stats: {
        apps: 2,
        databases: 1,
        services: 0,
      },
    },
    "3": {
      id: "3",
      name: "Internal Tools",
      description: "Employee dashboard and internal applications",
      status: "deploying" as const,
      lastActivity: "5 minutes ago",
      createdAt: "3 days ago",
      team: "DevOps Team",
      environments: ["staging", "development"],
      stats: {
        apps: 2,
        databases: 1,
        services: 1,
      },
    },
  }

  return projects[id as keyof typeof projects] || projects["1"]
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const [activeTab, setActiveTab] = useState("overview")

  const project = getProjectById(projectId)

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <ProjectOverview projectId={projectId} />
      case "apps":
        return <AppsTab projectId={projectId} />
      case "databases":
        return <DatabasesTab projectId={projectId} />
      case "services":
        return <ServicesTab projectId={projectId} />
      case "analytics":
        return <AnalyticsTab projectId={projectId} />
      case "team":
        return <TeamTab projectId={projectId} />
      case "settings":
        return <SettingsTab projectId={projectId} />
      default:
        return <ProjectOverview projectId={projectId} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <ProjectNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        projectName={project.name}
        projectStats={project.stats}
      />
      <main className="bg-white min-h-[calc(100vh-8rem)]">{renderTabContent()}</main>
    </div>
  )
}
