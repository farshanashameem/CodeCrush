
import { IAdminRepository } from "../../../domain/repositories/IAdminRepository";

export class LogoutAdminUseCase {

    constructor(
        private adminRepository: IAdminRepository
    ) {}

    async execute(adminId: string): Promise<void> {

        // remove refresh token from DB
        await this.adminRepository.clearRefreshToken(adminId);

    }
}