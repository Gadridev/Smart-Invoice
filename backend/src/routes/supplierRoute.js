import express from "express";
import { protect } from "../middleware/protectMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createSupplierSchema,
  updateSupplierSchema,
} from "../validation/supplierSchema.js";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "../controller/supplierController.js";

const router = express.Router();

router.use(protect);

router.post("/", validateRequest(createSupplierSchema), createSupplier);
router.get("/", getSuppliers);
router.get("/:id", getSupplier);
router.put("/:id", validateRequest(updateSupplierSchema), updateSupplier);
router.delete("/:id", deleteSupplier);

export default router;

