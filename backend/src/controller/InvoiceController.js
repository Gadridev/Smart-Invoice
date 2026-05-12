import {
  createInvoiceService,
  deleteInvoiceService,
  getInvoiceByIdService,
  listInvoicesService,
  updateInvoiceService,
} from "../services/invoiceService.js";

export async function createInvoice(req, res, next) {
  try {
    const invoice = await createInvoiceService(req.user._id, req.body);
    console.log(invoice);
    res.status(201).json({ status: "success", data: invoice });
  } catch (err) {
    next(err);
  }
}

export async function listInvoices(req, res, next) {
  try {
    const invoices = await listInvoicesService(req.user._id, {
      status: req.query.status,
      supplierId: req.query.supplierId,
      page:req.query.page,
      limit:req.query.limit,
    });
    res.status(200).json({
      status: "success",
      results: invoices.length,
      data: invoices,
    });
  } catch (err) {
    next(err);
  }
}

export async function getInvoice(req, res, next) {
  try {
    const invoice = await getInvoiceByIdService(req.user._id, req.params.id);
    res.status(200).json({
      status: "success",
      data: invoice,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateInvoice(req, res, next) {
  try {
    const invoice = await updateInvoiceService(
      req.user._id,
      req.params.id,
      req.body,
    );
    res.status(200).json({
      status: "success",
      data:invoice,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteInvoice(req, res, next) {
  try {
    await deleteInvoiceService(req.user._id, req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    next(err);
  }
}
