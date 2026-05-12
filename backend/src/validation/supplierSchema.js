import Joi from "joi";

export const createSupplierSchema = Joi.object({
  name: Joi.string().min(2).required(),
  contact: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
});

export const updateSupplierSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  contact: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  address: Joi.string().optional(),
}).min(1);

