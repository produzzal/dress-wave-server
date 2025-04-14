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

const getAllProductFromDB = async () => {
  const result = await Product.find();
  if (result.length < 1) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Products Found');
  }
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findById({ _id: productId });
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Product Found');
  }
  return result;
};

const UpdateProductFromDB = async (productId: string, productData) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Product Found');
  }
  const result = await Product.findByIdAndUpdate(productId, productData, {
    new: true,
  });

  return result;
};

export const ProductServices = {
  createProductToDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  UpdateProductFromDB,
};
