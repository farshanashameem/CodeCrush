import { ITokenservice } from "../../interfaces/ITokenService";

export class RefershTokenUseCase {

    constructor( private tokenService: ITokenservice ) {}

    execute ( refershToken: string) : string {

        //verify refresh token
        const decoded = this.tokenService.verifyRefreshToken( refershToken);

        const payload = {
            id: decoded.id,
            email: decoded.email
        };

        //Generate new access token 
        const newAccessToken = this.tokenService.generateAccessToken(payload);

        return newAccessToken;

    }
}