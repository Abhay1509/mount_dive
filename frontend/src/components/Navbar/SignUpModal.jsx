import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { signupUser } from "../../services/authService";

const SignUpModal = ({ show, onClose, switchToLogin }) => {
  const [error, setError] = useState(false); // for shake
  const [errorMsg, setErrorMsg] = useState(""); // for text
  const [loading, setLoading] = useState(false);

  const validateForm = (name, email, pass) => {
    if (!name || !email || !pass) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (pass.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value.trim();
    const email = e.target[1].value.trim();
    const pass = e.target[2].value.trim();

    // ✅ Frontend validation
    const validationError = validateForm(name, email, pass);
    if (validationError) {
      setError(true);
      setErrorMsg(validationError);
      setTimeout(() => setError(false), 500); // stop shaking
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      const data = await signupUser({ name, email, password: pass });

      localStorage.setItem("token", data.token);
      alert("🎉 Account Created Successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      setError(true);
      setErrorMsg(err.message || "Signup failed. Try again.");
      setTimeout(() => setError(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="signup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]"
          onClick={onClose} // ✅ close modal when clicking background
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            initial={{ scale: 0.8, y: -50, opacity: 0 }}
            animate={
              error
                ? { x: [0, -10, 10, -10, 10, 0] }
                : { scale: 1, y: 0, opacity: 1 }
            }
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 w-96 shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Create Account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              {/* Error message */}
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center"
                >
                  {errorMsg}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </motion.button>
            </form>

            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <button
                onClick={switchToLogin}
                className="text-green-500 font-semibold hover:underline"
              >
                Log in here
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;
