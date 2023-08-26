import { SortOrder } from 'mongoose';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilterableFields } from './book.interface';
import { Book } from './book.model';

const createBook = async (payload: IBook) => {
  const newBook = await Book.create(payload);
  return newBook;
};

const getBookById = async (bookId: string) => {
  const book = await Book.findById(bookId);
  return book;
};

const getBooks = async (
  filters: IBookFilterableFields,
  paginationOptions: IPaginationOptions,
) => {
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

const updateBook = async (bookId: string, payload: IBook) => {
  const updatedBook = await Book.findByIdAndUpdate(bookId, payload, {
    new: true,
  });

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
};
