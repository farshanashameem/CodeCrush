import { body } from "express-validator";

export const otpValidator = [

  body("otp")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 4, max: 4 })
    .withMessage("OTP must be 4 digits")
    .isNumeric()
    .withMessage("OTP must contain only numbers")

];