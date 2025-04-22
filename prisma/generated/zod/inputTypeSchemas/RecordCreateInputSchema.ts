import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutWatchLogsInputSchema } from './UserCreateNestedOneWithoutWatchLogsInputSchema';

export const RecordCreateInputSchema: z.ZodType<Prisma.RecordCreateInput> = z.object({
  id: z.string().cuid().optional(),
  tmdbMovieId: z.number().int(),
  watchDate: z.coerce.date(),
  rating: z.number().int().optional().nullable(),
  review: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  venue: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutWatchLogsInputSchema)
}).strict() as z.ZodType<Prisma.RecordCreateInput>;

export default RecordCreateInputSchema;
