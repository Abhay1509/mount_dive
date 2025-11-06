import React, { useState, useCallback, Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import { useAuth } from "../context/AuthContext";

const AuthImageSlider = React.lazy(() =>
  import("../components/auth/AuthImageSlider")
);

const AuthPage = () => {
  const navigate = useNavigate();
  const { mode } = useParams(); // "login" or "signup"
  const [contactMethod, setContactMethod] = useState("email");
  const [currentMode, setCurrentMode] = useState(mode); // Track mode for rendering

  const { login } = useAuth();

  // ✅ Use correct asset paths (no /public prefix)
  const images = [
    {
      src: "/assets/LandingHeroCarousel/bg4.webp",
      alt: "Forest 1",
      captionTitle: "Hiking the Ancient Pine Forest",
      captionText: "Lorem ipsum dolor sit amet.",
    },
    {
      src: "/assets/LandingHeroCarousel/bg1.webp",
      alt: "Forest 2",
      captionTitle: "Explore the Mountain Trails",
      captionText: "Discover scenic trails.",
    },
  ];

  const handleToggle = useCallback((method) => setContactMethod(method), []);

  // ✅ Keep mode in sync with URL param
  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  // ✅ Centralized modes config
  const modes = {
    login: {
      title: "Login",
      component: LoginForm,
      redirect: "/landing",
      linkText: "Don't have an account?",
      linkTo: "signup",
      linkLabel: "Sign up here",
    },
    signup: {
      title: "Sign up",
      component: SignupForm,
      redirect: "/auth/login",
      linkText: "Already have an account?",
      linkTo: "login",
      linkLabel: "Login here",
    },
  };

  const current = modes[currentMode] || modes.login; // fallback to login
  const FormComponent = current.component;

  const goToAuth = (nextMode) => navigate(`/auth/${nextMode}`);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left slider for desktop */}
      <div className="hidden md:block md:flex-1 relative">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthImageSlider images={images} interval={6000} />
        </Suspense>
      </div>

      {/* Auth panel */}
      <div
        className="w-full md:w-1/3 bg-white shadow-lg relative z-20
                      md:fixed md:top-0 md:right-0 md:h-full md:overflow-auto
                      flex flex-col justify-center px-6 py-12"
      >
        {/* Back to home */}
        <div className="flex justify-start mb-4">
          <button
            onClick={() => navigate("/landing")}
            className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-black text-sm font-medium transition flex items-center"
          >
            &#8592; Back
          </button>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/images/mountdive-logo.png"
            alt="Mount Dive"
            className="w-28 mb-2"
          />
          <p className="text-xs text-gray-400">SPORTS AND NATURE</p>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 text-left mb-4">
          {current.title}
        </h3>

        {/* Toggle for email/phone */}
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 rounded-full p-1 flex items-center">
            <button
              aria-pressed={contactMethod === "email"}
              onClick={() => handleToggle("email")}
              className={`px-5 py-1 rounded-full transition ${
                contactMethod === "email"
                  ? "bg-black text-white"
                  : "text-gray-600"
              }`}
            >
              Email
            </button>
            <button
              aria-pressed={contactMethod === "phone"}
              onClick={() => handleToggle("phone")}
              className={`px-5 py-1 rounded-full transition ${
                contactMethod === "phone"
                  ? "bg-black text-white"
                  : "text-gray-600"
              }`}
            >
              Phone
            </button>
          </div>
        </div>

        {/* Form with transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMode}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md mx-auto"
          >
            <FormComponent
              contactMethod={contactMethod}
              onSuccess={(data) => {
                // ✅ Save user session instantly
                if (data?.token) login(data.token, data.user);
                navigate(current.redirect);
              }}
            />

            <p className="text-sm text-center text-gray-600 mt-4">
              {current.linkText}{" "}
              <button
                onClick={() => goToAuth(current.linkTo)}
                className="text-blue-600 underline"
              >
                {current.linkLabel}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile slider */}
      <div className="md:hidden w-full h-56 relative">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthImageSlider images={images} interval={6000} />
        </Suspense>
      </div>
    </div>
  );
};

export default AuthPage;
