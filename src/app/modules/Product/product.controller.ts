import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProductServices } from './product.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProductToDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product added successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products Retrieved successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const result = await ProductServices.UpdateProductFromDB(productId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Product Updated successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
