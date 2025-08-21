import { ZAppCreateInput, ZAppIdInput } from '@/common/custom/apps';
import { createTRPCRouter, authroizedProcedure } from '../trpc';
import { BuildPack, Prisma, ResourceType } from '@prisma/client';
import { callCoolifyApi } from '@/util/coolify/coolifyApi';
import toValidDomainLabel from '@/util/toValidDomainLabel';
import { ZEnvironmentVariables, ZEnvironmentVariablesCreateInput } from '@/common/custom/environmentVariable';

interface CreateAppPayload {
  project_uuid: string;
  server_uuid: string;
  environment_name: string;
  environment_uuid: string;
  ports_exposes: string;
  name: string;
  description?: string;
  git_repository: string;
  git_branch: string;
  build_pack: string;
  domains: string;
  limits_memory: string;
  limits_memory_swap: string;
  limits_memory_swappiness: number;
  limits_memory_reservation: string;
  limits_cpus: string;
  limits_cpuset: string;
  limits_cpu_shares: number;
}
interface CreateAppResponse {
  uuid: string;
}

interface CreateDeployementResponse {
  deployments: [
    {
      message: string;
      resource_uuid: string;
      deployment_uuid: string;
    },
  ];
}

interface UpdateEnviromentVariablePayload {
  key: string;
  value: string;
  is_build_time: boolean;
  is_preview: boolean;
}

interface UpdateEnviromentVariableResponse {
  uuid: string;
}
export const appRouter = createTRPCRouter({
  createPublicGitApp: authroizedProcedure.input(ZAppCreateInput).mutation(async ({ ctx, input }) => {
    const useremail = ctx.supabaseUser?.email;
    const userSub = ctx.supabaseUser?.id;
    if (!useremail || !userSub) {
      throw new Error('User email or id is missing');
    }

    const project = await ctx.db.project.findUnique({
      where: { id: input.project_id },
    });

    const domainSlug = input.git_repository.split('/').pop();
    const domainLabel = toValidDomainLabel(`${project?.uuid}-${domainSlug}.${process.env.NEXT_PUBLIC_WILDCARD_DOMAIN}`);

    if (!project) throw new Error('Project Not Found');
    const createAppPayload: CreateAppPayload = {
      name: input.name,
      description: input.description || '',
      project_uuid: project?.uuid,
      server_uuid: process.env.NEXT_PUBLIC_SERVER_UUID as string,
      environment_name: 'production',
      environment_uuid: process.env.NEXT_PUBLIC_COOLIFY_ENV_UUID as string,
      ports_exposes: input.build_pack === BuildPack.nixpacks ? '3000' : '80',
      git_repository: input.git_repository,
      git_branch: 'main',
      build_pack: input.build_pack,
      domains: `https://${domainLabel}`,
      limits_memory: '256m',
      limits_memory_swap: '0',
      limits_memory_swappiness: 0,
      limits_memory_reservation: '256m',
      limits_cpus: '0.1',
      limits_cpuset: '0',
      limits_cpu_shares: 512,
    };

    const response = await callCoolifyApi<CreateAppResponse, CreateAppPayload>({
      endpoint: '/applications/public',
      method: 'POST',
      payload: createAppPayload,
    });

    return ctx.db.resource.create({
      data: {
        projectId: project.id,
        envId: process.env.NEXT_PUBLIC_COOLIFY_ENV_UUID as string,

        type: ResourceType.APP,

        app: {
          create: {
            uuid: response.uuid,
            name: input.name,
            description: input.description,
            git_repository: input.git_repository,
            build_pack: input.build_pack,
            userSub: userSub,
          },
        },
        userSub: userSub,
      },
    });
  }),
  deploy: authroizedProcedure.input(ZAppIdInput).mutation(async ({ ctx, input }) => {
    const userSub = ctx.supabaseUser?.id;
    if (!userSub) {
      throw new Error('User id is missing');
    }
    const app = await ctx.db.app.findUnique({
      where: { id: input.appId, userSub: userSub },
    });

    if (!app) throw new Error('App not found');

    const response = await callCoolifyApi<CreateDeployementResponse>({
      endpoint: `/deploy?uuid=${app.uuid}`,
      method: 'POST',
    });
    if (!response) throw new Error('Deployment failed');
    const deployment = response.deployments[0];
    await ctx.db.deployment.create({
      data: {
        uuid: deployment.deployment_uuid,
        appId: app.id,
        message: deployment.message,
        userSub: userSub,
      },
    });

    return { success: true };
  }),
  getEnviromentVariables: authroizedProcedure
    .input(ZAppIdInput)
    .output(ZEnvironmentVariables)
    .query(async ({ ctx, input }) => {
      const useremail = ctx.supabaseUser?.email;
      const userSub = ctx.supabaseUser?.id;
      if (!useremail || !userSub) {
        throw new Error('User email or id is missing');
      }

      const app = await ctx.db.app.findUnique({
        where: { id: input.appId },
      });

      if (!app) {
        throw new Error('App not found');
      }
      const envVariables = await ctx.db.environmentVariables.findMany({
        where: { appId: app.id },
      });
      return envVariables;
    }),
  createOrUpdateEnvironmentVariable: authroizedProcedure
    .input(ZEnvironmentVariablesCreateInput)
    .output(ZEnvironmentVariables)
    .mutation(async ({ input, ctx }) => {
      const useremail = ctx.supabaseUser?.email;
      const userSub = ctx.supabaseUser?.id;
      if (!useremail || !userSub) {
        throw new Error('User email or id is missing');
      }

      const app = await ctx.db.app.findUnique({
        where: { id: input?.[0]?.appId },
      });

      if (!app) {
        throw new Error('App not found');
      }

      const existingEnvVariables = await ctx.db.environmentVariables.findMany({
        where: { appId: app.id },
      });

      // Delete Non Existing env variable in input
      await Promise.all(
        existingEnvVariables.map(async (envVar) => {
          if (!input.find((item) => item.key === envVar.key)) {
            console.log('Deleteing', envVar.key);
            await callCoolifyApi({
              endpoint: `/applications/${app.uuid}/envs/${envVar.uuid}`,
              method: 'DELETE',
            });
            await ctx.db.environmentVariables.delete({
              where: { id: envVar.id },
            });
          }
        })
      );

      const remainingEnvVariables = await ctx.db.environmentVariables.findMany({
        where: { appId: app.id },
      });

      const envVariables = await Promise.all(
        input.map(async (item) => {
          const updateEnvVariablePayload = {
            key: item.key,
            value: item.value,
            is_build_time: true,
            is_preview: false,
          };
          let response;

          // PATCH if already found , else post
          const existingEnvVar = remainingEnvVariables.find((envVar) => envVar.key === item.key);
          if (existingEnvVar) {
            console.log('Updating', existingEnvVar.key, existingEnvVar.uuid);
            response = await callCoolifyApi<UpdateEnviromentVariableResponse, UpdateEnviromentVariablePayload>({
              endpoint: `/applications/${app.uuid}/envs/${existingEnvVar.uuid}`,
              method: 'PATCH',
              payload: updateEnvVariablePayload,
            });
          } else {
            console.log('Creating', item.key);
            response = await callCoolifyApi<UpdateEnviromentVariableResponse, UpdateEnviromentVariablePayload>({
              endpoint: `/applications/${app.uuid}/envs`,
              method: 'POST',
              payload: updateEnvVariablePayload,
            });
          }

          return await ctx.db.environmentVariables.upsert({
            where: { unique_appid_key: { appId: app.id, key: item.key } },
            update: { value: item.value, userSub: userSub },
            create: {
              key: item.key,
              value: item.value,
              appId: app.id,
              userSub: userSub,
              uuid: response.uuid,
            },
          });
        })
      );
      return envVariables;
    }),
});
