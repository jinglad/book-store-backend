"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validation_1 = require("./book.validation");
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', auth_1.default, (0, validateRequest_1.default)(book_validation_1.BookValidation.addBookZodSchema), book_controller_1.BookController.createBook);
router.get('/', book_controller_1.BookController.getBooks);
router.get('/:id', book_controller_1.BookController.getBook);
router.patch('/:id', auth_1.default, (0, validateRequest_1.default)(book_validation_1.BookValidation.updateBookZodSchema), book_controller_1.BookController.updateBook);
router.post('/reviews', (0, validateRequest_1.default)(book_validation_1.BookValidation.addReviewZodSchema), book_controller_1.BookController.addReview);
router.delete('/:id', book_controller_1.BookController.deleteBook);
exports.BookRoutes = router;
