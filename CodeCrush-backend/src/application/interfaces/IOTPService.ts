export interface IOTPService {
  generateOTP(): number;
  getExpiryTime(seconds?: number): number;
}