const router = require("express").Router();
const controller = require("../controllers/food.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

router.get("/", controller.getFoods);
router.post("/", authMiddleware, adminOnly, controller.createFood);
router.patch(
  "/:id/status",
  authMiddleware,
  adminOnly,
  controller.updateFoodStatus,
);
router.get("/:id", controller.getFoodById);
router.put("/:id", authMiddleware, adminOnly, controller.updateFood);
router.delete("/:id", authMiddleware, adminOnly, controller.deleteFood);

module.exports = router;
