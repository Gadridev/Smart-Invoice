import Supplier from "../model/Supplier.js";
import Invoice from "../model/Invoice.js";
import AppError from "../utils/AppError.js";
const computeStatus = (amount, totalPaid) => {
  if (totalPaid === 0) return "unpaid";
  if (totalPaid < amount) return "partially_paid";
  return "paid";
};
export const getSupplierStatsService = async (supplierId, userId) => {
  const supplier = await Supplier.findOne({
    _id: supplierId,
    userId,
  });
  if (!supplier) {
    throw new AppError("Supplier not fount", 404);
  }
  const invoices = await Invoice.find({
    supplierId,
    userId,
  });
  const allInvoices = await Invoice.find({ userId });
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = invoices.reduce((sum, i) => sum + i.totalPaid, 0);
  const totalRemaining = totalAmount - totalPaid;
  const invoicesByStatus = {
    unpaid: 0,
    partially_paid: 0,
    paid: 0,
  };
  invoices.forEach((inv) => {
  const status = computeStatus(inv.amount, inv.totalPaid);

  if (invoicesByStatus[status] !== undefined) {
    invoicesByStatus[status]++;
  }
});
  const globalTotal = allInvoices.reduce((sum, i) => sum + i.amount, 0);
  const percentage = globalTotal === 0 ? 0 : (totalAmount / globalTotal) * 100;
  return {
    supplierId: supplier._id,
    supplierName: supplier.name,
    totalInvoices,
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
  const totalSuppliers = suppliers.length;
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, i) => sum + i.amount, 0);
  const totalPaid = invoices.reduce((sum, i) => sum + i.totalPaid, 0);
  const totalRemaining = totalAmount - totalPaid;
  const invoicesByStatus = {
    unpaid: 0,
    partially_paid: 0,
    paid: 0
  };
  invoices.forEach(inv => {
    if (invoicesByStatus[inv.status] !== undefined) {
      invoicesByStatus[inv.status]++;
    }
  });

  return {
    totalSuppliers,
    totalInvoices,
    totalAmount,
    totalPaid,
    totalRemaining,
    invoicesByStatus
  };
};