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
import FilterPanel from "./FilterPanel";
import Navbar from "./Navbar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

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

// const HARD_CODED_TREKS = [
//   {
//     _id: "1",
//     title: "Bhrigu Lake Trek",
//     type: "Mountain",
//     location: "Manali",
//     price: 12000,
//     duration: "3 Days",
//     images: ["/assets/LandingHeroCarousel/bg1.webp"],
//     description: "A beautiful alpine lake trek",
//   },
//   {
//     _id: "2",
//     title: "Kedarkantha Trek",
//     type: "Snow",
//     location: "Uttarakhand",
//     price: 9500,
//     duration: "4 Days",
//     images: ["/assets/LandingHeroCarousel/bg2.webp"],
//     description: "Perfect winter trek for beginners",
//   },
//   {
//     _id: "3",
//     title: "Hampta Pass Trek",
//     type: "Mountain",
//     location: "Manali",
//     price: 15000,
//     duration: "5 Days",
//     images: ["/assets/LandingHeroCarousel/bg3.webp"],
//     description: "High altitude crossover trek",
//   },
// ];

const BookTrekPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50000);

  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);

  const deferredType = useDeferredValue(selectedType);
  const deferredMaxPrice = useDeferredValue(maxPrice);
  const [isOpen, setIsOpen] = useState(false);

  // add next to other useState declarations near top of component
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(1000);
  const [maxPriceFilter, setMaxPriceFilter] = useState(50000);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortByPrice, setSortByPrice] = useState("none"); // "none" | "low" | "high"
  const [searchParams] = useSearchParams();
  const typeFromURL = searchParams.get("type");

  useEffect(() => {
    if (typeFromURL) {
      setSelectedType(typeFromURL);
    } else {
      setSelectedType("All");
    }
  }, [typeFromURL]);

  useEffect(() => {
    console.log("🟡 useEffect triggered");
    const fetchTreks = async () => {
      console.log("🚀 Calling GET /api/treks");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/treks`
        );

        // ALWAYS force treks to be an array
        const data = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.treks)
          ? response.data.treks
          : Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        setTreks(data);
        console.log("✅ Treks fetched:", data);
      } catch (error) {
        console.error("Error fetching treks:", error);
        setTreks([]); // never allow non-array
      } finally {
        setLoading(false);
      }
    };

    fetchTreks();
  }, []);

  const filteredCards = useMemo(() => {
    if (!Array.isArray(treks)) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTs = today.getTime();

    const fromTs = dateFrom ? new Date(dateFrom).getTime() : null;
    const toTs = dateTo ? new Date(dateTo).getTime() : null;

    let result = treks.filter((card) => {
      const matchesType =
        !deferredType ||
        deferredType === "All" ||
        (card.type || "").toLowerCase() === deferredType.toLowerCase();

      const matchesLocation =
        selectedLocation === "All" ||
        (card.location || "").toLowerCase() === selectedLocation.toLowerCase();

      const price = Number(card.price);
      const matchesPrice =
        !isNaN(price) && price >= minPriceFilter && price <= maxPriceFilter;

      let matchesDate = true;
      if ((fromTs || toTs) && card.startDate) {
        const cardStart = new Date(card.startDate).getTime();
        const cardEnd = card.endDate
          ? new Date(card.endDate).getTime()
          : cardStart;

        if (fromTs && toTs) {
          matchesDate = cardEnd >= fromTs && cardStart <= toTs;
        } else if (fromTs) {
          matchesDate = cardEnd >= fromTs;
        } else if (toTs) {
          matchesDate = cardStart <= toTs;
        }
      }

      return matchesType && matchesLocation && matchesPrice && matchesDate;
    });

    // sort by price if requested
    if (sortByPrice === "low") {
      result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sortByPrice === "high") {
      result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    return result;
  }, [
    treks,
    deferredType,
    deferredMaxPrice, // keep for UI but main price filters are minPriceFilter/maxPriceFilter
    dateFrom,
    dateTo,
    minPriceFilter,
    maxPriceFilter,
    selectedLocation,
    sortByPrice,
  ]);

  const trekTypes = useMemo(
    () => ["All", ...new Set(treks.map((c) => c.type || "Other"))],
    [treks]
  );

  const locations = useMemo(
    () => ["All", ...new Set(treks.map((c) => c.location || "Unknown"))],
    [treks]
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split("T")[0];

  const listRef = useRef(null);
  const carouselRef = useRef(null);
  const runningTimeRef = useRef(null);
  const timeRunning = 3000;
  const timeAutoNext = 5000;
  const timeoutRef = useRef(null);
  const autoNextRef = useRef(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const showSlider = (type) => {
    if (!listRef.current || !carouselRef.current) return;

    requestAnimationFrame(() => {
      const list = listRef.current;
      const carousel = carouselRef.current;

      if (!list) return;

      const items = list.querySelectorAll(".item");
      if (!items || items.length === 0) return;

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

  //Mobile Filter
  const [showFiltersPopup, setShowFiltersPopup] = useState(false);
  useEffect(() => {
    document.body.style.overflow = showFiltersPopup ? "hidden" : "";
  }, [showFiltersPopup]);

  // //  Guest protection
  // if (!user) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
  //       <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
  //       <p className="text-gray-700 mb-6">You need to log in to book a trek.</p>
  //       <button
  //         onClick={() => navigate("/auth/login")}
  //         className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
  //       >
  //         Go to Login
  //       </button>
  //     </div>
  //   );
  // }

  // Logged-in view
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-[Poppins]">
        {/* Header */}
        <Navbar />

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="carousel w-screen h-screen relative overflow-hidden"
        >
          <div ref={listRef} className="list relative w-full h-full">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="item absolute bg-cover bg-center rounded-[20px] shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-all duration-1000"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            ))}
          </div>

          {/* Fixed content (stays in one place) */}
          <div className="fixed-content absolute top-1/2 -translate-y-1/2 text-left text-white left-8 md:left-[100px] w-[70%] md:w-[400px] z-[200] pointer-events-auto">
            <motion.div
              key={`title-${currentSlideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
              className="font-bold uppercase leading-none text-[44px] md:text-[60px] lg:text-[100px]"
            >
              {slides[currentSlideIndex]?.title}
            </motion.div>

            <motion.div
              key={`name-${currentSlideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeInOut" }}
              className="font-bold uppercase text-white drop-shadow-md leading-none mt-0 text-[44px] md:text-[60px] lg:text-[100px]"
            >
              {slides[currentSlideIndex]?.name}
            </motion.div>

            <motion.p
              key={`desc-${currentSlideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
              className="mt-2 mb-4 text-lg text-gray-200 max-w-full md:max-w-md"
            >
              {slides[currentSlideIndex]?.desc}
            </motion.p>

            <motion.div
              key={`buttons-${currentSlideIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
              className="flex items-center space-x-4"
            >
              {/* <button className="h-[35px] w-[35px] bg-orange-400 text-black font-semibold border-2 rounded-full border-white hover:bg-[rgba(104,145,124,1)] flex justify-center items-center hover:text-white transition-all">
                <img
                  src="/SVG/bookmark.svg"
                  className="h-[20px] w-[20px]"
                  alt=""
                />
              </button> */}
              <button className="h-[35px] min-w-[110px] bg-transparent border border-white/80 text-white font-syne font-medium text-sm px-4 py-1 hover:bg-[rgba(104,145,124,1)] rounded-full hover:text-white transition-all">
                Know More
              </button>
            </motion.div>
          </div>

          {/* Arrows */}
          <div className="arrows absolute bottom-8 md:top-[80%] md:right-[48%] right-4 flex gap-3 z-[100]">
            <button
              className="prev w-[44px] h-[44px] md:w-[50px] md:h-[50px] rounded-full bg-[rgba(139,115,85,1)] text-white font-bold hover:bg-white hover:text-black transition"
              onClick={() => showSlider("prev")}
            >
              {"<"}
            </button>
            <button
              className="next w-[44px] h-[44px] md:w-[50px] md:h-[50px] rounded-full bg-[rgba(139,115,85,1)] text-white font-bold hover:bg-white hover:text-black transition"
              onClick={() => showSlider("next")}
            >
              {">"}
            </button>
          </div>

          <div
            ref={runningTimeRef}
            className="absolute top-0 left-0 h-[2px] bg-yellow-400 z-[1000]"
          />
        </div>
        <style>{`
            @keyframes runningTime { from { width: 0%; } to { width: 100%; } }
            @keyframes animate { from { opacity: 0; transform: translateY(100px); filter: blur(33px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }

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

        

            @media (min-width: 641px) and (max-width: 1024px) {
              .carousel .list .item:nth-child(3),
              .carousel .list .item:nth-child(4),
              .carousel .list .item:nth-child(5),
              .carousel .list .item:nth-child(6) { top: 78%; width: 150px; height: 210px; transform: translateY(-65%); }
              .carousel .list .item:nth-child(3) { left: 55%; }
              .carousel .list .item:nth-child(4) { left: calc(55% + 170px); }
              .carousel .list .item:nth-child(5) { left: calc(55% + 340px); }
              .carousel .list .item:nth-child(6) { left: calc(55% + 510px); }
             .carousel .fixed-content { left: 12px !important; width: calc(100% - 24px) !important; top: 30% !important; transform: translateY(-40%) !important; }
            }

            @media (min-width: 1025px) {
              .carousel .fixed-content { left: 100px !important; width: 400px !important; }
            }
          `}</style>
      </div>

      <div className="relative w-full flex flex-col py-10">
        <div className="fixed inset-0 z-[-1] bg-cover bg-[#F5F4F0] bg-top"></div>

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
          {/* --------- FILTER PANEL (replace existing left panel) --------- */}
          <div className="hidden lg:block lg:w-[230px]">
            <div className="sticky top-[100px] ">
              <FilterPanel
                dateFrom={dateFrom}
                dateTo={dateTo}
                todayStr={todayStr}
                setDateFrom={setDateFrom}
                setDateTo={setDateTo}
                minPriceFilter={minPriceFilter}
                maxPriceFilter={maxPriceFilter}
                setMinPriceFilter={setMinPriceFilter}
                setMaxPriceFilter={setMaxPriceFilter}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                sortByPrice={sortByPrice}
                setSortByPrice={setSortByPrice}
                locations={locations}
                setSelectedType={setSelectedType}
              />
            </div>
          </div>
          {/* FLOATING FILTER BUTTON (MOBILE/TABLET) */}
          <button
            onClick={() => setShowFiltersPopup(true)}
            className="lg:hidden fixed bottom-5 right-5 z-[1100] 
             w-12 h-12 rounded-full bg-[#8F6E56] 
             shadow-lg flex items-center justify-center"
          >
            <img src="/SVG/filter.svg" alt="Filters" className="w-5 h-5" />
          </button>
          {showFiltersPopup && (
            <div className="lg:hidden fixed inset-0 z-[1100] bg-black/40">
              <div className="absolute bottom-5 right-5 w-[90vw] max-w-[360px]">
                <FilterPanel
                  dateFrom={dateFrom}
                  dateTo={dateTo}
                  todayStr={todayStr}
                  setDateFrom={setDateFrom}
                  setDateTo={setDateTo}
                  minPriceFilter={minPriceFilter}
                  maxPriceFilter={maxPriceFilter}
                  setMinPriceFilter={setMinPriceFilter}
                  setMaxPriceFilter={setMaxPriceFilter}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  sortByPrice={sortByPrice}
                  setSortByPrice={setSortByPrice}
                  locations={locations}
                  setSelectedType={setSelectedType}
                  onClose={() => setShowFiltersPopup(false)}
                />
              </div>
            </div>
          )}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-16 items-stretch justify-items-center mr-5">
            {filteredCards.length > 0 ? (
              filteredCards.map((card, idx) => (
                <Card
                  key={card._id}
                  id={card._id}
                  title={card.title}
                  price={card.price}
                  time={
                    card.duration ||
                    (card.durationDays && card.durationNights
                      ? `${card.durationDays} Days / ${card.durationNights} Nights`
                      : "")
                  }
                  image={card.images?.[0]}
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
