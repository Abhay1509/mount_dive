// src/pages/LoggedInUser/LoggedInComponents/Card.jsx
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";



const formatPrice = (p) => {
  if (p == null) return "—";
  return Number(p).toLocaleString("en-IN");
};

const Card = memo(({ id, title, price, time, image, description }) => {
  const navigate = useNavigate();


  return (
    <article
      className="bg-white rounded-[16px] shadow-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300
                 h-[500px] w-[330px] flex flex-col"
    >
      {/* Image */}
      <div className="h-[220px] w-full overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = DEV_FALLBACK_IMG;
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between font-syne">
        <div>
          <h3
            className="text-[20px] font-bold text-gray-900 leading-tight mb-1 truncate"
            title={title}
          >
            {title}
          </h3>

          <div className="text-[13px] font-semibold uppercase text-gray-600 tracking-wide">
            {time}
          </div>

          <p className="mt-4 text-[15px] text-gray-700 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="mt-6">
          <div className="text-[22px] font-bold text-gray-900 mb-3">
            ₹ {formatPrice(price)}
            <span className="text-[15px] text-gray-500"> / person</span>
          </div>

          {/* Full Width Strong Button */}
          <button
            onClick={() => navigate(`/book-now/${id}`)}
            className="w-full h-[50px] bg-[#8F6E56] hover:bg-[#664d3b] 
                       text-white text-[16px] font-bold rounded-[10px] 
                       flex items-center justify-center gap-2 transition-all"
                       
          >
            <img
              src="/SVG/inquire.svg"
              alt=""
              className="w-[20px] h-[20px] object-contain"
            />
            INQUIRE NOW
          </button>
        </div>
      </div>
    </article>
  );
});

export default Card;
