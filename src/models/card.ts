import mongoose from 'mongoose';

import { ICard } from '../utils/types';

const cardSchema = new mongoose.Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Поле должно содержать от 2 до 30 символов, пытались отправить: {VALUE}'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов, пытались отправить: {VALUE}'],
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',

  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<ICard>('card', cardSchema);
