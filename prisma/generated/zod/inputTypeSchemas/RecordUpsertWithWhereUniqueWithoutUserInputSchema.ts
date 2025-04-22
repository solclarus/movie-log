import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecordWhereUniqueInputSchema } from './RecordWhereUniqueInputSchema';
import { RecordUpdateWithoutUserInputSchema } from './RecordUpdateWithoutUserInputSchema';
import { RecordUncheckedUpdateWithoutUserInputSchema } from './RecordUncheckedUpdateWithoutUserInputSchema';
import { RecordCreateWithoutUserInputSchema } from './RecordCreateWithoutUserInputSchema';
import { RecordUncheckedCreateWithoutUserInputSchema } from './RecordUncheckedCreateWithoutUserInputSchema';

export const RecordUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RecordUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RecordWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RecordUpdateWithoutUserInputSchema),z.lazy(() => RecordUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => RecordCreateWithoutUserInputSchema),z.lazy(() => RecordUncheckedCreateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RecordUpsertWithWhereUniqueWithoutUserInput>;

export default RecordUpsertWithWhereUniqueWithoutUserInputSchema;
