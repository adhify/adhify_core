import z from 'zod';

export const ZIdInput = z.object({ id: z.string() });

export const ZProjectIdInput = z.object({ projectId: z.string() });
