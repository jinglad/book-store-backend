import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import authMiddleware from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/auth/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.get('/', authMiddleware, UserController.getUser);

export const UserRoutes = router;
