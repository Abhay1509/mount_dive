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
          src="https://cdn-icons-png.flaticon.com/512/861/861060.png"
          alt="Logo"
          className="h-10 w-10"
        />
        <span className="text-xl font-bold tracking-wide">MOUNTDIVE</span>
      </div>

      {/* Menu */}
      <ul className="hidden md:flex space-x-10 font-medium">
        <li>
          <button
            onClick={() => handleScroll("home")}
            className="hover:text-blue-400 transition"
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScroll("trek-services")}
            className="hover:text-blue-400 transition"
          >
            Services
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScroll("story")}
            className="hover:text-blue-400 transition"
          >
            Our Story
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScroll("trips")}
            className="hover:text-blue-400 transition"
          >
            Blog
          </button>
        </li>
        <li>
          <button
            onClick={() => handleScroll("footer")}
            className="hover:text-blue-400 transition"
          >
            Event
          </button>
        </li>
      </ul>

      {/* Right Side Buttons */}
      <div>
        <button className="ml-8 px-6 py-2 bg-transparent border-2 border-blue-400 rounded-full text-blue-400 hover:bg-blue-400 hover:text-white transition">
          Contact Us
        </button>

        {/* Single Auth Button */}

        {user ? (
          <button
            onClick={logout}
            className="ml-4 px-6 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth/signup")}
            className="ml-4 px-6 py-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
        )}
      </div>
    </nav>
  );
};

export default HeroNavbar;
