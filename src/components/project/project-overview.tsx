'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResourceCard } from './resource-card';
import { EnvironmentSwitcher } from '../layout/environment-switcher';
import { Plus, Database, Server, Globe, Activity } from 'lucide-react';

interface ProjectOverviewProps {
  projectId: string;
}

export function ProjectOverview({ projectId }: ProjectOverviewProps) {
  const [selectedEnvironment, setSelectedEnvironment] = useState('production');

  // Mock data based on project ID
  const getProjectResources = (id: string) => {
    const resourcesMap = {
      '1': [
        {
          id: '1',
          name: 'Frontend App',
          type: 'app' as const,
          status: 'running' as const,
          url: 'https://shop.example.com',
          environment: 'production',
          lastDeployed: '2 hours ago',
          description: 'Main React e-commerce application',
        },
        {
          id: '2',
          name: 'Admin Dashboard',
          type: 'app' as const,
          status: 'running' as const,
          url: 'https://admin.shop.example.com',
          environment: 'production',
          lastDeployed: '1 day ago',
          description: 'Admin panel for managing products',
        },
        {
          id: '3',
          name: 'API Server',
          type: 'app' as const,
          status: 'running' as const,
          environment: 'production',
          lastDeployed: '1 day ago',
          description: 'Node.js REST API server',
        },
        {
          id: '4',
          name: 'User Database',
          type: 'database' as const,
          status: 'running' as const,
          environment: 'production',
          lastDeployed: '3 days ago',
          description: 'PostgreSQL database for user data',
        },
        {
          id: '5',
          name: 'Product Catalog',
          type: 'database' as const,
          status: 'running' as const,
          environment: 'production',
          lastDeployed: '1 week ago',
          description: 'MongoDB for product information',
        },
        {
          id: '6',
          name: 'Redis Cache',
          type: 'service' as const,
          status: 'running' as const,
          environment: 'production',
          lastDeployed: '1 week ago',
          description: 'Redis caching service',
        },
        {
          id: '7',
          name: 'Email Service',
          type: 'service' as const,
          status: 'running' as const,
          environment: 'production',
          lastDeployed: '2 weeks ago',
          description: 'SMTP email service',
        },
      ],
      '2': [
        {
          id: '8',
          name: 'Marketing Site',
          type: 'app' as const,
          status: 'running' as const,
          url: 'https://example.com',
          environment: 'production',
          lastDeployed: '1 day ago',
          description: 'Company marketing website',
        },
        {
          id: '9',
          name: 'Blog Platform',
          type: 'app' as const,
          status: 'running' as const,
          url: 'https://blog.example.com',
          environment: 'production',
          lastDeployed: '3 days ago',
          description: 'Company blog and content platform',
        },
        {
          id: '10',
          name: 'Content DB',
          type: 'database' as const,
          status: 'running' as const,
          environment: 'production',
          lastDeployed: '1 week ago',
          description: 'PostgreSQL for CMS content',
        },
      ],
      '3': [
        {
          id: '11',
          name: 'Employee Portal',
          type: 'app' as const,
          status: 'deploying' as const,
          environment: 'staging',
          lastDeployed: '5 minutes ago',
          description: 'Internal employee dashboard',
        },
        {
          id: '12',
          name: 'Analytics Dashboard',
          type: 'app' as const,
          status: 'stopped' as const,
          environment: 'development',
          lastDeployed: '2 days ago',
          description: 'Internal analytics and reporting',
        },
        {
          id: '13',
          name: 'HR Database',
          type: 'database' as const,
          status: 'running' as const,
          environment: 'staging',
          lastDeployed: '1 week ago',
          description: 'MySQL database for HR data',
        },
        {
          id: '14',
          name: 'Auth Service',
          type: 'service' as const,
          status: 'running' as const,
          environment: 'staging',
          lastDeployed: '3 days ago',
          description: 'OAuth authentication service',
        },
      ],
    };

    return resourcesMap[id as keyof typeof resourcesMap] || resourcesMap['1'];
  };

  const resources = getProjectResources(projectId);

  const stats = [
    {
      title: 'Total Resources',
      value: resources.length.toString(),
      icon: <Activity className="h-4 w-4" />,
      change: '+2 this month',
      color: 'text-blue-600',
    },
    {
      title: 'Active Apps',
      value: resources.filter((r) => r.type === 'app' && r.status === 'running').length.toString(),
      icon: <Globe className="h-4 w-4" />,
      change: '+1 this week',
      color: 'text-green-600',
    },
    {
      title: 'Databases',
      value: resources.filter((r) => r.type === 'database').length.toString(),
      icon: <Database className="h-4 w-4" />,
      change: 'No change',
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
        <div className="flex items-center gap-3">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Resource
          </Button>
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
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Server className="h-4 w-4" />
              New Service
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
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
