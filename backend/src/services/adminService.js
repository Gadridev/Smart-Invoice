import User from "../model/User.js";
import Supplier from "../model/Supplier.js";
import Invoice from "../model/Invoice.js";
import Payment from "../model/Payment.js";
import AppError from "../utils/AppError.js";


export const getClientsService = async () => {
  return User.find({ role: "client" });
};


const checkClientExists = async (clientId) => {
  const client = await User.findById(clientId);
  if (!client || client.role !== "client") {
    throw new AppError("Client not found", 404);
  }
};


export const getSuppliersByClientService = async (clientId) => {
  await checkClientExists(clientId);
  return Supplier.find({ userId: clientId });
};

export const getInvoicesByClientService = async (clientId) => {
  await checkClientExists(clientId);
  return Invoice.find({ userId: clientId }).populate("supplierId", "name");
};


export const getPaymentsByClientService = async (clientId) => {
  await checkClientExists(clientId);
  return Payment.find({ userId: clientId }).populate("invoiceId", "amount");
};