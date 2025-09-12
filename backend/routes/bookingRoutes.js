import express from "express";
import { saveBooking, getBookings } from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// User must be logged in
router.post("/", authMiddleware, saveBooking);
router.get("/", authMiddleware, getBookings);

export default router;
