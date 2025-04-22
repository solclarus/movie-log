import { z } from 'zod';

export const RecordScalarFieldEnumSchema = z.enum(['id','userId','tmdbMovieId','watchDate','rating','review','isPublic','venue','createdAt','updatedAt']);

export default RecordScalarFieldEnumSchema;
