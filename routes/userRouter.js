const { emailAuth } = require('../middlewares/auth')
const router = require("express").Router();
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/forgot-password", UserController.forgotPassword);
router.post("/update-password", emailAuth, UserController.updatePassword);

module.exports = router;
