import Invoice from "../model/Invoice.js";
import Payment from "../model/Payment.js";
import AppError from "../utils/AppError.js";

export async function createPaymentService(userId, invoiceId, payload) {
  const { amount, paymentDate, mode_paiement, note } = payload;
  
  const invoice = await Invoice.findOne({ _id: invoiceId, userId });
  if (!invoice) {
    throw new AppError("Invoice not found or access denied", 403);
  }

  if (!amount || amount <= 0) {
    throw new AppError("Amount must be greater than 0", 422);
  }

  const date = new Date(paymentDate);
  if (!paymentDate || isNaN(date)) {
    throw new AppError("Invalid payment date", 422);
  }
  if (date > new Date()) {
    throw new AppError("Payment date cannot be in the future", 422);
  }

  const allowedModes = ["espèces", "chèque", "virement"];
  if (!mode_paiement || !allowedModes.includes(mode_paiement)) {
    throw new AppError("Invalid payment mode", 422);
  }

  if (invoice.totalPaid >= invoice.amount) {
    throw new AppError("Invoice already fully paid", 422);
  }

  const newTotal = (invoice.totalPaid || 0) + amount;

  if (newTotal > invoice.amount) {
    throw new AppError("Payment exceeds remaining invoice amount", 422);
  }

  const payment = await Payment.create({
    invoiceId,
    userId,
    amount,
    paymentDate: date,
    mode_paiement,
    note,
  });

  invoice.totalPaid = newTotal;
  await invoice.save();

  return payment;
}

export async function listPaymentsService(userId, invoiceId) {
  const invoice = await Invoice.findOne({ _id: invoiceId, userId });
  if (!invoice) {
    throw new AppError("Invoice not found or access denied", 403);
  }

  const payments = await Payment.find({
    invoiceId,
    userId,
  }).sort({ paymentDate: -1 });

  return payments;
}

export async function getPaymentsByInvoice(invoiceId, userId, page, limit) {
  const paginationPage = parseInt(page) || 1;
  const paginationlimit = parseInt(limit) || 10;
  const skip = (paginationPage - 1) * limit;
  const payments = await Payment.find({invoiceId, userId })
    .limit(limit)
    .skip(skip);
  return payments;
}
