import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasskeyIncludeSchema } from '../inputTypeSchemas/PasskeyIncludeSchema'
import { PasskeyWhereUniqueInputSchema } from '../inputTypeSchemas/PasskeyWhereUniqueInputSchema'
import { PasskeyCreateInputSchema } from '../inputTypeSchemas/PasskeyCreateInputSchema'
import { PasskeyUncheckedCreateInputSchema } from '../inputTypeSchemas/PasskeyUncheckedCreateInputSchema'
import { PasskeyUpdateInputSchema } from '../inputTypeSchemas/PasskeyUpdateInputSchema'
import { PasskeyUncheckedUpdateInputSchema } from '../inputTypeSchemas/PasskeyUncheckedUpdateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PasskeySelectSchema: z.ZodType<Prisma.PasskeySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  publicKey: z.boolean().optional(),
  userId: z.boolean().optional(),
  credentialID: z.boolean().optional(),
  counter: z.boolean().optional(),
  deviceType: z.boolean().optional(),
  backedUp: z.boolean().optional(),
  transports: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const PasskeyUpsertArgsSchema: z.ZodType<Prisma.PasskeyUpsertArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: z.lazy(() => PasskeyIncludeSchema).optional(),
  where: PasskeyWhereUniqueInputSchema,
  create: z.union([ PasskeyCreateInputSchema,PasskeyUncheckedCreateInputSchema ]),
  update: z.union([ PasskeyUpdateInputSchema,PasskeyUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.PasskeyUpsertArgs>;

export default PasskeyUpsertArgsSchema;
