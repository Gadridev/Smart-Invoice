import express from "express";
import { signup, login, getMe } from "../controller/AuthController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { protect } from "../middleware/protectMiddleware.js";
import { registerSchema, loginSchema } from "../validation/authSchema.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), signup);
router.post("/login", validateRequest(loginSchema), login);
router.get("/me", protect, getMe);

export default router;

