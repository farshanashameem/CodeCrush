import { Router } from "express";

import {
  registerParentController,
  verifyOTPController,
  loginParentController,
  refreshTokenController,
  forgotPasswordController,
  resetPasswordController
  
} from "../../infrastructure/container/ParentContainer";


import { registerValidator } from "../../application/validators/Auth/RegisterValidator";
import { loginValidator } from "../../application/validators/Auth/LoginValidator";
import { validateRequest } from "../middlewares/validateRequest";
import { otpValidator } from "../../application/validators/Auth/OtpValidator";

const router = Router();

router.post(
  "/signup",
  registerValidator,
  validateRequest,
  registerParentController.register.bind(registerParentController)
);

router.post(
  "/verify-otp",
  otpValidator,
  validateRequest,
  verifyOTPController.verify.bind(verifyOTPController)
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  loginParentController.login.bind(loginParentController)
);

router.post(
  "/refresh",
  refreshTokenController.refresh.bind(refreshTokenController)
);

router.post(
  "/forgot-password",
  forgotPasswordController.sendOTP.bind(forgotPasswordController)
);

router.post(
  "/reset-password",
  resetPasswordController.reset.bind(resetPasswordController)
);

export default router;