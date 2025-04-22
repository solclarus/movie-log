import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { RecordCreateNestedManyWithoutUserInputSchema } from './RecordCreateNestedManyWithoutUserInputSchema';
import { PasskeyCreateNestedManyWithoutUserInputSchema } from './PasskeyCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  watchLogs: z.lazy(() => RecordCreateNestedManyWithoutUserInputSchema).optional(),
  passkeys: z.lazy(() => PasskeyCreateNestedManyWithoutUserInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateWithoutAccountsInput>;

export default UserCreateWithoutAccountsInputSchema;
