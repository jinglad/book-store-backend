import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { bookFilterableFields, bookSearchableFields } from './book.constant';
import { IAddBook, IBook, IBookFilterableFields } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IGenericResponse } from '../../../interfaces/common';

const createBook = async (payload: IBook) => {
  const newBook = await Book.create(payload);
  return newBook;
};

const getBookById = async (bookId: string) => {
  const book = await Book.findById(bookId).populate('author');
  return book;
};

const getBooks = async (
  filters: IBookFilterableFields,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  for (const prop of bookFilterableFields) {
    if (!filtersData[prop as keyof typeof filtersData]) {
      delete filtersData[prop as keyof typeof filtersData];
    }
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateBook = async (bookId: string, payload: IAddBook) => {
  const updatedBook = await Book.findByIdAndUpdate(bookId, payload, {
    new: true,
  });

  return updatedBook;
};

const addReview = async (bookId: string, review: string) => {
  const bookExist = await Book.findById(bookId);

  if (!bookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  bookExist.reviews?.push(review);

  const updatedBook = await bookExist.save();

  return updatedBook;
};

const deleteBook = async (bookId: string) => {
  const deletedBook = await Book.findByIdAndDelete(bookId);
  return deletedBook;
};

export const BookService = {
  createBook,
  getBookById,
  getBooks,
  updateBook,
  deleteBook,
  addReview,
};
