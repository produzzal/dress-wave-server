import { Order } from './order.model';
import { TOrder } from './order.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import Product from '../Product/product.model';

// 🔢 Generate new order number like DW-100001
const generateOrderNumber = async (): Promise<string> => {
  const lastOrder = await Order.findOne()
    .sort({ createdAt: -1 })
    .select('orderNumber');

  if (lastOrder?.orderNumber) {
    // Extract the numeric part from the last order number
    const lastNumber = parseInt(lastOrder.orderNumber.split('-')[1], 10);

    if (isNaN(lastNumber)) {
      throw new Error('Invalid order number format');
    }

    // Return the new order number with correct formatting
    return `DW-${(lastNumber + 1).toString().padStart(6, '0')}`;
  }

  return 'DW-000001'; // Return 'DW-000001' if no previous order exists
};

// 🧾 Create a new order
export const createOrderIntoDB = async (payload: Partial<TOrder>) => {
  // Generate the order number
  const orderNumber = await generateOrderNumber();

  // Check if all products in the order exist and have sufficient stock
  const orderItems = payload.items || [];

  for (const item of orderItems) {
    const product = await Product.findById(item.productId); // Fetch product by ID

    // If the product doesn't exist, throw an error
    if (!product) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Product with ID ${item.productName} not found.`,
      );
    }

    // Check if there's enough stock for the requested quantity
    if (product.stockAvailability < item.quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Not enough stock for ${item.productName}. Only ${product.stockAvailability} items available.`,
      );
    }
  }

  // If everything is fine, create the order
  const newOrder = await Order.create({
    ...payload,
    orderNumber,
    createdAt: new Date(),
  });

  return newOrder;
};

export const OrderServices = {
  createOrderIntoDB,
};
