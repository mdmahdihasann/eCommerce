const express = require("express");
const router = express.Router();
const { ProductController } = require("../controller/product.controller");
const productImage = require("../middleware/productsImage");

// Routes
router.get("/", ProductController.getProducts);
router.get("/:productsId", ProductController.getSingleProducts);
router.post("/", productImage.single("cover"), ProductController.createNewProducts);
router.put("/:productsId", ProductController.updateProducts);
router.delete("/:productsId", ProductController.deleteProducts);

module.exports = router;
