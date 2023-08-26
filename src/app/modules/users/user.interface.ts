/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { IName } from '../../../interfaces/common';

export interface Iuser {
  _id: string;
  password: string;
  role: string;
  name: IName;
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
}

// export type UserModel = Model<Iuser>;
export type UserModel = {
  isUserExist(phoneNumber: string): Promise<Iuser>;
  isPasswordMatch(password: string, hashPassword: string): Promise<boolean>;
} & Model<Iuser>;
