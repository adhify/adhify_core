'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Settings, Users, Trash2, Plus, X, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsTabProps {
  projectId: string;
}

export function SettingsTab({ projectId }: SettingsTabProps) {
  const [projectName, setProjectName] = useState('E-commerce Platform');
  const [projectDescription, setProjectDescription] = useState('Full-stack e-commerce solution with React and Node.js');
  const [autoDeployEnabled, setAutoDeployEnabled] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [envVars, setEnvVars] = useState([
    { key: 'DATABASE_URL', value: 'postgresql://...', isSecret: true },
    { key: 'API_KEY', value: 'sk-...', isSecret: true },
    { key: 'NODE_ENV', value: 'production', isSecret: false },
  ]);
  const [newEnvKey, setNewEnvKey] = useState('');
  const [newEnvValue, setNewEnvValue] = useState('');
  const [showSecrets, setShowSecrets] = useState<Record<number, boolean>>({});

  const handleSaveGeneral = () => {
    toast.success('Project settings updated successfully');
  };

  const handleAddEnvVar = () => {
    if (newEnvKey && newEnvValue) {
      setEnvVars([...envVars, { key: newEnvKey, value: newEnvValue, isSecret: false }]);
      setNewEnvKey('');
      setNewEnvValue('');
      toast.success('Environment variable added');
    }
  };

  const handleRemoveEnvVar = (index: number) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
    toast.success('Environment variable removed');
  };

  const toggleSecretVisibility = (index: number) => {
    setShowSecrets((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDeleteProject = () => {
    toast.success('Project deletion initiated. You will receive an email confirmation.');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Settings</h2>
          <p className="text-muted-foreground">Configure project settings, integrations, and preferences</p>
        </div>
        <Badge variant="outline">
          <Settings className="w-3 h-3 mr-1" />
          Configuration
        </Badge>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Update your project's basic information and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-id">Project ID</Label>
                  <Input id="project-id" value={projectId} disabled className="bg-muted" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your project"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-region">Region</Label>
                <Select defaultValue="us-east-1">
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                    <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                    <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                    <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deployment Settings</CardTitle>
              <CardDescription>Configure how your project is deployed and managed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Deploy</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically deploy when changes are pushed to main branch
                  </p>
                </div>
                <Switch checked={autoDeployEnabled} onCheckedChange={setAutoDeployEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Show maintenance page to visitors</p>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Manage environment variables for your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {envVars.map((envVar, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{envVar.key}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground font-mono">
                          {envVar.isSecret && !showSecrets[index] ? '•'.repeat(envVar.value.length) : envVar.value}
                        </p>
                        {envVar.isSecret && (
                          <Button variant="ghost" size="sm" onClick={() => toggleSecretVisibility(index)}>
                            {showSecrets[index] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveEnvVar(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Add New Variable</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Variable name" value={newEnvKey} onChange={(e) => setNewEnvKey(e.target.value)} />
                  <Input
                    placeholder="Variable value"
                    value={newEnvValue}
                    onChange={(e) => setNewEnvValue(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddEnvVar} disabled={!newEnvKey || !newEnvValue}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variable
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage who has access to this project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { name: 'John Doe', email: 'john@example.com', role: 'Owner', avatar: 'JD' },
                  { name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', avatar: 'JS' },
                  { name: 'Bob Wilson', email: 'bob@example.com', role: 'Developer', avatar: 'BW' },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-medium text-blue-600">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={member.role === 'Owner' ? 'default' : 'secondary'}>{member.role}</Badge>
                      {member.role !== 'Owner' && (
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button>
                <Users className="h-4 w-4 mr-2" />
                Invite Member
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for all team members</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>IP Restrictions</Label>
                  <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Log all project activities</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="space-y-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-red-800">Delete Project</h4>
                    <p className="text-sm text-red-600">
                      Permanently delete this project and all of its data. This action cannot be undone.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the project "{projectName}" and
                          remove all associated data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteProject} className="bg-red-600 hover:bg-red-700">
                          Delete Project
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
