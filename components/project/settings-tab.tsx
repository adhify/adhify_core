"use client"

interface SettingsTabProps {
  projectId: string
}

export function SettingsTab({ projectId }: SettingsTabProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Project Settings</h2>
          <p className="text-muted-foreground">Configure project settings, integrations, and preferences</p>
        </div>
      </div>
      <p className="text-muted-foreground">Project settings interface coming soon...</p>
    </div>
  )
}
