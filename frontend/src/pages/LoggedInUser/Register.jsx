import React, { useState } from "react";
import { Trash2, Upload, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Register = () => {
  const [trekkers, setTrekkers] = useState([
    { id: 1, name: "", email: "", age: "", phone: "", height: "", weight: "" },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const addTrekker = () => {
    setTrekkers([
      ...trekkers,
      {
        id: trekkers.length + 1,
        name: "",
        email: "",
        age: "",
        phone: "",
        height: "",
        weight: "",
      },
    ]);
  };

  const removeTrekker = (id) => {
    const updated = trekkers.filter((t) => t.id !== id);
    const reindexed = updated.map((t, index) => ({ ...t, id: index + 1 }));
    setTrekkers(reindexed);
  };

  const handleChange = (id, field, value) => {
    const updatedTrekkers = trekkers.map((t) => {
      if (t.id === id) {
        let newValue = value;
        if (field === "name") newValue = value.replace(/[^a-zA-Z\s]/g, "");
        if (
          field === "email" &&
          value &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        )
          newValue = value;
        if (field === "age") newValue = value.replace(/\D/g, "");
        if (["phone", "height", "weight"].includes(field))
          newValue = value.replace(/\D/g, "");
        return { ...t, [field]: newValue };
      }
      return t;
    });
    setTrekkers(updatedTrekkers);
  };

  const getError = (trekker, field) => {
    switch (field) {
      case "name":
        if (!trekker.name) return "Name is required";
        if (!/^[A-Za-z\s]+$/.test(trekker.name))
          return "Only alphabets allowed";
        break;
      case "email":
        if (!trekker.email) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trekker.email))
          return "Invalid email format";
        break;
      case "age":
        if (!trekker.age) return "Age is required";
        if (parseInt(trekker.age) <= 10) return "Age must be greater than 10";
        break;
      case "phone":
        if (!trekker.phone) return "Phone is required";
        if (trekker.phone.length < 10) return "Invalid phone number";
        break;
      default:
        return null;
    }
    return null;
  };
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // set your trekId (can be dynamic later)
  const trekId = "roopkund-2024"; // change accordingly

  // validate all trekkers before sending
  const validateAll = () => {
    for (const t of trekkers) {
      const nameErr = getError(t, "name");
      const emailErr = getError(t, "email");
      const ageErr = getError(t, "age");
      const phoneErr = getError(t, "phone");

      if (nameErr || emailErr || ageErr || phoneErr) {
        return {
          ok: false,
          message: nameErr || emailErr || ageErr || phoneErr,
        };
      }
    }
    return { ok: true };
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setSubmitSuccess(false);

    // basic check: user must be logged in
    if (!user || !user._id) {
      setSubmitError("You must be logged in to register trekkers.");
      return;
    }

    const valid = validateAll();
    if (!valid.ok) {
      setSubmitError(valid.message || "Please fix validation errors first.");
      return;
    }

    // Build payload (for now we skip file uploads and send only fields)
    const payload = {
      userId: user._id, // ensure your Auth user stores _id or change to user.id
      trekId,
      trekkers: trekkers.map((t) => ({
        name: t.name,
        email: t.email,
        age: Number(t.age) || null,
        phone: t.phone,
        height: t.height ? Number(t.height) : undefined,
        weight: t.weight ? Number(t.weight) : undefined,
        medical: t.medical || "No", // if you later add a field
        // file: optional - not included now
      })),
    };

    try {
      setLoadingSubmit(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/trek-registration/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            // If your backend expects JWT, include it:
            // Authorization: `Bearer ${user.token}`
          },
        }
      );

      if (res.data && res.data.success) {
        setSubmitSuccess(true);
        // optionally navigate to payment page or success page
        // navigate("/payment", { state: { registration: res.data.data } });
        // For now show a success and clear or keep data
      } else {
        setSubmitError(res.data?.message || "Unexpected server response");
      }
    } catch (err) {
      console.error("Submit error:", err?.response || err);
      setSubmitError(
        err.response?.data?.message || err.message || "Failed to submit"
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className=" bg-[#F5F4F0]"></div>
      <div className="bg-[#F5F4F0] min-h-screen pb-16">
        {/* Navbar */}
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

        {/* Main Container */}
        <div className="border border-[#D8D5CA] max-w-[1200px] w-[95%] mx-auto rounded-lg h-auto p-6 sm:p-8 font-syne bg-[#F5F4F0] mt-24 sm:mt-28 md:mt-32">
          {/* Trek Info Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#3B3B3B] mb-2">
              Roopkund Trek
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Location:</span> Uttarakhand
              </p>
              <p>
                <span className="font-semibold">Duration:</span> 8 Days / 7
                Nights
              </p>
              <p>
                <span className="font-semibold">Dates:</span> 15th Oct - 22nd
                Oct 2024
              </p>
              <p>
                <span className="font-semibold">Difficulty:</span> Moderate to
                Difficult
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6 text-[#3B3B3B]">
            Add Trekkers Information
          </h2>

          {/* Trekker Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {trekkers.map((trekker) => (
              <div
                key={trekker.id}
                className="relative bg-[#E5E3DC4D] border border-gray-200 rounded-lg shadow-sm p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-[#3B3B3B]">
                    Trekker {trekker.id}
                  </h3>
                  {trekkers.length > 1 && (
                    <button
                      onClick={() => removeTrekker(trekker.id)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="space-y-4 text-sm text-gray-700">
                  {/* Full Name */}
                  <div>
                    <label className="font-medium">Full Name *</label>
                    <input
                      type="text"
                      value={trekker.name}
                      onChange={(e) =>
                        handleChange(trekker.id, "name", e.target.value)
                      }
                      placeholder="Enter full name"
                      className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    {getError(trekker, "name") && (
                      <p className="text-red-500 text-xs mt-1">
                        {getError(trekker, "name")}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-medium">Email *</label>
                    <input
                      type="email"
                      value={trekker.email}
                      onChange={(e) =>
                        handleChange(trekker.id, "email", e.target.value)
                      }
                      placeholder="example@email.com"
                      className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    {getError(trekker, "email") && (
                      <p className="text-red-500 text-xs mt-1">
                        {getError(trekker, "email")}
                      </p>
                    )}
                  </div>

                  {/* Age & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-medium">Age *</label>
                      <input
                        type="text"
                        value={trekker.age}
                        onChange={(e) =>
                          handleChange(trekker.id, "age", e.target.value)
                        }
                        placeholder="e.g. 25"
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                      {getError(trekker, "age") && (
                        <p className="text-red-500 text-xs mt-1">
                          {getError(trekker, "age")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="font-medium">Phone *</label>
                      <input
                        type="text"
                        value={trekker.phone}
                        onChange={(e) =>
                          handleChange(trekker.id, "phone", e.target.value)
                        }
                        placeholder="e.g. 9876543210"
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                      {getError(trekker, "phone") && (
                        <p className="text-red-500 text-xs mt-1">
                          {getError(trekker, "phone")}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Height & Weight */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-medium">Height (cm) *</label>
                      <input
                        type="text"
                        value={trekker.height}
                        onChange={(e) =>
                          handleChange(trekker.id, "height", e.target.value)
                        }
                        placeholder="e.g. 170"
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="font-medium">Weight (kg) *</label>
                      <input
                        type="text"
                        value={trekker.weight}
                        onChange={(e) =>
                          handleChange(trekker.id, "weight", e.target.value)
                        }
                        placeholder="e.g. 65"
                        className="w-full mt-1 p-2 border rounded-md"
                      />
                    </div>
                  </div>

                  {/* Medical */}
                  <div>
                    <label className="font-medium">Medical Condition</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>

                  {/* File Upload */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-500 cursor-pointer hover:border-gray-400">
                    <Upload className="mx-auto mb-2" />
                    <p>Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, PDF (max. 5MB)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Trekker Button */}
          <button
            onClick={addTrekker}
            className="flex items-center gap-2 text-sm font-medium text-[#3B3B3B] border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100"
          >
            <Plus size={16} /> Add Another Trekker
          </button>

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button
              className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => {
                // Save for later: store in localStorage
                localStorage.setItem("savedTrekkers", JSON.stringify(trekkers));
                alert("Saved locally. You can complete later.");
              }}
            >
              Save for Later
            </button>

            <button
              onClick={handleSubmit}
              disabled={loadingSubmit}
              className={`px-6 py-2 rounded-md text-white ${
                loadingSubmit
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#8F6E56] hover:bg-[#7c5d49]"
              }`}
            >
              {loadingSubmit ? "Submitting..." : "Proceed to Payment"}
            </button>
          </div>

          {/* show server error / success */}
          {submitError && (
            <p className="text-red-500 mt-3 text-sm">{submitError}</p>
          )}
          {submitSuccess && (
            <p className="text-green-600 mt-3 text-sm">
              Registration submitted successfully! You'll receive a confirmation
              shortly.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
