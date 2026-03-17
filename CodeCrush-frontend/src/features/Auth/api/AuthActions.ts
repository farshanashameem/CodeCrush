import { AxiosError } from "axios";
import apiClient from "../../../services/apiClient";
import { setCredentials } from "../authSlice";
import type { AppDispatch } from "../../../app/store";
import type { ApiErrorResponse, SignupResponse } from "../types";

export const loginUser = ( email: string, password: string ) => async ( dispatch: AppDispatch ) => {
    try {

        const response = await apiClient.post("/auth/login", { email, password });

        const {user, accessToken } = response.data;

        dispatch(setCredentials({user, accessToken }));
        
         
        return { success: true, user, accessToken };

    } catch (error: any ) {
        console.error(error.response?.data || error.message);

        return {
            success: false,
            message: error.response?.data?.message || "Login failed",
        }
    }
};

export const signupParent =
  (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) =>
  async (_dispatch: AppDispatch): Promise<SignupResponse> => {
    try {
      const response = await apiClient.post("/auth/signup", {
        name,
        email,
        password,
        confirmPassword,
      });
      localStorage.setItem("parentEmail", email);
      return {
        success: true,
        message: response.data.message || "OTP sent to email",
        expiresAt: response.data.expiresAt,
      };
    }catch (error) {
  const err = error as AxiosError<{
    message?: string;
    errors?: { msg: string }[];
  }>;

  console.log("Signup error:", err.response?.data);

  return {
    success: false,
    message:
      err.response?.data?.message ||
      err.response?.data?.errors?.[0]?.msg ||
      "Signup failed",
  };
}
  };