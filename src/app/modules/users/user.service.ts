/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { Iuser } from './user.interface';
import { User } from './user.model';
import { JwtPayload } from 'jsonwebtoken';

const createUser = async (payload: Iuser) => {
  const newUser = await User.create(payload);
  return newUser;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const updateUserById = async (id: string, payload: Iuser) => {
  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedUser;
};

const deleteUserById = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

const getProfile = async (user: JwtPayload | null) => {
  const profile = await User.findById(user?.userId);
  return profile;
};

const updateProfile = async (user: JwtPayload | null, payload: Iuser) => {
  const id = user?.userId;
  const isProfileExist = await User.findById(id);
  if (!isProfileExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'Profile not found');

  const { name, ...userData } = payload;

  const updatedUserData: Partial<Iuser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<Iuser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ id }, updatedUserData, {
    new: true,
  });
  return result;
};

export const UsersService = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getProfile,
  updateProfile,
};
