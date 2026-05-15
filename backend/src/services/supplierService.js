import Supplier from "../model/Supplier.js";
import Invoice from "../model/Invoice.js";
import AppError from "../utils/AppError.js";
import { assertValidObjectId } from "../utils/objectId.js";

export async function createSupplierService(userId, payload) {
  
  const supplier = await Supplier.create({ ...payload, userId });
  return supplier;
}
export async function getSuppliersService(userId, query = {}) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 15));
  const skip = (page - 1) * limit;

  const filter = { userId };
  if (query.name) {
    filter.name = { $regex: String(query.name), $options: "i" };
  }
  
  const suppliers = await Supplier.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return suppliers;
}

export async function getSupplierByIdService(supplierId, userId) {
  assertValidObjectId(supplierId, "supplier id");
  const supplier = await Supplier.findById(supplierId);
  if (!supplier) throw new AppError("Supplier not found", 404);
  if (String(supplier.userId) !== String(userId)) {
    throw new AppError(
      "You do not have permission to access this supplier",
      403,
    );
  }

  const invoiceCount = await Invoice.countDocuments({
    userId,
    supplierId: supplier._id,
  });
  return { supplier, invoiceCount };
}

export async function updateSupplierService(supplierId, userId, payload) {
  assertValidObjectId(supplierId, "supplier id");
  const supplier = await Supplier.findById(supplierId);
  if (!supplier) throw new AppError("Supplier not found", 404);
  if (String(supplier.userId) !== String(userId)) {
    throw new AppError(
      "You do not have permission to modify this supplier",
      403,
    );
  }
  const allowedFields = ["name","email", "phone", "address"];
  allowedFields.forEach((field) => {
    if (payload[field] !== undefined) {
      supplier[field] = payload[field];
    }
  });
  await supplier.save();
  return supplier;
}

export async function deleteSupplierService(supplierId, userId) {
  assertValidObjectId(supplierId, "supplier id");
  const supplier = await Supplier.findById(supplierId);
  const supplierInvoices = await Invoice.find({ supplierId, userId });
  if (supplierInvoices.length > 0) {
    throw new AppError(
      "Cannot delete supplier with existing invoices",
      422,
    );
  }
  if (!supplier) throw new AppError("Supplier not found", 404);
  if (String(supplier.userId) !== String(userId)) {
    throw new AppError(
      "You do not have permission to delete this supplier",
      403,
    );
  }
  await Supplier.deleteOne({ _id: supplierId, userId });
}
