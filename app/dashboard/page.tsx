'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@/lib/supabase/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Plus,
  Settings,
  LogOut,
  Database,
  Globe,
  Server,
  Users,
  Activity,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for demonstration
const mockProjects = [
  {
    id: '1',
    name: 'E-commerce API',
    description: 'REST API for online store',
    status: 'ACTIVE' as const,
    createdAt: new Date('2024-01-15'),
    team: { name: 'Frontend Team' },
    apps: [
      { id: '1', name: 'API Server', status: 'RUNNING' },
      { id: '2', name: 'Worker', status: 'RUNNING' },
    ],
    databases: [{ id: '1', name: 'PostgreSQL', status: 'RUNNING' }],
    services: [{ id: '1', name: 'Redis Cache', status: 'RUNNING' }],
    deployments: [{ id: '1', status: 'SUCCESS', createdAt: new Date('2024-01-20') }],
  },
  {
    id: '2',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics platform',
    status: 'ACTIVE' as const,
    createdAt: new Date('2024-01-10'),
    team: { name: 'Data Team' },
    apps: [{ id: '3', name: 'Dashboard', status: 'RUNNING' }],
    databases: [{ id: '2', name: 'ClickHouse', status: 'RUNNING' }],
    services: [],
    deployments: [{ id: '2', status: 'SUCCESS', createdAt: new Date('2024-01-18') }],
  },
  {
    id: '3',
    name: 'Mobile Backend',
    description: 'Backend services for mobile app',
    status: 'INACTIVE' as const,
    createdAt: new Date('2024-01-05'),
    team: { name: 'Mobile Team' },
    apps: [
      { id: '4', name: 'Auth Service', status: 'STOPPED' },
      { id: '5', name: 'Notification Service', status: 'STOPPED' },
    ],
    databases: [{ id: '3', name: 'MongoDB', status: 'STOPPED' }],
    services: [{ id: '2', name: 'Message Queue', status: 'STOPPED' }],
    deployments: [{ id: '3', status: 'FAILED', createdAt: new Date('2024-01-12') }],
  },
];

export default function DashboardPage() {
  const { user, loading } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const handleProjectView = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const handleProjectEdit = (projectId: string) => {
    // TODO: Implement project edit
    console.log('Edit project:', projectId);
  };

  const handleProjectDelete = (projectId: string) => {
    // TODO: Implement project delete
    setProjects(projects.filter((p) => p.id !== projectId));
  };

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
      const runningApps = project.apps.filter((app) => app.status === 'RUNNING').length;
      const runningDatabases = project.databases.filter((db) => db.status === 'RUNNING').length;
      const runningServices = project.services.filter((service) => service.status === 'RUNNING').length;

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
        apps: acc.apps + project.apps.length,
        databases: acc.databases + project.databases.length,
        services: acc.services + project.services.length,
      };
    },
    { apps: 0, databases: 0, services: 0 }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.user_metadata?.avatar_url || '/placeholder.svg'}
                      alt={user.user_metadata?.full_name || user.email}
                    />
                    <AvatarFallback>
                      {(user.user_metadata?.full_name || user.email)?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.user_metadata?.full_name || 'User'}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'there'}!
          </h2>
          <p className="text-gray-600">Here's what's happening with your projects today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">
                {projects.filter((p) => p.status === 'ACTIVE').length} active
              </p>
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{runningResources.services}</div>
              <p className="text-xs text-muted-foreground">of {totalResources.services} total</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Your Projects</h3>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">Get started by creating your first project.</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{project.name}</CardTitle>
                      <CardDescription className="text-sm">{project.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleProjectView(project.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleProjectEdit(project.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleProjectDelete(project.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {project.team.name}
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
                        {project.apps.filter((app) => app.status === 'RUNNING').length} / {project.apps.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Database className="w-4 h-4 mr-2 text-green-500" />
                        Databases
                      </span>
                      <span className="font-medium">
                        {project.databases.filter((db) => db.status === 'RUNNING').length} / {project.databases.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-purple-500" />
                        Services
                      </span>
                      <span className="font-medium">
                        {project.services.filter((service) => service.status === 'RUNNING').length} /{' '}
                        {project.services.length}
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
