import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecordCreateWithoutUserInputSchema } from './RecordCreateWithoutUserInputSchema';
import { RecordUncheckedCreateWithoutUserInputSchema } from './RecordUncheckedCreateWithoutUserInputSchema';
import { RecordCreateOrConnectWithoutUserInputSchema } from './RecordCreateOrConnectWithoutUserInputSchema';
import { RecordUpsertWithWhereUniqueWithoutUserInputSchema } from './RecordUpsertWithWhereUniqueWithoutUserInputSchema';
import { RecordCreateManyUserInputEnvelopeSchema } from './RecordCreateManyUserInputEnvelopeSchema';
import { RecordWhereUniqueInputSchema } from './RecordWhereUniqueInputSchema';
import { RecordUpdateWithWhereUniqueWithoutUserInputSchema } from './RecordUpdateWithWhereUniqueWithoutUserInputSchema';
import { RecordUpdateManyWithWhereWithoutUserInputSchema } from './RecordUpdateManyWithWhereWithoutUserInputSchema';
import { RecordScalarWhereInputSchema } from './RecordScalarWhereInputSchema';

export const RecordUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.RecordUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => RecordCreateWithoutUserInputSchema),z.lazy(() => RecordCreateWithoutUserInputSchema).array(),z.lazy(() => RecordUncheckedCreateWithoutUserInputSchema),z.lazy(() => RecordUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RecordCreateOrConnectWithoutUserInputSchema),z.lazy(() => RecordCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RecordUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecordUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RecordCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RecordWhereUniqueInputSchema),z.lazy(() => RecordWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RecordUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => RecordUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RecordUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => RecordUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RecordScalarWhereInputSchema),z.lazy(() => RecordScalarWhereInputSchema).array() ]).optional(),
}).strict() as z.ZodType<Prisma.RecordUpdateManyWithoutUserNestedInput>;

export default RecordUpdateManyWithoutUserNestedInputSchema;
