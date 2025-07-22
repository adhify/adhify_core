"use client"

interface TeamTabProps {
  projectId: string
}

export function TeamTab({ projectId }: TeamTabProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Team</h2>
          <p className="text-muted-foreground">Manage team members and permissions for this project</p>
        </div>
      </div>
      <p className="text-muted-foreground">Team management interface coming soon...</p>
    </div>
  )
}
