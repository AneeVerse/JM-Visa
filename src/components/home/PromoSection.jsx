"use client";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa"; // Importing React Icons

const PromoSection = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Image with Modern Floating Elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative lg:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src="/images/profile.webp" // Replace with your image
                alt="Travel Assistance"
                className="w-full rounded-3xl shadow-xl object-cover"
              />
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-8 w-16 h-16 bg-blue-100/50 backdrop-blur-lg rounded-full shadow-lg"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -left-8 w-16 h-16 bg-blue-100/50 backdrop-blur-lg rounded-full shadow-lg"
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
              Your <span className="text-blue-500">Trusted Partner</span> in
              Visa Assistance
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              JM Visa ensures a seamless process for all your travel, work, and
              immigration needs. With years of expertise and thousands of
              satisfied clients, we make your journey stress-free.
            </p>
            {/* New List */}
            <ul className="mt-4 space-y-3">
              {[
                "Hassle-free visa processing",
                "Expert team with 20+ years of experience",
                "24/7 customer support",
                "Trusted by over 50k+ clients",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-700 text-base">
                  <FaCheckCircle className="text-blue-500" /> {item}
                </li>
              ))}
            </ul>
            <div className="flex justify-center lg:justify-start gap-4">
              <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105 transition-transform">
                Get Started
              </button>
              <button className="px-6 py-3 border border-blue-500 text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:text-white hover:scale-105 transition-transform">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: "50k+", label: "Visas Approved" },
            { value: "20+", label: "Years of Experience" },
            { value: "10k+", label: "Happy Clients" },
            { value: "100+", label: "Awards Won" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl text-center hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <h3 className="text-4xl font-extrabold text-blue-500">
                {stat.value}
              </h3>
              <p className="mt-2 text-gray-600 text-sm font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-300/50 rounded-full blur-3xl"></div>
    </section>
  );
};

export default PromoSection;
