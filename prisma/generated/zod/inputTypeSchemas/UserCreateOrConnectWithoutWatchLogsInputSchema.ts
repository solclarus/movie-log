import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutWatchLogsInputSchema } from './UserCreateWithoutWatchLogsInputSchema';
import { UserUncheckedCreateWithoutWatchLogsInputSchema } from './UserUncheckedCreateWithoutWatchLogsInputSchema';

export const UserCreateOrConnectWithoutWatchLogsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutWatchLogsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutWatchLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWatchLogsInputSchema) ]),
}).strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutWatchLogsInput>;

export default UserCreateOrConnectWithoutWatchLogsInputSchema;
