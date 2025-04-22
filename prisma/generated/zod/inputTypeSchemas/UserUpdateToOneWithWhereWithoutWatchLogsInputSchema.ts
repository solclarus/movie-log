import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutWatchLogsInputSchema } from './UserUpdateWithoutWatchLogsInputSchema';
import { UserUncheckedUpdateWithoutWatchLogsInputSchema } from './UserUncheckedUpdateWithoutWatchLogsInputSchema';

export const UserUpdateToOneWithWhereWithoutWatchLogsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWatchLogsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutWatchLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWatchLogsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutWatchLogsInput>;

export default UserUpdateToOneWithWhereWithoutWatchLogsInputSchema;
