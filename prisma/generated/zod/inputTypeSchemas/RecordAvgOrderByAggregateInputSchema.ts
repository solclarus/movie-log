import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const RecordAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RecordAvgOrderByAggregateInput> = z.object({
  tmdbMovieId: z.lazy(() => SortOrderSchema).optional(),
  rating: z.lazy(() => SortOrderSchema).optional()
}).strict() as z.ZodType<Prisma.RecordAvgOrderByAggregateInput>;

export default RecordAvgOrderByAggregateInputSchema;
