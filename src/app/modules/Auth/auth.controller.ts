import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.signup(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken, user } = await AuthServices.login(
    req.body,
  );

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: user,
    token: accessToken,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  // Clear both accessToken and refreshToken cookies
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: config.node_env === 'production',
  });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: config.node_env === 'production',
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logout successfully',
    data: '',
  });
});

export const AuthControllers = {
  signup,
  login,
  logout,
};
