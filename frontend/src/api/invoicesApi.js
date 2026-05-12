import api from "@/api/axios.js";

export const getInvoices = async (params) => {
  const response = await api.get("/invoices", { params });
  return response.data;
};

export const getInvoiceById = async (id) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
};

export const createInvoice = async (payload) => {
  const response = await api.post("/invoices", payload);
  return response.data;
};

export const updateInvoice = async (id, payload) => {
  const response = await api.put(`/invoices/${id}`, payload);
  return response.data;
};

export const deleteInvoice = async (id) => {
  const response = await api.delete(`/invoices/${id}`);
  return response.data;
};

export const createInvoicePayment = async (invoiceId, payload) => {
  const response = await api.post(`/invoices/${invoiceId}/payments`, payload);
  return response.data;
};

export const getInvoicePayments = async (invoiceId) => {
  const response = await api.get(`/invoices/${invoiceId}/payments`);
  return response.data;
};
