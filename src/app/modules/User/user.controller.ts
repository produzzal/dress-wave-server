import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { userServices } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const userUpdateRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await userServices.updateUserRole(id, role);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User role updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userServices.deleteUserFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

export const userControllers = {
  getAllUsers,
  userUpdateRole,
  deleteUser,
};
