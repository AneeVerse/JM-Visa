"use client";
import Link from "next/link";
import { useRef } from "react";
import { MdFormatListBulleted } from "react-icons/md";
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
    { name: "India", image: "/images/landmarks/Taj_Mahal.jpg", flag: "/images/flags/in.webp" ,altName: "Taj Mahal in India Visa" },
    { name: "France", image: "/images/landmarks/Eiffel Tower in France Visa.webp", flag: "/images/flags/fr.webp" ,altName: "Eiffel Tower in France Visa" },
    {name: "Germany", image: "/images/landmarks/Brandenburg Gate in Germany Visa.webp", flag: "/images/flags/de.webp" ,altName: "Brandenburg Gate in Germany Visa" },
    {name: "Mexico", image: "/images/landmarks/Tourist Places in Mexico Visa.png", flag: "/images/flags/mx.webp" ,altName: "Tourist Places in Mexico Visa" },
    {name: "Canada", image: "/images/landmarks/Tourist Places in Canada Visa.png", flag: "/images/flags/ca.webp" ,altName: "Tourist Places in Canada Visa" },
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
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
      <div className=" mb-8">
  {/* Subheading and Heading */}
  <div>
    <div className="flex justify-between gap-2 items-center">
    <p className="inline-block px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md ">
    ✈️  Discover Destinations
    </p>
  {/* View All Countries Button */}
  <Link href={"/country"} className=" py-2 self-end text-blue-500 min-w-fit flex gap-1 items-center justify-center font-semibold">
   <MdFormatListBulleted className="text-4" /> <span>View All</span> 
  </Link>
  </div>
    <h2 className="text-3xl font-bold text-gray-800 leading-tight mt-2">
      Explore Top Countries
    </h2>
  </div>

</div>

        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            style={{ ...scrollContainerStyle, ...hideScrollbarStyle }}
          >
            {countries.map((country, index) => (
              <div
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
                <h3 className="absolute top-3 left-0 text-gray-300 px-8 rounded-r-full py-[5px] bg-white/10  backdrop-blur-sm font-semibold text-lg">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
