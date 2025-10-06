import React from "react";

const images = [
  "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
  "https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg",
  "https://images.pexels.com/photos/34033018/pexels-photo-34033018.jpeg",
  "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg",
  "https://images.pexels.com/photos/3650025/pexels-photo-3650025.jpeg",
  "https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg",
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-20 px-6 md:px-16 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Explore <span className="text-blue-500">Gallery</span>
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
        <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition">
          See All Pictures
        </button>
      </div>
    </section>
  );
};

export default Gallery;
