import {
  createSupplierService,
  getSuppliersService,
  getSupplierByIdService,
  updateSupplierService,
  deleteSupplierService,
} from "../services/supplierService.js";

export const createSupplier = async (req, res, next) => {
  try {
    const { name, email, phone, address } = req.body;
    const supplier = await createSupplierService(req.user._id, {
      name,
      email,
      phone,
      address,
    });
    res.status(201).json({
      status: "success",
      data: { supplier },
    });
  } catch (err) {
    next(err);
  }
};

export const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getSuppliersService(req.user._id, req.query);

    res.status(200).json({
      status: "success",
      results: suppliers.length,
      data: { suppliers },
    });
  } catch (err) {
    next(err);
  }
};

export const getSupplier = async (req, res, next) => {
  try {
    const supplier = await getSupplierByIdService(req.params.id, req.user._id);

    res.status(200).json({
      status: "success",
      data: {
        supplier: supplier.supplier,
        invoiceCount: supplier.invoiceCount,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const supplier = await updateSupplierService(
      req.params.id,
      req.user._id,
      req.body,
    );

    res.status(200).json({
      status: "success",
      data: { supplier },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteSupplier = async (req, res, next) => {
  try {
    await deleteSupplierService(req.params.id, req.user._id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};