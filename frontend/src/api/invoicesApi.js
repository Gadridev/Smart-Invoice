import api from "@/api/axios.js";
import { formatInvoice, formatInvoiceDetails, formatPayment, formatSupplier } from "@/utils/formatInvoice";

export const getInvoices = async (page = 1, status = "", supplierId = "") => {
  console.log(status);
  let url = `/invoices?page=${page}&limit=15`;
  if (status) url += `&status=${status}`;
  if (supplierId) url += `&supplierId=${supplierId}`;

  const response = await api.get(url);
  const mapInvoice = response.data.data.data.map(formatInvoice);
  return {
    mapInvoice,
    totalPages: response.data.data.totalPages,
    total: response.data.data.total,
    currentPage: response.data.currentPage,
  };
};

export const getInvoiceById = async (id) => {
  const response = await api.get(`/invoices/${id}`);
  console.log(response);
  const mapInvoice = formatInvoiceDetails(response.data.data);
  const mapSupplier=formatSupplier(response.data.data.supplierId)
  console.log(mapInvoice);
  return {mapInvoice ,mapSupplier};
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
  console.log(invoiceId)
  const response = await api.post(`/invoices/${invoiceId}/payments`, payload);
  return response.data;
};

export const getInvoicePayments = async (invoiceId) => {
  console.log(invoiceId)
  const response = await api.get(`/invoices/${invoiceId}/payments`);
  console.log(response)
  const mappedPayment=response.data.data.map(formatPayment)
  return mappedPayment;
};
