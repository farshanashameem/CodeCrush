import { Parent } from "../../../domain/entities/Parent";
import { IParentRepository } from "../../../domain/repositories/IParentRepository";
import { IHashService } from "../../interfaces/IHashService";
import { ITokenservice } from "../../interfaces/ITokenService";

export class LoginParentUseCase {

    constructor(
        private parentRepository: IParentRepository,
        private hashService: IHashService,
        private tokenService: ITokenservice
    ) {}

    async execute( email: string, password: string) : Promise<{
        parent: Parent;
        accessToken: string;
        refreshToken: string;
    }>  {

        //Check if Parent exists
        const parent = await this.parentRepository.findByEmail(email);
        if(!parent) {
            throw new Error("Invalid email or password");
        }

        //Check if parent is blocked
        if(parent.isBlocked) {
            throw new Error("Account is blocked");
        }

        //verify Password
        const isPasswordValid = await this.hashService.compare(password, parent.password);
        if(!isPasswordValid) {
            throw new Error("Invalid Email or Password");
        }

        //Generate JWT tokens
        const payload = { id:parent.id, email: parent.email };
        const accessToken = this.tokenService.generateAccessToken( payload );
        const refreshToken = this.tokenService.generateRefreshToken( payload );

        //saving refresh token in db
        await this.parentRepository.updateRefreshToken(parent.id!, refreshToken)

        //If everything ok return Parent Data and tokens
        return { parent, accessToken, refreshToken };
    }
}