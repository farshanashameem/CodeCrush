import { Router } from "express";

import { addChild } from "../controllers/Child/AddChildController";
import { getChildren } from "../controllers/Child/GetChildrenController";
import { getChildById } from "../controllers/Child/GetChildByIdController";
import { updateChild } from "../controllers/Child/UpdateChildController";
import { toggleBlockChild } from "../controllers/Child/ToggleBlockChildController";
import { toggleDeleteChild } from "../controllers/Child/ToggleDeleteChildController";

import { authMiddleware } from "../../infrastructure/container/ParentContainer";

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Add new child
router.post("/", addChild);

// Get all children of parent
router.get("/", getChildren);

// Get child by id
router.get("/:id", getChildById);

// Update child details
router.put("/:id", updateChild);

// Delete / Restore child
router.patch("/:id/toggle-delete", toggleDeleteChild);

// Block / Unblock child
router.patch("/:id/toggle-block", toggleBlockChild);

export default router;