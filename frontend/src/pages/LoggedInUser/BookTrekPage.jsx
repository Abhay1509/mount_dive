// src/pages/LoggedInUser/BookTrekPage.jsx
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useDeferredValue,
} from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "./LoggedInComponents/Card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const slides = [
  {
    title: "Mountain",
    name: "Kings",
    image: "/assets/LandingHeroCarousel/bg2.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "Trek",
    image: "assets/LandingHeroCarousel/bg1.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "Trekkers",
    image: "assets/LandingHeroCarousel/bg4.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "Mountain",
    image: "assets/LandingHeroCarousel/bg3.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "Tehran",
    image: "/assets/LandingHeroCarousel/bg2.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "Bhrigu lake",
    image: "/assets/LandingHeroCarousel/bg3.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "Everest",
    image: "/assets/LandingHeroCarousel/bg2.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "Maheshwar",
    image: "/assets/LandingHeroCarousel/bg4.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "HERON",
    image: "/assets/LandingHeroCarousel/bg3.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "BUTTERFLY",
    image: "/assets/LandingHeroCarousel/bg2.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
  {
    title: "SLIDER",
    name: "Labradaor",
    image: "/assets/LandingHeroCarousel/bg.webp",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique consequuntur sapiente molestiae a deserunt earum ipsam aliquam, harum vitae, quae distinctio nihil. Consequatur?",
  },
];

const cardsData = [
  {
    type: "Hiking",
    title: "MANALI MOUNTAIN TREKS",
    price: "60000",
    time: "6 days.5 night",
    image: "assets/LandingHeroCarousel/bg2.webp",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Hiking",
    title: "MANALI MOUNTAIN TREKS",
    price: "4000",
    time: "6 days.5 night",
    image: "assets/LandingHeroCarousel/bg4.webp",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Hiking",
    title: "MANALI MOUNTAIN TREKS",
    price: "10000",
    time: "6 days.5 night",
    image: "assets/LandingHeroCarousel/bg3.webp",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Mountaineering",
    title: "MANALI MOUNTAIN TREKS",
    price: "10000",
    time: "6 days.5 night",
    image: "assets/LandingHeroCarousel/bg1.webp",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Mountaineering",
    title: "MANALI MOUNTAIN TREKS",
    price: "8999",
    time: "6 days.5 night",
    image: "/img.jpg",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Mountaineering",
    title: "MANALI MOUNTAIN TREKS",
    price: "10000",
    time: "6 days.5 night",
    image: "/img.jpg",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Mountaineering",
    title: "MANALI MOUNTAIN TREKS",
    price: "1000",
    time: "6 days.5 night",
    image: "/img.jpg",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Mountaineering",
    title: "MANALI MOUNTAIN TREKS",
    price: "100",
    time: "6 days.5 night",
    image: "/img.jpg",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Trekking",
    title: "MANALI MOUNTAIN TREKS",
    price: "10000",
    time: "6 days.5 night",
    image: "/img.jpg",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Trekking",
    title: "MANALI MOUNTAIN TREKS",
    price: "10000",
    time: "6 days.5 night",
    image: "/img.jpg",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
  {
    type: "Camping",
    title: "MANALI MOUNTAIN TREKS",
    price: "10000",
    time: "6 days.5 night",
    image: "/img.jpg",
    description:
      "The classic Manali trek experience which offers scenic beauty and adventure.",
  },
];

const BookTrekPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50000);

  const cards = useMemo(() => cardsData, []);
  const deferredType = useDeferredValue(selectedType);
  const deferredMaxPrice = useDeferredValue(maxPrice);
  const [isOpen, setIsOpen] = useState(false);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesType =
        deferredType === "All" ||
        card.type.toLowerCase() === deferredType.toLowerCase();
      const matchesPrice = card.price <= deferredMaxPrice;
      return matchesType && matchesPrice;
    });
  }, [cards, deferredType, deferredMaxPrice]);

  const trekTypes = useMemo(
    () => ["All", ...new Set(cards.map((c) => c.type))],
    [cards]
  );

  const listRef = useRef(null);
  const carouselRef = useRef(null);
  const runningTimeRef = useRef(null);
  const timeRunning = 3000;
  const timeAutoNext = 5000;
  const timeoutRef = useRef(null);
  const autoNextRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const showSlider = (type) => {
    requestAnimationFrame(() => {
      const list = listRef.current;
      const carousel = carouselRef.current;
      const items = list.querySelectorAll(".item");

      if (type === "next") {
        list.appendChild(items[0]);
        carousel.classList.add("next");
      } else {
        list.prepend(items[items.length - 1]);
        carousel.classList.add("prev");
      }

      setCurrentSlideIndex((prev) =>
        type === "next"
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length
      );

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        carousel.classList.remove("next");
        carousel.classList.remove("prev");
      }, timeRunning);

      clearTimeout(autoNextRef.current);
      autoNextRef.current = setTimeout(() => {
        showSlider("next");
      }, timeAutoNext);

      resetTimeAnimation();
    });
  };

  const resetTimeAnimation = () => {
    const bar = runningTimeRef.current;
    if (bar) {
      bar.style.animation = "none";
      void bar.offsetHeight;
      bar.style.animation = "runningTime 5s linear 1 forwards";
    }
  };

  useEffect(() => {
    autoNextRef.current = setTimeout(() => showSlider("next"), timeAutoNext);
    resetTimeAnimation();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(autoNextRef.current);
        clearTimeout(timeoutRef.current);
      } else {
        autoNextRef.current = setTimeout(
          () => showSlider("next"),
          timeAutoNext
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      clearTimeout(autoNextRef.current);
      clearTimeout(timeoutRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  //  Guest protection
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-700 mb-6">You need to log in to book a trek.</p>
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
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-[Poppins]">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full flex items-center h-12 px-24 z-[1000]">
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
                        <img
                          src="/SVG/profile.svg"
                          className="h-4 w-5"
                          alt=""
                        />
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
        </header>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="carousel w-full h-full relative overflow-hidden"
        >
          <div ref={listRef} className="list relative w-full h-full">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="item absolute bg-cover bg-center rounded-[20px] shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-all duration-1000"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              ></div>
            ))}
          </div>

          {/*Fixed content (stays in one place) */}
          <div className="absolute top-1/2 left-[100px] -translate-y-1/2 text-left text-white w-[400px] z-[200]">
            <motion.div
              key={`title-${currentSlideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
              className="text-[100px] font-bold uppercase text-[rgba(255,255,255,1)] leading-none"
            >
              {slides[currentSlideIndex]?.title}
            </motion.div>

            <motion.div
              key={`name-${currentSlideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
              className="text-[100px] font-bold uppercase text-white drop-shadow-md leading-none"
            >
              {slides[currentSlideIndex]?.name}
            </motion.div>

            <motion.p
              key={`desc-${currentSlideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
              className="mt-2 mb-4 text-lg text-gray-200"
            >
              {slides[currentSlideIndex]?.desc}
            </motion.p>

            <motion.div
              key={`buttons-${currentSlideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
              className="space-x-4 "
            >
              <button
                className=" h-[35px] w-[35px] bg-orange-400 text-black font-semibold border-2 rounded-full border-white
               hover:bg-[rgba(104,145,124,1)] flex flex-col justify-center items-center hover:text-white transition-all"
              >
                <img
                  src="/SVG/bookmark.svg"
                  className=" h-[20px] w-[20px] "
                  alt=""
                />
              </button>
              <button className=" h-[35px] w-[130px] bg-transparent border border-white/80 text-white font-syne font-medium text-sm mx-12 hover:bg-[rgba(104,145,124,1)] rounded-full hover:text-white transition-all absolute bottom-0 left-8">
                Know More
              </button>
            </motion.div>
          </div>

          {/* Arrows */}
          <div className="arrows absolute top-[80%] right-[52%] flex gap-3 z-[100]">
            <button
              className="prev w-[50px] h-[50px] rounded-full bg-[rgba(139,115,85,1)] text-white font-bold hover:bg-white hover:text-black transition"
              onClick={() => showSlider("prev")}
            >
              {"<"}
            </button>
            <button
              className="next w-[50px] h-[50px] rounded-full bg-[rgba(139,115,85,1)] text-white font-bold hover:bg-white hover:text-black transition"
              onClick={() => showSlider("next")}
            >
              {">"}
            </button>
          </div>

          <div
            ref={runningTimeRef}
            className="absolute top-0 left-0 h-[2px] bg-yellow-400 z-[1000]"
          ></div>
        </div>

        <style>{`
        @keyframes runningTime {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes animate {
          from { opacity: 0; transform: translateY(100px); filter: blur(33px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .carousel .list .item:nth-child(1),
        .carousel .list .item:nth-child(2) {
          top: 0; left: 0; width: 100%; height: 100%;
          transform: translate(0, 0); border-radius: 0;
        }
        .carousel .list .item:nth-child(3) { top: 80%; left: 67%; transform: translateY(-70%); width: 180px; height: 250px; }
        .carousel .list .item:nth-child(4) { top: 80%; left: calc(67% + 200px); transform: translateY(-70%); width: 180px; height: 250px; }
        .carousel .list .item:nth-child(5) { top: 80%; left: calc(67% + 400px); transform: translateY(-70%); width: 180px; height: 250px; }
        .carousel .list .item:nth-child(6) { top: 80%; left: calc(67% + 600px); transform: translateY(-70%); width: 180px; height: 250px; }
        .carousel .list .item:nth-child(n+7) { left: calc(67% + 800px); opacity: 0; }

        .carousel.next .list .item:nth-child(1),
        .carousel.prev .list .item:nth-child(1) { transition: 1s; }
        .carousel .list .item:nth-child(2) .content { display: block !important; }
      `}</style>
      </div>
      <div className="relative w-full flex flex-col py-10">

        <div
          className="fixed inset-0 z-[-1] bg-cover bg-top"
          style={{
            backgroundImage: "url('assets/LandingHeroCarousel/bg2.webp')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#8F6E56] to-[#8F6E56] opacity-80" />
        </div>
       
        <div className="text-center mt-20 flex flex-col justify-center items-center">
          <h1 className="font-syne font-bold text-[48px] text-black/70 uppercase">
            UNIQUE TRAVEL EXPERIENCE
          </h1>
          <p className="font-syne font-bold text-[16px] text-black/80 mt-2 mb-8">
            From renovations and room additions to masonry and other handyman
            services
          </p>
        </div>
   
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 mb-20 pt-10">
     
          <div className="hidden lg:block lg:w-[256px]">
            <div className="sticky top-[100px] bg-white border border-gray-200 rounded-xl p-4 shadow-sm font-syne text-[#3B3B3B] h-fit">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>

     
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Date Range
                </label>
                <button className="w-full flex items-center justify-between border border-gray-300 rounded-md px-3 py-2 text-sm hover:border-[#8F6E56] transition">
                  <span className="text-gray-500">Select Dates</span>
                  <img src="/SVG/calendar.svg" alt="" className="w-4 h-4" />
                </button>
              </div>

             
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Budget Range
                </label>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#8F6E56] cursor-pointer"
                />
                <div className="flex justify-between text-xs mt-1 text-gray-600">
                  <span>Min ₹1,000</span>
                  <span>Max ₹50,000</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Filter by Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#8F6E56]"
                >
                  {trekTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <button className="w-full bg-[#8F6E56] hover:bg-[#73543F] text-white font-medium py-2 rounded-md transition">
                Apply Filters
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-16 items-stretch mr-5">
            {filteredCards.length > 0 ? (
              filteredCards.map((card, idx) => (
                <Card
                  key={idx}
                  title={card.title}
                  price={card.price}
                  time={card.time}
                  image={card.image}
                  description={card.description}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 font-syne text-lg">
                No treks match your filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTrekPage;
