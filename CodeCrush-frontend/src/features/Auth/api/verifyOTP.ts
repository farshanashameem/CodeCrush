import type { AxiosError } from "axios";
import apiClient from "../../../services/apiClient";

export const verifyOTP = async (
  otp: string
): Promise<{ success: boolean; message: string }> => {

  try {

    const response = await apiClient.post("/auth/verify-otp", { otp });

    return {
      success: true,
      message: response.data.message
    };

  } catch (error) {

    const err = error as AxiosError<{ message: string }>;

    return {
      success: false,
      message: err.response?.data?.message || "OTP verification failed"
    };

  }
};