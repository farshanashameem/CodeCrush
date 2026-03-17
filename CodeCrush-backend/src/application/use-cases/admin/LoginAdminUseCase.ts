import { Admin } from "../../../domain/entities/Admin";
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";
import { IHashService } from "../../interfaces/IHashService";
import { ITokenservice } from "../../interfaces/ITokenService";

export class LoginAdminUseCase {

    constructor(
        private adminRepository: IAdminRepository,
        private hashService: IHashService,
        private tokenService: ITokenservice
    ) {}

    async execute(email: string, password: string): Promise<{
        admin: Admin;
        accessToken: string;
        refreshToken: string;
    }> {

        const admin = await this.adminRepository.findByEmail(email);
        if (!admin) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await this.hashService.compare(password, admin.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const payload = { id: admin.id, email: admin.email };

        const accessToken = this.tokenService.generateAccessToken(payload);
        const refreshToken = this.tokenService.generateRefreshToken(payload);

        await this.adminRepository.updateRefreshToken(admin.id!, refreshToken);

        return { admin, accessToken, refreshToken };
    }
}