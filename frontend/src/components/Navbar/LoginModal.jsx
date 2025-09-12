import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { loginUser } from "../../services/authService"; // adjust path

const LoginModal = ({ show, onClose, switchToSignUp }) => {
  const [error, setError] = useState(false); // for shake
  const [errorMsg, setErrorMsg] = useState(""); // for text
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value.trim();
    const pass = e.target[1].value.trim();

    if (!email || !pass) {
      setError(true);
      setErrorMsg("Email and password are required.");
      setTimeout(() => setError(false), 500);
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(""); // clear previous error

      const data = await loginUser({ email, password: pass });

      // Save JWT token
      localStorage.setItem("token", data.token);

      alert("✅ Logged in successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      setError(true);
      setErrorMsg(err.message || "Invalid email or password.");
      setTimeout(() => setError(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]"
          onClick={onClose} // close modal when clicking outside
        >
          <motion.div
            onClick={(e) => e.stopPropagation()} // prevent closing on inside click
            initial={{ scale: 0.8, y: -50, opacity: 0 }}
            animate={
              error
                ? { x: [0, -10, 10, -10, 10, 0] } // shake animation
                : { scale: 1, y: 0, opacity: 1 }
            }
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 w-96 shadow-2xl relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Welcome Back
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                className="w-full py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg shadow-md transition-all duration-300"
              >
                {loading ? "Logging in..." : "Login"}
              </motion.button>
            </form>

            {/* Forgot password + Signup option */}
            <div className="mt-4 text-sm text-gray-600 text-center space-y-2">
              <button
                onClick={() => alert("🔑 Forgot Password flow coming soon!")}
                className="block w-full text-orange-500 font-semibold hover:underline"
              >
                Forgot Password?
              </button>

              <p>
                Don’t have an account?{" "}
                <button
                  onClick={switchToSignUp}
                  className="text-orange-500 font-semibold hover:underline"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
