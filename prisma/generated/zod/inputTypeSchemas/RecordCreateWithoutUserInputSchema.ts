import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const RecordCreateWithoutUserInputSchema: z.ZodType<Prisma.RecordCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  tmdbMovieId: z.number().int(),
  watchDate: z.coerce.date(),
  rating: z.number().int().optional().nullable(),
  review: z.string().optional().nullable(),
  isPublic: z.boolean().optional(),
  venue: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict() as z.ZodType<Prisma.RecordCreateWithoutUserInput>;

export default RecordCreateWithoutUserInputSchema;
