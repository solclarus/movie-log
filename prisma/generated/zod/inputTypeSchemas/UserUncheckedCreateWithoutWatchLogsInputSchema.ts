import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from './SessionUncheckedCreateNestedManyWithoutUserInputSchema';
import { AccountUncheckedCreateNestedManyWithoutUserInputSchema } from './AccountUncheckedCreateNestedManyWithoutUserInputSchema';
import { PasskeyUncheckedCreateNestedManyWithoutUserInputSchema } from './PasskeyUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutWatchLogsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutWatchLogsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutWatchLogsInput>;

export default UserUncheckedCreateWithoutWatchLogsInputSchema;
