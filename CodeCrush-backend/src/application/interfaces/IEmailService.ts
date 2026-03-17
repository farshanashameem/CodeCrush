export interface IEmailService {
  sendOTP(email: string, otp: number): Promise<void>;
}