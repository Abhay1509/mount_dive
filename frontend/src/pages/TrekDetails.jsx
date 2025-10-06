import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import treks from "../data/treks"; // ✅ import same data

const TrekDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const trek = treks.find((t) => t.id === Number(id));

  if (!trek) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">
        ❌ Trek not found
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed relative"
      style={{ backgroundImage: `url(${trek.image})` }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-4xl mx-auto py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-white drop-shadow-lg mb-6"
        >
          {trek.name}
        </motion.h1>

        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-yellow-300 text-lg">📍 {trek.location}</span>
          <span
            className={`${trek.tagColor} text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md`}
          >
            {trek.difficulty}
          </span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {trek.description}
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/treks")}
          className="mt-5 px-6 py-3 bg-white/10 border border-white/30 text-white 
                     font-semibold rounded-lg backdrop-blur-lg shadow-lg 
                     hover:bg-white/20 transition"
        >
          ⬅ Back to Treks
        </motion.button>
      </div>
    </div>
  );
};

export default TrekDetails;
