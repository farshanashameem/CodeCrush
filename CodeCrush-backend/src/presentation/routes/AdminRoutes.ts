import { Router } from "express";
import {
  loginAdminController,
  logoutAdminController,
  getParentController,
  toggleBlockParentController,
  toggleDeleteParentControllerInstance,
  refreshAdminTokenController,
  tokenService
} from "../../infrastructure/container/AdminContainer";
import { adminAuthMiddleware } from "../middlewares/adminAuthMiddleware";

const router = Router();

// login
router.post("/login", loginAdminController.login.bind(loginAdminController));

// logout
router.post("/logout", adminAuthMiddleware(tokenService), logoutAdminController.logout.bind(logoutAdminController));

// get all parents
router.get("/parents", adminAuthMiddleware(tokenService), getParentController.getAll.bind(getParentController));

// toggle block
router.patch("/parent/:id/toggle-block", adminAuthMiddleware(tokenService), toggleBlockParentController.toggle.bind(toggleBlockParentController));

// toggle delete
router.patch("/parent/:id/toggle-delete", adminAuthMiddleware(tokenService), toggleDeleteParentControllerInstance.toggle.bind(toggleDeleteParentControllerInstance));

// refresh token
router.post("/refresh", refreshAdminTokenController.refresh.bind(refreshAdminTokenController));

export default router;