'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResourceCard } from './resource-card';
import { Plus, Database, Server, Globe, Activity } from 'lucide-react';
import { clientApi } from '@/trpc/react';
import { IProjectWithStats } from '@/common/custom/project';

interface ProjectOverviewProps {
  project: IProjectWithStats;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const { data: resources } = clientApi.project.getResources.useQuery({
    projectId: project?.id,
  });
  const stats = [
    {
      title: 'Total Resources',
      value: `${project.stats.apps + project.stats.databases}`,
      icon: <Activity className="h-4 w-4" />,
      color: 'text-blue-600',
    },
    {
      title: 'Active Apps',
      value: `${project.stats.apps}`,
      icon: <Globe className="h-4 w-4" />,
      change: '',
      color: 'text-green-600',
    },
    {
      title: 'Databases',
      value: `${project.stats.databases}`,
      icon: <Database className="h-4 w-4" />,
      change: '',
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Project Overview</h2>
          <p className="text-muted-foreground">Monitor and manage all resources in this project</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resources Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">All Resources</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Globe className="h-4 w-4" />
              New App
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Database className="h-4 w-4" />
              New Database
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources?.map((resource: any) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onView={(id) => console.log('View', id)}
              onEdit={(id) => console.log('Edit', id)}
              onDelete={(id) => console.log('Delete', id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
