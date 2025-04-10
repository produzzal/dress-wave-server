/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TUser } from '../User/user.interface';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import bcrypt from 'bcrypt';
import { User } from '../User/user.model';

// Signup functionality remains the same
const signup = async (payload: TUser): Promise<any> => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw new AppError(httpStatus.CONFLICT, 'User already exists');
  }

  const newUser = await User.create(payload);
  return newUser;
};

// Login functionality remains the same
const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(httpStatus.CONFLICT, 'User not found');
  }

  const isPasswordMatched = async (
    inputPassword: string,
    hashedPassword: string,
  ): Promise<boolean> => {
    const isMatched = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatched;
  };

  if (!(await isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password not matched');
  }

  if (!config.jwt_access_secret || !config.jwt_refresh_secret) {
    throw new Error(
      'JWT secrets are not defined properly in the environment variables!',
    );
  }

  const jwtPayload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string);

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const AuthServices = {
  signup,
  login,
};
