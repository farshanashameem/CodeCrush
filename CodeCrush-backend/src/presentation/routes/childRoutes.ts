import { Router } from "express";
import { addChild } from "../controllers/Child/ChildCRUDController";
import { parentAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/children", parentAuthMiddleware, addChild);

export default router;