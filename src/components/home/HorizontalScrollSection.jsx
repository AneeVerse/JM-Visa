"use client";
import { useRef } from "react";

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

  const scrollContainerStyle = {
    display: "flex",
    overflowX: "scroll",
    overflowY: "hidden", // Prevent vertical scrolling
    scrollBehavior: "smooth",
    minHeight: "max-content",
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
        

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            style={{ ...scrollContainerStyle, ...hideScrollbarStyle }}
          >
            {countries.map((country, index) => (
              <div
                key={index}
                className="relative h-[330px] pb-3 w-[250px] flex-shrink-0 group"
              >
                {/* Country Image */}
                <img
                  src={country.image}
                  alt={country.name}
                  className="rounded-lg h-full w-full object-cover shadow-lg"
                />
                {/* Flag Overlay */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
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
