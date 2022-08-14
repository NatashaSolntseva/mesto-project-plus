import mongoose from 'mongoose';

import { IUser } from '../utils/types';

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Поле должно содержать от 2 до 30 символов, пытались отправить: {VALUE}'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов, опытались отправить: {VALUE}'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Поле должно содержать от 2 до 30 символов, пытались отправить: {VALUE}'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов, пытались отправить: {VALUE}'],
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>('user', userSchema);
