
"use client";
import Link from "next/link";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";

const VisaServicesAboutPage = () => {
  const scrollContainerRef = useRef(null);

  // Enhanced Scroll Function
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollDistance = 300; // Total scroll distance
      const step = 10; // Smaller step for smoother transition
      let remainingDistance = scrollDistance;

      const scrollStep = () => {
        if (remainingDistance <= 0) return; // Stop scrolling when completed
        const stepDistance = Math.min(step, remainingDistance);
        container.scrollLeft += direction === "left" ? -stepDistance : stepDistance;
        remainingDistance -= stepDistance;
        requestAnimationFrame(scrollStep); // Smooth transition with each frame
      };

      scrollStep();
    }
  };

  const categories = [
    {
      title: "Study Abroad",
      image: "/images/Student-Visa.webp",
      url: "/study-abroad",
      description:
        "Access education opportunities globally with streamlined visa support.",
    },
    {
      title: "Worker Visa",
      image: "/images/Worker Visa.webp",
      url: "/work-visa",
      description:
        "Secure your work visa hassle-free for your dream international job.",
    },
    {
      title: "Tourist Visa",
      image: "/images/Tourist Visa.webp",
      url: "/tourist-visa",
      description: "Explore the world with our fast and easy tourist visa process.",
    },
    {
      title: "Business Visa",
      image: "/images/Business Visa.webp",
      url: "/business-visa",
      description: "Expand your business ventures globally with minimal effort.",
    },
    {
      title: "Residence Visa",
      image: "/images/student-visa.jpg",
      url: "/residence-visa",
      description: "Simplify the process of settling in a new country permanently.",
    },
  ];

  return (
    <section className=" py-12 relative">
      <div className="container mx-auto">
        {/* Heading Section */}
        <div className="mb-8">
          <div className="flex justify-between gap-2 items-center">
            <p className="inline-block px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md">
              ✈️ Our Services
            </p>
            <Link
              href={"/services"}
              className="py-2 self-end text-blue-500 min-w-fit flex gap-1 items-center justify-center font-semibold"
            >
              <MdFormatListBulleted className="text-4" /> <span>View All</span>
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 leading-tight mt-2">
            We Provide All Visa
          </h2>
        </div>

        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute hidden left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-[40px] w-[40px] rounded-full sm:flex items-center justify-center shadow-lg z-40"
          >
            <FaAngleLeft size={20} className="text-white self-center" />
          </button>

          {/* Horizontal Scroll Section */}
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollbarWidth: "none", // Hide scrollbar in Firefox
              msOverflowStyle: "none", // Hide scrollbar in IE/Edge
            }}
          >
            {categories.map((category, index) => (
              <Link
                href={`/services${category.url}`}
                key={index}
                className="relative p-5 group min-w-[280px] sm:min-w-[300px] lg:min-w-[340px] overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all border bg-white  duration-300 flex  gap-3 flex-col"
              >
                {/* Background Image with Overlay */}
                <div className="">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full rounded-xl object-cover"
                  />
                  {/* <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div> */}
                </div>

                <h3 className="text-xl text-left font-semibold text-black ">
                    {category.title}
                  </h3>
                {/* Content */}
              
                  <p className="text-black text-sm">{category.description}</p>
             
              </Link>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-[40px] w-[40px] rounded-full hidden sm:flex items-center justify-center shadow-lg z-40"
          >
            <FaAngleRight size={20} className="text-white self-center" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VisaServicesAboutPage;

