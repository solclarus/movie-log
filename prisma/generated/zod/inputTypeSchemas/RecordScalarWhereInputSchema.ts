import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';
import { IntNullableFilterSchema } from './IntNullableFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';

export const RecordScalarWhereInputSchema: z.ZodType<Prisma.RecordScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RecordScalarWhereInputSchema),z.lazy(() => RecordScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RecordScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RecordScalarWhereInputSchema),z.lazy(() => RecordScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tmdbMovieId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  watchDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  rating: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  review: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isPublic: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  venue: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict() as z.ZodType<Prisma.RecordScalarWhereInput>;

export default RecordScalarWhereInputSchema;
