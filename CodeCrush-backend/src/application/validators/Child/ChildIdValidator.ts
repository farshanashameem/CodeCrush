import { param } from "express-validator";

export const childIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid child ID")
];