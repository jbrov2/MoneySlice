const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const loginLimitter = require("../middleware/loginLimiter");

router.route("/").post(loginLimitter, authController.handleLogin);

router.route("/refresh").get(authController.handleRefreshToken);

router.route("/logout").post(authController.handleLogout);

module.exports = router;
