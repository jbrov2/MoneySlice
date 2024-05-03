const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/signUpController");

router.post("/", signUpController.handleNewUser);

module.exports = router;
