import React, { useState } from "react";
import { useInView } from "react-intersection-observer"; // ✅ correct import

const imageData = {
  Mountains: [
    "/LandingHeroCarousel/bg1.webp",
    "/LandingHeroCarousel/bg2.webp",
    "/LandingHeroCarousel/bg3.webp",
    "/LandingHeroCarousel/bg4.webp",
    "/LandingHeroCarousel/bg1.webp",
    "/LandingHeroCarousel/bg3.webp",
    "/LandingHeroCarousel/bg4.webp",
  ],
  Trekking: [
    "/LandingHeroCarousel/bg2.webp",
    "/LandingHeroCarousel/bg3.webp",
    "/LandingHeroCarousel/bg1.webp",
    "/LandingHeroCarousel/bg4.webp",
    "/LandingHeroCarousel/bg2.webp",
  ],
  Camping: [
    "/LandingHeroCarousel/bg3.webp",
    "/LandingHeroCarousel/bg4.webp",
    "/LandingHeroCarousel/bg1.webp",
    "/LandingHeroCarousel/bg2.webp",
  ],
  Wildlife: [
    "/LandingHeroCarousel/bg1.webp",
    "/LandingHeroCarousel/bg2.webp",
    "/LandingHeroCarousel/bg3.webp",
    "/LandingHeroCarousel/bg4.webp",
  ],
  Landscapes: [
    "/LandingHeroCarousel/bg1.webp",
    "/LandingHeroCarousel/bg3.webp",
    "/LandingHeroCarousel/bg4.webp",
    "/LandingHeroCarousel/bg2.webp",
  ],
};

// ✅ LazyImage must be declared as a React component

// ✅ Main Gallery Component
const GalleryPage = () => {
  const LazyImage = ({ src, alt, height }) => {
    const { ref, inView } = useInView({
      triggerOnce: true,
      threshold: 0.2,
    });

    return (
      <div
        ref={ref}
        className="overflow-hidden rounded-2xl shadow-sm mb-4 break-inside-avoid"
      >
        {inView ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full object-cover transition-transform duration-300 hover:scale-105"
            style={{ height }}
          />
        ) : (
          <div
            className="w-full bg-gray-200 animate-pulse rounded-2xl"
            style={{ height }}
          />
        )}
      </div>
    );
  };
  const [activeCategory, setActiveCategory] = useState("Mountains");
  const categories = Object.keys(imageData);

  const visibleImages = imageData[activeCategory].slice(0, 9); // 3-row effect

  return (
    <div className="min-h-screen bg-[#F9F8F6] py-10 px-4 md:px-12 lg:px-20">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2 rounded-full font-syne text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-[#8F6E56] text-white shadow-md"
                : "bg-[#EDEBE8] text-[#3B3B3B] hover:bg-[#D8C8B8]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {visibleImages.map((src, i) => {
          const heights = [250, 300, 350, 400, 450];
          const randomHeight = heights[i % heights.length];
          return (
            <LazyImage
              key={i}
              src={src}
              alt={`${activeCategory} ${i + 1}`}
              height={`${randomHeight}px`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
