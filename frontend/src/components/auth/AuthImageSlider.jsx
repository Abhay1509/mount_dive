import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Simple Framer Motion image slider.
 * Props:
 *  - images: array of { src, alt, captionTitle?, captionText? }
 *  - interval: ms between auto-play (default 5000)
 */
const AuthImageSlider = ({ images = [], interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const goTo = (i) => {
    setIndex(i);
  };

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  if (!images.length) return null;

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={images[index].src}
            src={images[index].src}
            alt={images[index].alt || `slide-${index}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>
        {/* dark overlay to make left text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent pointer-events-none" />
      </div>

      {/* Bottom caption & dots */}
      <div className="absolute bottom-6 left-6 text-white max-w-[60%]">
        {images[index].captionTitle && (
          <h2 className="text-2xl md:text-4xl font-bold">
            {images[index].captionTitle}
          </h2>
        )}
        {images[index].captionText && (
          <p className="mt-2 text-sm md:text-base text-gray-200">
            {images[index].captionText}
          </p>
        )}
        <div className="flex mt-4 space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Left/Right arrows (hidden on small) */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white"
        aria-label="prev"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center w-8 h-8 rounded-full bg-black/40 text-white"
        aria-label="next"
      >
        ›
      </button>
    </div>
  );
};

export default AuthImageSlider;