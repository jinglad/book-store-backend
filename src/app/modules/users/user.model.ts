import { Schema, model } from 'mongoose';
import { Iuser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const UserSchema = new Schema<Iuser, UserModel>(
  {
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['seller', 'buyer', 'admin'],
      default: 'seller',
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    budget: {
      type: Number,
      default: 0,
    },
    income: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

UserSchema.statics.isUserExist = async function (
  phoneNumber: string,
): Promise<Iuser | null> {
  return await User.findOne({ phoneNumber }, { _id: 1, password: 1, role: 1 });
};

UserSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  // hashing user password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds),
  );
  next();
});

export const User = model<Iuser, UserModel>('User', UserSchema);
