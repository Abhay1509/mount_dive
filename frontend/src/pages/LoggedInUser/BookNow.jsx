import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  ChevronDown,
  ChevronUp,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Phone,
  MessageCircle,
  Camera,
  Video,
  Upload,
  MapPin,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

// const images = [
//   "assets/LandingHeroCarousel/bg4.webp",
//   "assets/LandingHeroCarousel/bg3.webp",
//   "assets/LandingHeroCarousel/bg2.webp",
//   "assets/LandingHeroCarousel/bg1.webp",
//   "assets/LandingHeroCarousel/bg1.webp",
// ];

// const itineraryData = [
//   {
//     day: "Day 1 : Manali → Gulaba (drive) → Gulaba Meadows (camp)",
//     details: [
//       "Altitude: Manali – 2,050 m | Gulaba – 3,000 m | Gulaba Meadows – 3,200 m",
//       "Drive Distance: 21 km (~2 hrs)",
//       "Trek Distance: 500 m (20 min)",
//       "Start your journey from Manali, driving along the scenic Rohtang Pass road. Pass quaint hamlets like Kolang, Palchan, and Kothi with the Beas River flowing alongside. (Transport not included)",
//       "Arrive at Gulaba, a picturesque village known for adventure sports like skiing, paragliding, and snow scooters.",
//       "Begin a short trek (1–1.5 hrs) through grasslands and forest lines to reach Gulaba Meadows campsite.",
//       "Evening highlights: witness a stunning sunset, enjoy stargazing under a clear Himalayan sky, and soak in the serenity of the meadows.",
//     ],
//   },
//   {
//     day: "Day 2 : Gulaba → Rola Kholi (camp)",
//     details: ["Beautiful trek through alpine meadows and oak forests."],
//   },
//   {
//     day: "Day 3 : Rola Kholi → Bhrigu Lake → Rola Kholi",
//     details: ["Trek to the sacred Bhrigu Lake and return to camp."],
//   },
//   {
//     day: "Day 4 : Rola Kholi → Gulaba (trek) → Manali (drive)",
//     details: ["Descend back to Gulaba and drive to Manali."],
//   },
// ];

const termsSections = [
  {
    title: "Health & Fitness:",
    text: "You confirm that you are in good physical and mental health, and possess a level of fitness appropriate for the trek.",
  },
  {
    title: "Assumption of Risk:",
    text: "Trekking involves inherent risks, including accidents, altitude sickness, and exposure to elements. You voluntarily assume all such risks.",
  },
  {
    title: "Personal Responsibility:",
    text: "You are responsible for your safety and following the instructions of guides.",
  },
  {
    title: "Medical Disclosure:",
    text: "You agree to disclose pre-existing medical conditions before the trek. You must have comprehensive travel insurance.",
  },
];

const BookNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [trek, setTrek] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Itinerary");
  const [expandedDay, setExpandedDay] = useState(null);
  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const fetchTrek = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/treks/${id}`);
        setTrek(res.data);
        console.log("Trek data:", res.data);
      } catch (err) {
        console.error("Error loading trek:", err);
      }
    };

    fetchTrek();
  }, [id]);

  if (!trek) return <div>Loading...</div>;

  const images = trek?.images || [];

  const reviews = [
    {
      name: "Priya Sharma",
      text: "An unforgettable experience! The meadows were breathtaking and our guide was excellent.",
      stars: 5,
      reviewNo: "Reviews 1",
    },
    {
      name: "Rahul Verma",
      text: "Perfect trek for beginners. The lake is stunning and the entire journey was well organized.",
      stars: 5,
      reviewNo: "Reviews 2",
    },
    {
      name: "Anjali Patel",
      text: "Beautiful trek with amazing views. Would definitely recommend to anyone looking for a Himalayan adventure.",
      stars: 4,
      reviewNo: "Reviews 3",
    },
  ];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const tabs = [
    "Itinerary",
    "Highlights",
    "Inclusions",
    "Exclusions",
    "Add-ons",
  ];

  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  const visibleThumbnails = images.slice(0, 4);
  const remainingCount = images.length - visibleThumbnails.length;
  return (
    <>
      <div className="bg-[#F5F4F0]"></div>
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

        {/*  Mobile Dropdown with ALL Links */}
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

      <div className="main flex flex-col xl:flex-row gap-4 justify-center px-4 md:px-6 xl:px-8 pt-[90px]">
        {/* LEFT COLUMN (content) */}
        <div className="w-full lg:flex-1 xl:max-w-[900px] my-6 xl:my-6 xl:ml-5">
          {/* Slider container (responsive heights) */}
          <div className="slider w-full">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl overflow-hidden">
              <img
                src={images[selectedIndex]}
                alt="Main Slide"
                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => setLightboxOpen(true)}
              />

              {/* Left Button */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-[rgba(59,59,59,0.4)] hover:bg-[rgba(59,59,59,0.6)] text-white rounded-full p-2"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Button */}
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[rgba(59,59,59,0.4)] hover:bg-[rgba(59,59,59,0.6)] text-white rounded-full p-2"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Tags */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#F5F4F0] text-[#3B3B3B] px-3 py-1 rounded-md text-sm font-medium shadow">
                  Featured
                </span>
                <span className="bg-[#8F6E56] text-white px-3 py-1 rounded-md text-sm font-medium shadow">
                  Best Seller
                </span>
              </div>
            </div>

            {/* Thumbnail Row (responsive) */}
            <div className="flex flex-nowrap gap-3 mt-4">
              {visibleThumbnails.map((img, i) => (
                <div
                  key={i}
                  className="relative w-[45%] sm:w-[200px] md:w-[230px] h-[80px] sm:h-[110px] md:h-[130px] rounded-md overflow-hidden cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    onClick={() => setSelectedIndex(i)}
                    className={`w-full h-full rounded-lg object-cover border-2 ${
                      selectedIndex === i
                        ? "border-[#8F6E56]"
                        : "border-transparent hover:border-gray-300"
                    } transition`}
                  />

                  {i === visibleThumbnails.length - 1 && remainingCount > 0 && (
                    <div
                      onClick={() => setLightboxOpen(true)}
                      className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center text-white text-lg font-semibold"
                    >
                      +{remainingCount} more
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
              <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50 p-4">
                <div className="relative w-[95%] sm:w-[90%] max-w-5xl h-[60vh] sm:h-[70vh] md:h-[75vh]">
                  <img
                    src={images[selectedIndex]}
                    alt="Expanded"
                    className="w-full h-full object-contain rounded-lg shadow-lg"
                  />

                  {/* Close Button */}
                  <button
                    onClick={() => setLightboxOpen(false)}
                    className="absolute top-3 right-3 bg-[rgba(0,0,0,0.5)] text-white rounded-full p-2 hover:bg-[rgba(0,0,0,0.7)]"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  {/* Nav */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white rounded-full p-2"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[rgba(0,0,0,0.5)] text-white rounded-full p-2"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* TREK NAME + RATING BOX */}
          <div className="bg-[#F3F1EB] rounded-xl p-6 flex flex-col justify-between w-full max-w-[926px] h-[176px] shadow-sm mt-6">
            <div>
              <h2 className="text-2xl font-bold text-[#2B2B2B] font-syne">
                {trek?.title}
              </h2>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin size={14} className="mr-1 text-gray-500" />
                <span>{trek.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-start gap-4 mt-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-[#A87456] fill-[#A87456]"
                  />
                ))}
              </div>

              <button className="border border-gray-300 rounded-full px-4 py-1 text-sm bg-white hover:bg-gray-50">
                Reviews
              </button>

              <button className="border border-gray-300 rounded-full px-4 py-1 text-sm bg-white hover:bg-gray-50">
                Moderate to challenging
              </button>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6 bg-white border border-gray-200 rounded-md p-4">
            <h3 className="font-semibold text-lg text-[#2B2B2B] mb-2">
              Description
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {trek?.description}
            </p>
            <button className="text-[rgba(104,145,124,1)] text-sm font-medium mt-1">
              Read more
            </button>
          </div>

          {/* BIG GRAY BLANK PART — PRESERVED EXACTLY */}
          <div className="h-[600px] w-full bg-[#E5E3DC4D]  border-dashed border-[#D8D5CA] rounded-lg mt-6 border-2"></div>

          {/* STATS BLOCKS */}
          <div className="flex flex-wrap mt-6 gap-3">
            <div className="w-full sm:w-[48%] md:w-[223px] h-[100px] bg-[#E5E3DC] rounded-lg flex flex-col justify-center items-center gap-2">
              <h3 className="text-[#666666] text-sm">Duration</h3>
              <p className="text-[#3B3B3B] text-xl font-syne">{trek?.duration}</p>
            </div>
            <div className="w-full sm:w-[48%] md:w-[223px] h-[100px] bg-[#E5E3DC] rounded-lg flex flex-col justify-center items-center gap-2">
              <h3 className="text-[#666666] text-sm">Difficulty</h3>
              <p className="text-[#3B3B3B] text-xl font-syne">{trek?.difficulty}</p>
            </div>
            <div className="w-full sm:w-[48%] md:w-[223px] h-[100px] bg-[#E5E3DC] rounded-lg flex flex-col justify-center items-center gap-2">
              <h3 className="text-[#666666] text-sm">Altitude</h3>
              <p className="text-[#3B3B3B] text-xl font-syne">{trek?.altitude}</p>
            </div>
            <div className="w-full sm:w-[48%] md:w-[223px] h-[100px] bg-[#E5E3DC] rounded-lg flex flex-col justify-center items-center gap-2">
              <h3 className="text-[#666666] text-sm">Best Season</h3>
              <p className="text-[#3B3B3B] text-xl font-syne">{trek?.bestSeason}</p>
            </div>
          </div>

          {/* TABS & ITINERARY (keeps your exact sizes for tab buttons) */}
          <div className="bg-[#F8F6F2] rounded-md w-full max-w-5xl mx-auto font-syne border border-gray-200 shadow-md mt-6">
            <div className="flex gap-2 bg-[#8F6E56] rounded-t-md p-2 overflow-x-auto scrollbar-hide">
              {[
                "Itinerary",
                "Highlights",
                "Inclusions",
                "Exclusions",
                "Add-ons",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm min-w-[120px] sm:min-w-[150px] md:w-auto font-medium ${
                    activeTab === tab
                      ? "bg-[#F5F4F0] text-[#3B3B3B]"
                      : "text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Itinerary" && (
              <div className="bg-white p-4 rounded-b-md shadow-sm">
                {trek?.itinerary?.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-md mb-4 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleDay(index)}
                      className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-[#3B3B3B]"
                    >
                      <span>{item.day}</span>

                      {expandedDay === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>

                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        expandedDay === index
                          ? "max-h-[620px] opacity-100 p-4"
                          : "max-h-0 opacity-0"
                      } overflow-hidden text-sm text-gray-700`}
                    >
                      <ul className="list-disc ml-6 space-y-2">
                        {item.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* REVIEWS */}
          <div className="bg-[#F5F4F0] rounded-lg mt-10 p-4">
            <h3 className="text-xl h-[60px] w-[124px] font-semibold text-[#3B3B3B] bg-[#E5E3DC] flex justify-center items-center rounded-lg mb-4">
              Reviews
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                {
                  name: "Priya Sharma",
                  text: "An unforgettable experience! The meadows were breathtaking and our guide was excellent.",
                  stars: 5,
                  reviewNo: "Reviews 1",
                },
                {
                  name: "Rahul Verma",
                  text: "Perfect trek for beginners. The lake is stunning and the entire journey was well organized.",
                  stars: 5,
                  reviewNo: "Reviews 2",
                },
                {
                  name: "Anjali Patel",
                  text: "Beautiful trek with amazing views. Would definitely recommend to anyone looking for a Himalayan adventure.",
                  stars: 4,
                  reviewNo: "Reviews 3",
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="bg-[#EDEBE6] rounded-lg shadow-sm p-4 h-[225px] flex flex-col justify-between "
                >
                  <div className="flex mb-2 ml-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.stars
                            ? "text-[#A87456] fill-[#A87456]"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 flex-1 ml-3 mt-3">
                    {review.text}
                  </p>
                  <p className="text-sm ml-3 font-syne font-normal text-[#2B2B2B]">
                    — {review.name}
                  </p>
                  <div className="border-t border-gray-300 mt-3 pt-2">
                    <p className="text-xs ml-3 text-gray-500 ">
                      {review.reviewNo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (kept Photos & Video panel + review text exactly) */}
        <div className="w-full xl:w-[380px] my-6 lg:my-6 mr-0 lg:mr-3">
          <div className="xl:sticky xl:top-24 space-y-5">
            <div className="w-full h-[298px] border border-gray-300 rounded-lg flex flex-col items-center">
              <p className="text-sm text-gray-500 mt-8">PRICE</p>
              <h2 className="text-3xl font-bold text-[#3B3B3B] mt-2">₹{trek?.price}/-</h2>
              <p className="text-sm text-gray-500 mb-4">per person</p>

              <button
                className="w-[300px] bg-[#8F6E56] text-white py-2 rounded-md hover:bg-[rgba(104,145,124,0.9)] transition mt-2"
                onClick={() => setShowTerms(true)}
              >
                Book now
              </button>

              <button className="w-[300px] border border-[#8F6E56] text-[#8F6E56] py-2 rounded-md mt-3 hover:bg-[rgba(104,145,124,0.05)] transition">
                Request Custom Quote
              </button>
            </div>

            <div className="w-full h-[234px] border border-gray-300 rounded-lg flex flex-col items-center mt-5 p-4">
              <h3 className="font-medium mb-3 text-[#3B3B3B] mt-2 font-syne text-xl">
                Need Help?
              </h3>

              <div className="bg-gray-100 rounded-md flex items-center gap-3 p-3 mb-3 w-full justify-center">
                <Phone className="text-[#8F6E56] h-5" />
                <div>
                  <p className="text-sm font-medium text-[#3B3B3B]">Call us</p>
                  <p className="text-xs text-gray-600">+91 9971932079</p>
                </div>
              </div>

              <button className="w-[300px] bg-[#8F6E56] text-white py-2 rounded-md hover:bg-[rgba(104,145,124,0.9)] transition flex items-center justify-center gap-2 mt-2">
                <MessageCircle className="w-4 h-4" /> Chat with Expert
              </button>
            </div>

            {/* Photos & Video + Review Text — PRESERVED EXACT */}
            <div
              className="
    h-[600px] w-full border border-gray-300 rounded-lg 
    flex flex-col items-center justify-center mt-6 
    xl2:items-start xl2:justify-start xl2:p-6
  "
            >
              <h3 className="font-medium mb-3 text-[#3B3B3B] mt-2 font-syne text-xl text-center xl2:text-left w-full">
                Photos & Video
              </h3>

              <p className="text-sm text-[#666666] mb-3 w-[90%] text-center xl2:text-left xl2:ml-8">
                Capture and add your product experiences with photos or videos!
              </p>

              <div
                className="
      grid grid-cols-1 sm:grid-cols-2 gap-4 
      justify-items-center xl2:justify-start w-full
    "
              >
                {/* Add Photos */}
                <div className="w-[160px] h-[120px] border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center text-sm text-gray-600 hover:border-[#8F6E56] transition cursor-pointer">
                  <Camera className="w-6 h-6 mb-1 text-[#8F6E56]" />
                  <span>Add photos</span>
                  <p className="text-xs text-gray-400">(up to 4)</p>
                </div>

                {/* Add Video */}
                <div className="w-[160px] h-[120px] border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center text-sm text-gray-600 hover:border-[#8F6E56] transition cursor-pointer">
                  <Video className="w-6 h-6 mb-1 text-[#8F6E56]" />
                  <span>Add a video</span>
                  <p className="text-xs text-gray-400">[1 min | 200 MB]</p>
                </div>

                {/* Review Text */}
                <div className="col-span-2 flex flex-col items-center xl2:items-start">
                  <h3 className="font-medium mb-3 text-[#3B3B3B] font-syne text-xl text-center xl2:text-left">
                    Review Text
                  </h3>

                  <textarea
                    className="w-[280px] h-[120px] border border-gray-300 rounded-md p-2 text-sm 
        focus:outline-none focus:ring-1 focus:ring-[#8F6E56] 
        overflow-y-auto resize-none text-center xl2:text-left"
                    placeholder="Add description about the product"
                  />

                  <p className="text-sm text-gray-500 mt-4 w-[300px] text-center xl2:text-left">
                    You can write about the fit, material quality, weather
                    resistance, price, and overall comfort during the trek.
                    Refer to the term written materials and photos attached.
                    Feedback about your experience on the mountain trail.
                  </p>

                  <button
                    className="w-[280px] mt-3 bg-[#8F6E56] text-white py-2 rounded-md 
        hover:bg-[rgba(104,145,124,0.9)] transition"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TERMS MODAL */}
        {showTerms && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4"
            onClick={() => setShowTerms(false)}
          >
            <div
              className="bg-[#F5F4F0] w-full max-w-[670px] max-h-[90vh] overflow-y-auto rounded-lg p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between">
                <h2 className="text-2xl text-[#333333] font-syne font-semibold mb-2">
                  Terms and Conditions
                </h2>
                <button
                  onClick={() => setShowTerms(false)}
                  className="absolute top-4 right-4 text-[#333333] rounded-full p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-sm font-syne font-extralight text-[#333333CC] mb-4">
                Your agreement for a safe and enjoyable trek.
              </p>

              <p className="text-xs leading-[22px] font-syne font-extralight text-[#333333CC] mb-6 mt-4">
                By proceeding with this booking, you acknowledge and agree to
                the following terms...
              </p>

              <div className="space-y-4 text-sm text-gray-700">
                {termsSections.map(({ title, text }, index) => (
                  <div key={index}>
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-[#EAE6E1] flex justify-center items-center">
                        <div className="h-3 w-3 rounded-full bg-[#8F6E56]" />
                      </div>
                      <h3 className="font-thin font-syne text-[#333333] text-lg ml-4">
                        {title}
                      </h3>
                    </div>
                    <p className="ml-10 text-xs leading-[15px] font-syne font-extralight text-[#333333CC] mb-4 mt-2">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                />
                <label className="text-sm text-gray-600">
                  I have read, understood, and accept the terms.
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
                  onClick={() => setShowTerms(false)}
                >
                  Decline
                </button>
                <Link
                  to="/Register"
                  state={{ trek }}
                  className={`px-4 py-2 rounded-md text-white transition ${
                    accepted
                      ? "bg-[#8F6E56] hover:bg-[#7c5d49]"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  onClick={(e) => {
                    if (!accepted) e.preventDefault();
                    else setShowTerms(false);
                  }}
                >
                  I Acknowledge
                </Link>
              </div>
            </div>
          </div>
        )}
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

export default BookNow;
