import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const PasskeySumOrderByAggregateInputSchema: z.ZodType<Prisma.PasskeySumOrderByAggregateInput> = z.object({
  counter: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.PasskeySumOrderByAggregateInput>;

export default PasskeySumOrderByAggregateInputSchema;
