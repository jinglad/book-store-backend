/* eslint-disable @typescript-eslint/no-explicit-any */
import { Iuser } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: Iuser) => {
  const newUser = await User.create(payload);
  return newUser;
};

export const UsersService = {
  createUser,
};
