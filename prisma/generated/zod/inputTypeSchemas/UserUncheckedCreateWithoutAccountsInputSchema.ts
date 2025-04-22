import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from './SessionUncheckedCreateNestedManyWithoutUserInputSchema';
import { RecordUncheckedCreateNestedManyWithoutUserInputSchema } from './RecordUncheckedCreateNestedManyWithoutUserInputSchema';
import { PasskeyUncheckedCreateNestedManyWithoutUserInputSchema } from './PasskeyUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  watchLogs: z.lazy(() => RecordUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput>;

export default UserUncheckedCreateWithoutAccountsInputSchema;
