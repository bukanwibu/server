const router = require("express").Router();
const UserController = require("../controllers/userController");

const nodemailer = require("nodemailer");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);

module.exports = router;
