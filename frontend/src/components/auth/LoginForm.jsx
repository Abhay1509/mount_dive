import React, { useState, useEffect } from "react";
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const LoginForm = ({ contactMethod, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // ✅ Always initialize recaptcha when component mounts
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );

      window.recaptchaVerifier.render();
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  // ✅ Send OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (contactMethod === "email") {
      try {
        setLoading(true);
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        console.log("✅ Login response:", res.data);

        // ✅ Force include lowercase email for Firestore role check
        login(res.data.token, {
          ...res.data,
          email: res.data.email.toLowerCase(),
        });

        onSuccess?.(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
      return;
    }

    // ✅ Phone Login
    try {
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${formData.phone}`,
        appVerifier
      );

      window.confirmationResult = confirmationResult;
      setOtpSent(true);
    } catch (err) {
      console.log(err);
      setError("Failed to send OTP. Try again");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await window.confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/firebase-login`, // ✅ same as signup
        { token: idToken }
      );

      login(response.data.token, response.data.user);
      onSuccess?.(response.data);
    } catch (err) {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={otpSent ? verifyOtp : handleSubmit}>
        {/* ✅ Phone */}
        {contactMethod === "phone" && !otpSent && (
          <>
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* ✅ OTP View */}
        {contactMethod === "phone" && otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              maxLength="6"
              required
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* ✅ Email Login */}
        {contactMethod === "email" && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded"
              disabled={loading}
            >
              Login
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>

      {/* ✅ ReCAPTCHA container DO NOT REMOVE */}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default LoginForm;
