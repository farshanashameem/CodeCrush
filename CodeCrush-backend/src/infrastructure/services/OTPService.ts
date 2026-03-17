import { IOTPService } from "../../application/interfaces/IOTPService";

export class OTPService implements IOTPService {
  generateOTP(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  getExpiryTime(seconds: number = 60): number {
    return Date.now() + seconds * 1000;
  }
}