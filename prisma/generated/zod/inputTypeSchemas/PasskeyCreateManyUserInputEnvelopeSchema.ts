import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PasskeyCreateManyUserInputSchema } from './PasskeyCreateManyUserInputSchema';

export const PasskeyCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PasskeyCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PasskeyCreateManyUserInputSchema),z.lazy(() => PasskeyCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict() as z.ZodType<Prisma.PasskeyCreateManyUserInputEnvelope>;

export default PasskeyCreateManyUserInputEnvelopeSchema;
