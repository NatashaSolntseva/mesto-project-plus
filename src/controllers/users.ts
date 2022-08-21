import { Request, Response, NextFunction } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SessionRequest } from '../utils/types';
import User from '../models/user';

import NotFoundError from '../errors/not-found-error';
import { CAST_ERROR_TEXT, CONFLICT_ERROR_TEXT, NOT_FOUND_USER_ERROR_TEXT } from '../utils/const';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

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
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(CAST_ERROR_TEXT));
      }
      return next(err);
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        password: user.password,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_ERROR_TEXT));
      }
      return next(err);
    });
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(CAST_ERROR_TEXT));
      }
      return next(err);
    });
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError(CAST_ERROR_TEXT));
      }
      return next(err);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' }),
      });
    })
    .catch(next);
};

export const getCurrentUser = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;

  User.findById(userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};
