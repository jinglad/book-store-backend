import { Model, Types } from 'mongoose';
import { Iuser } from '../users/user.interface';

export interface IBook {
  title: string;
  author: Types.ObjectId | Iuser;
  genre: string;
  publicationDate: Date;
}

export type IBookFilterableFields = {
  searchTerm?: string;
  genre?: string;
  publicationDate?: Date;
};

export type BookModel = Model<IBook>;
