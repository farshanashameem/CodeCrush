import "express-session";

declare module "express-session" {
  interface SessionData {
    otpData?: {
      name?: string
      email: string
      password?: string
      otp: number
      expiresAt: number
      attempts: number
      resendCount: number
      type: "register" | "reset"
    }

    resetAllowed?: boolean
  }
}