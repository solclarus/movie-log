import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SortOrderInputSchema } from './SortOrderInputSchema';
import { PasskeyCountOrderByAggregateInputSchema } from './PasskeyCountOrderByAggregateInputSchema';
import { PasskeyAvgOrderByAggregateInputSchema } from './PasskeyAvgOrderByAggregateInputSchema';
import { PasskeyMaxOrderByAggregateInputSchema } from './PasskeyMaxOrderByAggregateInputSchema';
import { PasskeyMinOrderByAggregateInputSchema } from './PasskeyMinOrderByAggregateInputSchema';
import { PasskeySumOrderByAggregateInputSchema } from './PasskeySumOrderByAggregateInputSchema';

export const PasskeyOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasskeyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  publicKey: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  credentialID: z.lazy(() => SortOrderSchema).optional(),
  counter: z.lazy(() => SortOrderSchema).optional(),
  deviceType: z.lazy(() => SortOrderSchema).optional(),
  backedUp: z.lazy(() => SortOrderSchema).optional(),
  transports: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => PasskeyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PasskeyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PasskeyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PasskeyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PasskeySumOrderByAggregateInputSchema).optional()
}).strict() as z.ZodType<Prisma.PasskeyOrderByWithAggregationInput>;

export default PasskeyOrderByWithAggregationInputSchema;
