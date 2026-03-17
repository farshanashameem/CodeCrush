// services/adminApiClient.ts
import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";
import { store } from "../app/store";
import { refreshAccessToken, adminLogout } from "../features/Admin/AdminSlice" 
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const adminApiClient = axios.create({
  baseURL: "http://localhost:5000/api/admin", // Admin routes
  withCredentials: true, // send cookies (refresh token)
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor: attach admin access token
adminApiClient.interceptors.request.use((config) => {
  const token = store.getState().admin.accessToken;
 

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor: handle 401 and refresh token
adminApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config?: CustomAxiosRequestConfig }) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return adminApiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call admin refresh endpoint
        const res = await axios.post(
          "http://localhost:5000/api/admin/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        // Update Redux store
        store.dispatch(refreshAccessToken(newToken));

        // Retry all queued requests
        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return adminApiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        store.dispatch(adminLogout());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default adminApiClient;