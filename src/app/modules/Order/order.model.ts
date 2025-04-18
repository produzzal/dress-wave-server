import { Schema, model } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false },
);

const OrderSummarySchema = new Schema(
  {
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { _id: false },
);

const CustomerInfoSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    orderNumber: { type: String },
    customer: { type: CustomerInfoSchema, required: true },
    items: { type: [OrderItemSchema], required: true },
    summary: { type: OrderSummarySchema, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model('Order', OrderSchema);
