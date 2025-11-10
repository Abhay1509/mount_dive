import React from "react";
import { MapPin, CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const treks = [
  {
    id: 1,
    title: "Everest Base Camp",
    location: "Himalayas, Nepal",
    duration: "12 Days / 11 Nights",
    date: "Dec 05–17, 2025",
    overview:
      "A brief look at the journey: Day 1: Arrive in Kathmandu. Day 2: Fly to Lukla & trek to Phakding. Day 3: Trek to Namche Bazaar. Days 4–8: Acclimatization and trekking towards Gorak Shep. Day 9: Hike to Everest Base Camp and return to Gorak Shep. Days 10–12: Descend back to Lukla and fly to Kathmandu.",
    trekkers: ["Alex Johnson", "Maria Garcia (You)", "Chen Wei"],
    cost: "$2,500",
    image: "/assets/LandingHeroCarousel/bg2.webp",
  },
  {
    id: 2,
    title: "Annapurna Circuit",
    location: "Himalayas, Nepal",
    duration: "14 Days / 13 Nights",
    date: "Mar 10–23, 2026",
    overview:
      "A brief look at the journey: Day 1: Drive to Besisahar. Day 2: Trek to Bahundanda. Day 3: Trek to Chame. Days 4–10: Ascend through diverse landscapes, crossing the Thorong La Pass. Day 11: Descend to Muktinath. Days 12–14: Trek down through the Kali Gandaki Gorge and travel back to Pokhara.",
    trekkers: [
      "David Smith",
      "Maria Garcia (You)",
      "Priya Patel",
      "Kenji Tanaka",
    ],
    cost: "$2,800",
    image: "/assets/LandingHeroCarousel/bg3.webp",
  },
];

const UpcomingTreks = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <body className="bg-[#F5F4F0]"></body>
      <nav className="fixed top-0 left-0 w-full h-[65px]  backdrop-blur-md z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 shadow-sm">
        {/* Logo */}
        <Link to="/">
          <img
            src="/SVG/logo1.svg"
            alt="Logo"
            className="h-[45px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-syne text-[15px] text-gray-700 font-light">
          <li>
            <Link
              to="/landing"
              className="hover:text-[rgba(104,145,124,1)] transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/explore"
              className="hover:text-[rgba(104,145,124,1)] transition-colors"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-[rgba(104,145,124,1)] transition-colors"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/gallery"
              className="hover:text-[rgba(104,145,124,1)] transition-colors"
            >
              Gallery
            </Link>
          </li>
        </ul>

        {/* Desktop Auth/User Button */}
        <div className="hidden md:flex">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="ml-4 px-6 py-2 rounded-full border border-[#8F6E56] text-[#3B3B3B] hover:bg-[#68917C] font-syne transition hover:text-white flex gap-3 items-center text-[14px]"
              >
                Hello {user.name}
                <img src="/SVG/arrow-down.svg" alt="" />
              </button>

              {/* Desktop Dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white shadow-md rounded-md flex flex-col py-2 text-sm font-syne text-gray-700">
                  <Link
                    to="/profile"
                    className="px-4 py-2 hover:bg-gray-100 flex gap-2 items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <img src="/SVG/profile.svg" className="h-4 w-5" alt="" />
                    Profile
                  </Link>
                  <Link
                    to="/upcoming-treks"
                    className="px-4 py-2 hover:bg-gray-100 flex gap-2 items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <img src="/SVG/timer.svg" className="h-4 w-5" alt="" />
                    Upcoming Treks
                  </Link>
                  <Link
                    to="/previous-treks"
                    className="px-4 py-2 hover:bg-gray-100 flex gap-2 items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <img src="/SVG/timer.svg" className="h-4 w-5" alt="" />
                    Previous Treks
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="px-4 py-2 hover:bg-gray-100 flex gap-2 items-center text-left"
                  >
                    <img src="/SVG/logout.svg" className="h-4 w-5" alt="" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth/signup")}
              className="ml-4 px-6 py-2 rounded-full border border-[#8F6E56] text-[#3B3B3B] hover:bg-[#68917C] transition hover:text-white"
            >
              Sign Up
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-gray-800 my-1 transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        {/* ✅ Mobile Dropdown with ALL Links */}
        {isOpen && (
          <div className="absolute top-[65px] left-0 w-full bg-white shadow-md md:hidden flex flex-col items-center py-4 space-y-4 font-syne text-gray-700 text-sm">
            {/* Navigation Links */}
            <Link
              to="/landing"
              className="hover:text-[rgba(104,145,124,1)]"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="hover:text-[rgba(104,145,124,1)]"
              onClick={() => setIsOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/about"
              className="hover:text-[rgba(104,145,124,1)]"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/gallery"
              className="hover:text-[rgba(104,145,124,1)]"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>

            {/* Divider */}
            <div className="w-3/4 border-t border-gray-200 my-2"></div>

            {/* User or Auth Links */}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="hover:text-[rgba(104,145,124,1)] flex gap-2 items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/SVG/profile.svg" className="h-4 w-5" alt="" />
                  Profile
                </Link>
                <Link
                  to="/upcoming-treks"
                  className="hover:text-[rgba(104,145,124,1)] flex gap-2 items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/SVG/timer.svg" className="h-4 w-5" alt="" />
                  Upcoming Treks
                </Link>
                <Link
                  to="/previous-treks"
                  className="hover:text-[rgba(104,145,124,1)] flex gap-2 items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <img src="/SVG/timer.svg" className="h-4 w-5" alt="" />
                  Previous Treks
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="hover:text-[rgba(104,145,124,1)] flex gap-2 items-center"
                >
                  <img src="/SVG/logout.svg" className="h-4 w-5" alt="" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/auth/signup");
                }}
                className="px-4 py-2 border border-[#8F6E56] text-[#3B3B3B] rounded-md hover:bg-[#68917C] hover:text-white"
              >
                Sign Up
              </button>
            )}
          </div>
        )}
      </nav>
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
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title and Meta */}
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

                    {/* Overview */}
                    <div className="mb-4">
                      <h3 className="font-syne font-semibold text-[#3B3B3B] text-[15px] mb-1">
                        Itinerary Overview
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {trek.overview}
                      </p>
                    </div>

                    {/* Fellow Trekkers */}
                    <div className="mb-2">
                      <h4 className="text-sm font-semibold text-[#3B3B3B] mb-1">
                        Fellow Trekkers
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trek.trekkers.map((name, i) => (
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
      <footer className="bg-[#3B3B3B] mt-16 text-[#F5F4F0] py-10 flex flex-col items-center space-y-4">
        <div className="flex gap-5">
          <img src="/SVG/instaabout.svg" className="h-5 w-5" alt="Instagram" />
          <img src="/SVG/faceabout.svg" className="h-5 w-5" alt="Facebook" />
          <img src="/SVG/xabout.svg" className="h-5 w-5" alt="X" />
        </div>
        <p className="text-xs md:text-sm opacity-80 text-center">
          © 2025 MountTreks. Experience the Himalayas like never before.
        </p>
      </footer>
    </>
  );
};

export default UpcomingTreks;
