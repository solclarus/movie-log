import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutWatchLogsInputSchema } from './UserCreateWithoutWatchLogsInputSchema';
import { UserUncheckedCreateWithoutWatchLogsInputSchema } from './UserUncheckedCreateWithoutWatchLogsInputSchema';
import { UserCreateOrConnectWithoutWatchLogsInputSchema } from './UserCreateOrConnectWithoutWatchLogsInputSchema';
import { UserUpsertWithoutWatchLogsInputSchema } from './UserUpsertWithoutWatchLogsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutWatchLogsInputSchema } from './UserUpdateToOneWithWhereWithoutWatchLogsInputSchema';
import { UserUpdateWithoutWatchLogsInputSchema } from './UserUpdateWithoutWatchLogsInputSchema';
import { UserUncheckedUpdateWithoutWatchLogsInputSchema } from './UserUncheckedUpdateWithoutWatchLogsInputSchema';

export const UserUpdateOneRequiredWithoutWatchLogsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutWatchLogsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutWatchLogsInputSchema),z.lazy(() => UserUncheckedCreateWithoutWatchLogsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutWatchLogsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutWatchLogsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutWatchLogsInputSchema),z.lazy(() => UserUpdateWithoutWatchLogsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutWatchLogsInputSchema) ]).optional(),
}).strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutWatchLogsNestedInput>;

export default UserUpdateOneRequiredWithoutWatchLogsNestedInputSchema;
