'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { TopNav } from '@/components/layout/top-nav';
import { ProjectNavigation } from '@/components/layout/project-navigation';
import { ProjectOverview } from '@/components/project/project-overview';
import { SettingsTab } from '@/components/project/settings-tab';
import { clientApi } from '@/trpc/react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [activeTab, setActiveTab] = useState('overview');

  const { data: project, isLoading } = clientApi.project.get.useQuery({
    id: projectId,
  });
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return project && <ProjectOverview project={project} />;
      case 'settings':
        return project && <SettingsTab project={project} />;
      default:
        return project && <ProjectOverview project={project} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <ProjectNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            projectName={project?.name || ''}
            projectStats={project?.stats || null}
          />
          <main className="bg-white min-h-[calc(100vh-8rem)]">{renderTabContent()}</main>
        </>
      )}
    </div>
  );
}
