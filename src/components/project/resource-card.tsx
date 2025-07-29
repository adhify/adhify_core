'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, ExternalLink, Settings, Trash2, Activity, Database, Server, Globe } from 'lucide-react';

interface ResourceCardProps {
  resource: {
    id: string;
    name: string;
    type: 'app' | 'database' | 'service';
    status: 'running' | 'stopped' | 'error' | 'deploying';
    url?: string;
    environment: string;
    lastDeployed?: string;
    description?: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function ResourceCard({ resource, onEdit, onDelete, onView }: ResourceCardProps) {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'app':
        return <Globe className="h-5 w-5" />;
      case 'database':
        return <Database className="h-5 w-5" />;
      case 'service':
        return <Server className="h-5 w-5" />;
      default:
        return <Server className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'deploying':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card onClick={() => onView?.(resource.id)} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">{getResourceIcon(resource.type)}</div>
            <div>
              <CardTitle className="text-lg">{resource.name}</CardTitle>
              <CardDescription className="capitalize">
                {resource.type} • {resource.environment}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${getStatusColor(resource.status)}`}>{resource.status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {resource.description && <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {resource.lastDeployed && (
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                <span>Deployed {resource.lastDeployed}</span>
              </div>
            )}
          </div>
          {resource.url && (
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ExternalLink className="h-3 w-3" />
              Visit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
