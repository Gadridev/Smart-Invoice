import bcrypt from "bcryptjs";
import User from "../model/User.js";
import AppError from "../utils/AppError.js";

export async function signupService({ name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
   
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "client",
    });
    return newUser;
  } catch (err) {
    throw err;
  }
}

export async function loginService({ email, password }) {
  if (!email || !password) {
    throw new AppError("please provide a valid email and password", 422);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("incorrect email or password", 401);
  }
  return user;
}

