"use client";
import Link from "next/link";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";

const CountryListAboutPage = () => {
  const scrollContainerRef = useRef(null);

  // Enhanced Smooth Scroll Function
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollDistance = 300; // Total distance to scroll
      const step = 10; // Smaller step size for smoother scrolling
      let remainingDistance = scrollDistance;

      const scrollStep = () => {
        if (remainingDistance <= 0) return; // Stop when the distance is covered
        const stepDistance = Math.min(step, remainingDistance);
        container.scrollLeft += direction === "left" ? -stepDistance : stepDistance;
        remainingDistance -= stepDistance;
        requestAnimationFrame(scrollStep); // Smoothly transition frame by frame
      };

      scrollStep();
    }
  };

  const countries = [
    { name: "Germany", image: "/images/landmarks/Brandenburg Gate in Germany Visa.webp", flag: "/images/flags/de.webp", altName: "Brandenburg Gate in Germany Visa", continent: "Europe" },
    { name: "United States", image: "/images/landmarks/Tourist Places in United States Visa.webp", flag: "/images/flags/us.webp", altName: "Statue of Liberty in United States Visa", continent: "NorthAmerica" },
    { name: "France", image: "/images/landmarks/Eiffel Tower in France Visa.webp", flag: "/images/flags/fr.webp", altName: "Eiffel Tower in France Visa", continent: "Europe" },
    { name: "Canada", image: "/images/landmarks/Tourist Places in Canada Visa.webp", flag: "/images/flags/ca.webp", altName: "Tourist Places in Canada Visa", continent: "NorthAmerica" },
    { name: "India", image: "/images/landmarks/Taj_Mahal.jpg", flag: "/images/flags/in.webp", altName: "Taj Mahal in India Visa", continent: "Asia" },
    { name: "Mexico", image: "/images/landmarks/Tourist Places in Mexico Visa.webp", flag: "/images/flags/mx.webp", altName: "Tourist Places in Mexico Visa", continent: "NorthAmerica" },
  ];

  return (
    <section className=" py-12 relative">
      <div className="container mx-auto">
        <div className="mb-8">
          <div className="flex justify-between gap-2 items-center">
            <p className="inline-block px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md">
              ✈️ Discover Destinations
            </p>
            <Link
              href={"/country"}
              className="py-2 self-end text-blue-500 min-w-fit flex gap-1 items-center justify-center font-semibold"
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
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-[40px] w-[40px] rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleLeft size={20} className="text-white self-center" />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scroll-smooth gap-6 pb-4"
            style={{
              scrollbarWidth: "none", // Hide scrollbar in Firefox
              msOverflowStyle: "none", // Hide scrollbar in IE/Edge
            }}
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
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-[40px] w-[40px] rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleRight size={20} className="text-white self-center" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CountryListAboutPage;

