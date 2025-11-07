import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HoverOverlay = ({ children, popupContent, delay = 500 }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovering) {
      timer = setTimeout(() => setShowPopup(true), delay);
    } else {
      timer = setTimeout(() => setShowPopup(false), 200);
    }
    return () => clearTimeout(timer);
  }, [isHovering, delay]);

  return (
    <>
      {/* --- The Card Itself --- */}
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children}
      </div>

      {/* --- Centered Popup (scrolls naturally with page) --- */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            style={{
              position: "absolute",
              top: window.scrollY, // stay consistent with scroll
              left: 0,
              width: "100%",
              height: "100vh", // viewport height
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              key="popup-window"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 250 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-[320px] max-w-[90%] z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {popupContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HoverOverlay;
