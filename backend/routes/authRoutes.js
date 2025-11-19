import express from "express";
import { login } from "../controllers/authController.js";
import { sendOtp, verifyOtp } from "../controllers/authController.js";
import { firebaseLogin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { updateProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/firebase-login", firebaseLogin);
router.put("/update-profile", protect, updateProfile);

export default router;
