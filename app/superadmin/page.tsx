"use client"

import { useState } from "react"
import { SuperAdminLayout } from "@/components/superadmin/layout"
import { SuperAdminOverview } from "@/components/superadmin/overview"
import { TeamsManagement } from "@/components/superadmin/teams-management"
import { PlansManagement } from "@/components/superadmin/plans-management"
import { UsageAnalytics } from "@/components/superadmin/usage-analytics"
import { AuditLogs } from "@/components/superadmin/audit-logs"
import { SystemSettings } from "@/components/superadmin/system-settings"
import { ServersManagement } from "@/components/superadmin/servers-management"
import { ResourceAllocation } from "@/components/superadmin/resource-allocation"
import { DeploymentsMonitoring } from "@/components/superadmin/deployments-monitoring"
import { PlanServerAllocation } from "@/components/superadmin/plan-server-allocation"
import { AutoAssignmentRules } from "@/components/superadmin/auto-assignment-rules"

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <SuperAdminOverview />
      case "teams":
        return <TeamsManagement />
      case "plans":
        return <PlansManagement />
      case "usage":
        return <UsageAnalytics />
      case "audit":
        return <AuditLogs />
      case "settings":
        return <SystemSettings />
      case "servers":
        return <ServersManagement />
      case "plan-allocation":
        return <PlanServerAllocation />
      case "assignment-rules":
        return <AutoAssignmentRules />
      case "allocation":
        return <ResourceAllocation />
      case "deployments":
        return <DeploymentsMonitoring />
      default:
        return <SuperAdminOverview />
    }
  }

  return (
    <SuperAdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </SuperAdminLayout>
  )
}
