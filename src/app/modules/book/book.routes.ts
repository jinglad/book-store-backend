import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import authMiddleware from '../../middlewares/auth';
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  validateRequest(BookValidation.addBookZodSchema),
  BookController.createBook,
);

router.get('/', BookController.getBooks);

router.get('/:id', BookController.getBook);

router.patch(
  '/:id',
  authMiddleware,
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook,
);

router.post(
  '/reviews',
  validateRequest(BookValidation.addReviewZodSchema),
  BookController.addReview,
);

router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
