import express from "express";
import { registerTrekkers } from "../controllers/trekRegistrationController.js";

const router = express.Router();

router.post("/register", registerTrekkers);

export default router;
