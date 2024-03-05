const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");


router.post("/register", userController.registerUser);
router.post("/syncOfflineData", userController.syncOfflineData);


module.exports = router;