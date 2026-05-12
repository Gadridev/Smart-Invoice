import Joi from "joi";

export const createInvoiceSchema = Joi.object({
  supplierId: Joi.string().required(),
  amount: Joi.number().greater(0).required(),
  dueDate: Joi.date().iso().required(),
  description: Joi.string().optional(),
});

export const updateInvoiceSchema = Joi.object({
  supplierId: Joi.string().optional(),
  amount: Joi.number().greater(0).optional(),
  dueDate: Joi.date().iso().optional(),
  description: Joi.string().allow("").optional(),
}).min(1);

