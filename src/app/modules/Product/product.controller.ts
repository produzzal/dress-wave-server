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

export const ProductControllers = {
  createProduct,
};
