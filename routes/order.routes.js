const router = require("express").Router();
const controller = require("../controllers/order.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.post("/", controller.createOrder);
router.post("/:id/delivery", controller.addDeliveryDetails);
router.post("/:id/payment", controller.addPaymentDetails);
router.post("/:id/cancel", controller.cancelOrder);
router.get("/", controller.getMyOrders);
router.get("/:id", controller.getOrderById);

/* Admin only */
router.patch("/:id/status", adminOnly, controller.updateOrderStatus);

module.exports = router;
