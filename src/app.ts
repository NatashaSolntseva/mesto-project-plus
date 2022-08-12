import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import userRouters from './routes/users';
import cardRouters from './routes/cards';

import errorsHandler from './middlewares/errors-handler';

import { SessionRequest } from './utils/types';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json()); // вернет функцию, иерархия важна
app.use(express.urlencoded({ extended: true })); // для отправки глубоковложеных конструкций

// подключаемся к серверу MongoiDB
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req: SessionRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: '62f0e44442bb93b50a203124',
  };
  next();
});

app.use('/users', userRouters);

app.use('/cards', cardRouters);

// централизованный обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App starts on port ${PORT}`);
});
