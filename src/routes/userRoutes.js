const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { body } = require('express-validator');

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

module.exports = router;