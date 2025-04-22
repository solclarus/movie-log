import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RecordSumOrderByAggregateInputSchema: z.ZodType<Prisma.RecordSumOrderByAggregateInput> = z.object({
  tmdbMovieId: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RecordSumOrderByAggregateInput>;

export default RecordSumOrderByAggregateInputSchema;
