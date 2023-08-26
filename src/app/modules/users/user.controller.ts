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
    data: result,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UsersService.getUserById(id);

  sendResponse<Iuser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.getAllUsers();

  sendResponse<Iuser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UsersService.updateUserById(id, req.body);

  sendResponse<Iuser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UsersService.deleteUserById(id);

  sendResponse<Iuser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.getProfile(req.user);

  sendResponse<Iuser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile fetched successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await UsersService.updateProfile(req.user, req.body);

  sendResponse<Iuser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile updated successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getProfile,
  updateProfile,
};
