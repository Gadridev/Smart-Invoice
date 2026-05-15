import Supplier from "../model/Supplier.js";
import Invoice from "../model/Invoice.js";
import AppError from "../utils/AppError.js";
import { assertValidObjectId } from "../utils/objectId.js";
const computeStatus = (amount, totalPaid) => {
  if (totalPaid === 0) return "unpaid";
  if (totalPaid < amount) return "partially_paid";
  return "paid";
};

export const getSupplierStatsService = async (supplierId, userId) => {
  assertValidObjectId(supplierId, "supplier id");
  const supplier = await Supplier.findOne({
    _id: supplierId,
    userId,
  });
  if (!supplier) {
    throw new AppError("Supplier not found", 404);
  }

  const invoices = await Invoice.find({ supplierId, userId });
  const allInvoices = await Invoice.find({ userId });

  let totalAmount = 0;
  let totalPaid = 0;
  
  const invoicesByStatus = {
    unpaid: 0,
    partially_paid: 0,
    paid: 0,
  };

  invoices.forEach((inv) => {
    totalAmount += inv.amount;
    totalPaid += inv.totalPaid;

    const status = computeStatus(inv.amount, inv.totalPaid);
    invoicesByStatus[status]++;
  });

  const totalRemaining = totalAmount - totalPaid;

  let globalTotal = 0;
  allInvoices.forEach((inv) => {
    globalTotal += inv.amount;
  });

  const percentage = globalTotal === 0 ? 0 : (totalAmount / globalTotal) * 100;

  return {
    supplierId: supplier._id,
    supplierName: supplier.name,
    totalInvoices: invoices.length,
    totalAmount,
    totalPaid,
    totalRemaining,
    percentage,
    invoicesByStatus,
  };
};

export const getDashboardService = async (userId) => {
  const suppliers = await Supplier.find({ userId });
  const invoices = await Invoice.find({ userId });

  let totalAmount = 0;
  let totalPaid = 0;
  const invoicesByStatus = {
    unpaid: 0,
    partially_paid: 0,
    paid: 0
  };

  invoices.forEach(inv => {
    totalAmount += inv.amount;
    totalPaid += inv.totalPaid;

    const status = computeStatus(inv.amount, inv.totalPaid);
    invoicesByStatus[status]++;
  });

  const totalRemaining = totalAmount - totalPaid;

  return {
    totalSuppliers: suppliers.length,
    totalInvoices: invoices.length,
    totalAmount,
    totalPaid,
    totalRemaining,
    invoicesByStatus
  };
};