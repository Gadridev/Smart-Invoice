import jwt from "jsonwebtoken";
import { loginService, signupService } from "../services/authService.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

export const signup = async (req, res, next) => {
  try {
    const newUser = await signupService(req.body);
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await loginService(req.body);
    createSendToken(user, 200, req, res);
  } catch (err) {
    return next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      status: "success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    return next(err);
  }
};

