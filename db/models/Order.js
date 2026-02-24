const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      quantity: Number,
      price: Number,
    },
  ],

  subtotal: Number,
  total: Number,

  deliveryDetails: {
    address: String,
    city: String,
    phone: String,
  },

  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },

  status: {
    type: String,
    enum: [
      "PENDING",
      "CREATED",
      "DELIVERY_ADDED",
      "PAID",
      "CANCELLED",
      "DELIVERED",
    ],

    default: "PENDING",
  },
});

module.exports = mongoose.model("Order", OrderSchema);
