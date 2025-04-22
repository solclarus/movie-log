import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PasskeyWhereUniqueInputSchema } from './PasskeyWhereUniqueInputSchema';
import { PasskeyCreateWithoutUserInputSchema } from './PasskeyCreateWithoutUserInputSchema';
import { PasskeyUncheckedCreateWithoutUserInputSchema } from './PasskeyUncheckedCreateWithoutUserInputSchema';

export const PasskeyCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PasskeyCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => PasskeyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PasskeyCreateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.PasskeyCreateOrConnectWithoutUserInput>;

export default PasskeyCreateOrConnectWithoutUserInputSchema;
