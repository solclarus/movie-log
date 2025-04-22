import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecordCreateWithoutUserInputSchema } from './RecordCreateWithoutUserInputSchema';
import { RecordUncheckedCreateWithoutUserInputSchema } from './RecordUncheckedCreateWithoutUserInputSchema';
import { RecordCreateOrConnectWithoutUserInputSchema } from './RecordCreateOrConnectWithoutUserInputSchema';
import { RecordCreateManyUserInputEnvelopeSchema } from './RecordCreateManyUserInputEnvelopeSchema';
import { RecordWhereUniqueInputSchema } from './RecordWhereUniqueInputSchema';

export const RecordUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.RecordUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => RecordCreateWithoutUserInputSchema),z.lazy(() => RecordCreateWithoutUserInputSchema).array(),z.lazy(() => RecordUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecordUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecordCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecordCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecordCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RecordUncheckedCreateNestedManyWithoutUserInput>;

export default RecordUncheckedCreateNestedManyWithoutUserInputSchema;
