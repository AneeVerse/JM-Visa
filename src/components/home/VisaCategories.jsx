"use client";
import { motion } from "framer-motion";

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
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Visa Categories
          </span>
          <h2 className="text-4xl font-extrabold text-gray-800 mt-2">
            We Provide All Visa You Need
          </h2>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
              className="relative group overflow-hidden bg-gradient-to-tr from-blue-500 via-purple-500 to-indigo-500 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 min-h-[300px] flex justify-center items-center"
              whileHover={{ scale: 1.1 }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300"></div>
              </div>

              {/* Content */}
              <div className="relative p-8 flex flex-col items-center text-center z-10">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {category.title}
                </h3>
                <p className="text-white text-sm">{category.description}</p>
              </div>

              {/* Icon Overlay */}
              <motion.div
                className="absolute top-6 right-6 bg-white/10 rounded-full flex justify-center items-center  h-12 w-12 shadow-md backdrop-blur-md"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span className="text-white font-bold text-xl">
                  {index + 1}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VisaCategories;
