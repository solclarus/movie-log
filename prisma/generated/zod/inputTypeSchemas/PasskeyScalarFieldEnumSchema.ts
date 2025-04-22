import { z } from 'zod';

export const PasskeyScalarFieldEnumSchema = z.enum(['id','name','publicKey','userId','credentialID','counter','deviceType','backedUp','transports','createdAt']);

export default PasskeyScalarFieldEnumSchema;
