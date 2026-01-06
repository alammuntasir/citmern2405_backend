const express = require("express");
const {
  signupController,
  verifyOtpController,
  loginController,
  alluserController,
  verifyUserController,
} = require("../../../controller/authController");
const { TokenCheckMiddelware, adminCheck } = require("../../../utils/authMiddelware");
const router = express.Router();
// http://localhost:3000/api/v1/auth/signup
router.post("/signup", signupController);
router.post("/verify-otp", verifyOtpController);
router.post("/login", loginController);
router.get("/allusers",TokenCheckMiddelware,adminCheck, alluserController)

router.get("/verifyuser", verifyUserController)

module.exports = router;
