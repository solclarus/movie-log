import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { RecordIncludeSchema } from '../inputTypeSchemas/RecordIncludeSchema'
import { RecordWhereInputSchema } from '../inputTypeSchemas/RecordWhereInputSchema'
import { RecordOrderByWithRelationInputSchema } from '../inputTypeSchemas/RecordOrderByWithRelationInputSchema'
import { RecordWhereUniqueInputSchema } from '../inputTypeSchemas/RecordWhereUniqueInputSchema'
import { RecordScalarFieldEnumSchema } from '../inputTypeSchemas/RecordScalarFieldEnumSchema'
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

export const RecordFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RecordFindFirstOrThrowArgs> = z.object({
  select: RecordSelectSchema.optional(),
  include: z.lazy(() => RecordIncludeSchema).optional(),
  where: RecordWhereInputSchema.optional(),
  orderBy: z.union([ RecordOrderByWithRelationInputSchema.array(),RecordOrderByWithRelationInputSchema ]).optional(),
  cursor: RecordWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RecordScalarFieldEnumSchema,RecordScalarFieldEnumSchema.array() ]).optional(),
}).strict() as z.ZodType<Prisma.RecordFindFirstOrThrowArgs>;

export default RecordFindFirstOrThrowArgsSchema;
