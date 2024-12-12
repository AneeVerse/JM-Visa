"use client";
import Link from "next/link";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";

const HorizontalScrollSection = () => {
  const scrollContainerRef = useRef(null);

  // Enhanced Scroll Function
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollDistance = 300; // Adjust as needed
      const step = 10; // Smaller step for smoother scroll
      const intervalTime = 5; // Interval between steps in milliseconds
      let remainingDistance = scrollDistance;

      const scrollStep = () => {
        if (remainingDistance <= 0) return; // Stop when distance is covered
        const stepDistance = Math.min(step, remainingDistance);
        container.scrollLeft += direction === "left" ? -stepDistance : stepDistance;
        remainingDistance -= stepDistance;
        requestAnimationFrame(scrollStep); // Use requestAnimationFrame for smoothness
      };

      scrollStep();
    }
  };

  const countries = [
    { name: "Germany", image: "/images/landmarks/Brandenburg Gate in Germany Visa.webp", flag: "/images/flags/de.webp", altName: "Brandenburg Gate in Germany Visa", continent: "Europe" },
    { name: "United States", image: "/images/landmarks/Tourist Places in United States Visa.webp", flag: "/images/flags/us.webp", altName: "Statue of Liberty in United States Visa", continent: "NorthAmerica" },
    { name: "France", image: "/images/landmarks/Eiffel Tower in France Visa.webp", flag: "/images/flags/fr.webp", altName: "Eiffel Tower in France Visa", continent: "Europe" },
    { name: "Italy", image: "/images/landmarks/Colosseum in Italy Visa.webp", flag: "/images/flags/it.webp", altName: "Colosseum in Italy Visa", continent: "Europe" },
    { name: "Spain", image: "/images/landmarks/Sagrada Familia tourist places in Spain Visa.webp", flag: "/images/flags/es.webp", altName: "Sagrada Familia tourist places in Spain Visa", continent: "Europe" },
    { name: "Canada", image: "/images/landmarks/Tourist Places in Canada Visa.webp", flag: "/images/flags/ca.webp", altName: "Tourist Places in Canada Visa", continent: "NorthAmerica" },
    { name: "India", image: "/images/landmarks/Taj_Mahal.jpg", flag: "/images/flags/in.webp", altName: "Taj Mahal in India Visa", continent: "Asia" },
    { name: "Mexico", image: "/images/landmarks/Tourist Places in Mexico Visa.webp", flag: "/images/flags/mx.webp", altName: "Tourist Places in Mexico Visa", continent: "NorthAmerica" },
  ];

  const containerStyle = {
    display: "flex",
    overflowX: "hidden",
    scrollBehavior: "smooth",
    gap: "1.5rem",
    padding: "1rem 0",
    msOverflowStyle: "none",
  };

  const hideScrollbar = {
    "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for WebKit
    scrollbarWidth: "none", // Hide scrollbar for Firefox
  };

  return (
    <section className="bg-white py-12 relative">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          {/* Subheading and Heading */}
          <div className="flex justify-between gap-2 items-center">
            <p className="inline-block px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md">
              ✈️ Discover Destinations
            </p>
            {/* View All Countries Button */}
            <Link
              href="/country"
              className="py-2 text-blue-500 flex gap-1 items-center font-semibold"
            >
              <MdFormatListBulleted className="text-4" /> <span>View All</span>
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 leading-tight mt-2">
            Explore Top Countries
          </h2>
        </div>

        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-[40px] w-[40px] rounded-full sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleLeft size={20} className="text-white" />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            style={{ ...containerStyle, ...hideScrollbar }}
            className="scroll-smooth"
          >
            {countries.map((country, index) => (
              <Link
                href={`/country/${country.continent}/${country.name}`}
                key={index}
                className="relative h-[330px] pb-[12px] w-[250px] flex-shrink-0 group"
              >
                {/* Country Image */}
                <img
                  src={country.image}
                  alt={country.name}
                  className="rounded-lg h-full w-full object-cover shadow-lg"
                />
                <div className="absolute top-0 pb-3 rounded-[10px] h-[318px] w-full bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
                {/* Country Name */}
                <h3 className="absolute top-3 left-0 text-gray-300 px-8 rounded-r-full py-[5px] bg-white/10 backdrop-blur-sm font-semibold text-lg">
                  {country.name}
                </h3>
                {/* Flag Overlay */}
                <div className="absolute -bottom-[16px] left-1/2 transform -translate-x-1/2">
                  <img
                    src={country.flag}
                    alt={`${country.altName} Flag`}
                    className="w-14 h-14 object-cover rounded-full shadow-md border-2 border-white"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-[40px] w-[40px] rounded-full sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
