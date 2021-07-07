import { LeanDocument } from 'mongoose';
import Session, { SessionDocument } from '../model/session.model';
import { UserDocument } from '../model/user.model';

export async function createSession(userId: string, userAgent: string) {
  const session = await Session.create({ user: userId, userAgent });

  return session.toJSON();
}
