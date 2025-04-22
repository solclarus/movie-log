import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecordWhereUniqueInputSchema } from './RecordWhereUniqueInputSchema';
import { RecordCreateWithoutUserInputSchema } from './RecordCreateWithoutUserInputSchema';
import { RecordUncheckedCreateWithoutUserInputSchema } from './RecordUncheckedCreateWithoutUserInputSchema';

export const RecordCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.RecordCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => RecordWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RecordCreateWithoutUserInputSchema),z.lazy(() => RecordUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RecordCreateOrConnectWithoutUserInput>;

export default RecordCreateOrConnectWithoutUserInputSchema;
