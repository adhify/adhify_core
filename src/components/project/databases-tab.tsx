'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EnvironmentSwitcher } from '../layout/environment-switcher';
import { Plus, Search, Filter, Database, Settings, Trash2, Activity, HardDrive, Zap } from 'lucide-react';

interface DatabaseOverviewProps {
  projectId: string;
}

export function DatabasesTab({ projectId }: DatabaseOverviewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const databases = [
    {
      id: '1',
      name: 'User Database',
      type: 'PostgreSQL',
      status: 'running' as const,
      environment: 'production',
      size: '2.4 GB',
      connections: 12,
      last_online_at: '2 hours ago',
      description: 'Main database for user data and authentication',
      version: '14.2',
    },
    {
      id: '2',
      name: 'Analytics DB',
      type: 'MongoDB',
      status: 'running' as const,
      environment: 'production',
      size: '890 MB',
      connections: 5,
      last_online_at: '6 hours ago',
      description: 'Analytics and metrics data storage',
      version: '6.0',
    },
    {
      id: '3',
      name: 'Cache Store',
      type: 'Redis',
      status: 'running' as const,
      environment: 'production',
      size: '156 MB',
      connections: 24,
      last_online_at: '1 hour ago',
      description: 'Session and application cache',
      version: '7.0',
    },
    {
      id: '4',
      name: 'Test Database',
      type: 'PostgreSQL',
      status: 'stopped' as const,
      environment: 'development',
      size: '45 MB',
      connections: 0,
      last_online_at: '1 day ago',
      description: 'Development and testing database',
      version: '14.2',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'stopped':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'postgresql':
        return 'bg-blue-100 text-blue-800';
      case 'mongodb':
        return 'bg-green-100 text-green-800';
      case 'redis':
        return 'bg-red-100 text-red-800';
      case 'mysql':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDatabases = databases.filter((db) => db.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Databases</h2>
          <p className="text-muted-foreground">
            {databases.length} databases in this project • {databases.filter((d) => d.status === 'running').length}{' '}
            running
          </p>
        </div>
        <div className="flex items-center gap-3">
          <EnvironmentSwitcher />
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Database
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search databases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Databases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatabases.map((database) => (
          <Card key={database.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{database.name}</CardTitle>
                    <CardDescription className="capitalize">
                      {database.type} {database.version} • {database.environment}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getTypeColor(database.type)}`}>{database.type}</Badge>
                  <Badge className={`text-xs ${getStatusColor(database.status)}`}>{database.status}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <p className="text-sm text-muted-foreground">{database.description}</p>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Activity className="h-3 w-3" />
                <span>Last Online: {database.last_online_at}</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Connect
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Backup
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDatabases.length === 0 && (
        <div className="text-center py-12">
          <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No databases found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Get started by creating your first database'}
          </p>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Database
          </Button>
        </div>
      )}
    </div>
  );
}
