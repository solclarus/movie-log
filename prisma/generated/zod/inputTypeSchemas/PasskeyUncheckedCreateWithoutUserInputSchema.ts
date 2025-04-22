import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const PasskeyUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  publicKey: z.string(),
  credentialID: z.string(),
  counter: z.number().int(),
  deviceType: z.string(),
  backedUp: z.boolean(),
  transports: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict() as z.ZodType<Prisma.PasskeyUncheckedCreateWithoutUserInput>;

export default PasskeyUncheckedCreateWithoutUserInputSchema;
