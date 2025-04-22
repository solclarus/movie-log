import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { RecordScalarWhereInputSchema } from './RecordScalarWhereInputSchema';
import { RecordUpdateManyMutationInputSchema } from './RecordUpdateManyMutationInputSchema';
import { RecordUncheckedUpdateManyWithoutUserInputSchema } from './RecordUncheckedUpdateManyWithoutUserInputSchema';

export const RecordUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.RecordUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => RecordScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RecordUpdateManyMutationInputSchema),z.lazy(() => RecordUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.RecordUpdateManyWithWhereWithoutUserInput>;

export default RecordUpdateManyWithWhereWithoutUserInputSchema;
