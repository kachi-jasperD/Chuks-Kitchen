const Payment = require("../db/models/Payment");

const createPayment = async (data) => {
  return await Payment.create(data);
};

const getPaymentById = async (id) => {
  return await Payment.findById(id);
};

module.exports = {
  createPayment,
  getPaymentById,
};
