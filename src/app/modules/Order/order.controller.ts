import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { OrderServices } from './order.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { generateUserEmailContent } from '../../utils/userEmailTemplate';
import { generateAdminEmailContent } from '../../utils/adminEmailTemplate';
import { sendEmail } from './mailService';

// Create Order Controller
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  // Prepare email content for the user
  const userSubject = 'Order Confirmation - DressWave';
  const userText = generateUserEmailContent(result); // Generate the user email content

  // Prepare email content for the admin
  const adminSubject = 'New Order Created - DressWave';
  const adminText = generateAdminEmailContent(result); // Generate the admin email content

  // Send email to the user
  await sendEmail(result.customer.email, userSubject, userText);

  // Send email to the admin
  await sendEmail(process.env.EMAIL_USER, adminSubject, adminText);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
    data: result,
  });
});

// const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
//   const { status } = req.body;
//   const { id } = req.params;

//   // Call the service to update the order status
//   const updatedOrder = await OrderServices.updateOrderStatusFromDB(id, status);

//   // Send response with the updated order
//   return res.status(200).json({
//     success: true,
//     message: 'Order status updated successfully',
//     data: updatedOrder,
//   });
// });

export const OrderControllers = {
  createOrder,
};
