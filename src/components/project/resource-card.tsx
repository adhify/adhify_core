'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  ExternalLink,
  Settings,
  Trash2,
  Activity,
  Database,
  Server,
  Globe,
  EyeOff,
  Eye,
  Copy,
} from 'lucide-react';
import { IResource } from '@/common/custom/project';
import { ResourceType } from '@prisma/client';
import { toast } from 'sonner';
import type { TRPCError } from '@trpc/server';
import { clientApi } from '@/trpc/react';
import { AppSettingsModal } from './AppSettingsModal';

// Simple modal implementation
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
        {children}
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

interface ResourceCardProps {
  resource: IResource;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function ResourceCard({ resource, onEdit, onDelete, onView }: ResourceCardProps) {
  const { mutate: deployApp, isPending } = clientApi.app.deploy.useMutation({
    onSuccess() {
      toast.success('Project Deployment Started!');
    },
    onError(error) {
      toast.error('Error Deploying Project!');
    },
  });

  const { mutate: updateResourceStatus, isPending: isStatusUpdatePending } =
    clientApi.resource.updateStatus.useMutation({
      onSuccess() {
        toast.success('Project Deployment Started!');
      },
      onError(error) {
        toast.error('Error Deploying Project!');
      },
    });
  const [showDbModal, setShowDbModal] = useState<{ open: boolean; show: boolean }>({ open: false, show: false });
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const handleDeployApp = (app: { appId: string }) => {
    deployApp({ appId: app.appId });
  };

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case ResourceType.APP:
        return <Globe className="h-5 w-5" />;
      case ResourceType.DATABASE:
        return <Database className="h-5 w-5" />;
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
    <>
      <Card onClick={() => onView?.(resource.id)} className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-lg">{getResourceIcon(resource.type)}</div>
              <div>
                <CardTitle className="text-lg">
                  {resource.type === ResourceType.APP ? resource.app?.name : resource.database?.name}
                </CardTitle>
                <CardDescription className="capitalize">{resource.type}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`text-xs ${getStatusColor(resource.resource_status)}`}>
                {resource.resource_status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      updateResourceStatus(resource);
                    }}
                  >
                    {resource.resource_status === 'running' ? 'Stop' : 'Start'}
                  </DropdownMenuItem>
                  {resource.type === ResourceType.APP && (
                    <DropdownMenuItem
                      onClick={() => {
                        setShowSettingsModal(true);
                      }}
                    >
                      Settings
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              {resource.type === ResourceType.APP && (
                <AppSettingsModal
                  open={showSettingsModal}
                  onClose={() => setShowSettingsModal(false)}
                  resourceId={resource.app?.id || resource.database?.id || ''}
                />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-3">
            {resource.type === ResourceType.APP ? resource.app?.description : resource.database?.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                <span>
                  Deployed{' '}
                  {resource.type === ResourceType.APP ? (
                    <span> {new Date(resource.app?.meta?.updated_at || '').toLocaleDateString()}</span>
                  ) : (
                    <span> {new Date(resource.database?.meta?.updated_at || '').toLocaleDateString()}</span>
                  )}
                </span>
              </div>
            </div>
            {resource.type === ResourceType.APP && resource.app?.meta?.fqdn && (
              <div className="flex gap-2">
                <a href={resource.app?.meta?.fqdn} target="_blank">
                  <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                    <ExternalLink className="h-3 w-3" />
                    Visit
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => handleDeployApp({ appId: resource.app?.id || '' })}
                >
                  Deploy
                </Button>
              </div>
            )}
            {resource.type === ResourceType.DATABASE && (
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent px-2 py-1 h-8 min-w-[80px] flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDbModal({ ...showDbModal, open: true });
                }}
              >
                Connect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
