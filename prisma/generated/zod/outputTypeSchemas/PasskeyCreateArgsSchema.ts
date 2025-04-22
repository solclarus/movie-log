import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { PasskeyIncludeSchema } from '../inputTypeSchemas/PasskeyIncludeSchema'
import { PasskeyCreateInputSchema } from '../inputTypeSchemas/PasskeyCreateInputSchema'
import { PasskeyUncheckedCreateInputSchema } from '../inputTypeSchemas/PasskeyUncheckedCreateInputSchema'
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

export const PasskeyCreateArgsSchema: z.ZodType<Prisma.PasskeyCreateArgs> = z.object({
  select: PasskeySelectSchema.optional(),
  include: z.lazy(() => PasskeyIncludeSchema).optional(),
  data: z.union([ PasskeyCreateInputSchema,PasskeyUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.PasskeyCreateArgs>;

export default PasskeyCreateArgsSchema;
