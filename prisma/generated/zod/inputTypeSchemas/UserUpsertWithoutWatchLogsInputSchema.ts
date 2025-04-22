import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutWatchLogsInputSchema } from './UserUpdateWithoutWatchLogsInputSchema';
import { UserUncheckedUpdateWithoutWatchLogsInputSchema } from './UserUncheckedUpdateWithoutWatchLogsInputSchema';
import { UserCreateWithoutWatchLogsInputSchema } from './UserCreateWithoutWatchLogsInputSchema';
import { UserUncheckedCreateWithoutWatchLogsInputSchema } from './UserUncheckedCreateWithoutWatchLogsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutWatchLogsInputSchema: z.ZodType<Prisma.UserUpsertWithoutWatchLogsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutWatchLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWatchLogsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutWatchLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWatchLogsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserUpsertWithoutWatchLogsInput>;

export default UserUpsertWithoutWatchLogsInputSchema;
