const cartService = require("../services/cart.service");

const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get cart" });
  }
};

const addToCart = async (req, res) => {
  const cart = await cartService.addToCart(req.user.id, req.body);
  res.status(201).json(cart);
};

const updateCartItem = async (req, res) => {
  try {
    const cart = await cartService.updateCartItem(
      req.user.id,
      req.params.itemId,
      req.body,
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart item" });
  }
};

const removeCartItem = async (req, res) => {
  const cart = await cartService.removeCartItem(req.user.id, req.params.itemId);
  res.json(cart);
};

const clearCart = async (req, res) => {
  const cart = await cartService.clearCart(req.user.id);
  res.json(cart);
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
