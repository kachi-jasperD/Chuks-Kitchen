const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },

  amount: Number,

  method: {
    type: String,
    enum: ["CARD", "CASH", "TRANSFER"],
  },

  transactionId: String,

  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
