export interface User {
  
    id: string;
    name: string;
    email: string;
    role: "parent" | "admin";
}

export interface AuthState {
    user: User| null;
    accessToken: string| null;
    isAuthenticated: boolean;
}

export interface ApiErrorResponse {
  message: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  expiresAt?: number;
}

export interface ResendOTPResponse {
  success: boolean;
  message: string;
  expiresAt?: number;
  resendCount?: number;
}