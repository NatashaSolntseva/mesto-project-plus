import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import { IdStringPattern, PictureUrlPattern } from '../utils/const';

import {
  getCards,
  createCard,
  putLike,
  deleteLike,
  deleteCard,
} from '../controllers/cards';

const router = Router();

// получить все карточки
router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), getCards); // ресурс - метод

// создать карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(PictureUrlPattern).message('Url карточки указан некорректно'),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
}), createCard);

// удалить карточку по id
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).pattern(IdStringPattern)
      .message('Id карточки указан некорректно'),
  }),
}), deleteCard);

// поставить лайк
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).pattern(IdStringPattern)
      .message('Id карточки указан некорректно'),
  }),
}), putLike);

// убрать лайк
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).pattern(IdStringPattern)
      .message('Id карточки указан некорректно'),
  }),
}), deleteLike);

export default router;
