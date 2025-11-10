import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Hiking",
    img: "/assets/LandingHeroCarousel/bg1.webp",
  },
  {
    title: "Camping",
    img: "/assets/LandingHeroCarousel/bg2.webp",
  },
  {
    title: "Trekking",
    img: "/assets/LandingHeroCarousel/bg3.webp",
  },
  {
    title: "Mountaineering",
    img: "/assets/LandingHeroCarousel/bg4.webp",
  },
];

const TrekServices = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  // Responsive layout
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const totalSlides = Math.ceil(services.length / cardsPerView);

  return (
    <section
      id="trek-services"
      className="py-20 px-4 md:px-16 bg-gray-50 text-center relative"
    >
      {/* Heading */}
      <motion.h2
        className="text-3xl font-bold mb-4 text-gray-900"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Our <span className="text-[#68917C]">Services</span>
      </motion.h2>

      <motion.p
        className="text-gray-600 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </motion.p>

      {/* Slider */}
      <div className="relative max-w-7xl mx-auto">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${startIndex * (100 / cardsPerView)}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ width: `${(services.length / cardsPerView) * 100}%` }}
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="relative flex-shrink-0 w-80 h-[420px] rounded-2xl overflow-hidden shadow-lg bg-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: i * 0.15,
                }}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <button className="px-4 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-[#68917C] hover:text-white transition">
                    Enquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dots Pagination */}
        <div className="flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStartIndex(idx)}
              className={`w-3 h-3 rounded-full transition ${
                startIndex === idx ? "bg-[#8B7355] scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrekServices;
