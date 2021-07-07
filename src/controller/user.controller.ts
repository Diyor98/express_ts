import { Request, Response } from 'express';
import { omit } from 'lodash';
import { createUser } from '../service/user.service';
import log from '../logger';

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    res.send(omit(user.toJSON(), 'password'));
  } catch (error: unknown) {
    const _error = error as Error;
    log.error(_error);
    res.status(409).send({ error: _error.message });
  }
}
