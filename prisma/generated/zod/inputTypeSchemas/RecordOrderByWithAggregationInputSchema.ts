import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { RecordCountOrderByAggregateInputSchema } from './RecordCountOrderByAggregateInputSchema';
import { RecordAvgOrderByAggregateInputSchema } from './RecordAvgOrderByAggregateInputSchema';
import { RecordMaxOrderByAggregateInputSchema } from './RecordMaxOrderByAggregateInputSchema';
import { RecordMinOrderByAggregateInputSchema } from './RecordMinOrderByAggregateInputSchema';
import { RecordSumOrderByAggregateInputSchema } from './RecordSumOrderByAggregateInputSchema';

export const RecordOrderByWithAggregationInputSchema: z.ZodType<Prisma.RecordOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  tmdbMovieId: z.lazy(() => SortOrderSchema).optional(),
  watchDate: z.lazy(() => SortOrderSchema).optional(),
  rating: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  review: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isPublic: z.lazy(() => SortOrderSchema).optional(),
  venue: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RecordCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RecordAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RecordMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RecordMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RecordSumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.RecordOrderByWithAggregationInput>;

export default RecordOrderByWithAggregationInputSchema;
