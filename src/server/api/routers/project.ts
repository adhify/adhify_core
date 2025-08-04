import { createTRPCRouter, authroizedProcedure } from '../trpc';
import { Prisma, ResourceType } from '@prisma/client';
import slugify from 'slugify';
import {
  IResources,
  ZProjectCreateInput,
  ZProjects,
  ZProjectUpdateInput,
  ZProjectWithStats,
  ZResources,
} from '@/common/custom/project';
import { ZIdInput, ZProjectIdInput } from '@/common/custom';
import { callCoolifyApi } from '@/util/coolify/coolifyApi';
import { error } from 'console';
import { IAppMetaSchema } from '@/common/custom/apps';
import { generateDBUrl } from '@/util/generateDBUrl';

interface CreateProjectPayload {
  name: string;
  description?: string;
}
interface CreateProjectResponse {
  uuid: string;
}
interface UpdateProjectPayload {
  name: string;
  description?: string;
}

export const projectRouter = createTRPCRouter({
  create: authroizedProcedure.input(ZProjectCreateInput).mutation(async ({ ctx, input }) => {
    const useremail = ctx.supabaseUser?.email;
    const userSub = ctx.supabaseUser?.id;
    if (!useremail || !userSub) {
      throw new Error('User email or id is missing');
    }
    const slug = slugify(`${useremail}-${input.name}`, { lower: true, strict: true });

    const createProjectPayload: CreateProjectPayload = { name: input.name, description: input.description || '' };

    const response = await callCoolifyApi<CreateProjectResponse, CreateProjectPayload>({
      endpoint: '/projects',
      method: 'POST',
      payload: createProjectPayload,
    });

    return ctx.db.project.create({
      data: {
        name: input.name,
        uuid: response.uuid,
        description: input.description,
        slug,
        userSub: userSub,
      },
    });
  }),

  get: authroizedProcedure
    .input(ZIdInput)
    .output(ZProjectWithStats)
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findUnique({
        where: { id: input.id, userSub: ctx.supabaseUser?.id },
      });

      const appCount = await ctx.db.app.count({
        where: {
          userSub: ctx.supabaseUser?.id,
          resource: {
            project: {
              id: input.id,
              userSub: ctx.supabaseUser?.id,
            },
          },
        },
      });

      const dbCount = await ctx.db.database.count({
        where: {
          userSub: ctx.supabaseUser?.id,
          resource: {
            project: {
              id: input.id,
              userSub: ctx.supabaseUser?.id,
            },
          },
        },
      });
      if (!project) throw new Error('Project Not Found');
      return { ...project, stats: { apps: appCount, databases: dbCount } };
    }),

  getResources: authroizedProcedure
    .input(ZProjectIdInput)
    .output(ZResources)
    .query(async ({ ctx, input }) => {
      const resources = await ctx.db.resource.findMany({
        where: { projectId: input.projectId, userSub: ctx.supabaseUser?.id },
        include: {
          app: true,
          database: true,
        },
      });
      if (!resources) {
        return [];
      }
      const resourcesWithMeta: IResources = await Promise.all(
        resources.map(async (resource) => {
          if (resource.type === ResourceType.APP && resource.app?.id) {
            const appMeta: IAppMetaSchema = await callCoolifyApi<IAppMetaSchema>({
              endpoint: `/applications/${resource.app?.uuid}`,
              method: 'GET',
            });
            return { ...resource, app: { ...resource.app, meta: appMeta } };
          } else if (resource.type === ResourceType.DATABASE && resource.database?.id) {
            const dbMeta: any = await callCoolifyApi({
              endpoint: `/databases/${resource.database?.uuid}`,
              method: 'GET',
            });
            const dbUrl = generateDBUrl(resource);
            return { ...resource, database: { ...resource.database, meta: { ...dbMeta, dbString: dbUrl } } };
          } else {
            throw new Error('Error getting resources');
          }
        })
      );
      ZResources.parse(resourcesWithMeta);
      return resourcesWithMeta;
    }),

  list: authroizedProcedure.output(ZProjects).query(async ({ ctx }) => {
    return ctx.db.project.findMany({
      where: { userSub: ctx.supabaseUser?.id },
    });
  }),

  update: authroizedProcedure.input(ZProjectUpdateInput).mutation(async ({ ctx, input }) => {
    let data: Prisma.ProjectUpdateInput = {};
    if (input.name) {
      const useremail = ctx.supabaseUser?.email;
      data.name = input.name;
      data.slug = slugify(`${useremail}-${input.name}`, { lower: true, strict: true });
    }
    if (input.description !== undefined) {
      data.description = input.description;
    }
    const localData = await ctx.db.project.update({
      where: { id: input.id, userSub: ctx.supabaseUser?.id },
      data,
    });

    const updateProjectPayload: UpdateProjectPayload = { name: input.name, description: input.description || '' };
    await callCoolifyApi<null, UpdateProjectPayload>({
      endpoint: `/projects/${localData.uuid}`,
      method: 'PATCH',
      payload: updateProjectPayload,
    });
    return localData;
  }),

  delete: authroizedProcedure.input(ZIdInput).mutation(async ({ ctx, input }) => {
    const project = await ctx.db.project.findUnique({
      where: { id: input.id, userSub: ctx.supabaseUser?.id },
    });

    if (!project) throw error('Project Not Found');

    try {
      await callCoolifyApi<null, UpdateProjectPayload>({
        endpoint: `/projects/${project.uuid}`,
        method: 'DELETE',
      });
    } catch (error: Error | any) {
      if (error.message.includes('Project has resources, so it cannot be deleted.'))
        throw new Error('Project has resources, so it cannot be deleted.');
      throw new Error('Error deleting project from Coolify');
    }
    return ctx.db.project.delete({
      where: { id: input.id, userSub: ctx.supabaseUser?.id },
    });
  }),
});
