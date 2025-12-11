import 'server-only';

import { headers } from 'next/headers';
import { cache } from 'react';

import { createCaller, type MainRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/trpc';

import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { type inferReactQueryProcedureOptions } from '@trpc/react-query';

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: heads,
  });
});

export const serverApi = createCaller(createContext);

export type ReactQueryOptions = inferReactQueryProcedureOptions<MainRouter>;
export type RouterInputs = inferRouterInputs<MainRouter>;
export type RouterOutputs = inferRouterOutputs<MainRouter>;
