// infrastructure/container/AdminContainer.ts

import { MongoAdminRepository } from "../repositories/MongoAdminRepository";
import { MongoParentRepository } from "../repositories/MongoParentRepository";
import { BcryptHashService } from "../services/BcryptHashService";
import { JWTTokenService } from "../services/JWTTokenService";

// UseCases
import { LoginAdminUseCase } from "../../application/use-cases/admin/LoginAdminUseCase";
import { LogoutAdminUseCase } from "../../application/use-cases/admin/LogoutAdminUseCase";
import { GetParentUseCase } from "../../application/use-cases/admin/GetParentUseCase";
import { ToggleBlockParentUseCase } from "../../application/use-cases/admin/ToggleBlockParentUseCase";
import { ToggleDeleteParentUseCase } from "../../application/use-cases/admin/ToggleDeleteParentUseCase";
import { RefreshAdminTokenUseCase } from "../../application/use-cases/admin/RefreshAdminTokenUseCase";

// Controllers
import { LoginAdminController } from "../../presentation/controllers/Admin/LoginController"
import { LogoutAdminController } from "../../presentation/controllers/Admin/LogoutController";
import { GetParentController } from "../../presentation/controllers/Admin/GetParentController";
import { ToggleBlockParentController } from "../../presentation/controllers/Admin/toggleBlockParentController";
import { ToggleDeleteParentController } from "../../presentation/controllers/Admin/toggleDeleteParentController";
import { RefreshAdminTokenController } from "../../presentation/controllers/Admin/RefreshAdminController";

// Repositories
const adminRepository = new MongoAdminRepository();
const parentRepository = new MongoParentRepository();

// Services
const hashService = new BcryptHashService();
export const tokenService = new JWTTokenService();

// UseCases
export const loginAdminUseCase = new LoginAdminUseCase(adminRepository, hashService, tokenService);
export const logoutAdminUseCase = new LogoutAdminUseCase(adminRepository);
export const getParentUseCase = new GetParentUseCase(parentRepository);
export const toggleBlockParentUseCase = new ToggleBlockParentUseCase(parentRepository);
export const toggleDeleteParentUseCase = new ToggleDeleteParentUseCase(parentRepository);
export const refreshAdminTokenUseCase = new RefreshAdminTokenUseCase(tokenService, adminRepository);

// Controllers (class-based instances)
export const loginAdminController = new LoginAdminController(loginAdminUseCase);
export const logoutAdminController = new LogoutAdminController(logoutAdminUseCase);
export const getParentController = new GetParentController(getParentUseCase);
export const toggleBlockParentController = new ToggleBlockParentController(toggleBlockParentUseCase);
export const toggleDeleteParentControllerInstance = new ToggleDeleteParentController(toggleDeleteParentUseCase);
export const refreshAdminTokenController = new RefreshAdminTokenController(refreshAdminTokenUseCase);