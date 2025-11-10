import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const About = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const timeline = [
    {
      timeline: "2017 - First Milestone",
      title: "A Shared Dream",
      description:
        "What started as a love of the outdoors became a shared dream of helping others experience the Himalayas. From trekking solo to guiding our first small group, we discovered a passion for sharing these adventures with explorers like you.",
    },
    {
      timeline: "2019 - Going Global",
      title: "Himalayan Expedition",
      description:
        "Our first major expedition to the remote Himalayan valleys marked a turning point. We documented uncharted trails and established safe routes that would later become the foundation for many of our signature treks.",
    },
    {
      timeline: "2020 - Expanding Horizons",
      title: "Expanding Horizons",
      description:
        "We launched our online platform, making Himalayan treks accessible to adventure seekers worldwide. From weekend warriors to seasoned trekkers, everyone could now join us on these life-changing journeys.",
    },
    {
      timeline: "Present Day",
      title: "A Thriving Community",
      description:
        "Today, we're more than a trekking company—we're a community of mountain lovers united by exploration and sustainability. We've guided thousands of trekkers and continue to discover new trails in Nepal.",
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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

      {/* Hero Section */}
      <section className="relative mt-[65px] h-[400px] w-full flex justify-center items-center overflow-hidden">
        <img
          src="assets/LandingHeroCarousel/bg4.webp"
          alt="About"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="relative z-10 flex flex-col gap-4 justify-center items-center text-center px-6">
          <h1 className="text-white text-3xl md:text-5xl font-syne">
            Our Story: The Heart of the Mountain
          </h1>
          <p className="text-white text-sm md:text-base tracking-wide">
            Discover the passion and dedication that drives our explorations
          </p>
          <Link
            to="/book-trek"
            className="text-white rounded-lg text-xs md:text-sm font-syne h-[45px] w-[160px] md:h-[50px] md:w-[180px] bg-[rgba(143,110,86,1)] flex justify-center items-center"
          >
            Explore Our Treks
          </Link>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 px-4 md:px-8 lg:px-20">
        <h2 className="text-center font-syne font-bold text-2xl md:text-3xl mb-12">
          Our Journey
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-[rgba(143,110,86,1)] transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[rgba(104,145,124,1)] text-white flex items-center justify-center font-bold font-syne z-10 shadow-md">
                  {index + 1}
                </div>

                {/* Content Box */}
                <div
                  className={`bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md w-full md:w-1/2 ${
                    index % 2 === 0 ? "text-left" : "text-right"
                  }`}
                >
                  <p className="text-[rgba(102,102,102,1)] text-xs md:text-sm font-syne mb-1">
                    {item.timeline}
                  </p>
                  <h3 className="text-lg font-syne font-medium mb-2 text-[#3B3B3B]">
                    {item.title}
                  </h3>
                  <p className="text-[#666666] text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-[rgba(229,227,220,1)] py-20 px-6">
        <h2 className="text-center text-2xl md:text-3xl font-syne text-[#3B3B3B] mb-10">
          Our Mission & Values
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {[
            {
              img: "/SVG/Rocket.svg",
              title: "Our Mission",
              text: "To empower explorers and adventurers with carefully curated, sustainable treks that honor the mountains and enrich our communities.",
            },
            {
              img: "/SVG/heart.svg",
              title: "Our Values",
              text: "Adventure, Respect, Growth, Community, and Authenticity. Trekking connects us to nature, ourselves, and others.",
            },
            {
              img: "/SVG/eyeabout.svg",
              title: "Our Vision",
              text: "To be a trusted partner for mountain lovers who seek responsible tourism and transformative experiences that inspire respect for nature.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[rgba(245,244,240,1)] rounded-xl shadow-sm p-8 flex flex-col items-center text-center max-w-xs"
            >
              <div className="h-[64px] w-[64px] flex justify-center items-center bg-[rgba(143,110,86,0.1)] rounded-full mb-4">
                <img src={card.img} alt={card.title} />
              </div>
              <h3 className="font-syne text-xl text-[#3B3B3B] mb-3">
                {card.title}
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <h2 className="text-center font-syne text-2xl md:text-3xl text-[#3B3B3B] mb-12">
          Meet the Founders
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {["Alexander Hokkins", "Sam Wingman", "Alice Perry"].map(
            (name, i) => (
              <div
                key={i}
                className="flex flex-col items-center bg-white/50 p-6 rounded-lg shadow-sm max-w-xs"
              >
                <div className="h-[165px] w-[165px] rounded-full overflow-hidden shadow-md">
                  <img
                    src="assets/LandingHeroCarousel/bg4.webp"
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mt-4 font-syne text-lg text-[#3B3B3B]">
                  {name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  Co-Founder & Lead Guide
                </p>
                <p className="text-sm text-[#666666] text-center leading-relaxed">
                  The mountains are not just places we visit—they're teachers.
                  Every trek reveals a new lesson and a new perspective.
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <div className="w-full flex flex-col items-center px-4 sm:px-8 md:px-16 py-16">
        {/* Heading */}
        <div className="w-full text-center font-syne text-[#3B3B3B] text-2xl sm:text-3xl font-bold mb-10">
          Community & Sustainability
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 max-w-5xl">
          {/* Text Section */}
          <div className="flex-1 flex flex-col text-[#666666] font-[400] leading-relaxed">
            <h3 className="font-syne text-xl sm:text-2xl text-[#3B3B3B] font-[700] mb-4">
              Leaving a Positive Footprint
            </h3>

            <p className="text-[15px] sm:text-[16px] mb-4">
              We are deeply committed to responsible trekking. Our team follows
              strict "leave-no-trace" principles, supports local communities,
              and educates our trekkers on mountain conservation. Through our
              treks, we aim to generate economic opportunities for local guides
              and contribute to community initiatives that preserve the majesty
              of the mountains for generations to come.
            </p>

            <p className="text-[15px] sm:text-[16px]">
              Get Involved! Join our clean-up drives, workshops on sustainable
              travel, and community fundraisers. Let's preserve the beauty of
              our mountains together.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex-1">
            <img
              src="assets/LandingHeroCarousel/bg2.webp"
              alt="Community and Sustainability"
              className="rounded-lg w-full h-[250px] sm:h-[300px] md:h-[330px] object-cover shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="bg-[#8F6E56] text-[#F5F4F0] flex flex-col items-center py-16 px-4">
        <h2 className="font-syne text-2xl md:text-3xl font-light mb-4 flex items-center text-center">
          Your Adventure Awaits
        </h2>
        <p className="max-w-2xl text-center mb-8 text-sm md:text-base">
          We're here to help you turn your trekking dreams into reality. Whether
          you're a seasoned mountaineer or a first-time explorer, we have treks
          for all.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            to="/book-trek"
            className="h-[44px] w-[180px] text-sm font-syne bg-[#F5F4F0] text-[#3B3B3B] rounded-lg flex justify-center items-center"
          >
            Browse Treks
          </Link>
          <button className="h-[44px] w-[200px] text-sm font-syne bg-[#F5F4F0] text-[#3B3B3B] rounded-lg">
            Book Your Adventure
          </button>
          <button className="h-[44px] w-[180px] text-sm font-syne bg-[#F5F4F0] text-[#3B3B3B] rounded-lg">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
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

export default About;
