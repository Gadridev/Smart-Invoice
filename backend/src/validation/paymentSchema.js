import Joi from "joi";

export const createPaymentSchema = Joi.object({
  amount: Joi.number().greater(0).required(),
  paymentDate: Joi.date().iso().required(),
  note: Joi.string().optional(),
  mode_paiement: Joi.string().valid("espèces", "chèque", "virement").required(),
});

