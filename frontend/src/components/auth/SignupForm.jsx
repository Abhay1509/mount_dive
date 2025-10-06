import React, { useState, useCallback } from "react";
import { validateSignupForm } from "../../helpers/validation";
import axios from "axios";

const SignupForm = ({ contactMethod, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { fullName, email, phone, password, confirmPassword } = formData;
      const identifier =
        contactMethod === "email" ? email.trim() : phone.trim();

      const validationError = validateSignupForm(
        fullName.trim(),
        identifier,
        password,
        confirmPassword,
        contactMethod
      );

      if (validationError) {
        setError(validationError);
        return;
      }

      try {
        setLoading(true);
        const payload = { name: fullName.trim(), password };
        if (contactMethod === "email") payload.email = email.trim();
        else payload.phone = phone.trim();

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/signup`,
          payload
        );
        setLoading(false);
        onSuccess && onSuccess();
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || "Signup failed. Try again.");
      }
    },
    [formData, contactMethod, onSuccess]
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />
      {contactMethod === "email" ? (
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
      ) : (
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone number"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:opacity-95 transition"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
};

export default SignupForm;
