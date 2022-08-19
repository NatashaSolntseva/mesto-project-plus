import { Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';
import { ISessionRequest } from '../utils/types';

import UnauthError from '../errors/unauth-error';

export default (req: ISessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new UnauthError('Необходима авторизация');
  }
  req.user = payload;

  next();
};
