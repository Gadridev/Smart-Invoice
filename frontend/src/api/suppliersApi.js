import api from "@/api/axios.js";

export const getSuppliers = async (params) => {
  const response = await api.get("/suppliers", { params });
  return response.data;
};

export const getSupplierById = async (id) => {
  const response = await api.get(`/suppliers/${id}`);
  return response.data;
};

export const createSupplier = async (payload) => {
  const response = await api.post("/suppliers", payload);
  return response.data;
};

export const updateSupplier = async (id, payload) => {
  const response = await api.put(`/suppliers/${id}`, payload);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await api.delete(`/suppliers/${id}`);
  return response.data;
};
