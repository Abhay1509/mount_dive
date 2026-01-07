import React, { useEffect, useState } from "react";
import { MapPin, Clock } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const UpcomingTreks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/treks/upcoming", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setTreks(data?.data || []);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <>
      <body className="bg-[#F5F4F0]"></body>
      <Navbar />

      <div className="min-h-screen bg-[#F9F8F6] pt-24 flex justify-center px-4">
        <div className="w-full max-w-[1152px]">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-syne font-bold text-[#3B3B3B]">
              My Upcoming Treks
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2">
              Here are the adventures you've booked. Get ready to explore!
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-500">Loading upcoming treks...</p>
          )}

          {/* No Treks */}
          {!loading && treks.length === 0 && (
            <p className="text-center text-gray-500 py-20">
              You have no upcoming treks.
            </p>
          )}

          {/* Trek Cards */}
          <div className="space-y-8">
            {treks.map((trek) => (
              <div
                key={trek.id}
                className="bg-white shadow-sm rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 transition hover:shadow-md"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-full md:w-[280px] h-[200px] md:h-[300px] rounded-2xl overflow-hidden">
                  <img
                    src={trek.image}
                    alt={trek.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
                      <h2 className="text-xl md:text-2xl font-syne font-semibold text-[#3B3B3B]">
                        {trek.title}
                      </h2>
                      <span className="text-xs bg-[#F1EAE4] text-[#3B3B3B] px-3 py-1 rounded-full font-medium">
                        {trek.date}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin size={15} /> {trek.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={15} /> {trek.duration}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-syne font-semibold text-[#3B3B3B] text-[15px] mb-1">
                        Itinerary Overview
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {trek.overview}
                      </p>
                    </div>

                    <div className="mb-2">
                      <h4 className="text-sm font-semibold text-[#3B3B3B] mb-1">
                        Fellow Trekkers
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trek.trekkers?.map((name, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs bg-[#F1EAE4] text-[#3B3B3B] rounded-full"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between">
                    <button className="px-4 py-2 text-sm border border-[#8F6E56] text-[#3B3B3B] rounded-md hover:bg-[#68917C] hover:text-white transition">
                      Cancel Trek
                    </button>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Total Cost</p>
                      <p className="text-lg font-syne font-semibold text-[#3B3B3B]">
                        {trek.cost}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UpcomingTreks;
