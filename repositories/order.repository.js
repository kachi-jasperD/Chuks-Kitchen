const Order = require("../db/models/Order");

const createOrder = async (data) => {
  return await Order.create(data);
};

const updateOrder = async (id, data) => {
  return await Order.findByIdAndUpdate(id, data, { new: true });
};

const getOrderById = async (id) => {
  return await Order.findById(id).populate("items.foodId");
};

const getOrdersByUser = async (userId) => {
  return await Order.find({ userId });
};

const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

module.exports = {
  createOrder,
  updateOrder,
  getOrderById,
  getOrdersByUser,
  updateOrderStatus,
};
