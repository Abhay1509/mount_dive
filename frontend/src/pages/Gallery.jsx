import React from "react";

const images = [
  "/assets/LandingHeroCarousel/bg1.webp",
  "/assets/LandingHeroCarousel/bg3.webp",
  "/assets/LandingHeroCarousel/bg4.webp",
  "/assets/LandingHeroCarousel/bg3.webp",
  "/assets/LandingHeroCarousel/bg2.webp",
  "/assets/LandingHeroCarousel/bg1.webp",
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 px-6 md:px-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Explore <span className="text-[#68917C]">Gallery</span>
      </h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Discover breathtaking moments from our past adventures and hikes around
        the world.
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {images.map((src, i) => (
          <div key={i} className="overflow-hidden rounded-xl shadow-lg group">
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-12">
        <button className="px-8 py-3 bg-[#8B7355] text-white font-semibold rounded-full shadow-lg hover:bg-[#68917C] transition">
          See All Pictures
        </button>
      </div>
    </section>
  );
};

export default Gallery;
