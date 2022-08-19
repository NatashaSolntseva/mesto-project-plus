import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { PictureUrlPattern } from '../utils/const';

import {
  getCurrentUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
} from '../controllers/users';

const router = Router();
// получить всех пользователей
router.get('/', getUsers);

// получить пользователя по id
// router.get('/:userId', getUserById);

// получить текущего пользователя
router.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), getCurrentUser);

// обновить пользователя (имя, о себе)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), updateUser);

// обновить аватар
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(PictureUrlPattern).message('Url аватара указан некорректно'),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), updateAvatar);

// По умолчанию Joi не допускает полей,
// которые не перечислены в объекте валидации.
//  Чтобы изменить это поведение,
// нужно после вызова метода keys вызвать метод unknown с аргументом true

export default router;
