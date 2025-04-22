import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RecordUncheckedCreateInputSchema: z.ZodType<Prisma.RecordUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  tmdbMovieId: z.number().int(),
  watchDate: z.coerce.date(),
  rating: z.number().int().optional().nullable(),
  review: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  venue: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.RecordUncheckedCreateInput>;

export default RecordUncheckedCreateInputSchema;
