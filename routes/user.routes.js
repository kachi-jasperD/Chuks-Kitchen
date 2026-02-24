const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

console.log("authMiddleware:", authMiddleware);
console.log("getCurrentUser:", userController.getCurrentUser);
router.get("/me", authMiddleware, userController.getCurrentUser);
router.get("/", authMiddleware, adminOnly, userController.getAllUsers);

module.exports = router;
