import React from "react";
import { Link } from "react-router-dom";

const OurStory = () => {
  return (
    <section id="story" className="py-20 px-6 md:px-16 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div className="relative">
          <img
            src="/assets/OurStoryImg/OurStoryImg.webp"
            alt="Our Story"
            loading="lazy"
            className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
          />
        </div>

        {/* Right Content */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our <span className="text-[#68917C]">Story</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <Link
            to="/about"
            className="px-6 py-3 bg-[#8B7355] text-white font-semibold rounded-full shadow-lg hover:bg-[#68917C] transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
