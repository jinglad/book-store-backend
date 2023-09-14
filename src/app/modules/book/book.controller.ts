import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import { BookService } from './book.service';
import { bookFilterableFields } from './book.constant';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { User } from '../users/user.model';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const userDetails = await User.findById(user?.userId);
  const newObj = { ...req.body, author: userDetails?.name };
  const book = await BookService.createBook(newObj);

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book Added successfully',
    data: book,
  });
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const books = await BookService.getBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Books fetched successfully',
    data: books.data,
    meta: books.meta,
  });
});

const getBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.getBookById(req.params.id);

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book fetched successfully',
    data: book,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookService.updateBook(req.params.id, req.body);

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book updated successfully',
    data: book,
  });
});

const addReview = catchAsync(async (req: Request, res: Response) => {
  const { id, review } = req.body;
  const book = await BookService.addReview(id, review);

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Review added successfully',
    data: book,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  await BookService.deleteBook(req.params.id);

  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book deleted successfully',
  });
});

export const BookController = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  addReview,
};
