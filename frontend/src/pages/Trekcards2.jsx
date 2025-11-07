import React, { useRef } from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HoverOverlay from "./HoverPop";
const cardsData = [
  {
    title: "Marrakech Merzouga",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, vero incidunt nulla, praesentium inventore dolorem mollitia maxime expedita, recusandae voluptatem hic ut soluta.",
    image: "/img3.jpg",
  },
  {
    title: "Yosemite National Park",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis impedit dolorum culpa illum enim? Inventore delectus quam qui vel reiciendis cupiditate excepturi.",
    image: "/img2.jpg",
  },
  {
    title: "Yosemite National Park1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis impedit dolorum culpa illum enim? Inventore delectus quam qui vel reiciasdendis cupiditate excepturi.",
    image: "/img.jpg",
  },
  {
    title: "Yosemite National Park2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis impedit dolorum culpa illum enim? Inventasdfasdore delectus quam qusdi vel reiciendis cupiditate excepturi.",
    image: "/img4.jpg",
  },
  {
    title: "Yosemite National Park3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicinsdg elit. Dolore debitis impedit dolorum culpa illum enim? Inventore delectus quamds quiwewa vel reiciendis cupiditate excepturi.",
    image: "/img5.jpg",
  },
  {
    title: "Yosemite National Park4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis impedit dolorum culpa illum enim? Inventore delectus quam quisd vel reigasciendis cupiditate excepturi.",
    image: "/img2.jpg",
  },
  {
    title: "Yosemite National Park5",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore debitis impedit dolorum culpa illum enim? Inventore delectus quam qui vsdel reiciendis cupiditate excepturi.",
    image: "/img3.jpg",
  },
  {
    title: "Yosemite National Park6",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicisdng elit. Dolore debitis impedit dolorum culpa illum enim? Inventore delectus quam qui vel reiciendis cupiditate excepturi.",
    image: "/img4.jpg",
  },
  {
    title: "Yosemite National Park7",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicidsdng elit. Dolore debitis impedit dolorum culpa illum enim? Inventore delectus quam qui vel reiciendis cupiditate excepturi.",
    image: "/img5.jpg",
  },
  {
    title: "Yosemite National Park8",
    description:
      "Lorem ipsum dolor sit amet consectetufsdr adipisicing elit. Dolore debitis impedit dolorum culpa illum enim? Inventore delectus quam qui vel reiciendis cupiditate excepturi.",
    image: "/img2.jpg",
  },
];

const TrekCards = () => {
  const cards = [
    {
      title: "MANALI MOUNTAIN TREKS",
      price: "INR 10,000/person",
      time: "6 days.5 night",
      image: "/img.jpg",
      description:
        "The classic Manali trek experience which offers scenic beauty and adventure.",
    },
    {
      title: "MANALI MOUNTAIN TREKS",
      price: "INR 10,000/person",
      time: "6 days.5 night",
      image: "/img.jpg",
      description:
        "The classic Manali trek experience which offers scenic beauty and adventure.",
    },
    {
      title: "MANALI MOUNTAIN TREKS",
      price: "INR 10,000/person",
      time: "6 days.5 night",
      image: "/img.jpg",
      description:
        "The classic Manali trek experience which offers scenic beauty and adventure.",
    },
    {
      title: "MANALI MOUNTAIN TREKS",
      price: "INR 10,000/person",
      time: "6 days.5 night",
      image: "/img.jpg",
      description:
        "The classic Manali trek experience which offers scenic beauty and adventure.",
    },
    {
      title: "MANALI MOUNTAIN TREKS",
      price: "INR 10,00/person",
      time: "6 days.5 night",
      image: "/img4.jpg",
      description:
        "The classic Manali trek experience which offers scenic beauty and adventure.",
    },
    {
      title: "MANALI MOUNTAIN TREKS",
      price: "INR 10,0/person",
      time: "6 days.5 night",
      image: "/img3.jpg",
      description:
        "The classic Manali trek experience which offers scenic beauty and adventure.",
    },
    {
      title: "MANALI MOUNTAIN TREKS",
      price: "INR 10,/person",
      time: "6 days.5 night",
      image: "/img3.jpg",
      description:
        "The classic Manali trek experience which offers scenic beauty and adventure.",
    },
    {
      title: "MANALI MOUNTAIN TREKS",
      price: "INR 10/person",
      time: "6 days.5 night",
      image: "/img3.jpg",
      description:
        "The classic Manali trek experience which offers scenic beauty and adventure.",
    },
    {
      title: "MANALI MOUNTAIN TREKS",
      price: "INR 1/person",
      time: "6 days.5 night",
      image: "/img2.jpg",
      description:
        "The classic Manali trek experience which offers scenic beauty and adventure.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const transitionRef = useRef(null);

  const extendedCards = [...cardsData, cardsData[0]]; // 👈 Add first image at the end

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === extendedCards.length - 1) {
      transitionRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700);
    } else {
      setIsTransitioning(true);
    }

    return () => clearTimeout(transitionRef.current);
  }, [currentIndex]);

  return (
    <>
      <div className="carousel w-full h-full bg-black relative">
        <div className="navbar h-12 w-full fixed bg-slate-600 z-20"></div>
        <div className="main h-[300px] w-[580px] bg-orange-500 absolute top-[200px] flex gap-12 z-50">
          <div className="info h-full w-[550px] ml-8 opacity-100 p-6 bg-green-600 flex flex-col z-60">
            <div className="text-7xl font-bold mb-2">Marrakech Merzouga</div>
            <div className="text-white/50 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, vero
              incidunt nulla, praesentium inventore dolorem mollitia maxime
              expedita, recusandae voluptatem hic ut soluta.
            </div>
            <div className=" h-[35px] w-[35px] border border-white bg-orange-400 rounded-full flex justify-center items-center absolute bottom-2 hover:cursor-pointer z-50">
              <img src="/bookmark.svg" className=" h-[20px] w-[20px] " alt="" />
            </div>

            <div className=" h-[35px] w-[130px] border border-white/80 text-white font-syne font-medium text-sm mx-12 absolute bottom-2 flex justify-center items-center rounded-full hover:cursor-pointer ">
              Know More
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-[200px] overflow-hidden w-[700px] h-[300px] bg-gray-800">
          <div
            className={`flex absolute top-1 left-0 ${
              isTransitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * 236}px)`,
            }}
          >
            {extendedCards.map((card, i) => (
              <div
                key={i}
                className="min-w-[220px] h-72 mx-2 rounded-lg flex-shrink-0 relative overflow-hidden cursor-pointer"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                <div className="absolute bottom-4 left-4 text-white font-bold z-10">
                  {card.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full flex flex-col overflow-hidden py-10 z-[-2]">
        {/* Fixed partial background image */}
        <div
          className="fixed inset-0 z-[-1] bg-cover bg-top "
          style={{ backgroundImage: "url('/trekback.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-[#00ffff] backdrop-blur-[1px]" />
        </div>
        {/* Foreground content */}
        <div className="relative z-50 flex flex-col items-center w-full">
          <div className="text-center mt-20 flex flex-col justify-center items-center">
            <h1 className="w-[826px] h-[60px] font-[Syne] font-bold text-[48px] leading-[21px] tracking-normal uppercase text-black/70">
              UNIQUE TRAVEL EXPERIENCE
            </h1>
            <p className="w-[698px] h-[21px] font-syne font-bold text-[16px] leading-[21px] tracking-normal  mt-2 mb-8 text-black/80">
              From renovations and room additions to masonry and other handyman
              services
            </p>
          </div>
        </div>
      </div>
      <div className="ml-[90px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 px-10 max-w-6xl items-stretch transform-gpu  mb-20 ">
          {cards.map((card, idx) => (
            <HoverOverlay
              key={idx}
              popupContent={
                <div>
                  <h2 className="font-bold text-xl">{card.title}</h2>
                  <p className="mt-2">{card.description}</p>
                  <p className="mt-2 font-bold">{card.price}</p>
                </div>
              }
            >
              <Card
                title={card.title}
                price={card.price}
                time={card.time}
                image={card.image}
                description={card.description}
              />
              ;
            </HoverOverlay>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrekCards;
