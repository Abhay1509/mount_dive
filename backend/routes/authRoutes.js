import express from "express";
import { login } from "../controllers/authController.js";
import { sendOtp, verifyOtp } from "../controllers/authController.js";

const router = express.Router();

// router.post("/signup", signup);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);

export default router;
