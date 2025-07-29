// CreateEditProjectModal.tsx
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IProject, ProjectCreateInput, ProjectUpdateInput } from '@/common/custom/project';
import { clientApi } from '@/trpc/react';
import { toast } from 'sonner';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectCreateInput | ProjectUpdateInput) => void;
  initialData?: IProject;
};

export function CreateEditProjectModal({ open, onClose, onSubmit, initialData }: Props) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const { mutate: createProject } = clientApi.project.create.useMutation({
    onSuccess() {
      toast.success('Project Created Successfully!');
    },
    onError(error) {
      console.log('Error', error);
      toast.error('Error Creating Project!');
    },
  });
  const { mutate: updateProject } = clientApi.project.update.useMutation({
    onSuccess() {
      toast.success('Project Updated Successfully!');
    },
    onError(error) {
      toast.error('Error Updating Project!');
    },
  });

  const handleSubmit = () => {
    if (initialData?.id) updateProject({ id: initialData.id, name, description });
    else createProject({ name, description });
    onSubmit({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Project' : 'Create Project'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Project Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{initialData ? 'Save' : 'Create'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
