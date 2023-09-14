import { z } from 'zod';

const addBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationDate: z.string({
      required_error: 'Publication Date is required',
    }),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
  }),
});

const addReviewZodSchema = z.object({
  body: z.object({
    review: z.string({
      required_error: 'Review is required',
    }),
    id: z.string({
      required_error: 'Book Id is required',
    }),
  }),
});

export const BookValidation = {
  addBookZodSchema,
  updateBookZodSchema,
  addReviewZodSchema,
};
