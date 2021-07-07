import { DocumentDefinition } from 'mongoose';
import User, { UserDocument } from '../model/user.model';
import { omit } from 'lodash';
import log from '../logger';

export async function createUser(input: DocumentDefinition<UserDocument>) {
  try {
    return await User.create(input);
  } catch (error: unknown) {
    const _error = error as Error;
    log.error(_error);
    throw new Error(_error.message);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: UserDocument['email'];
  password: string;
}) {
  const user = await User.findOne({ email });

  if (!user) return false;

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}
