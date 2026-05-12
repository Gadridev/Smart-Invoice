import express from "express";
import { protect } from "../middleware/protectMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
} from "../validation/invoiceSchema.js";
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  listInvoices,
  updateInvoice,
} from "../controller/InvoiceController.js";
import { createPayment,getPagPayment,getPayments } from "../controller/PaymentController.js";
import { createPaymentSchema } from "../validation/paymentSchema.js";

const router = express.Router();

router.use(protect);

router.post("/", validateRequest(createInvoiceSchema), createInvoice);
router.get("/", listInvoices);
router.get("/:id", getInvoice);
router.post("/:id/payments", validateRequest(createPaymentSchema), createPayment);
router.get("/:id/payments", getPayments);
router.put("/:id", validateRequest(updateInvoiceSchema), updateInvoice);
router.delete("/:id", deleteInvoice);
router.get("/:invoiceId/payments",getPagPayment)

export default router;

