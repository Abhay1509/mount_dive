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

      {/* Logo */}
      <div className="m-0 p-0 absolute top-6 right-0 flex items-center mb-5 z-50">
        <img
          src="/SVG/logo1.svg"
          alt="Mount Dive"
          className="w-48 sm:w-60 md:w-64 h-auto mb-2"
        />
        <img src="/SVG/birds.svg" alt="" />
      </div>
      {/* Auth panel */}
      <div
        className="w-[480px] md:w-1/3 h-[1024px] bg-white shadow-lg relative z-20
                      md:fixed md:top-0 md:right-0 md:h-full md:overflow-auto
                      flex flex-col justify-center px-16 py-12 mt-0 "
      >
        {/* Toggle for email/phone */}
        <div className="flex justify-center mb-3 z-40">
          <div className="bg-[#4D4D4D] w-full max-w-[360px] h-[45px] rounded-[30px] p-1 flex justify-items-center items-center absolute top-[95px]">
            <button
              aria-pressed={contactMethod === "email"}
              onClick={() => handleToggle("email")}
              className={`px-5 ml-1 my-3 w-1/2 font-semibold h-full font-syne py-1 rounded-full transition ${
                contactMethod === "email"
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
              }`}
            >
              Email
            </button>

            <button
              aria-pressed={contactMethod === "phone"}
              onClick={() => handleToggle("phone")}
              className={`px-5 mr-1 w-1/2 h-full font-semibold py-1 font-syne rounded-full transition ${
                contactMethod === "phone"
                  ? "bg-white text-black"
                  : "bg-transparent text-white"
              }`}
            >
              Phone
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Title with animation */}
          <div className="sign relative h-[30px] mt-10 w-[100px]">
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentMode}
                initial={{ opacity: 0, y: currentMode === "login" ? -10 : -5 }}
                animate={{ opacity: 1, y: currentMode === "login" ? 0 : 46 }}
                exit={{ opacity: 0, y: currentMode === "login" ? 10 : 5 }}
                transition={{ duration: 0.2 }}
                className={`text-xl font-syne font-semibold text-gray-800 ${
                  currentMode === "login" ? "mb-2" : "mb-4"
                }`}
              >
                {current.title}
              </motion.h3>
            </AnimatePresence>
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
                  if (data?.token) login(data.token, data.user);

                  const params = new URLSearchParams(window.location.search);
                  const redirectTo = params.get("redirect") || current.redirect;

                  navigate(redirectTo);
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

          <div className="font-syne py-2 text-[10px] gap-[130px] text-[#5300305C]">
            --------------------------------OR--------------------------------
          </div>

          <div className="gap-8 h-[36px] w-full flex justify-center items-center">
            <button>
              <div className="google h-[35px] w-[45px] border border-black rounded-md flex justify-center items-center">
                <img src="/google.png" className="h-[22px] w-[24px]" alt="" />
              </div>
            </button>
            <button>
              <div className="apple h-[35px] w-[45px] border flex justify-center items-center border-black rounded-md">
                <img src="/apple.svg" alt="" />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile slider */}
        <div className="md:hidden w-full h-56 relative">
          <Suspense fallback={<div>Loading...</div>}>
            <AuthImageSlider images={images} interval={6000} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
