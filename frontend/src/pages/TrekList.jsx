import React from "react";
import { motion } from "framer-motion";

const treks = [
  {
    id: 1,
    name: "Everest Base Camp",
    location: "Nepal",
    difficulty: "Hard",
    tagColor: "bg-red-500",
    image:
      "https://images.pexels.com/photos/30439897/pexels-photo-30439897.jpeg",
    description:
      "One of the most popular treks in the world with breathtaking Himalayan views.",
  },
  {
    id: 2,
    name: "Hampta Pass",
    location: "Himachal Pradesh, India",
    difficulty: "Moderate",
    tagColor: "bg-yellow-500",
    image:
      "https://images.pexels.com/photos/32109162/pexels-photo-32109162.jpeg",
    description:
      "A beautiful crossover trek with rivers, meadows, and high passes.",
  },
  {
    id: 3,
    name: "Kedarkantha",
    location: "Uttarakhand, India",
    difficulty: "Easy",
    tagColor: "bg-green-500",
    image:
      "https://images.pexels.com/photos/12726408/pexels-photo-12726408.jpeg",
    description:
      "A classic winter trek famous for its snow-covered trails and summit views.",
  },
  {
    id: 4,
    name: "Brahmatal",
    location: "Uttarakhand, India",
    difficulty: "Moderate",
    tagColor: "bg-yellow-500",
    image: "https://images.pexels.com/photos/1531660/pexels-photo-1531660.jpeg",
    description:
      "A winter trek with frozen lakes, ridge walks, and panoramic Himalayan views.",
  },
  {
    id: 5,
    name: "Valley of Flowers",
    location: "Uttarakhand, India",
    difficulty: "Easy",
    tagColor: "bg-green-500",
    image: "https://images.pexels.com/photos/3669288/pexels-photo-3669288.jpeg",
    description:
      "A UNESCO World Heritage site, famous for its alpine meadows and rare flora.",
  },
  {
    id: 6,
    name: "Roopkund",
    location: "Uttarakhand, India",
    difficulty: "Hard",
    tagColor: "bg-red-500",
    image: "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg",
    description:
      "Known as the 'Skeleton Lake' trek, offering adventure with mystery and snow-clad peaks.",
  },
];

const TrekList = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/2403502/pexels-photo-2403502.jpeg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

      {/* Content */}
      <div className="relative z-10 py-16 px-6">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg 
                     backdrop-blur-lg bg-white/10 p-4 rounded-2xl border border-white/20"
        >
          🌄 Available Treks
        </motion.h1>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.3 },
            },
          }}
          className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
        >
          {treks.map((trek) => (
            <motion.div
              key={trek.id}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.5 }}
              className="relative backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl overflow-hidden 
                         border border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] 
                         transition cursor-pointer"
            >
              {/* Difficulty Tag */}
              <span
                className={`absolute top-3 left-3 ${trek.tagColor} text-white px-3 py-1 text-xs rounded-full shadow-md`}
              >
                {trek.difficulty}
              </span>

              {/* Image with zoom effect */}
              <div className="overflow-hidden">
                <img
                  src={trek.image}
                  alt={`${trek.name} trek in ${trek.location}`}
                  className="w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-white">{trek.name}</h2>
                <p className="text-yellow-300 mt-1">{trek.location}</p>
                <p className="mt-3 text-gray-200 text-sm">{trek.description}</p>

                {/* Glassmorphism Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-5 w-full flex items-center justify-center gap-2 
                             backdrop-blur-lg bg-white/10 border border-white/20 
                             text-white font-semibold py-2 px-4 rounded-lg 
                             shadow-lg hover:bg-white/20 transition"
                >
                  View Details ⛰️
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrekList;
