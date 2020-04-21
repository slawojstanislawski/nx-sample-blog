import {Document} from 'mongoose';

export interface IUser {
  id?: any;
  username: string;
  password: string;
}

export interface IUserDocument extends Document, IUser {}
