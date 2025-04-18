export interface IOrderItem {
  productId: string;
  productName: string;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
  price: number;
}

export interface IOrderSummary {
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export interface ICustomerInfo {
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
}

export type TOrder = {
  customer: ICustomerInfo;
  items: IOrderItem[];
  summary: IOrderSummary;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
};
