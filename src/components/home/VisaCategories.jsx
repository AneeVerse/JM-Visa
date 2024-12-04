"use client";
import { motion } from "framer-motion";
import { MdFormatListBulleted } from "react-icons/md";

const VisaCategories = () => {
  const categories = [
    {
      title: "Student Visa",
      image: "/images/student-visa.jpg",
      description:
        "Access education opportunities globally with streamlined visa support.",
    },
    {
      title: "Worker Visa",
      image: "/images/work-visa.jpg",
      description:
        "Secure your work visa hassle-free for your dream international job.",
    },
    {
      title: "Tourist Visa",
      image: "/images/tourist-visa.webp",
      description: "Explore the world with our fast and easy tourist visa process.",
    },
    {
      title: "Business Visa",
      image: "/images/business-visa.png",
      description: "Expand your business ventures globally with minimal effort.",
    },
    {
      title: "Residence Visa",
      image: "/images/student-visa.jpg",
      description: "Simplify the process of settling in a new country permanently.",
    },
    {
      title: "Family Visa",
      image: "/images/work-visa.jpg",
      description: "Reunite with your loved ones with quick family visa services.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading Section */}
        {/* Subheading and Heading */}
        <div className="mb-8">
          <div className="flex justify-between gap-2 items-center">
            <p className="inline-block px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md ">
              ✈️  Our Services
            </p>
            {/* View All Countries Button */}
            <button className=" py-2 self-end text-blue-500 min-w-fit flex gap-1 items-center justify-center font-semibold">
              <MdFormatListBulleted className="text-4" /> <span>View All</span>
            </button>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 leading-tight mt-2">
            We Provide All Visa
          </h2>
        </div>

        {/* Horizontal Scroll Section */}
        <motion.div
          className="flex gap-8 overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: "none", // Hide scrollbar in Firefox
            msOverflowStyle: "none", // Hide scrollbar in IE/Edge
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="relative group min-w-[280px] sm:min-w-[300px] lg:min-w-[340px] overflow-hidden bg-gradient-to-tr from-blue-500 via-blue-500 to-indigo-500 rounded-xl shadow-lg transition-transform duration-300 h-[320px] flex justify-center items-center"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                />
                <div className="absolute inset-0  bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <div className="relative p-6 flex flex-col items-center text-center z-10">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {category.title}
                </h3>
                <p className="text-white text-sm">{category.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VisaCategories;
