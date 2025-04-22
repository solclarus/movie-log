import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const PasskeyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PasskeyAvgOrderByAggregateInput> = z.object({
  counter: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.PasskeyAvgOrderByAggregateInput>;

export default PasskeyAvgOrderByAggregateInputSchema;
