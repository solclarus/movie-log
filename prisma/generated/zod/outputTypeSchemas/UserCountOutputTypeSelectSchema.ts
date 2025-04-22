import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
  accounts: z.boolean().optional(),
  watchLogs: z.boolean().optional(),
  passkeys: z.boolean().optional(),
}).strict();

export default UserCountOutputTypeSelectSchema;
