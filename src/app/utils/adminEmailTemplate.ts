/* eslint-disable @typescript-eslint/no-explicit-any */
// adminEmailTemplate.ts

export const generateAdminEmailContent = (order: any): string => {
  return `
      A new order has been placed.
  
      Order Number: ${order.orderNumber}
      Customer Name: ${order.customer.name}
      Customer Email: ${order.customer.email}
      Order Date: ${new Date(order.createdAt).toLocaleDateString()}
  
      Order Items:
      ${order.items.map((item) => `${item.productName} x ${item.quantity} - ৳${item.price * item.quantity}`).join('\n')}
  
      Order Summary:
      Item Price: ৳${order.summary.itemsPrice}
      Shipping: ৳${order.summary.shippingPrice}
      Total: ৳${order.summary.totalPrice}
  
      Please review the order details and proceed with the necessary steps.
  
      Best regards,
      The DressWave Admin Team
    `;
};
