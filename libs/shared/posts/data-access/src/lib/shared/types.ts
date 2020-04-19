import {Document} from 'mongoose';

export interface IPost {
  id?: any;
  title: string;
  content: string;
  deleted?: boolean;
}

export interface IPostDocument extends Document, IPost {}
