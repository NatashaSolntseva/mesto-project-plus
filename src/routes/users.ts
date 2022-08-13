import { Router } from 'express';

import {
  createUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
} from '../controllers/users';

const router = Router();
// получить всех пользователей
router.get('/', getUsers);

// получить пользователя по id
router.get('/:userId', getUserById);

// создать пользователя - тестовое решение
router.post('/', createUser);

// обновить пользователя (имя, о себе)
router.patch('/me', updateUser);

// обновить аватар
router.patch('/me/avatar', updateAvatar);

export default router;
