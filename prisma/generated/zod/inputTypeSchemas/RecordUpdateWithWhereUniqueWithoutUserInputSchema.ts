import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecordWhereUniqueInputSchema } from './RecordWhereUniqueInputSchema';
import { RecordUpdateWithoutUserInputSchema } from './RecordUpdateWithoutUserInputSchema';
import { RecordUncheckedUpdateWithoutUserInputSchema } from './RecordUncheckedUpdateWithoutUserInputSchema';

export const RecordUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.RecordUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => RecordWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RecordUpdateWithoutUserInputSchema),z.lazy(() => RecordUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RecordUpdateWithWhereUniqueWithoutUserInput>;

export default RecordUpdateWithWhereUniqueWithoutUserInputSchema;
