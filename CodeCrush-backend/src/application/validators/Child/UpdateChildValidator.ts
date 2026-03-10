import { body } from "express-validator";
import { AVATARS } from "../../../constants/avatar";

export const updateChildValidator = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 and 30 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters"),

  body("age")
    .optional()
    .isInt({ min: 3, max: 12 })
    .withMessage("Age must be a number between 3 and 12"),

  body("gender")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["male", "female"])
    .withMessage("Gender must be male or female"),

    body("avatar")
    .optional()
    .isString()
    .isIn(AVATARS)
    .withMessage("Avatar must be valid")
];