import { Request, Response, NextFunction } from 'express';

import { SessionRequest } from '../utils/types';

import Card from '../models/card';

import NotFoundError from '../errors/not-found-error';

import BadRequestError from '../errors/bad-request-error';
import { NOT_FOUND_CARD_ERROR_TEXT } from '../utils/const';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

export const createCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  const userId = req.user?._id;

  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.send({
        data: card,
      });
    })
    .catch(next);
};

export const deleteCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND_CARD_ERROR_TEXT);
      }

      if (card.owner.toString() !== userId) {
        throw new BadRequestError(
          'Невозможно удалить данную карточку (ограничение прав)',
        );
      }
      return Card.findByIdAndRemove(cardId);
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export const putLike = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND_CARD_ERROR_TEXT);
      }
      res.send({ data: card });
    })
    .catch(next);
};

export const deleteLike = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?._id;
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND_CARD_ERROR_TEXT);
      }
      res.send({ data: card });
    })
    .catch(next);
};
