// services/otpActions.ts
import type { AxiosError } from "axios";
import apiClient from "../../../services/apiClient";
import type { ResendOTPResponse } from "../types";

/**
 * Call backend to resend OTP for a given email
 * @param email - Email for which OTP is sent
 */
export const resendOTP = async (
  email: string
): Promise<ResendOTPResponse> => {
  try {
    const response = await apiClient.post("/auth/resend-otp", { email });

    return {
      success: true,
      message: response.data.message,
      expiresAt: response.data.expiresAt,
      resendCount: response.data.resendCount
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return {
      success: false,
      message: err.response?.data?.message || "Failed to resend OTP"
    };
  }
};