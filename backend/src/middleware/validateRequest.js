import { StatusCodes } from "http-status-codes";

export const validateRequest = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
      errors: { wrap: { label: false } },
    });
    if (!error) {
      req[property] = value;
      return next();
    }
    const errors = error.details.map((detail) => ({
      path: detail.path.join("."),
      message: detail.message,
    }));
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      status: "error",
      message: "Validation error",
      errors,
    });
  };
};

