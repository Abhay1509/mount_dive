// src/pages/LoggedInUser/BookTrekPage.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BookTrekPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Guest view
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-700 mb-6">
          Testing Branching
        </p>
        <button
          onClick={() => navigate("/auth/login")}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Logged-in view
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Book Your Trek
      </h1>
      <p className="text-gray-700 mb-4">
        Welcome, <span className="font-semibold">{user.email || "Adventurer"}</span>! Choose your trek below:
      </p>

      {/* Demo trek list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3].map((trek) => (
          <div key={trek} className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Trek #{trek}</h2>
            <p className="text-gray-600 mb-4">
              Scenic trek experience with expert guides.
            </p>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTrekPage;
