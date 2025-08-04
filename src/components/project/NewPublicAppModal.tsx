import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { clientApi } from '@/trpc/react';
import { toast } from 'sonner';
import { BuildPack } from '@prisma/client';
import { BuildPackType } from '@/common/validation/generated';

interface NewAppModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId: string;
}

export function NewPublicAppModal({ open, setOpen, projectId }: NewAppModalProps) {
  const [appName, setAppName] = useState('');
  const [description, setDescription] = useState('');
  const [gitUrl, setGitUrl] = useState('');
  const [appNameError, setAppNameError] = useState<string | undefined>(undefined);
  const [descriptionError, setDescriptionError] = useState<string | undefined>(undefined);
  const [gitUrlError, setGitUrlError] = useState<string | undefined>(undefined);
  const [buildPack, setBuildPack] = useState<BuildPackType>(BuildPack.nixpacks);
  const { mutate: createPublicApp, isPending } = clientApi.app.createPublicGitApp.useMutation({
    onSuccess() {
      toast.success('Project Created Successfully!');
      setOpen(false);
    },
    onError() {
      toast.error('Error Creating Project!');
    },
  });
  const handleConnectGit = () => {
    let hasErrors = false;
    if (!appName) {
      setAppNameError('App Name is required');
      hasErrors = true;
    } else {
      setAppNameError(undefined);
    }
    if (!description) {
      setDescriptionError('Description is required');
      hasErrors = true;
    } else {
      setDescriptionError(undefined);
    }
    if (!gitUrl) {
      setGitUrlError('Git URL is required');
      hasErrors = true;
    } else {
      setGitUrlError(undefined);
    }

    if (hasErrors) {
      return;
    }

    createPublicApp({
      project_id: projectId,
      name: appName,
      description: description,
      git_repository: gitUrl,
      build_pack: buildPack,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New App</DialogTitle>
          <DialogDescription>Connect to your public Git repository to deploy a new application.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              App Name
            </Label>
            <Input
              id="name"
              value={appName}
              onChange={(e) => {
                setAppName(e.target.value);
                setAppNameError(undefined);
              }}
              className="col-span-3"
            />
            {appNameError && <p className="text-red-500 col-span-4">{appNameError}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDescriptionError(undefined);
              }}
              className="col-span-3"
            />
            {descriptionError && <p className="text-red-500 col-span-4">{descriptionError}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="giturl" className="text-right">
              Git URL
            </Label>
            <Input
              id="giturl"
              value={gitUrl}
              onChange={(e) => {
                setGitUrl(e.target.value);
                setGitUrlError(undefined);
              }}
              className="col-span-3"
            />
            {gitUrlError && <p className="text-red-500 col-span-4">{gitUrlError}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="buildpack" className="text-right">
              Build Pack
            </Label>
            <Select onValueChange={(value) => setBuildPack(value as BuildPackType)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a build pack" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={BuildPack.nixpacks}>Nixpacks</SelectItem>
                <SelectItem value={BuildPack.static}>Static</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button disabled={isPending} onClick={handleConnectGit}>
          Connect to Git
        </Button>
      </DialogContent>
    </Dialog>
  );
}
