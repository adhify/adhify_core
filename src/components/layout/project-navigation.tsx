'use client';

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FolderOpen, Database, Server, Settings, Activity, Users, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface ProjectNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  projectName: string;
  projectStats: {
    apps: number;
    databases: number;
    services: number;
  };
}

export function ProjectNavigation({ activeTab, onTabChange, projectName, projectStats }: ProjectNavigationProps) {
  const tabs: Tab[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      id: 'apps',
      label: 'Apps',
      icon: <Globe className="h-4 w-4" />,
      badge: projectStats.apps,
    },
    {
      id: 'databases',
      label: 'Databases',
      icon: <Database className="h-4 w-4" />,
      badge: projectStats.databases,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="border-b bg-white">
      <div className="px-6">
        <div className="py-4 border-b">
          <div className="flex items-center gap-4 mb-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 px-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold">{projectName}</h1>
          <p className="text-muted-foreground">
            {projectStats.apps + projectStats.databases + projectStats.services} resources across {projectStats.apps}{' '}
            apps, {projectStats.databases} databases, and {projectStats.services} services
          </p>
        </div>
        <div className="flex items-center gap-1 py-2 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              disabled={tab.disabled}
              onClick={() => onTabChange(tab.id)}
              className={cn('gap-2 whitespace-nowrap', activeTab === tab.id && 'bg-muted text-foreground')}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && typeof tab.badge === 'number' && tab.badge > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {tab.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
