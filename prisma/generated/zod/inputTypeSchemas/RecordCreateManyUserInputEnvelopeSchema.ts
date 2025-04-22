import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecordCreateManyUserInputSchema } from './RecordCreateManyUserInputSchema';

export const RecordCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.RecordCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RecordCreateManyUserInputSchema),z.lazy(() => RecordCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.RecordCreateManyUserInputEnvelope>;

export default RecordCreateManyUserInputEnvelopeSchema;
