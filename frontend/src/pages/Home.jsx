import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: "url('/assets/trek_bg_home1.jpg')" }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-4">
        {/* Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-10 shadow-2xl max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl"
          >
            Explore <br /> The Mountains
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-lg"
          >
            Join us for unforgettable trekking experiences. Adventure, nature,
            and thrill await you.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/treks")}
            className="mt-10 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                       text-black font-semibold rounded-xl shadow-lg hover:from-yellow-300 hover:to-orange-400 
                       hover:shadow-yellow-400/50 hover:shadow-xl transition-all duration-300"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
