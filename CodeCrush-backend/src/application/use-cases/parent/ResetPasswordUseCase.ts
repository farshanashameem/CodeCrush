import { IParentRepository } from "../../../domain/repositories/IParentRepository";
import { IHashService } from "../../interfaces/IHashService";

export class ResetPasswordUseCase {

  constructor(
    private parentRepository: IParentRepository,
    private hashService: IHashService
  ) {}

  async execute(email: string, password: string): Promise<void> {

    //  Check if parent exists
    const parent = await this.parentRepository.findByEmail(email);

    if (!parent) {
      throw new Error("Parent not found");
    }

    //  Hash new password
    const hashedPassword = await this.hashService.hash(password);

    //  Update password
    await this.parentRepository.updatePassword(email, hashedPassword);
  }
}