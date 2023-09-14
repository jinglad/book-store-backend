"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const addBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        genre: zod_1.z.string({
            required_error: 'Genre is required',
        }),
        publicationDate: zod_1.z.string({
            required_error: 'Publication Date is required',
        }),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
    }),
});
const addReviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string({
            required_error: 'Review is required',
        }),
        id: zod_1.z.string({
            required_error: 'Book Id is required',
        }),
    }),
});
exports.BookValidation = {
    addBookZodSchema,
    updateBookZodSchema,
    addReviewZodSchema,
};
