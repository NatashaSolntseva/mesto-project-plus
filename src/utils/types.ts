import { Request } from 'express';
import mongoose, { Date } from 'mongoose';

export interface SessionRequest extends Request {
  user?: { _id: string };
}

export interface ICard {
  name: string;
  link: string;
  owner: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[] | never[];
  createdAt: Date;
}

export interface IUser {
  name: string;
  about: string;
  avatar: string;
}

export interface IError extends Error {
  statusCode: number;
  code?: number;
}
