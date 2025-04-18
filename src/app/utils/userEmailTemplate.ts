/* eslint-disable @typescript-eslint/no-explicit-any */
// userEmailTemplate.ts

export const generateUserEmailContent = (order: any): string => {
  return `
      Hello ${order.customer.name},
  
      Thank you for shopping with us! Your order has been successfully placed. Below are the details of your order:
  
      Order Number: ${order.orderNumber}
      Order Date: ${new Date(order.createdAt).toLocaleDateString()}
  
      Items:
      ${order.items.map((item) => `${item.productName} x ${item.quantity} - ৳${item.price * item.quantity}`).join('\n')}
  
      Item Price: ৳${order.summary.itemsPrice}
      Shipping: ৳${order.summary.shippingPrice}
      Total: ৳${order.summary.totalPrice}
  
      We will notify you once your order is processed and shipped. If you have any questions, feel free to reach out.
  
      Best regards,
      The DressWave Team
    `;
};
