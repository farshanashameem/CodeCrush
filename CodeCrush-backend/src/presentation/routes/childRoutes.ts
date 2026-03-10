import { Router } from "express";

import { addChild } from "../controllers/Child/AddChildController";
import { getChildren } from "../controllers/Child/GetChildrenController";
import { getChildById } from "../controllers/Child/GetChildByIdController";
import { updateChild } from "../controllers/Child/UpdateChildController";
import { toggleBlockChild } from "../controllers/Child/ToggleBlockChildController";
import { toggleDeleteChild } from "../controllers/Child/ToggleDeleteChildController";

import { authMiddleware } from "../../infrastructure/container/ParentContainer";

import { addChildValidator } from "../../application/validators/Child/AddChildValidator";
import { updateChildValidator } from "../../application/validators/Child/UpdateChildValidator";
import { childIdValidator } from "../../application/validators/Child/ChildIdValidator";

import { validate } from "../middlewares/validate";

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Add new child
router.post(
  "/",
  validate(addChildValidator),
  addChild
);

// Get all children of parent
router.get(
  "/",
  getChildren
);

// Get child by id
router.get(
  "/:id",
  validate(childIdValidator),
  getChildById
);

// Update child details
router.put(
  "/:id",
  validate([...childIdValidator, ...updateChildValidator]),
  updateChild
);

// Delete / Restore child
router.patch(
  "/:id/toggle-delete",
  validate(childIdValidator),
  toggleDeleteChild
);

// Block / Unblock child
router.patch(
  "/:id/toggle-block",
  validate(childIdValidator),
  toggleBlockChild
);

export default router;