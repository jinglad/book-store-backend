/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UsersService } from './user.service';
import { Iuser } from './user.interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await UsersService.createUser(user);

  sendResponse<Iuser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UsersService.getUser(user?.userId);

  sendResponse<Iuser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getUser,
};
