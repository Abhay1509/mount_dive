import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // adjust import path if needed
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
      <Navbar />

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
      <Footer />
    </>
  );
};

export default Profile;
