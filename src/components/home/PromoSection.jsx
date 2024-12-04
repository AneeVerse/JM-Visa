"use client";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa"; // Importing React Icons

const PromoSection = () => {
  return (
    <section className="relative pb-16 sm:py-20  overflow-x-clip">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-6"
        >
          {[
            { value: "50k+", label: "Visas Approved" },
            { value: "20+", label: "Years of Experience" },
            { value: "10k+", label: "Happy Clients" },
            { value: "100+", label: "Awards Won" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-2 sm:p-6 bg-white bg-opacity-50 border-white border-[1px] backdrop-blur-lg shadow-lg rounded-xl text-center hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <h3 className="text-sm sm:text-4xl font-extrabold text-blue-500">
                {stat.value}
              </h3>
              <p className="mt-2 text-gray-600 text-[8px] sm:text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;
