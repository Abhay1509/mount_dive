import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import { setOTP, verifyOTP } from "../utils/otpStore.js";

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

// 1️⃣ Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (email) {
      // Email OTP flow
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: "User already exists" });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setOTP(email, otp, { name, email, phone, password });

      try {
        await transporter.sendMail({
          from: process.env.SMTP_EMAIL,
          to: email,
          subject: "Your OTP for MountDive Signup",
          text: `Your verification code is ${otp}. It expires in 5 minutes.`,
        });
      } catch (err) {
        return res.status(500).json({ message: "Failed to send OTP email", error: err.message });
      }

      return res.status(200).json({ message: "OTP sent successfully via email" });
    }

    if (phone) {
      // Phone OTP is sent by Firebase on frontend
      return res.status(200).json({ message: "OTP sent via Firebase to phone" });
    }

    res.status(400).json({ message: "Email or phone is required" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2️⃣ Verify OTP and create user
export const verifyOtp = async (req, res) => {
  try {
    const { email, phone, name, password, otp } = req.body;

    if (email) {
      const userData = verifyOTP(email, otp);
      if (!userData) return res.status(400).json({ message: "Invalid or expired OTP" });

      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: hashedPassword,
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id, user.isAdmin),
      });
    }

    if (phone) {
      // Phone registration (Firebase verified frontend)
      const existing = await User.findOne({ phone });
      if (existing) return res.status(400).json({ message: "Phone already registered" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, phone, password: hashedPassword });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        token: generateToken(user._id, user.isAdmin),
      });
    }

    res.status(400).json({ message: "Email or phone is required" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3️⃣ Login with email or phone
export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const query = email ? { email } : phone ? { phone } : null;

    if (!query) return res.status(400).json({ message: "Email or phone is required" });

    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
