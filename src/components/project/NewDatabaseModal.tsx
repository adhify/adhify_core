'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { clientApi } from '@/trpc/react';
import { toast } from 'sonner';
import { DatabaseType } from '@prisma/client';

interface NewDatabaseModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId?: string;
}

export function NewDatabaseModal({ open, setOpen, projectId }: NewDatabaseModalProps) {
  const [selectedDatabase, setSelectedDatabase] = useState<DatabaseType | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dbUsername, setDbUsername] = useState('');
  const [dbPassword, setDbPassword] = useState('');
  const { mutate: createDatabase, isPending } = clientApi.database.createDatabase.useMutation({
    onSuccess() {
      toast.success('Database Created Successfully!');
      setOpen(false);
      setName('');
      setDescription('');
      setDbUsername('');
      setDbPassword('');
      setSelectedDatabase(null);
    },
    onError() {
      toast.error('Error Creating Database!');
    },
  });

  const handleCreateDatabase = () => {
    if (!selectedDatabase) {
      toast.error('Please select a database type');
      return;
    }
    if (!name.trim()) {
      toast.error('Please enter a database name');
      return;
    }
    if (!dbUsername.trim()) {
      toast.error('Please enter a database username');
      return;
    }
    if (!dbPassword.trim()) {
      toast.error('Please enter a database password');
      return;
    }

    createDatabase({
      project_id: projectId || '',
      databaseType: selectedDatabase,
      name,
      description,
      databaseUserName: dbUsername,
      databasePassword: dbPassword,
      databaseName: name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(),
    });
  };

  const databaseTypes = [
    {
      name: 'Postgres',
      type: DatabaseType.postgres,
      icon: <img src="/postgres.svg" alt="Postgres" className="h-10 w-10" />,
    },
    {
      name: 'MySQL',
      type: DatabaseType.mysql,
      icon: <img src="/mysql.svg" alt="MySQL" className="h-10 w-10" />,
    },
    {
      name: 'MongoDB',
      type: DatabaseType.mongodb,
      icon: <img src="/mongodb.svg" alt="MongoDB" className="h-10 w-10" />,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] p-8">
        <DialogHeader>
          <DialogTitle>New Database</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {databaseTypes.map((db) => (
              <Card
                key={db.name}
                className={`cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg ${
                  selectedDatabase === db.type ? 'border-2 border-primary scale-105' : 'border'
                } p-6`}
                onClick={() => setSelectedDatabase(db.type)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    {db.name}
                    {selectedDatabase === db.type && <Check className="h-5 w-5 text-primary" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">{db.icon}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Database Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder="Database Username"
              value={dbUsername}
              onChange={(e) => setDbUsername(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <input
              type="password"
              placeholder="Database Password"
              value={dbPassword}
              onChange={(e) => setDbPassword(e.target.value)}
              className="border rounded px-3 py-2 w-full"
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded px-3 py-2 w-full resize-none"
              rows={3}
            />
          </div>
        </div>
        <Button
          disabled={!selectedDatabase || !name.trim() || !dbUsername.trim() || !dbPassword.trim() || isPending}
          onClick={handleCreateDatabase}
        >
          Create Database
        </Button>
      </DialogContent>
    </Dialog>
  );
}
