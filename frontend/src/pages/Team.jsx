import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Conor Walk",
    role: "Mountain Guide",
    img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    socials: { facebook: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Jake Snow",
    role: "Camp Leader",
    img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    socials: { facebook: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Alex Perry",
    role: "Trek Specialist",
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    socials: { facebook: "#", instagram: "#", twitter: "#" },
  },
  {
    name: "Amanda Trailblazer",
    role: "Adventure Coach",
    img: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg",
    socials: { facebook: "#", instagram: "#", twitter: "#" },
  },
];

// Variants
const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  visible: { opacity: 1, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
};

const iconsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.08,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 450, damping: 28 },
  },
};

export default function Team() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="team" className="py-20 px-6 md:px-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">
        Meet Our <span className="text-blue-500">Hiking Team</span>
      </h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map((member, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-500 overflow-hidden relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* image wrapper */}
              <div className="relative overflow-hidden rounded-t-2xl">
                <motion.img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                  animate={{ scale: isHovered ? 1.08 : 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 16 }}
                  style={{ transformOrigin: "center center" }}
                />

                {/* overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center gap-4"
                  variants={overlayVariants}
                  initial="hidden"
                  animate={isHovered ? "visible" : "hidden"}
                  style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                >
                  {/* icons container */}
                  <motion.div
                    className="flex gap-4"
                    variants={iconsContainerVariants}
                    initial="hidden"
                    animate={isHovered ? "visible" : "hidden"}
                    // Make overlay/icons clickable only when visible
                    style={{ pointerEvents: isHovered ? "auto" : "none" }}
                  >
                    <motion.a
                      variants={iconVariants}
                      href={member.socials.facebook}
                      className="text-white bg-blue-600 p-3 rounded-full shadow-sm hover:bg-blue-700 transform"
                    >
                      <FaFacebookF />
                    </motion.a>

                    <motion.a
                      variants={iconVariants}
                      href={member.socials.instagram}
                      className="text-white bg-pink-500 p-3 rounded-full shadow-sm hover:bg-pink-600 transform"
                    >
                      <FaInstagram />
                    </motion.a>

                    <motion.a
                      variants={iconVariants}
                      href={member.socials.twitter}
                      className="text-white bg-sky-500 p-3 rounded-full shadow-sm hover:bg-sky-600 transform"
                    >
                      <FaTwitter />
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>

              {/* content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-blue-500 text-sm font-medium">{member.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
