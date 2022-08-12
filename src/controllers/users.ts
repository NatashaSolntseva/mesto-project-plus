import { Request, Response, NextFunction } from 'express';

import { SessionRequest } from '../utils/types';
import User from '../models/user';

import NotFoundError from '../errors/not-found-error';
import { NOT_FOUND_USER_ERROR_TEXT } from '../utils/const';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(NOT_FOUND_USER_ERROR_TEXT);
      }
      res.send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({
      data: {
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    }))
    .catch(next);
};

export const updateUser = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  const userId = req.user?._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(NOT_FOUND_USER_ERROR_TEXT);
      }
      res.send({ data: user });
    })
    .catch(next);
};

export const updateAvatar = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user === null) {
        throw new NotFoundError(NOT_FOUND_USER_ERROR_TEXT);
      }
      res.send({ data: user });
    })
    .catch(next);
};
