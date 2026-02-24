const cartRepo = require("../repositories/cart.repository");

const getCart = async (userId) => {
  return (await cartRepo.getUserCart(userId)) || { items: [] };
};

const addToCart = async (userId, itemData) => {
  return await cartRepo.addItemToCart(userId, itemData);
};

const updateCartItem = async (userId, itemId, quantity) => {
  return await cartRepo.updateCartItem(userId, itemId, quantity);
};

const removeCartItem = async (userId, itemId) => {
  return await cartRepo.removeCartItem(userId, itemId);
};

const clearCart = async (userId) => {
  return await cartRepo.clearCart(userId);
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
