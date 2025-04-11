import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import Product from './product.model';

const createProductToDB = async (payload: TProduct) => {
  const existingProduct = await Product.find({ name: payload.productName });
  if (existingProduct.length > 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Same product already exists');
  }
  const result = await Product.create(payload);
  return result;
};

export const ProductServices = {
  createProductToDB,
};
