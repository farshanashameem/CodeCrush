import { MongoParentRepository } from "../repositories/MongoParentRepository";
import { BcryptHashService } from "../services/BcryptHashService";
import { RegisterParentUseCase } from "../../application/use-cases/parent/RegisterParentUseCase";
import { ParentAuthController } from "../../presentation/controllers/Parent/ParentAuthController";
import { LoginParentUseCase } from "../../application/use-cases/parent/LoginParentUseCase";
import { JWTTokenService } from "../services/JWTTokenService";
import { parentAuthMiddleware } from "../../presentation/middlewares/authMiddleware";
import { RefershTokenUseCase } from "../../application/use-cases/parent/RefreshTokenUseCase";

//create Repository instance
const parentRepository = new MongoParentRepository();

//Create hash Service instance
const hashService = new BcryptHashService();

//Create Token Service Instance
const tokenService = new JWTTokenService();

//Create Register use case instance
const registerParentUseCase = new RegisterParentUseCase(
    parentRepository, hashService
);

//Create Login use case instance
const loginParentUseCase = new LoginParentUseCase(
    parentRepository, hashService, tokenService
);

//Create refreshToken instance
const refreshTokenUseCase = new RefershTokenUseCase(tokenService);

//Create controller instance
export const parentAuthController = new ParentAuthController(
    registerParentUseCase,loginParentUseCase, refreshTokenUseCase
);

export const authMiddleware = parentAuthMiddleware( tokenService );

