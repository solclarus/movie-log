import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const PasskeyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PasskeyOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.PasskeyOrderByRelationAggregateInput>;

export default PasskeyOrderByRelationAggregateInputSchema;
