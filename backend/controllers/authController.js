import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import { setOTP, verifyOTP } from "../utils/otpStore.js";
import admin from "../firebaseAdmin.js";
import jwt from "jsonwebtoken";
import SibApiV3Sdk from "sib-api-v3-sdk";


// Email transporter
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.SMTP_EMAIL,
//     pass: process.env.SMTP_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: Number(process.env.SMTP_PORT), // 587
//   secure: false, // TLS for port 587
//   auth: {
//     user: process.env.SMTP_EMAIL,
//     pass: process.env.SMTP_PASS,
//   },
// });

// Brevo Email API Setup

// const SibApiV3Sdk = require("sib-api-v3-sdk");

let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;


const brevo = new SibApiV3Sdk.TransactionalEmailsApi();
// brevo.setApiKey(
//   SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
//   process.env.BREVO_API_KEY
// );

// 1️⃣ Send OTP
export const sendOtp = async (req, res) => {
  console.log("🔥 sendOtp route hit", req.body);
  try {
    const { name, email, phone, password } = req.body;

    if (email) {
      // Email OTP flow
      const existing = await User.findOne({ email });
      if (existing)
        return res.status(400).json({ message: "User already exists" });

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setOTP(email, otp, { name, email, phone, password });

      try {
        // await transporter.sendMail({
        //   from: process.env.SMTP_EMAIL,
        //   to: email,
        //   subject: "Your OTP for MountDive Signup",
        //   text: `Your verification code is ${otp}. It expires in 5 minutes.`,
        // });

        await brevo.sendTransacEmail({
          sender: { email: "mountdive001@gmail.com", name: "MountDive" },
          to: [{ email }],
          subject: "Your OTP for MountDive Signup",
          htmlContent: `
          <p>Your OTP is: <strong>${otp}</strong></p>
          <p>Valid for 5 minutes.</p>
          `,
        });
      } catch (err) {
        console.error("EMAIL SEND ERROR:", err);
        return res
          .status(500)
          .json({ message: "Failed to send OTP email", error: err.message });
      }

      return res
        .status(200)
        .json({ message: "OTP sent successfully via email" });
    }

    if (phone) {
      // Phone OTP is sent by Firebase on frontend
      return res
        .status(200)
        .json({ message: "OTP sent via Firebase to phone" });
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
      if (!userData)
        return res.status(400).json({ message: "Invalid or expired OTP" });

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

    if (!query)
      return res.status(400).json({ message: "Email or phone is required" });

    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

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

// 4️⃣ Firebase Phone Login
export const firebaseLogin = async (req, res) => {
  try {
    const { token, name } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Missing Firebase ID token" });
    }

    // ✅ Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(token);
    const phone = decoded.phone_number;
    const firebaseUid = decoded.uid;

    if (!phone) {
      return res
        .status(400)
        .json({ message: "Invalid token: no phone number found" });
    }

    // ✅ Find or create user
    let user = await User.findOne({ phone });
    if (!user) {
      const newUserData = {
        name: name || `User-${phone.slice(-4)}`,
        phone,
        firebaseUid,
      };

      // Only add email if it exists and is non-empty
      if (req.body.email && req.body.email.trim() !== "") {
        newUserData.email = req.body.email.trim();
      }

      user = await User.create(newUserData);
    }

    // ✅ Generate your app token
    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Firebase phone login success",
      user,
      token: appToken,
    });
  } catch (error) {
    console.error("Firebase login error:", error);
    res.status(500).json({
      message: "Firebase login failed",
      error: error.message,
    });
  }
};

// 5️⃣ Update Profile (Protected)
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // comes from protect() middleware

    const { name, email, phone, dob, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, dob, gender },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
