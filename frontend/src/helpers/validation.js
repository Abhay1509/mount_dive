export const validateSignupForm = (
  fullName,
  identifier,
  password,
  confirmPassword,
  method
) => {
  if (!fullName || !identifier) {
    return "All fields are required.";
  }

  if (method === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) {
      return "Please enter a valid email address.";
    }

    if (!password || !confirmPassword) {
      return "Password and confirm password are required.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
  } else if (method === "phone") {
    const phoneRegex = /^[0-9]{10}$/; // simple 10-digit phone check
    if (!phoneRegex.test(identifier)) {
      return "Please enter a valid phone number.";
    }
  }

  return null;
};

// src/helpers/validation.js

// ✅ Login Validation (email OR phone)
export const validateLoginForm = (identifier, password, method) => {
  if (!identifier) {
    return method === "email"
      ? "Email is required."
      : "Phone number is required.";
  }

  if (method === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) {
      return "Please enter a valid email address.";
    }

    if (!password) {
      return "Password is required.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
  } else if (method === "phone") {
    const phoneRegex = /^[0-9]{10}$/; // simple 10-digit phone check
    if (!phoneRegex.test(identifier)) {
      return "Please enter a valid phone number.";
    }
  }

  return null; // ✅ no errors
};
