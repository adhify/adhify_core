import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { ZUserSync } from '@/common/custom/user';

export const authRouter = createTRPCRouter({
  sync: publicProcedure.input(ZUserSync).mutation(async ({ ctx, input }) => {
    const { sub, name, email, status } = input;
    return ctx.db.$transaction(async (tx: any) => {
      const user = await tx.user.upsert({
        where: { email: email },
        create: {
          email: email,
          name: name,
          sub: sub,
          status: status,
        },
        update: {
          name: name,
          status: status,
          sub: sub,
          lastLoginAt: status === 'ACTIVE' ? new Date() : undefined,
        },
      });
    });
  }),
});
