import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // adjust import path if needed
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth(); // your AuthContext should provide updateUser
  const [isEditing, setIsEditing] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });

  // Prefill with user info
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob || "",
        gender: user.gender || "",
      });
      setIsEmailVerified(user.emailVerified || false);
      setIsPhoneVerified(user.phoneVerified || false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";

    if (!formData.email.trim()) newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\+?\d{10,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number (10–15 digits).";

    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.gender) newErrors.gender = "Please select your gender.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setIsEditing(false);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.data.success) {
        // update context (OPTIONAL)
        if (updateUser) updateUser(res.data.user);

        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    }
  };

  // Fake verify buttons
  const verifyEmail = () => {
    if (!formData.email) return alert("Please enter your email first.");
    alert(`Verification email sent to ${formData.email}`);
    setIsEmailVerified(true);
  };

  const verifyPhone = () => {
    if (!formData.phone) return alert("Please enter your phone number first.");
    alert(`Verification code sent to ${formData.phone}`);
    setIsPhoneVerified(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-[65px] bg-white/80 backdrop-blur-md z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 shadow-sm">
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

      <div className="w-full flex justify-center px-4 py-10 bg-[#F9F8F6] min-h-screen">
        <div className="w-full max-w-[896px] bg-white rounded-2xl shadow-sm p-8 md:p-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-syne font-semibold text-[#3B3B3B]">
                Profile
              </h1>
              <p className="text-sm text-gray-500">
                Manage your personal information and account settings.
              </p>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#8F6E56] text-white rounded-md hover:bg-[#765c46] transition font-syne text-sm"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#68917C] text-white rounded-md hover:bg-[#557a68] transition font-syne text-sm"
              >
                Save
              </button>
            )}
          </div>

          {/* Profile Photo */}
          <div className="mb-8">
            <h2 className="font-syne text-lg text-[#3B3B3B] mb-1">
              Profile Photo
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Update your photo. It helps people recognize you.
            </p>
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-syne text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-syne text-[#3B3B3B] mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-md p-2.5 text-sm focus:outline-none ${
                  isEditing
                    ? "bg-white border-gray-300 focus:ring-1 focus:ring-[#8F6E56]"
                    : "bg-[#F9F8F6] border-gray-200"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-syne text-[#3B3B3B] mb-1">
                Email Address
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`flex-1 border rounded-md p-2.5 text-sm focus:outline-none ${
                    isEditing
                      ? "bg-white border-gray-300 focus:ring-1 focus:ring-[#8F6E56]"
                      : "bg-[#F9F8F6] border-gray-200"
                  }`}
                />
                {isEmailVerified ? (
                  <span className="px-3 py-2 bg-green-100 text-green-600 rounded-md text-xs font-medium flex items-center justify-center">
                    Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={verifyEmail}
                    disabled={!isEditing}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                      isEditing
                        ? "bg-[#8F6E56] text-white hover:bg-[#765c46]"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Verify
                  </button>
                )}
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-syne text-[#3B3B3B] mb-1">
                Phone Number
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="+911234567890"
                  className={`flex-1 border rounded-md p-2.5 text-sm focus:outline-none ${
                    isEditing
                      ? "bg-white border-gray-300 focus:ring-1 focus:ring-[#8F6E56]"
                      : "bg-[#F9F8F6] border-gray-200"
                  }`}
                />
                {isPhoneVerified ? (
                  <span className="px-3 py-2 bg-green-100 text-green-600 rounded-md text-xs font-medium flex items-center justify-center">
                    Verified
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={verifyPhone}
                    disabled={!isEditing}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                      isEditing
                        ? "bg-[#8F6E56] text-white hover:bg-[#765c46]"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Verify
                  </button>
                )}
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-syne text-[#3B3B3B] mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-md p-2.5 text-sm focus:outline-none ${
                  isEditing
                    ? "bg-white border-gray-300 focus:ring-1 focus:ring-[#8F6E56]"
                    : "bg-[#F9F8F6] border-gray-200"
                }`}
              />
              {errors.dob && (
                <p className="text-xs text-red-500 mt-1">{errors.dob}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-syne text-[#3B3B3B] mb-1">
                Gender
              </label>
              <div className="flex flex-wrap gap-4">
                {["Male", "Female", "Prefer not to say"].map((g) => (
                  <label
                    key={g}
                    className={`px-4 py-2 rounded-md border text-sm cursor-pointer transition ${
                      formData.gender === g
                        ? "border-[#8F6E56] bg-[#F1EAE4] text-[#3B3B3B]"
                        : "border-gray-200 bg-[#F9F8F6] text-gray-500"
                    } ${!isEditing ? "cursor-not-allowed opacity-75" : ""}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="hidden"
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
              )}
            </div>
          </form>
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

export default Profile;
