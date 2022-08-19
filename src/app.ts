import express from 'express';

import mongoose from 'mongoose';

import { celebrate, Joi, errors } from 'celebrate';

import userRouters from './routes/users';
import cardRouters from './routes/cards';

import errorsHandler from './middlewares/errors-handler';

import { createUser, login } from './controllers/users';

import auth from './middlewares/auth';

import { requestLogger, errorLogger } from './middlewares/logger';
import { PictureUrlPattern } from './utils/const';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json()); // вернет функцию, иерархия важна
app.use(express.urlencoded({ extended: true })); // для отправки глубоковложеных конструкций

// подключаемся к серверу MongoiDB
mongoose.connect('mongodb://localhost:27017/mestodb');

// поключить логгер запросов

app.use(requestLogger);

// роуты доступные всем пользователям
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(PictureUrlPattern).message('Url аватара указан некорректно'),
  }),
}), createUser);

// защита авторизацией
app.use(auth);

// зашищенные роуты
app.use('/users', userRouters);
app.use('/cards', cardRouters);

// логгер ошибок celebrate
app.use(errors());

// логгер ошибок
app.use(errorLogger);

// централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App starts on port ${PORT}`);
});
