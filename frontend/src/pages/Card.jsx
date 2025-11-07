import React from "react";
import { Link } from "react-router-dom";
import BookNow from "./BookNow";

const Card = ({ title, price, time, image, description  }) => {
  return (
    <div className="bg-white rounded-[50px] shadow-2xl overflow-hidden transition transform hover:-translate-y-2 hover:shadow-3xl h-[468px] w-[340px] flex flex-col justify-center items-center hover:cursor-pointer  ">
      {/* Image Placeholder */}
     
      <div className="h-[200px] w-[280px] rounded-[30px] overflow-hidden bg-gray-300 mt-[30px]">
         <img src={image} className=" overflow-hidden" alt="" />
      </div>

      {/* Card Content */}
      <div className="p-3 text-center flex flex-col justify-center items-center">
        <h2 className=" h-[21px] w-[290px] font-syne text-[18px] font-semibold text-gray-800">
          {title}
        </h2>
        <p className="font-syne font-bold text-[11px] leading-[21px] tracking-normal text-center uppercase flex items-center justify-center mt-2">
          {time}
        </p>
        <img src="/Vector.svg" className=" absolute bottom-0 z-[-1]" alt="" />

        <p className="font-syne font-medium text-[13px] leading-[21px] tracking-normal text-center flex items-center justify-center text-black/60 mt-4">
          {description}
        </p>

        <div className="mt-3">
          <p className=" font-bold mb-9 text-black">INR {price}/Person</p>

          <Link to="/BookNow" className="bg-[rgba(143,110,86,1)] h-[40px] hover:bg-[#4b301c] font-semibold py-2 px-5 rounded-lg flex justify-center items-center gap-2 opacity-100 text-[rgba(255,255,255,1)] mb-3 z-10">
            <img src="/inquire.svg" alt="" />
            INQUIRE NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
