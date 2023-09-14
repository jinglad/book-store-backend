/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Iuser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: Iuser) => {
  const newUser = await User.create(payload);
  return newUser;
};

const getUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

export const UsersService = {
  createUser,
  getUser,
};
