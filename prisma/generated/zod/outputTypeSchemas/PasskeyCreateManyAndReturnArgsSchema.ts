import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasskeyCreateManyInputSchema } from '../inputTypeSchemas/PasskeyCreateManyInputSchema'

export const PasskeyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PasskeyCreateManyAndReturnArgs> = z.object({
  data: z.union([ PasskeyCreateManyInputSchema,PasskeyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.PasskeyCreateManyAndReturnArgs>;

export default PasskeyCreateManyAndReturnArgsSchema;
