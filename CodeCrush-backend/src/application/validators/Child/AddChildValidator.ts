import { body } from "express-validator";
import { AVATARS } from "../../../constants/avatar";

export const addChildValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Name must be between 2 and 30 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters"),

  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 3, max: 12 })
    .withMessage("Age must be a number between 3 and 12"),

  body("gender")
    .notEmpty()
    .toLowerCase()
    .withMessage("Gender is required")
    .isIn(["male", "female"])
    .withMessage("Gender must be male or female"),

    body("avatar")
    .notEmpty()
    .withMessage("Avatar is required")
    .isString()
    .isIn(AVATARS)
    .withMessage("Avatar must be valid")
];