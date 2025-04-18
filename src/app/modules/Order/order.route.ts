import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { orderValidationSchema } from './order.validation';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(orderValidationSchema),
  OrderControllers.createOrder,
);

// router.put(
//   '/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(OrderValidations.updateStatusValidationSchema),
//   OrderControllers.updateOrderStatus,
// );

export const OrderRoutes = router;
