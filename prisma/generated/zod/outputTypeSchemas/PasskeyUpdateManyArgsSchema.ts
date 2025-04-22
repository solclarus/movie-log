import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasskeyUpdateManyMutationInputSchema } from '../inputTypeSchemas/PasskeyUpdateManyMutationInputSchema'
import { PasskeyUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/PasskeyUncheckedUpdateManyInputSchema'
import { PasskeyWhereInputSchema } from '../inputTypeSchemas/PasskeyWhereInputSchema'

export const PasskeyUpdateManyArgsSchema: z.ZodType<Prisma.PasskeyUpdateManyArgs> = z.object({
  data: z.union([ PasskeyUpdateManyMutationInputSchema,PasskeyUncheckedUpdateManyInputSchema ]),
  where: PasskeyWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() as z.ZodType<Prisma.PasskeyUpdateManyArgs>;

export default PasskeyUpdateManyArgsSchema;
