import { exampleRouter } from '@/server/api/routers/example';
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';
import { authRouter } from './routers/auth';
import { projectRouter } from './routers/project';
import { appRouter } from './routers/app';
import { databaseRouter } from './routers/database';
import { resourceRouter } from './routers/resource';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const mainRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  project: projectRouter,
  app: appRouter,
  database: databaseRouter,
  resource: resourceRouter,
});

// export type definition of API
export type MainRouter = typeof mainRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(mainRouter);
