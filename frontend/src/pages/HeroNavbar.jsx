import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HeroNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Scroll to section smoothly
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full flex justify-between items-center px-16 py-6 text-white z-20">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="/SVG/logo1.svg"
          alt="Logo"
          className="h-[45px]  w-auto object-contain"
        />
      </div>

      {/* Menu */}
      <ul className="hidden md:flex space-x-10 font-medium">
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

      {/* Right Side Buttons */}
      <div>
        <button className="ml-8 px-6 py-2 bg-transparent border-2 border-[#8B7355] rounded-full text-[#FFFFFF] hover:bg-[#68917C] hover:text-white transition">
          Contact Us
        </button>

        {/* Single Auth Button */}

        {user ? (
          <button
            onClick={logout}
            className="ml-4 px-6 py-2 bg-[#8B7355] rounded-full text-white hover:bg-[#68917C] transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth/signup")}
            className="ml-4 px-6 py-2 bg-[#8B7355] rounded-full text-white hover:bg-[#68917C] transition"
          >
            Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default HeroNavbar;
