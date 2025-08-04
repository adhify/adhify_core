import { ZAppCreateInput, ZAppIdInput } from '@/common/custom/apps';
import { createTRPCRouter, authroizedProcedure } from '../trpc';
import { BuildPack, DatabaseType, Prisma, ResourceType } from '@prisma/client';
import { callCoolifyApi } from '@/util/coolify/coolifyApi';
import toValidDomainLabel from '@/util/toValidDomainLabel';
import { ZDatabaseCreateInput } from '@/common/custom/database';
import { encryptPassword } from '@/util/encryptPassword';

interface CreateDatabasePayload {
  project_uuid: string;
  server_uuid: string;
  environment_name: string;
  environment_uuid: string;
  postgres_user?: string;
  postgres_password?: string;
  postgres_db?: string;
  mongo_initdb_root_username?: string;
  mongo_initdb_root_password?: string;
  mysql_user?: string;
  mysql_password?: string;
  mysql_database?: string;
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

const createDatabaseUrl: Record<DatabaseType, string> = {
  [DatabaseType.postgres]: '/databases/postgresql',
  [DatabaseType.mysql]: '/databases/mysql',
  [DatabaseType.mongodb]: '/databases/mongodb',
};
export const databaseRouter = createTRPCRouter({
  createDatabase: authroizedProcedure.input(ZDatabaseCreateInput).mutation(async ({ ctx, input }) => {
    const useremail = ctx.supabaseUser?.email;
    const userSub = ctx.supabaseUser?.id;
    if (!useremail || !userSub) {
      throw new Error('User email or id is missing');
    }

    const project = await ctx.db.project.findUnique({
      where: { id: input.project_id },
    });

    if (!project) throw new Error('Project Not Found');
    const createDatabasePayload: CreateDatabasePayload = {
      project_uuid: project?.uuid,
      server_uuid: process.env.NEXT_PUBLIC_SERVER_UUID as string,
      environment_name: 'production',
      environment_uuid: process.env.NEXT_PUBLIC_COOLIFY_ENV_UUID as string,
      ...(input.databaseType === DatabaseType.postgres && {
        postgres_user: input.databaseUserName,
        postgres_password: input.databasePassword,
        postgres_db: input.databaseName,
      }),
      ...(input.databaseType === DatabaseType.mysql && {
        mysql_user: input.databaseUserName,
        mysql_password: input.databasePassword,
        mysql_database: input.databaseName,
      }),
      ...(input.databaseType === DatabaseType.mongodb && {
        mongo_initdb_root_username: input.databaseUserName,
        mongo_initdb_root_password: input.databasePassword,
      }),
    };

    const response = await callCoolifyApi<any, CreateDatabasePayload>({
      endpoint: createDatabaseUrl[input.databaseType],
      method: 'POST',
      payload: createDatabasePayload,
    });

    return ctx.db.resource.create({
      data: {
        projectId: project.id,
        envId: process.env.NEXT_PUBLIC_COOLIFY_ENV_UUID as string,
        type: ResourceType.DATABASE,
        database: {
          create: {
            name: input.name,
            description: input.description || '',
            uuid: response.uuid,
            databaseType: input.databaseType,
            userSub: userSub,
            databaseName: input.databaseName,
            databasePassword: encryptPassword(input.databasePassword),
            databaseUserName: input.databaseUserName,
          },
        },
        userSub: userSub,
      },
    });
  }),
});
