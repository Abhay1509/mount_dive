import React, { Suspense } from "react";
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import HeroNavbar from "./HeroNavbar";
import TrekServices from "./TrekServices";
import OurStory from "./OurStory";
import LandingPageFooter from "./LandingPageFooter";
import useHeroCarousel from "../hooks/useHeroCarousel";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Lazy-loaded sections
const Team = React.lazy(() => import("./Team"));
const ExploreTreks = React.lazy(() => import("./ExploreTreks"));
const Gallery = React.lazy(() => import("./Gallery"));

// Hero Carousel Images
const backgroundImages = [
  "/assets/LandingHeroCarousel/bg1.webp",
  "/assets/LandingHeroCarousel/bg2.webp",
  "/assets/LandingHeroCarousel/bg3.webp",
  "/assets/LandingHeroCarousel/bg4.webp",
];

const LandingPage = () => {
  const { currentImage, setCurrentImage } = useHeroCarousel(
    backgroundImages,
    5000
  );

  const { user } = useAuth(); // ✅ hook inside component
  const navigate = useNavigate(); // ✅ hook inside component

  // Mouse parallax
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseYOffset = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      mouseX.set(x);
      mouseYOffset.set(y);
    });
  };

  // Scroll parallax
  const { scrollY } = useViewportScroll();
  const yScroll = useTransform(scrollY, [0, 500], [0, 100]);
  const yMotion = useSpring(yScroll, { stiffness: 50, damping: 20 });

  return (
    <div className="relative w-full" onMouseMove={handleMouseMove}>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        <AnimatePresence>
          <motion.img
            key={currentImage}
            src={backgroundImages[currentImage]}
            alt="Hiking Trail"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover -z-20"
            style={{
              x: mouseX,
              y: yMotion + mouseYOffset,
              scale: 1.05,
              willChange: "transform",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.7 } }}
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent -z-10"></div>

        <HeroNavbar />

        {/* Hero Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 relative z-10 text-white mt-56 md:mt-14 lg:mt-10">
          <div className="flex-1 text-center sm:text-left ">
            <motion.h2
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-md md:text-lg text-[#FFFFFF] font-semibold tracking-wide"
            >
              It&apos;s Time to Start Your
            </motion.h2>

            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-2"
            >
              Mountain & Hiking
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-4 max-w-md mx-auto md:mx-0 text-gray-200 text-sm sm:text-base"
            >
              Explore breathtaking trails and conquer new heights with our
              guided mountain and hiking adventures.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3 bg-[#8B7355] text-white font-bold rounded-full shadow-lg hover:bg-[#68917C] transition"
              onClick={() => navigate("/book-trek")}
            >
              Join us Now
            </motion.button>
          </div>
        </div>

        {/* Hero Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                currentImage === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <TrekServices />

      {/* Our Story Section */}
      <OurStory />

      {/* Lazy-loaded sections */}
      <Suspense fallback={<div>Loading...</div>}>
        <Team />
        <ExploreTreks />
        <Gallery />
      </Suspense>

      {/* Footer Section */}
      <LandingPageFooter />
    </div>
  );
};

export default LandingPage;
