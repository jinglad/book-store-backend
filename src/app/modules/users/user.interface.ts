/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface Iuser {
  _id: string;
  password: string;
  name: string;
  email: string;
}
export type UserModel = {
  isUserExist(email: string): Promise<Iuser>;
  isPasswordMatch(password: string, hashPassword: string): Promise<boolean>;
} & Model<Iuser>;
