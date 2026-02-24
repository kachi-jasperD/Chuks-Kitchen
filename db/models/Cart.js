const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, default: 1 },
  extra_side: [
    {
      extraId: String,
      extraName: String,
      extraPrice: Number,
      extraQuantity: Number,
      extraType: String,
      productId: String,
    },
  ],
  side_proteins: [
    {
      extraId: String,
      extraName: String,
      extraPrice: Number,
      extraQuantity: Number,
      extraType: String,
      productId: String,
    },
  ],
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
