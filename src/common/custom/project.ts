import z from 'zod';
import { AppSchema, DatabaseSchema, ProjectSchema, ResourceSchema } from '../validation/generated';
import { ZAppMetaSchema } from './apps';

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
  stats: z.object({
    apps: z.number(),
    databases: z.number(),
  }),
});

export type IProjectWithStats = (typeof ZProjectWithStats)['_output'];

export const ZResource = ResourceSchema.extend({
  app: AppSchema.extend({
    meta: ZAppMetaSchema.optional(),
  }).nullable(),
  database: DatabaseSchema.extend({
    meta: z.any().optional(),
  }).nullable(),
});

export type IResource = (typeof ZResource)['_output'];

export const ZResources = ZResource.array();

export type IResources = (typeof ZResources)['_output'];
