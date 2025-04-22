import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PasskeyWhereUniqueInputSchema } from './PasskeyWhereUniqueInputSchema';
import { PasskeyUpdateWithoutUserInputSchema } from './PasskeyUpdateWithoutUserInputSchema';
import { PasskeyUncheckedUpdateWithoutUserInputSchema } from './PasskeyUncheckedUpdateWithoutUserInputSchema';

export const PasskeyUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PasskeyUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => PasskeyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PasskeyUpdateWithoutUserInputSchema),z.lazy(() => PasskeyUncheckedUpdateWithoutUserInputSchema) ]),
}).strict() as z.ZodType<Prisma.PasskeyUpdateWithWhereUniqueWithoutUserInput>;

export default PasskeyUpdateWithWhereUniqueWithoutUserInputSchema;
