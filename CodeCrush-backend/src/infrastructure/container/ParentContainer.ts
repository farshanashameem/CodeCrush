import { MongoParentRepository } from "../repositories/MongoParentRepository";
import { BcryptHashService } from "../services/BcryptHashService";
import { JWTTokenService } from "../services/JWTTokenService";
import { OTPService } from "../services/OTPService";
import { EmailService } from "../services/EmailService";

import { RegisterParentUseCase } from "../../application/use-cases/parent/RegisterParentUseCase";
import { LoginParentUseCase } from "../../application/use-cases/parent/LoginParentUseCase";
import { RefershTokenUseCase } from "../../application/use-cases/parent/RefreshTokenUseCase";
import { ForgotPasswordUseCase } from "../../application/use-cases/parent/ForgotPasswordUseCase";
import { ResetPasswordUseCase } from "../../application/use-cases/parent/ResetPasswordUseCase";
import { ResendOTPUseCase } from "../../application/use-cases/parent/ResendOTPUseCase";
import { LogoutUseCase } from "../../application/use-cases/parent/LogoutUseCase";

import { RegisterParentController } from "../../presentation/controllers/Parent/RegisterParentController";
import { VerifyOTPController } from "../../presentation/controllers/Parent/VerifyOTPController";
import { LoginParentController } from "../../presentation/controllers/Parent/LoginParentController";
import { RefreshTokenController } from "../../presentation/controllers/Parent/RefreshTokenController";
import { parentAuthMiddleware } from "../../presentation/middlewares/authMiddleware";
import { ForgotPasswordController } from "../../presentation/controllers/Parent/ForgotPasswordController";
import { ResetPasswordController } from "../../presentation/controllers/Parent/ResetPasswordController";
import { ResendOTPController } from "../../presentation/controllers/Parent/ResendOTPController";
import { LogoutController } from "../../presentation/controllers/Parent/LogoutController";


// Repository
const parentRepository = new MongoParentRepository();


// Services
const hashService = new BcryptHashService();
const tokenService = new JWTTokenService();
const otpService = new OTPService();
const emailService = new EmailService();


// UseCases
const registerParentUseCase = new RegisterParentUseCase(
    parentRepository,
    hashService
);

const loginParentUseCase = new LoginParentUseCase(
    parentRepository,
    hashService,
    tokenService
);

const refreshTokenUseCase = new RefershTokenUseCase(
    tokenService
);

const forgotPasswordUseCase = new ForgotPasswordUseCase(
    parentRepository, otpService
);

const resetPasswordUseCase = new ResetPasswordUseCase(
    parentRepository,
    hashService
);

const resendOTPUseCase = new ResendOTPUseCase( emailService, otpService);
const logoutUseCase = new LogoutUseCase(parentRepository);

// Controllers
export const registerParentController = new RegisterParentController(
    otpService,
    emailService
);

export const verifyOTPController = new VerifyOTPController(
    registerParentUseCase
);

export const loginParentController = new LoginParentController(
    loginParentUseCase
);

export const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase
);


export const forgotPasswordController = new ForgotPasswordController(
    forgotPasswordUseCase,
    otpService,
    emailService
);


export const resetPasswordController = new ResetPasswordController(
    resetPasswordUseCase
);

export const resendOTpController = new ResendOTPController( resendOTPUseCase );

export const logoutController = new LogoutController( logoutUseCase)
// Middleware
export const authMiddleware = parentAuthMiddleware(tokenService);