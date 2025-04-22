import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasskeyWhereInputSchema } from '../inputTypeSchemas/PasskeyWhereInputSchema'

export const PasskeyDeleteManyArgsSchema: z.ZodType<Prisma.PasskeyDeleteManyArgs> = z.object({
  where: PasskeyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.PasskeyDeleteManyArgs>;

export default PasskeyDeleteManyArgsSchema;
