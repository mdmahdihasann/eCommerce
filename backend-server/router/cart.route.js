const router = require("express").Router();
const { CartController } = require("../controller/cart.controller");

router.get("/", CartController.getCart);
router.post("/", CartController.addToCart);
router.patch("/:id", CartController.updateQuantity);
router.delete("/:id", CartController.removeItem);
router.delete("/", CartController.clearCart);

module.exports = router;
