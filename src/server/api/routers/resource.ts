import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { callCoolifyApi } from '@/util/coolify/coolifyApi'; // Import callCoolifyApi
import { ResourceStatus, ResourceType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { ZResource } from '@/common/custom/project';

export const resourceRouter = createTRPCRouter({
  updateStatus: publicProcedure.input(ZResource).mutation(async ({ ctx, input }) => {
    try {
      let endpoint = '';
      if (input.type === ResourceType.APP) {
        endpoint = `/applications/${input.app?.uuid}/${input.resource_status === ResourceStatus.stopped ? 'start' : 'stop'}`;
      } else if (input.type === ResourceType.DATABASE) {
        endpoint = `/databases/${input.database?.uuid}/${input.resource_status === ResourceStatus.stopped ? 'start' : 'stop'}`;
      }

      await callCoolifyApi({
        endpoint: endpoint,
        method: 'POST',
      });

      // Update the resource status in the Prisma DB
      await ctx.db.resource.update({
        where: {
          id: input.id,
        },
        data: {
          resource_status:
            input.resource_status === ResourceStatus.stopped ? ResourceStatus.running : ResourceStatus.stopped,
        },
      });

      return { success: true };
    } catch (error: any) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Failed to update resource status: ${error.message}`,
      });
    }
  }),
});
