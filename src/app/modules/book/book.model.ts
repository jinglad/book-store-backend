import { Schema, model } from 'mongoose';
import { IBook } from './book.interface';

const BookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    reviews: {
      type: ['String'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

export const Book = model<IBook>('Book', BookSchema);
