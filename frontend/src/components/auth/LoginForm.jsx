import React, { useState, useCallback } from "react";
import { validateLoginForm } from "../../helpers/validation";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const LoginForm = ({ contactMethod, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const identifier =
        contactMethod === "email"
          ? formData.email.trim()
          : formData.phone.trim();

      const validationError = validateLoginForm(
        identifier,
        formData.password,
        contactMethod
      );

      if (validationError) {
        setError(validationError);
        return;
      }

      try {
        setLoading(true);

        const payload =
          contactMethod === "email"
            ? { email: formData.email.trim(), password: formData.password }
            : { phone: formData.phone.trim(), password: formData.password };

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          payload
        );

        if (response.data?.token) {
          login(response.data.token, response.data.user || null);
        }
        onSuccess?.(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, contactMethod, onSuccess]
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className={`w-full bg-black text-white py-2 rounded-md transition ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-95"
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="text-right">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={() => alert("Forgot password flow coming soon!")}
        >
          Forgot password?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
