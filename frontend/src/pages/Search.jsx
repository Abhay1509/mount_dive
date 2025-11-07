import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SearchSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* --- Search Icon --- */}
      <div className="fixed top-6 right-6 z-30 cursor-pointer">
        <img
          src="/search.svg"
          alt="Search"
          className="h-8 w-8 hover:scale-110 transition-transform duration-200"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* --- Blur Overlay (background blur when sidebar open) --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 z-20"
            onClick={() => setIsOpen(false)} // clicking outside closes sidebar
          />
        )}
      </AnimatePresence>

      {/* --- Sliding Sidebar --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-screen w-1/4 bg-white shadow-2xl z-30 flex flex-col p-6"
          >
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-black text-xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Search input */}
            <div className="mt-10">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
              />
            </div>

            {/* (Optional) search suggestions / content */}
            <div className="mt-6 text-gray-500 text-sm">
              Start typing to search...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchSidebar;
