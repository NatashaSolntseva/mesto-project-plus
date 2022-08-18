import { Router } from 'express';

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
router.get('/me', getCurrentUser); // TODO не работает конфликт с router.get('/:userId', getUserById);,

// обновить пользователя (имя, о себе)
router.patch('/me', updateUser);

// обновить аватар
router.patch('/me/avatar', updateAvatar);

export default router;
