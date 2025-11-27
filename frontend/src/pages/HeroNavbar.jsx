import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

const HeroNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Scroll to section smoothly
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full flex items-center h-12 px-24 z-[1000]">
      <nav className="fixed top-0 left-0 w-full h-[65px] bg-white/80 backdrop-blur-lg z-50 flex items-center justify-between px-4 sm:px-6 lg:px-12 shadow-sm">
        {/* Logo */}
        <Link to="/">
          <img
            src="/SVG/logo1.svg"
            alt="Logo"
            className="h-[45px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-10 font-medium">
          <li>
            <button
              onClick={() => handleScroll("home")}
              className="hover:text-[#68917C] transition"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("trek-services")}
              className="hover:text-[#68917C] transition"
            >
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("story")}
              className="hover:text-[#68917C] transition"
            >
              Our Story
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("trips")}
              className="hover:text-[#68917C] transition"
            >
              Blog
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScroll("footer")}
              className="hover:text-[#68917C] transition"
            >
              Event
            </button>
          </li>
        </ul>

        {/* Desktop Auth/User Button */}
        <div className="hidden lg:flex">
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
                <div className="absolute right-0 mt-2 w-[200px] bg-white shadow-lg rounded-lg flex flex-col py-2 text-sm font-syne text-gray-700">
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
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
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

        {/*  Mobile Dropdown with ALL Links */}
        {isOpen && (
          <div className="absolute top-[65px] left-0 w-full bg-white shadow-lg lg:hidden flex flex-col items-center py-4 space-y-4 font-syne text-gray-700 text-sm">
            {/* Navigation Links */}
            <button
              onClick={() => handleScroll("home")}
              className="hover:text-[#68917C] transition"
            >
              Home
            </button>

            <button
              onClick={() => handleScroll("trek-services")}
              className="hover:text-[#68917C] transition"
            >
              Services
            </button>

            <button
              onClick={() => handleScroll("story")}
              className="hover:text-[#68917C] transition"
            >
              Our Story
            </button>
            <button
              onClick={() => handleScroll("gallery")}
              className="hover:text-[#68917C] transition"
            >
              Gallery
            </button>
            <Link
              to="/about"
              className="hover:text-[rgba(104,145,124,1)] transition-colors"
            >
              About Us
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
                className="px-4 py-2 border border-[#8F6E56] text-[#3B3B3B] rounded-lg hover:bg-[#68917C] hover:text-white"
              >
                Sign Up
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default HeroNavbar;
