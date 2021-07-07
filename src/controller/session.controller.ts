import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import { createSession } from '../service/session.service';

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate the email and password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }
  // Create a session
  const session = await createSession(user._id, req.get('user-agent') || '');
  // create access token
  // create refresh token
  // send refresh & access token back
}