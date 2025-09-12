import express from "express";
import { signup, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Protected profile route
router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;
