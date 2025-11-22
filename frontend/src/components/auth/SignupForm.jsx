import React, { useState, useCallback, useMemo, useEffect } from "react";
import { validateSignupForm } from "../../helpers/validation";
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";

const SignupForm = ({ contactMethod, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const identifier = useMemo(
    () =>
      contactMethod === "email" ? formData.email.trim() : formData.phone.trim(),
    [contactMethod, formData.email, formData.phone]
  );

  // Setup reCAPTCHA
  // useEffect(() => {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(
  //       auth,
  //       "recaptcha-container",
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           console.log("✅ reCAPTCHA verified:", response);
  //         },
  //         "expired-callback": () => {
  //           console.warn("⚠️ reCAPTCHA expired, resetting...");
  //         },
  //       }
  //     );
  //   }
  // }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "fullName") {
      newValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Send OTP
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { fullName, password, confirmPassword, phone, email, countryCode } =
        formData;

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

        if (contactMethod === "phone" && phone.trim()) {
          // setupRecaptcha();
          const phoneNumber = `${countryCode}${phone.trim()}`;
          const appVerifier = window.recaptchaVerifier;

          // Send OTP via Firebase
          try {
            const confirmationResult = await signInWithPhoneNumber(
              auth,
              phoneNumber,
              appVerifier
            );

            window.confirmationResult = confirmationResult;
            setOtpSent(true);
            setResendTimer(30);
            setErrors({});
          } catch (firebaseErr) {
            console.error("Firebase phone OTP error:", firebaseErr);
            setErrors({ general: firebaseErr.message || "Failed to send OTP" });
          }

          return; // skip email OTP
        }

        if (contactMethod === "email" && email.trim()) {
          const payload = {
            name: fullName.trim(),
            password,
            email: email.trim(),
          };
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/send-otp`,
            payload
          );
          setOtpSent(true);
          setResendTimer(30);
          setErrors({});
        }
      } catch (err) {
        setErrors({
          general: err.response?.data?.message || "Failed to send OTP.",
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, contactMethod, identifier]
  );

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (contactMethod === "phone") {
        try {
          const result = await window.confirmationResult.confirm(otp);
          const phoneNumber = result.user?.phoneNumber;

          console.log("📞 Firebase phone number:", phoneNumber);

          if (!phoneNumber) {
            throw new Error("Phone number not found after verification.");
          }

          const payload = {
            name: formData.fullName.trim(),
            phone: phoneNumber,
            password: formData.password,
          };

          console.log("📦 Sending payload:", payload);

          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
            payload,
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          console.log("✅ OTP verified successfully:", data);
          toast.success("Signup successful!");
          onSuccess?.(data);
        } catch (error) {
          console.error(
            "❌ Firebase OTP verification error (full):",
            error.response?.data || error
          );
          setErrors({
            general:
              error.response?.data?.message ||
              error.message ||
              "Invalid OTP or server error. Try again.",
          });
        }
        return;
      }

      if (contactMethod === "email") {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
          {
            email: formData.email.trim(),
            otp,
          }
        );
        onSuccess?.(data);
      }
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Invalid OTP. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      setLoading(true);

      if (contactMethod === "phone") {
        setupRecaptcha();
        const phoneNumber = `${formData.countryCode}${formData.phone.trim()}`;
        const appVerifier = window.recaptchaVerifier;
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        window.confirmationResult = confirmationResult;
        setResendTimer(30);
        setErrors({});
        return;
      }

      if (contactMethod === "email") {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, {
          email: formData.email.trim(),
        });
        setResendTimer(30);
        setErrors({});
      }
    } catch (err) {
      setErrors({
        general: err.response?.data?.message || "Failed to resend OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3.5 mt-10 relative" onSubmit={handleSubmit}>
      {/* Full Name */}
      <img
        src="/username.svg"
        className=" absolute top-6 left-1 h-[20px]"
        alt=""
      />
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        aria-label="Full Name"
        className="w-full px-8 py-2 border rounded-lg shadow-md border-b-1 border-black focus:ring-2 focus:ring-blue-400 placeholder-red-300"
        required
      />

      {/* Email or Phone */}
      
      {contactMethod === "email" ? (
        <>
        <img
        src="/mail.svg"
        className=" absolute top-[67px] left-1 h-[20px]"
        alt=""
      />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email address"
          aria-label="Email"
          className="w-full px-8 py-2 border rounded-lg shadow-md border-b-1 border-black focus:ring-2 focus:ring-blue-400 placeholder-red-300"
          required
          />
          </>
      ) : (
        <>
        <img
        src="/call.svg"
        className=" absolute top-[67px] left-1 h-[20px]"
        alt=""
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone number"
          aria-label="Phone"
          className="w-full px-8 py-2 border rounded-lg shadow-md border-b-1 border-black focus:ring-2 focus:ring-blue-400 placeholder-red-300"
          required
          />
          </>
      )}

      {/* Password */}
      {contactMethod === "email" ? (
        <>
          <img
            src="/lock.svg"
            className="absolute top-[124px] left-1 h-[20px] z-30"
            alt=""
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              aria-label="Password"
              className="w-full px-8 py-2 border rounded-lg shadow-md border-b-1 border-black focus:ring-2 focus:ring-blue-400 placeholder-red-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <img src="/viewon.svg" alt="" />
              ) : (
                <img src="/viewoff.svg" alt="" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <img
            src="/lock.svg"
            className="absolute top-[183px] left-1 h-[20px] z-30"
            alt=""
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            className="w-full px-8 py-2 border rounded-lg shadow-md border-b-1 border-black focus:ring-2 focus:ring-blue-400 placeholder-red-300"
            required
          />

          <div className="relative">
            {errors.general && (
              <p className="absolute top-[-10px]  left-0 text-red-500 text-sm">
                {errors.general}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:opacity-95 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </>
      ) : (
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:opacity-95 transition disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      )}
    </form>
  );
};

export default SignupForm;