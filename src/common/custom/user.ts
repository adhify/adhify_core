import { UserSchema } from '../validation/generated';

export const ZUserSync = UserSchema.pick({
  sub: true,
  name: true,
  email: true,
  status: true,
});
