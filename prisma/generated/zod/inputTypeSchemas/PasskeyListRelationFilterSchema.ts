import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { PasskeyWhereInputSchema } from './PasskeyWhereInputSchema';

export const PasskeyListRelationFilterSchema: z.ZodType<Prisma.PasskeyListRelationFilter> = z.object({
  every: z.lazy(() => PasskeyWhereInputSchema).optional(),
  some: z.lazy(() => PasskeyWhereInputSchema).optional(),
  none: z.lazy(() => PasskeyWhereInputSchema).optional()
}).strict() as z.ZodType<Prisma.PasskeyListRelationFilter>;

export default PasskeyListRelationFilterSchema;
