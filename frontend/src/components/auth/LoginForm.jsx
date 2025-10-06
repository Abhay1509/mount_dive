import React, { useState, useCallback } from "react";
import { validateLoginForm } from "../../helpers/validation";
import axios from "axios";

const LoginForm = ({ contactMethod, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
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
        const payload = { identifier, password: formData.password };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
          payload
        );
        localStorage.setItem("token", response.data.token);
        setLoading(false);
        onSuccess && onSuccess();
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.message || "Invalid credentials");
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
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          required
        />
      ) : (
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
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
        className="w-full bg-black text-white py-2 rounded-md hover:opacity-95 transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
