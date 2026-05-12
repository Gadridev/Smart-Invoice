import jwt from "jsonwebtoken";
import { promisify } from "util";
import User from "../model/User.js";
import AppError from "../utils/AppError.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new AppError("You are not logged in! Please log in to get access", 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("the user belonging to this token is no longer exist", 401));
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    return next();
  } catch (err) {
    return next(err);
  }
};

