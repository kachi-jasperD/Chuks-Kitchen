const router = require("express").Router();
const controller = require("../controllers/cart.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.get("/", controller.getCart);
router.post("/", controller.addToCart);
router.patch("/:itemId", controller.updateCartItem);
router.delete("/:itemId", controller.removeCartItem);
router.delete("/", controller.clearCart);

module.exports = router;
