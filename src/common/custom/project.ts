import z from 'zod';
import { ProjectSchema } from '../validation/generated';

export const ZProject = ProjectSchema;

export type IProject = (typeof ZProject)['_output'];

export const ZProjects = ZProject.array();

export type IProjects = (typeof ZProjects)['_output'];

export const ZProjectCreateInput = ProjectSchema.pick({
  name: true,
  description: true,
});

export type IProjectCreateInput = (typeof ZProjectCreateInput)['_output'];

export const ZProjectUpdateInput = ProjectSchema.pick({
  id: true,
  name: true,
  description: true,
});

export type IProjectUpdateInput = (typeof ZProjectUpdateInput)['_output'];

export const ZProjectWithStats = ZProject.extend({
  stats: z
    .object({
      apps: z.number(),
      databases: z.number(),
    })
    .nullable(),
}).nullable();

export type IProjectWithStats = (typeof ZProjectWithStats)['_output'];
