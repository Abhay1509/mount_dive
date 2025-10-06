export const validateSignupForm = (
  fullName,
  identifier,
  password,
  confirmPassword,
  method
) => {
  if (!fullName || !identifier || !password || !confirmPassword) {
    return "All fields are required.";
  }

  if (method === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) {
      return "Please enter a valid email address.";
    }
  } else if (method === "phone") {
    const phoneRegex = /^[0-9]{10}$/; // simple 10-digit phone check
    if (!phoneRegex.test(identifier)) {
      return "Please enter a valid phone number.";
    }
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return null;
};

// src/helpers/validation.js

// ✅ Login Validation (email OR phone)
export const validateLoginForm = (identifier, password, method) => {
  if (!identifier || !password) {
    return method === "email"
      ? "Email and password are required."
      : "Phone and password are required.";
  }

  if (method === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(identifier)) {
      return "Please enter a valid email address.";
    }
  } else if (method === "phone") {
    const phoneRegex = /^[0-9]{10}$/; // simple 10-digit phone check
    if (!phoneRegex.test(identifier)) {
      return "Please enter a valid phone number.";
    }
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }

  return null; // ✅ no errors
};
