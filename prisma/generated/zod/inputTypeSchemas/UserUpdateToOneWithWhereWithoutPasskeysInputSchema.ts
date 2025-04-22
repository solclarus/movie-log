import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutPasskeysInputSchema } from './UserUpdateWithoutPasskeysInputSchema';
import { UserUncheckedUpdateWithoutPasskeysInputSchema } from './UserUncheckedUpdateWithoutPasskeysInputSchema';

export const UserUpdateToOneWithWhereWithoutPasskeysInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPasskeysInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutPasskeysInputSchema),z.lazy(() => UserUncheckedUpdateWithoutPasskeysInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPasskeysInput>;

export default UserUpdateToOneWithWhereWithoutPasskeysInputSchema;
