"use client"

interface AnalyticsTabProps {
  projectId: string
}

export function AnalyticsTab({ projectId }: AnalyticsTabProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">Performance metrics and usage analytics for this project</p>
        </div>
      </div>
      <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
    </div>
  )
}
