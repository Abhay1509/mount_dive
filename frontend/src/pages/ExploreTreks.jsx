import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const ExploreTreks = () => {
  const [treks, setTreks] = useState([]); // ✅ will come from API
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // ✅ Fetch trek data from backend API
  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/treks`);
        setTreks(response.data);
      } catch (error) {
        console.error("Error fetching treks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTreks();
  }, []);

  // ✅ Responsive cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(4);
      }
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // ✅ Navigation
  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, treks.length - cardsPerView));
  };

  // ✅ Loading or empty state
  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500 text-lg">
        Loading treks...
      </section>
    );
  }

  if (!treks.length) {
    return (
      <section className="py-20 text-center text-gray-500 text-lg">
        No treks available at the moment.
      </section>
    );
  }

  return (
    <section id="treks" className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto text-center mb-12 px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Explore <span className="text-blue-500">The Treks</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Discover breathtaking destinations with our guided treks and
          adventures.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-0">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 justify-center"
            animate={{ x: `-${startIndex * (100 / cardsPerView)}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ width: `${(treks.length / cardsPerView) * 100}%` }}
          >
            {treks.map((trek, index) => (
              <motion.div
                key={trek._id || index}
                className="relative rounded-2xl shadow-lg cursor-pointer flex-shrink-0 w-72 h-96 bg-white"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 12px 30px rgba(0,0,0,0.25)",
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 18,
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src={trek.images?.[0] || "/placeholder.webp"}
                    alt={trek.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black text-white text-lg font-semibold rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.4 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {trek.title}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-blue-500 hover:text-white transition disabled:opacity-30"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={handleNext}
          disabled={startIndex >= treks.length - cardsPerView}
          className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-blue-500 hover:text-white transition disabled:opacity-30"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default ExploreTreks;
