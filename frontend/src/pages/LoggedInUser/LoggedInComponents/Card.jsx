import React, { memo } from "react";
import { Link } from "react-router-dom";
import BookNow from "../BookNow";

// ✅ Memoized for performance
const Card = memo(({ title, price, time, image, description }) => {
  return (
    <div
      className="bg-white rounded-[50px] shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-3xl 
      h-[468px] w-[450px] flex flex-col justify-center items-center hover:cursor-pointer"
    >
      {/* ✅ Image - Lazy loaded + object-cover for stable layout */}
      <div className="h-[240px] w-[380px] rounded-[30px] overflow-hidden bg-gray-200 mt-[30px]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* ✅ Card Content */}
      <div className="p-3 text-center flex flex-col justify-center items-center">
        <h2 className="h-[21px] w-[290px] font-syne text-[20px] font-semibold text-gray-800 truncate">
          {title}
        </h2>

        <p className="font-syne font-bold text-[13px] leading-[21px] uppercase mt-2 text-[#3B3B3B]">
          {time}
        </p>

        {/* ✅ Prevent layout shift (Vector is positioned absolutely, no DOM jump) */}
        <img
          src="/SVG/Vector.svg"
          alt=""
          className="absolute bottom-0 z-[-1] w-full h-[200px] pointer-events-none select-none"
          loading="lazy"
        />

        <p className="font-syne font-medium text-[15px] leading-[21px] text-black/60 mt-4 line-clamp-3">
          {description}
        </p>

        <div className="mt-3 flex flex-col items-center">
          <p className="font-bold mb-4 text-[20px] text-black">INR {price}/Person</p>

          {/* ✅ Use Link with prefetch behavior for faster route transitions */}
          <Link
            to="/BookNow"
            prefetch="intent"
            className="bg-[rgba(143,110,86,1)] h-[40px] hover:bg-[#4b301c] font-semibold py-2 px-5 rounded-lg flex justify-center items-center gap-2 
            text-[rgba(255,255,255,1)] mb-3 z-10 transition-all duration-300"
          >
            <img
              src="/SVG/inquire.svg"
              alt=""
              className="w-[18px] h-[18px] object-contain"
              loading="lazy"
            />
            INQUIRE NOW
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Card;
