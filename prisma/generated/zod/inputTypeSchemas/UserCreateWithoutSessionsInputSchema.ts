import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';
import { RecordCreateNestedManyWithoutUserInputSchema } from './RecordCreateNestedManyWithoutUserInputSchema';
import { PasskeyCreateNestedManyWithoutUserInputSchema } from './PasskeyCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  watchLogs: z.lazy(() => RecordCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutSessionsInput>;

export default UserCreateWithoutSessionsInputSchema;
