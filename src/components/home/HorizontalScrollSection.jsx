"use client";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importing icons

const HorizontalScrollSection = () => {
  const scrollContainerRef = useRef(null);

  // Scroll Function
  const scroll = (direction) => {
    if (direction === "left") {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const countries = [
    { name: "India", image: "/images/Taj_Mahal.jpg", flag: "/images/flags/india-flag.png" },
    { name: "India", image: "/images/Taj_Mahal.jpg", flag: "/images/flags/india-flag.png" },
    { name: "India", image: "/images/Taj_Mahal.jpg", flag: "/images/flags/india-flag.png" },
    { name: "India", image: "/images/Taj_Mahal.jpg", flag: "/images/flags/india-flag.png" },
    { name: "India", image: "/images/Taj_Mahal.jpg", flag: "/images/flags/india-flag.png" },
    { name: "India", image: "/images/Taj_Mahal.jpg", flag: "/images/flags/india-flag.png" },
    { name: "India", image: "/images/Taj_Mahal.jpg", flag: "/images/flags/india-flag.png" },
  ];

  // Inline CSS for scrollbar hiding
  const scrollContainerStyle = {
    display: "flex",
    overflowX: "scroll",
    scrollBehavior: "smooth",
    gap: "1.5rem",
    padding: "1rem 0",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer
  };

  const hideScrollbarStyle = {
    "&::-webkit-scrollbar": { display: "none" }, // For WebKit browsers
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Explore Countries
        </h2>
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-accent z-10"
          >
            <FaChevronLeft className="w-5 h-5" /> {/* Left Scroll Icon */}
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-accent z-10"
          >
            <FaChevronRight className="w-5 h-5" /> {/* Right Scroll Icon */}
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            style={{ ...scrollContainerStyle, ...hideScrollbarStyle }}
          >
            {countries.map((country, index) => (
              <div
                key={index}
                className="relative min-w-[250px] flex-shrink-0 group"
              >
                {/* Country Image */}
                <img
                  src={country.image}
                  alt={country.name}
                  className="rounded-lg h-[300px] w-[250px] object-cover shadow-lg"
                />
                {/* Flag Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <img
                    src={country.flag}
                    alt={`${country.name} Flag`}
                    className="w-14 h-14 object-cover rounded-full shadow-md border-2 border-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
