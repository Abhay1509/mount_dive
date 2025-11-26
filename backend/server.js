import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import trekRoutes from "./routes/trekRoutes.js";
import trekRegistrationRoutes from "./routes/trekRegistrationRoutes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: ["https://mountdive.com", "https://www.mountdive.com"], // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// DB Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/treks", trekRoutes);
app.use("/api/trek-registration", trekRegistrationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
