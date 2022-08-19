import { Request } from 'express';
import jwt from 'jsonwebtoken';
import mongoose, { Date } from 'mongoose';

export interface SessionRequest extends Request {
  user?: {
    _id: string;
  }
}

export interface ISessionRequest extends Request {
  user?: string | jwt.JwtPayload;
}

export interface ICard {
  name: string;
  link: string;
  owner: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[] | never[];
  createdAt: Date;
}

export interface IError extends Error {
  statusCode: number;
  code?: number;
}
