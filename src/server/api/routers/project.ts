import { createTRPCRouter, authroizedProcedure } from '../trpc';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';
import { ZProjectCreateInput, ZProjects, ZProjectUpdateInput } from '@/common/custom/project';
import { ZIdInput } from '@/common/custom';

export const projectRouter = createTRPCRouter({
  create: authroizedProcedure.input(ZProjectCreateInput).mutation(async ({ ctx, input }) => {
    const useremail = ctx.supabaseUser?.email;
    const userSub = ctx.supabaseUser?.id;
    if (!useremail || !userSub) {
      throw new Error('User email or id is missing');
    }
    const slug = slugify(`${useremail}-${input.name}`, { lower: true, strict: true });
    return ctx.db.project.create({
      data: {
        name: input.name,
        description: input.description,
        slug,
        userSub: userSub,
      },
    });
  }),

  get: authroizedProcedure.input(ZIdInput).query(async ({ ctx, input }) => {
    return ctx.db.project.findUnique({
      where: { id: input.id, userSub: ctx.supabaseUser?.id },
    });
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
    return ctx.db.project.update({
      where: { id: input.id, userSub: ctx.supabaseUser?.id },
      data,
    });
  }),

  delete: authroizedProcedure.input(ZIdInput).mutation(async ({ ctx, input }) => {
    return ctx.db.project.delete({
      where: { id: input.id, userSub: ctx.supabaseUser?.id },
    });
  }),
});
