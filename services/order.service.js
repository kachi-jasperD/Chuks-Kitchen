// const orderRepo = require("../repositories/order.repository");
// const cartRepo = require("../repositories/cart.repository");

// const createOrderFromCart = async (userId) => {
//   const cart = await cartRepo.getUserCart(userId);
//   if (!cart || cart.items.length === 0) throw new Error("Cart is empty");

//   const subtotal = cart.items.reduce(
//     (acc, item) => acc + item.quantity * item.foodId.price,
//     0,
//   );

//   const order = await orderRepo.createOrder({
//     userId,
//     items: cart.items.map((item) => ({
//       foodId: item.foodId._id,
//       quantity: item.quantity,
//       price: item.foodId.price,
//     })),
//     subtotal,
//     total: subtotal,
//   });

//   await cartRepo.clearCart(userId);

//   return order;
// };

// module.exports = {
//   createOrderFromCart,
// };

const orderRepo = require("../repositories/order.repository");
const cartRepo = require("../repositories/cart.repository");
const paymentRepo = require("../repositories/payment.repository");

const createOrderFromCart = async (userId) => {
  const cart = await cartRepo.getUserCart(userId);

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.foodId.price,
    0,
  );

  const order = await orderRepo.createOrder({
    userId,
    items: cart.items.map((item) => ({
      foodId: item.foodId._id,
      quantity: item.quantity,
      price: item.foodId.price,
    })),
    subtotal,
    total: subtotal,
    status: "PENDING",
  });

  return order;
};

const addDeliveryDetails = async (orderId, deliveryDetails) => {
  return await orderRepo.updateOrder(orderId, {
    deliveryDetails,
    status: "DELIVERY_ADDED",
  });
};

const addPaymentDetails = async (orderId, userId, paymentDetails) => {
  const order = await orderRepo.getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  // Optional but important: prevent paying someone else's order
  if (order.userId.toString() !== userId.toString()) {
    throw new Error("Unauthorized");
  }

  // 1️⃣ Create payment
  const payment = await paymentRepo.createPayment({
    orderId,
    amount: order.total,
    ...paymentDetails,
  });

  // 2️⃣ Update order with paymentId + status
  const updatedOrder = await orderRepo.updateOrder(orderId, {
    paymentId: payment._id,
    status: "PAID",
  });

  // 3️⃣ NOW clear cart ✅ (after successful payment)
  await cartRepo.clearCart(userId);

  return updatedOrder;
};

const cancelOrder = async (orderId, userId) => {
  const order = await orderRepo.getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  // To prevent from cancelling someone else's order
  if (order.userId.toString() !== userId.toString()) {
    throw new Error("Unauthorized");
  }

  // To prevent from cancelling delivered orders
  if (order.status === "DELIVERED") {
    throw new Error("Delivered orders cannot be cancelled");
  }

  return await orderRepo.updateOrder(orderId, {
    status: "CANCELLED",
  });
};

module.exports = {
  createOrderFromCart,
  addDeliveryDetails,
  addPaymentDetails,
  cancelOrder,
};
