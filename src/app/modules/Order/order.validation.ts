import { z } from 'zod';

// ✅ Order Item Schema
const orderItemSchema = z.object({
  productId: z.string({ required_error: 'Product ID is required' }),
  productName: z.string({ required_error: 'Product name is required' }),
  image: z.string({ required_error: 'Product image is required' }),
  size: z.string().optional(),
  color: z.string().optional(),
  quantity: z
    .number()
    .int()
    .positive({ message: 'Quantity must be greater than 0' }),
  price: z.number().nonnegative({ message: 'Price must be a valid number' }),
});

// ✅ Order Summary Schema
const orderSummarySchema = z.object({
  itemsPrice: z.number().nonnegative(),
  shippingPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
});

// ✅ Customer Info Schema
const customerInfoSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string({ required_error: 'Phone number is required' }),
  shippingAddress: z.string({ required_error: 'Shipping address is required' }),
});

// ✅ Full Order Schema
export const orderValidationSchema = z.object({
  body: z.object({
    orderNumber: z
      .string()
      .regex(/^DW-\d+$/, {
        message: "Order number must follow format 'DW-12345'",
      })
      .optional(),

    customer: customerInfoSchema,

    items: z
      .array(orderItemSchema)
      .nonempty({ message: 'Order must include at least one item' }),

    summary: orderSummarySchema,

    paymentStatus: z.enum(['pending', 'paid', 'failed']).default('pending'),

    orderStatus: z
      .enum(['processing', 'shipped', 'delivered', 'cancelled'])
      .default('processing'),
  }),
});
