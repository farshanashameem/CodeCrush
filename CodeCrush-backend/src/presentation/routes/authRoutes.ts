import { Router } from "express";
import { parentAuthController } from "../../infrastructure/container";
import { authMiddleware } from "../../infrastructure/container";

const router = Router();

//Parent Registration
router.post("/signup", (req,res) => {
    parentAuthController.register(req, res)
});

//Parent Login
router.post("/login", ( req, res ) => {
    parentAuthController.login(req, res)
});

router.post("/refresh", (req,res) => {
    parentAuthController.refresh(req, res);
});

export default router;