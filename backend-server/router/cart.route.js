const router = require("express").Router();
const { CartController } = require("../controller/cart.controller");

// 🔥 specific routes first
router.get("/checkout/:userId", CartController.checkoutData);
router.post("/orders", CartController.createOrder);
router.get("/orders/:userId", CartController.getUserOrders);

//admin route
router.get("/orders", CartController.getAllOrders);
router.put("/orders/:orderId/status", CartController.updateOrderStatus);

// generic routes
router.get("/", CartController.getCart);
router.post("/", CartController.addToCart);
router.patch("/:id", CartController.updateQuantity);
router.delete("/:id", CartController.removeItem);
router.delete("/", CartController.clearCart);

module.exports = router;
