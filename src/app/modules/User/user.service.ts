import httpStatus from 'http-status';
import { User } from './user.model';
import AppError from '../../errors/AppError';

const getAllUsersFromDB = async () => {
  const result = await User.find();
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Users Found');
  }
  return result;
};

const updateUserRole = async (userId: string, role: string) => {
  const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }
};

const deleteUserFromDB = async (userId: string) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }
};

export const userServices = {
  getAllUsersFromDB,
  updateUserRole,
  deleteUserFromDB,
};
