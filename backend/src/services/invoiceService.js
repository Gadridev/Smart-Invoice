import Invoice from "../model/Invoice.js";
import Supplier from "../model/Supplier.js";
import Payment from "../model/Payment.js";
import AppError from "../utils/AppError.js";
import { assertValidObjectId } from "../utils/objectId.js";

const computeStatus = (amount, totalPaid) => {
  if (totalPaid === 0) return "unpaid";
  if (totalPaid < amount) return "partially_paid";
  return "paid";
};

export async function createInvoiceService(userId, payload) {
  const { supplierId, amount, dueDate, description } = payload;

  const supplier = await Supplier.findOne({ _id: supplierId, userId });
  if (!supplier) {
    throw new AppError("Supplier not found or access denied", 403);
  }
  if (!amount || amount <= 0) {
    throw new AppError("Amount must be greater than 0", 422);
  }

  if (!dueDate) {
    throw new AppError("Due date is required", 422);
  }

  return Invoice.create({
    supplierId,
    amount,
    dueDate,
    description,
    userId,
    totalPaid: 0,
  });
}

export async function listInvoicesService(
  userId,
  { status, supplierId, page = 1, limit = 15 } = {},
) {
  console.log(page, limit);

  page = Math.max(1, Number(page));
  limit = Math.min(100, Math.max(1, Number(limit)));
  const skip = (page - 1) * limit;

  const filter = { userId };
  if (supplierId) {
    assertValidObjectId(supplierId, "supplier id");
    filter.supplierId = supplierId;
  }

  const invoices = await Invoice.find(filter)
    .populate("supplierId", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const result = invoices.map((invoice) =>  {
    const totalPaid = invoice.totalPaid || 0;
    const amount = invoice.amount || 0;
    const statusComputed = computeStatus(amount, totalPaid);
    return {
      ...invoice.toObject(),
      supplierName: invoice.supplierId?.name,
      status: statusComputed,
      totalPaid,
      remainingAmount: Math.max(0, amount - totalPaid),
    };
  });
  if (status) {
    const allowed = ["unpaid", "partially_paid", "paid"];
    if (!allowed.includes(status)) {
      throw new AppError("Invalid status filter", 422);
    }
    return result.filter((i) => i.status === status);
  }
  return result;
}

export async function getInvoiceByIdService(userId, invoiceId) {
  const invoice = await Invoice.findOne({ _id: invoiceId, userId }).populate(
    "supplierId",
    "name",
  );

  if (!invoice) {
    throw new AppError("Invoice not found", 404);
  }
  console.log(invoice);

  const totalPaid = invoice.totalPaid || 0;
  const amount = invoice.amount || 0;

  return {
    ...invoice.toObject(),
    supplierName: invoice.supplierId?.name,
    status: computeStatus(amount, totalPaid),
    totalPaid,
    remainingAmount: Math.max(0, amount - totalPaid),
  };
}

// 🔹 UPDATE INVOICE
export async function updateInvoiceService(userId, invoiceId, payload) {
  const invoice = await Invoice.findOne({ _id: invoiceId, userId });
  const supplier = await Supplier.findOne({ _id: payload.supplierId, userId });
  if (payload.supplierId && !supplier) {
    throw new AppError("Supplier not found or access denied", 403);
  }
  if (!invoice) {
    throw new AppError("Invoice not found", 404);
  }

  if ((invoice.totalPaid || 0) >= (invoice.amount || 0)) {
    throw new AppError("Invoice is fully paid and cannot be modified", 422);
  }
  if (payload.amount !== undefined) {
    const newAmount = payload.amount;
    const totalPaid = invoice.totalPaid || 0;

    if (newAmount < totalPaid) {
      throw new AppError("Amount cannot be less than total paid", 422);
    }
  }

  const allowedFields = ["amount", "dueDate", "description", "supplierId"];

  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      invoice[field] = payload[field];
    }
  });

  await invoice.save();
  return invoice;
}

// 🔹 DELETE INVOICE
export async function deleteInvoiceService(userId, invoiceId) {
  const invoice = await Invoice.findOne({ _id: invoiceId, userId });

  if (!invoice) {
    throw new AppError("Invoice not found", 404);
  }

  const hasPayments = await Payment.exists({
    invoiceId: invoice._id,
    userId,
  });

  if (hasPayments) {
    throw new AppError("Cannot delete invoice with payments", 422);
  }

  await invoice.deleteOne();

  return { message: "Invoice deleted successfully" };
}
