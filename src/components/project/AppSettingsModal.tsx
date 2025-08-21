import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { clientApi } from '@/trpc/react';
import { Delete, icons, Trash } from 'lucide-react';

interface AppSettingsModalProps {
  resourceId: string | undefined;
  open: boolean;
  onClose: () => void;
}

export function AppSettingsModal({ open, onClose, resourceId: appId }: AppSettingsModalProps) {
  if (!appId) {
    toast.error('No App ID provided');
    return null;
  }
  const [envVars, setEnvVars] = useState<{ [key: string]: string }>({});
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const { mutate: updateEnviromentVariable, isPending } = clientApi.app.createOrUpdateEnvironmentVariable.useMutation({
    onSuccess() {
      toast.success('Enviroment Variable Updated!');
    },
    onError(error) {
      console.log('Error', error);
      toast.error('Error Creating Environment Variable!');
    },
  });

  const { data: enviromentVariables } = clientApi.app.getEnviromentVariables.useQuery({
    appId,
  });

  useEffect(() => {
    if (enviromentVariables) {
      setEnvVars(enviromentVariables.reduce((acc, item) => ({ ...acc, [item.key]: item.value }), {}));
    }
  }, [enviromentVariables]);

  const handleEnvVarChange = (key: string, value: string) => {
    setEnvVars((prev) => ({ ...prev, [key]: value }));
  };
  const handleDelete = (key: string) => {
    const newEnvVars = { ...envVars };
    delete newEnvVars[key];
    setEnvVars(newEnvVars);
    // Add logic to remove from DB if needed
  };

  const handleSave = () => {
    // TODO: Implement saving logic
    updateEnviromentVariable(Object.entries(envVars).map(([key, value]) => ({ key, value, appId })));
    onClose();
  };

  const addEnvVar = () => {
    if (newKey && newValue) {
      if (envVars.hasOwnProperty(newKey)) {
        // Show error toast for duplicate key
        toast.error(`Environment variable "${newKey}" already exists.`);
        return;
      }
      setEnvVars((prev) => ({ ...prev, [newKey]: newValue }));
      setNewKey('');
      setNewValue('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white p-6">
        <DialogTitle>App Settings</DialogTitle>

        <Tabs defaultValue="env-vars">
          <TabsList>
            <TabsTrigger value="env-vars">Environment Variables</TabsTrigger>
          </TabsList>
          <TabsContent value="env-vars">
            <div className="mb-4 text-sm text-gray-600">Manage your app's environment variables here.</div>

            <div>
              {Object.entries(envVars || {}).map(([key, value]) => (
                <div key={key} className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={key}
                    onChange={(e) => {
                      handleEnvVarChange(key, e.target.value);
                    }}
                  />
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      handleEnvVarChange(key, e.target.value);
                    }}
                  />
                  <Button variant="destructive" onClick={() => handleDelete(key)}>
                    <Trash />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2 mb-2">
                <Input type="text" placeholder="Key" value={newKey} onChange={(e) => setNewKey(e.target.value)} />
                <Input type="text" placeholder="Value" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
                <Button onClick={addEnvVar}>Add</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-4 flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const parseEnvFile = (content: string): { [key: string]: string } => {
  const envVars: { [key: string]: string } = {};
  content.split('\n').forEach((line) => {
    const [key, value] = line.split('=').map((s) => s.trim());
    if (key && value) {
      envVars[key] = value;
    }
  });
  return envVars;
};
