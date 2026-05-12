import {
  getClientsService,
  getSuppliersByClientService,
  getInvoicesByClientService,
  getPaymentsByClientService,
} from "../services/adminService.js";


export const listClients = async (req, res, next) => {
  try {
    const clients = await getClientsService();
    res.status(200).json({
      status: "success",
      results: clients.length,
      data: clients,
    });
  } catch (err) {
    next(err);
  }
};


export const getClientSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getSuppliersByClientService(req.params.clientId);
    res.status(200).json({
      status: "success",
      results: suppliers.length,
      data: suppliers,
    });
  } catch (err) {
    next(err);
  }
};


export const getClientInvoices = async (req, res, next) => {
  try {
    const invoices = await getInvoicesByClientService(req.params.clientId);
    res.status(200).json({
      status: "success",
      results: invoices.length,
      data: invoices,
    });
  } catch (err) {
    next(err);
  }
};

export const getClientPayments = async (req, res, next) => {
  try {
    const payments = await getPaymentsByClientService(req.params.clientId);
    res.status(200).json({
      status: "success",
      results: payments.length,
      data: payments,
    });
  } catch (err) {
    next(err);
  }
};