import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Signup supporting email OR phone
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password, isAdmin } = req.body;

    // Determine query based on email or phone
    const query = email ? { email } : { phone };

    // Check if user already exists
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Build user object dynamically
    const userData = {
      name,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    };

    if (email) userData.email = email; // only set if email provided
    if (phone) userData.phone = phone; // only set if phone provided

    // Create new user
    const user = await User.create(userData);

    // Respond with user info + JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login with email OR phone
export const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Pick identifier based on what's provided
    const query = email ? { email } : phone ? { phone } : null;

    if (!query) {
      return res.status(400).json({ message: "Email or phone is required" });
    }

    // Find user
    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Return user info + token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.isAdmin),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
