import { NextFunction, Request, Response } from 'express';

import { IError } from '../utils/types';
import { COMMON_ERROR_STATUS_CODE, COMMON_ERROR_TEXT } from '../utils/const';

const getError = (err: IError) => {
  if (err.statusCode) {
    return err;
  }

  return { ...err, statusCode: COMMON_ERROR_STATUS_CODE };
};

const errorsHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { statusCode, message } = getError(err);
  res.status(statusCode).send({
    message:
      statusCode === COMMON_ERROR_STATUS_CODE ? COMMON_ERROR_TEXT : message,
  });
  next();
};

export default errorsHandler;
