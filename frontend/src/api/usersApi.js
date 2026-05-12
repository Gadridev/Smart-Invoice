import api from "@/api/axios.js";

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
