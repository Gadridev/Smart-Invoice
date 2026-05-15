import AppError from "./AppError.js";

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

export function isValidObjectId(id) {
  return typeof id === "string" && OBJECT_ID_REGEX.test(id);
}

export function assertValidObjectId(id, label = "id") {
  if (!isValidObjectId(String(id ?? ""))) {
    throw new AppError(`Invalid ${label}`, 400);
  }
}
