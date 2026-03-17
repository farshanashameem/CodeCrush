import { ITokenservice } from "../../interfaces/ITokenService";
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";

export class RefreshAdminTokenUseCase {

    constructor(
        private tokenService: ITokenservice,
        private adminRepository: IAdminRepository
    ) {}

    async execute(refreshToken: string): Promise<string> {

        const decoded = this.tokenService.verifyRefreshToken(refreshToken);

        const admin = await this.adminRepository.findById(decoded.id);

        if (!admin || admin.refreshToken !== refreshToken) {
            throw new Error("Invalid refresh token");
        }

        const payload = {
            id: admin.id,
            email: admin.email
        };

        const newAccessToken = this.tokenService.generateAccessToken(payload);

        return newAccessToken;
    }
}