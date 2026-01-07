import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
      <Navbar />

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
      <Footer />
    </>
  );
};

export default About;
