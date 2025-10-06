import React, { useState, useCallback, useMemo } from "react";
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const identifier = useMemo(
    () =>
      contactMethod === "email" ? formData.email.trim() : formData.phone.trim(),
    [contactMethod, formData.email, formData.phone]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear only that field’s error
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { fullName, password, confirmPassword } = formData;

      const validationError = validateSignupForm(
        fullName.trim(),
        identifier,
        password,
        confirmPassword,
        contactMethod
      );

      if (validationError) {
        setErrors({ general: validationError });
        return;
      }

      try {
        setLoading(true);
        const payload = { name: fullName.trim(), password };
        if (contactMethod === "email" && formData.email.trim()) {
          payload.email = formData.email.trim();
        }
        if (contactMethod === "phone" && formData.phone.trim()) {
          payload.phone = formData.phone.trim();
        }

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/signup`,
          payload
        );
        onSuccess?.();
      } catch (err) {
        setErrors({
          general: err.response?.data?.message || "Signup failed. Try again.",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, contactMethod, identifier, onSuccess]
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Full Name */}
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        aria-label="Full Name"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />

      {/* Email or Phone */}
      {contactMethod === "email" ? (
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          aria-label="Email"
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
          aria-label="Phone"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
      )}

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          aria-label="Password"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? "🙈" : "👁"}
        </button>
      </div>

      {/* Confirm Password */}
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        aria-label="Confirm Password"
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />

      {/* Error Message */}
      {errors.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-md hover:opacity-95 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
};

export default SignupForm;
