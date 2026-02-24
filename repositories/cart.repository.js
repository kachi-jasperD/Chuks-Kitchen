const Cart = require("../db/models/Cart");

const getUserCart = async (userId) => {
  return await Cart.findOne({ userId }).populate("items.foodId");
};

const addItemToCart = async (userId, item) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [item] });
  } else {
    cart.items.push(item);
    await cart.save();
  }

  return cart;
};

const updateCartItem = async (userId, itemId, data) => {
  const updateData = {};
  if (data.quantity !== undefined)
    updateData["items.$.quantity"] = data.quantity;
  if (data.extra_side) updateData["items.$.extra_side"] = data.extra_side;
  if (data.side_proteins)
    updateData["items.$.side_proteins"] = data.side_proteins;

  return await Cart.findOneAndUpdate(
    { userId, "items._id": itemId },
    { $set: updateData },
    { new: true },
  );
};

const removeCartItem = async (userId, itemId) => {
  return await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { _id: itemId } } },
    { new: true },
  );
};

const clearCart = async (userId) => {
  return await Cart.findOneAndUpdate({ userId }, { items: [] }, { new: true });
};

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
