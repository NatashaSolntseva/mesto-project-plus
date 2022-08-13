import { Router } from 'express';

import {
  getCards,
  createCard,
  putLike,
  deleteLike,
  deleteCard,
} from '../controllers/cards';

const router = Router();

// получить все карточки
router.get('/', getCards); // ресурс - метод
// создать карточку
router.post('/', createCard);
// удалить карточку по id
router.delete('/:cardId', deleteCard);
// поставить лайк
router.put('/:cardId/likes', putLike);
// убрать лайк
router.delete('/:cardId/likes', deleteLike);

export default router;
