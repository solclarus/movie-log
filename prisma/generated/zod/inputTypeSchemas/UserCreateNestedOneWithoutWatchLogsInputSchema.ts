import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutWatchLogsInputSchema } from './UserCreateWithoutWatchLogsInputSchema';
import { UserUncheckedCreateWithoutWatchLogsInputSchema } from './UserUncheckedCreateWithoutWatchLogsInputSchema';
import { UserCreateOrConnectWithoutWatchLogsInputSchema } from './UserCreateOrConnectWithoutWatchLogsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutWatchLogsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutWatchLogsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWatchLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWatchLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWatchLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutWatchLogsInput>;

export default UserCreateNestedOneWithoutWatchLogsInputSchema;
