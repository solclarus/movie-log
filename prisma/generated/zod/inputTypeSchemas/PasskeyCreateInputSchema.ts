import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutPasskeysInputSchema } from './UserCreateNestedOneWithoutPasskeysInputSchema';

export const PasskeyCreateInputSchema: z.ZodType<Prisma.PasskeyCreateInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  publicKey: z.string(),
  credentialID: z.string(),
  counter: z.number().int(),
  deviceType: z.string(),
  backedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutPasskeysInputSchema)
}).strict() as z.ZodType<Prisma.PasskeyCreateInput>;

export default PasskeyCreateInputSchema;
