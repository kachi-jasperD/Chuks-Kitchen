const orderRepo = require("../repositories/order.repository");
const orderService = require("../services/order.service");

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrderFromCart(req.user.id);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addDeliveryDetails = async (req, res) => {
  try {
    const order = await orderService.addDeliveryDetails(
      req.params.id,
      req.body,
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addPaymentDetails = async (req, res) => {
  try {
    const order = await orderService.addPaymentDetails(
      req.params.id,
      req.user.id,
      req.body,
    );

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await orderService.cancelOrder(req.params.id, req.user.id);

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  const orders = await orderRepo.getOrdersByUser(req.user.id);
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await orderRepo.getOrderById(req.params.id);
  res.json(order);
};

const updateOrderStatus = async (req, res) => {
  const order = await orderRepo.updateOrderStatus(
    req.params.id,
    req.body.status,
  );
  res.json(order);
};

module.exports = {
  createOrder,
  cancelOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  addDeliveryDetails,
  addPaymentDetails,
};
