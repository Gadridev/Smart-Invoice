import axios from "axios";
import { clearToken, getToken } from "@/utils/authStorage.js";
import { dispatchUnauthorized } from "@/utils/authEvents.js";

const baseURL =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.DEV ? "/api" : "");

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";

    if (status === 401) {
      const skipGlobalLogout =
        url.includes("/auth/login") ||
        url.includes("/auth/register") ||
        url.includes("/auth/me");

      if (!skipGlobalLogout) {
        clearToken();
        dispatchUnauthorized();
      }
    }
    return Promise.reject(error);
  },
);

export default api;
