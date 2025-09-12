import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className={`fixed top-0 left-0 right-0 z-50 
          flex items-center justify-between px-8 py-4 transition-all duration-500
          ${scrolled
            ? "bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-lg scale-95"
            : "bg-transparent"
          }`}
      >
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.1, textShadow: "0px 0px 8px #FFD700" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          MountDive
        </motion.h1>

        {/* Links */}
        <div className="hidden md:flex space-x-8 text-white font-medium">
          {["Home", "Treks", "About", "Contact"].map((link, index) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="relative group transition-all"
            >
              {link}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all duration-500 group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {/* Login */}
          <motion.button
            onClick={() => setShowLogin(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 
                       text-black font-semibold rounded-full shadow-md transition-all duration-300"
          >
            Login
          </motion.button>

          {/* Sign Up (pulse glow) */}
          <motion.button
            onClick={() => setShowSignUp(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(34,197,94,0.6)",
                "0 0 15px rgba(34,197,94,0.9)",
                "0 0 0px rgba(34,197,94,0.6)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-5 py-2 bg-gradient-to-r from-green-400 to-teal-500 
                       text-white font-semibold rounded-full shadow-lg transition-all duration-300"
          >
            Sign Up
          </motion.button>
        </div>
      </motion.nav>

      {/* Modals */}
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        switchToSignUp={() => {
          setShowLogin(false);
          setShowSignUp(true);
        }}
      />
      <SignUpModal
        show={showSignUp}
        onClose={() => setShowSignUp(false)}
        switchToLogin={() => {
          setShowSignUp(false);
          setShowLogin(true);
        }}
      />
    </>
  );
};

export default Navbar;
