const express = require("express");
const { UserController } = require("../controller/user.controller");
const catchAsync = require("../util/catchAsync");

const router = express.Router();

router.post("/login", catchAsync(UserController.login));
router.post("/register", catchAsync(UserController.register));
router.post("/refresh-token", catchAsync(UserController.refreshToken));
router.get("/all-user", catchAsync(UserController.getAllUsers));

module.exports = router;
