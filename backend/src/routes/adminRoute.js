import express from "express";
import {
  listClients,
  getClientSuppliers,
  getClientInvoices,
  getClientPayments,
} from "../controller/adminController.js";

import { protect } from "../middleware/protectMiddleware.js";
import { restrictTo } from "../middleware/roleMiddleware.js";

const router = express.Router();


router.use(protect);
router.use(restrictTo("admin"));


router.get("/clients", listClients);
router.get("/clients/:clientId/suppliers", getClientSuppliers);
router.get("/clients/:clientId/invoices", getClientInvoices);
router.get("/clients/:clientId/payments", getClientPayments);

export default router;