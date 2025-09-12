import express from "express";
import { getTreks, addTrek, updateTrek, deleteTrek } from "../controllers/trekController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getTreks);

// Admin-only
router.post("/", authMiddleware, adminMiddleware, addTrek);
router.put("/:id", authMiddleware, adminMiddleware, updateTrek);
router.delete("/:id", authMiddleware, adminMiddleware, deleteTrek);

export default router;
