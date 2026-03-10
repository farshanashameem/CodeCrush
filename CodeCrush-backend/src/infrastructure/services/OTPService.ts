export class OTPService {

    generateOTP() : number {
        return Math.floor( 1000 + Math.random() * 9000 );
    }

    getExpiryTime( seconds: number= 60) : number {
        return Date.now() + 60000;
    }
}