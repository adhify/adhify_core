'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Database, Globe, Server, Users, Activity, Calendar } from 'lucide-react';

import { useUser } from '@/util/supabase/hooks';
import { TopNav } from '@/components/layout/top-nav';
import { clientApi } from '@/trpc/react';
import { IProjects } from '@/common/custom/project';
import { CreateEditProjectModal } from '@/components/project/CreateEditProjectModel';

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [projects, setProjects] = useState<IProjects>([]);
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleProjectView = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const projectQuery = clientApi.project.list.useQuery();

  useEffect(() => {
    if (!loading && user && projectQuery.data) {
      setProjects(projectQuery.data);
    }
  }, [user, loading, projectQuery.data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
      case 'RUNNING':
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
      case 'STOPPED':
        return 'bg-gray-100 text-gray-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const runningResources = projects.reduce(
    (acc, project) => {
      // const runningApps = project.apps.filter((app) => app.status === 'RUNNING').length;
      // const runningDatabases = project.databases.filter((db) => db.status === 'RUNNING').length;
      // const runningServices = project.services.filter((service) => service.status === 'RUNNING').length;
      const runningApps = 0;
      const runningDatabases = 0;
      const runningServices = 0;

      return {
        apps: acc.apps + runningApps,
        databases: acc.databases + runningDatabases,
        services: acc.services + runningServices,
      };
    },
    { apps: 0, databases: 0, services: 0 }
  );

  const totalResources = projects.reduce(
    (acc, project) => {
      return {
        // apps: acc.apps + project.apps.length,
        // databases: acc.databases + project.databases.length,
        // services: acc.services + project.services.length,
        apps: acc.apps + 0,
        databases: acc.databases + 0,
        services: acc.services + 0,
      };
    },
    { apps: 0, databases: 0, services: 0 }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <TopNav />
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Running Apps</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{runningResources.apps}</div>
              <p className="text-xs text-muted-foreground">of {totalResources.apps} total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Databases</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{runningResources.databases}</div>
              <p className="text-xs text-muted-foreground">of {totalResources.databases} total</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Your Projects</h3>
          <Button onClick={() => setShowProjectModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
          {showProjectModal && (
            <CreateEditProjectModal
              open={showProjectModal}
              onClose={() => setShowProjectModal(false)}
              onSubmit={() => {
                projectQuery.refetch();
                setShowProjectModal(false);
              }}
            />
          )}
        </div>

        {projects.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first project.</p>
            <Button onClick={() => setShowProjectModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                onClick={() => handleProjectView(project.id)}
                key={project.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                      <CardDescription className="text-sm">{project.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Server className="w-4 h-4 mr-2 text-blue-500" />
                        Apps
                      </span>
                      <span className="font-medium">
                        {'0 / 0'}
                        {/* {project.apps.filter((app) => app.status === 'RUNNING').length} / {project.apps.length} */}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Database className="w-4 h-4 mr-2 text-green-500" />
                        Databases
                      </span>
                      <span className="font-medium">
                        {'0 / 0'}
                        {/* {project.databases.filter((db) => db.status === 'RUNNING').length} / {project.databases.length} */}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-purple-500" />
                        Services
                      </span>
                      <span className="font-medium">
                        {'0 / 0'}
                        {/* {project.services.filter((service) => service.status === 'RUNNING').length} /{' '}
                        {project.services.length} */}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Created
                        </span>
                        <span>{project.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
