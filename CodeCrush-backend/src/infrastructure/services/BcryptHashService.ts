import bcrypt from "bcrypt";
import { IHashService } from "../../application/interfaces/IHashService";

export class BcryptHashService implements IHashService {

    //For hashing the password
    async hash(password: string ) : Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    //for comparing the passwords
    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}