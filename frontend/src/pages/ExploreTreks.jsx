import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const treks = [
  {
    id: 1,
    title: "Everest Base Camp",
    image:
      "https://images.pexels.com/photos/30439897/pexels-photo-30439897.jpeg",
  },
  {
    id: 2,
    title: "Annapurna Circuit",
    image: "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg",
  },
  {
    id: 3,
    title: "Kilimanjaro",
    image: "https://images.pexels.com/photos/3650025/pexels-photo-3650025.jpeg",
  },
  {
    id: 4,
    title: "Alps Hiking",
    image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
  },
  {
    id: 5,
    title: "Rocky Mountains",
    image: "https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg",
  },
  {
    id: 6,
    title: "Andes Adventure",
    image: "https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg",
  },
];

const ExploreTreks = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  // Responsive cards per view
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

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 1, treks.length - cardsPerView));
  };

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
        {/* Cards Row */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 justify-center" // ✅ added justify-center
            animate={{ x: `-${startIndex * (100 / cardsPerView)}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ width: `${(treks.length / cardsPerView) * 100}%` }}
          >
            {treks.map((trek, index) => (
              <motion.div
                key={trek.id}
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
                {/* Image wrapper */}
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img
                    src={trek.image}
                    alt={trek.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay Title */}
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
