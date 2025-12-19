const express = require("express");

const customRoutes = express.Router();

customRoutes.use("/products", require("./products.route"));

customRoutes.use("/profile", require("./profile.route"));

customRoutes.use("/cart", require("./cart.route"));

customRoutes.use("/auth", require("./user.route"));

module.exports = customRoutes;
