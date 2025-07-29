import { ProjectSchema } from '../validation/generated';

export const ZProject = ProjectSchema;

export type IProject = (typeof ZProject)['_output'];

export const ZProjects = ZProject.array();

export type IProjects = (typeof ZProjects)['_output'];

export const ZProjectCreateInput = ProjectSchema.pick({
  name: true,
  description: true,
});

export type ProjectCreateInput = (typeof ZProjectCreateInput)['_output'];

export const ZProjectUpdateInput = ProjectSchema.pick({
  id: true,
  name: true,
  description: true,
});

export type ProjectUpdateInput = (typeof ZProjectUpdateInput)['_output'];
