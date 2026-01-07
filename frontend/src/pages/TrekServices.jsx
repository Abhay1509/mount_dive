import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Hiking",
    img: "/assets/LandingHeroCarousel/bg1.webp",
    description:
      "Leisurely hikes through scenic trails, perfect for beginners and nature lovers.",
    buttonText: "Explore Hikes",
    route: "/book-trek?type=Hiking",
  },
  {
    title: "Camping",
    img: "/assets/LandingHeroCarousel/bg2.webp",
    description:
      "Camp under the stars with comfortable stays and unforgettable mountain nights.",
    buttonText: "View Camps",
    route: "/book-trek?type=Camping",
  },
  {
    title: "Trekking",
    img: "/assets/LandingHeroCarousel/bg3.webp",
    description: "Guided multi-day treks across stunning Himalayan landscapes.",
    buttonText: "Find Treks",
    route: "/book-trek?type=Trekking",
  },
  {
    title: "Mountaineering",
    img: "/assets/LandingHeroCarousel/bg4.webp",
    description:
      "High-altitude expeditions for experienced climbers and summit seekers.",
    buttonText: "Start Expedition",
    route: "/book-trek?type=Mountaineering",
  },
];

const TrekServices = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const navigate = useNavigate();


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

  useEffect(() => {
    const maxIndex = services.length - cardsPerView;
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [cardsPerView]);

  const CARD_WIDTH = 320; // w-80
  const GAP = 24; // gap-6 (Tailwind gap-6 = 24px)
  const SLIDE_WIDTH = CARD_WIDTH + GAP;

  //swipe handlers
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum swipe distance

    if (swipeDistance > threshold) {
      // swipe left → next
      setStartIndex((prev) =>
        Math.min(prev + cardsPerView, services.length - cardsPerView)
      );
    } else if (swipeDistance < -threshold) {
      // swipe right → previous
      setStartIndex((prev) => Math.max(prev - cardsPerView, 0));
    }
  };

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
        Discover handcrafted outdoor adventures designed for explorers,
        thrill-seekers, and nature lovers across the Himalayas.
      </motion.p>

      {/* Slider */}
      <div className="relative max-w-7xl mx-auto">
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex gap-6"
            animate={{ x: -startIndex * SLIDE_WIDTH }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
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
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-200 text-sm mb-4"
                  >
                    {service.description}
                  </motion.p>

                  <button
                    onClick={() => navigate(service.route)}
                    className="px-4 py-2 bg-white text-gray-900 rounded-full font-medium
             hover:bg-[#68917C] hover:text-white transition"
                  >
                    {service.buttonText}
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
              onClick={() => setStartIndex(idx * cardsPerView)}
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
