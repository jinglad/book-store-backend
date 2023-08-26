import { Schema, model } from 'mongoose';
import { Iuser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const BookStoreUserSchema = new Schema<Iuser, UserModel>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

BookStoreUserSchema.statics.isUserExist = async function (
  email: string,
): Promise<Iuser | null> {
  return await User.findOne({ email }, { _id: 1, password: 1, role: 1 });
};

BookStoreUserSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

BookStoreUserSchema.pre('save', async function (next) {
  // hashing user password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds),
  );
  next();
});

export const User = model<Iuser, UserModel>('User', BookStoreUserSchema);
