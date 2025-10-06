import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const sections = ["home", "trek-services", "story", "team", "treks", "gallery"];

const SideNav = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const scrollTimeout = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 1200);

      if (!ticking.current) {
        requestAnimationFrame(() => {
          const scrollPos = window.scrollY + window.innerHeight / 2;

          const sectionPositions = sections.map((id) => {
            const el = document.getElementById(id);
            return el ? el.offsetTop : 0;
          });

          let current = "home";
          for (let i = 0; i < sections.length; i++) {
            const el = document.getElementById(sections[i]);
            if (el && el.offsetTop <= scrollPos) {
              current = sections[i];
            }
          }
          setActiveSection(current);

          const totalSections = sections.length - 1;
          const sectionIndex = sections.indexOf(current);
          const sectionStart = sectionPositions[sectionIndex];
          const sectionEnd =
            sectionIndex < sections.length - 1
              ? sectionPositions[sectionIndex + 1]
              : sectionStart + window.innerHeight;

          let sectionProgress =
            (scrollPos - sectionStart) / (sectionEnd - sectionStart);
          sectionProgress = Math.max(0, Math.min(1, sectionProgress));

          let overallProgress = (sectionIndex + sectionProgress) / totalSections;
          overallProgress = Math.min(overallProgress, 1);
          setProgress(overallProgress);

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div
      className="fixed left-0 top-0 h-screen z-50 flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Teaser line when hidden */}
      <div className="w-[2px] h-16 bg-gray-400 rounded-full ml-2 opacity-60" />

      {/* Slim Glassy Pill */}
      <motion.div
        className="ml-2 flex flex-col items-center rounded-full backdrop-blur-md bg-white/20 shadow-lg px-2 py-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: isScrolling || isHovered ? 1 : 0,
          x: isScrolling || isHovered ? 0 : -20,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="relative flex flex-col items-center h-[65vh]">
          {/* Background line */}
          <div className="absolute w-[2px] h-full bg-gray-300/50 rounded-full" />

          {/* Progress line */}
          <motion.div
            className="absolute w-[2px] bg-blue-500 rounded-full origin-top"
            animate={{ height: `${progress * 100}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Dots */}
          <div className="flex flex-col justify-between h-full">
            {sections.map((id, idx) => {
              const isActive = activeSection === id;
              const isLast = idx === sections.length - 1;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className="relative flex flex-col items-center"
                >
                  <motion.div
                    className={`w-2.5 h-2.5 rounded-full border-2 z-10 ${
                      isActive
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white/70 border-gray-400/50"
                    }`}
                    animate={{
                      scale: isActive ? (isLast ? [1, 1.3, 1] : 1.2) : 1,
                    }}
                    transition={{
                      duration: isLast && isActive ? 1.2 : 0.3,
                      repeat: isLast && isActive ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Labels */}
                  <motion.div
                    className="absolute left-6 text-xs font-medium text-gray-800 bg-white/70 px-2 py-0.5 rounded-md shadow-md backdrop-blur"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : -10,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </motion.div>
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SideNav;
