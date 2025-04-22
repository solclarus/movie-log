import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { IntFilterSchema } from './IntFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';
import { DateTimeNullableFilterSchema } from './DateTimeNullableFilterSchema';

export const PasskeyScalarWhereInputSchema: z.ZodType<Prisma.PasskeyScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PasskeyScalarWhereInputSchema),z.lazy(() => PasskeyScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PasskeyScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PasskeyScalarWhereInputSchema),z.lazy(() => PasskeyScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  publicKey: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  credentialID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  counter: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  deviceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backedUp: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  transports: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict() as z.ZodType<Prisma.PasskeyScalarWhereInput>;

export default PasskeyScalarWhereInputSchema;
