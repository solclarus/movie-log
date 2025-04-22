import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecordIncludeSchema } from '../inputTypeSchemas/RecordIncludeSchema'
import { RecordCreateInputSchema } from '../inputTypeSchemas/RecordCreateInputSchema'
import { RecordUncheckedCreateInputSchema } from '../inputTypeSchemas/RecordUncheckedCreateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RecordSelectSchema: z.ZodType<Prisma.RecordSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  tmdbMovieId: z.boolean().optional(),
  watchDate: z.boolean().optional(),
  rating: z.boolean().optional(),
  review: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  venue: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const RecordCreateArgsSchema: z.ZodType<Prisma.RecordCreateArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: z.lazy(() => RecordIncludeSchema).optional(),
  data: z.union([ RecordCreateInputSchema,RecordUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.RecordCreateArgs>;

export default RecordCreateArgsSchema;
