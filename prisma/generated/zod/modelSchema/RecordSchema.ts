import { z } from 'zod';

/////////////////////////////////////////
// RECORD SCHEMA
/////////////////////////////////////////

export const RecordSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  tmdbMovieId: z.number().int(),
  watchDate: z.coerce.date(),
  rating: z.number().int().nullable(),
  review: z.string().nullable(),
  isPublic: z.boolean(),
  venue: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Record = z.infer<typeof RecordSchema>

export default RecordSchema;
