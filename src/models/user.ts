import mongoose, { Model, Document } from 'mongoose';

import validator from 'validator';

import bcrypt from 'bcrypt';

import UnauthError from '../errors/unauth-error';
import { PictureUrlPattern } from '../utils/const';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<IUser>>
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Поле должно содержать от 2 до 30 символов, пытались отправить: {VALUE}'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов, пытались отправить: {VALUE}'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(input: string) {
        return PictureUrlPattern.test(input);
      },
      message: 'Ссылка на аватар введена не верно',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(input: string) {
        return validator.isEmail(input);
      },
      message: 'Неверный формат Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  /*
  Функция findUserByCredentials не должна быть стрелочной.
  Это сделано, чтобы мы могли пользоваться this.
  Иначе оно было бы задано статически, ведь стрелочные функции
  запоминают значение this при объявлении.
  */
  return this.findOne({ email }).select('+password').then((user: IUser) => {
    if (!user) {
      return Promise.reject(new UnauthError('Неверные почта или пароль'));
    }

    return bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new UnauthError('Неверные почта или пароль'));
        }
        return user;
      });
  });
});

export default mongoose.model<IUser, UserModel>('user', userSchema);
