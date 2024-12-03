"use client";
import { motion } from "framer-motion";

const PromoSection = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Image with Floating Glass Effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative lg:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src="/images/profile.webp" // Replace with your actual image
                alt="Travel Assistance"
                className="w-full rounded-3xl shadow-xl object-cover"
              />
              {/* Floating Glassmorphic Elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-100/30 backdrop-blur-md rounded-full border border-white/30 shadow-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-100/30 backdrop-blur-md rounded-full border border-white/30 shadow-lg"></div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
              Your <span className="text-blue-500">Journey Partner</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              At JM Visa, we simplify your travel and visa needs. Whether it&apos;s immigration, work permits, or travel visas, our expert guidance ensures a stress-free experience for you.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-transform duration-300">
                Get Started
              </button>
              <button className="px-6 py-3 bg-white/40 border border-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-transform duration-300 backdrop-blur-md">
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
              className="p-6 bg-white/20 rounded-xl border border-white/10 shadow-lg backdrop-blur-md text-center transition-transform hover:scale-105"
            >
              <h3 className="text-4xl font-extrabold text-blue-500">{stat.value}</h3>
              <p className="mt-2 text-gray-600 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>
    </section>
  );
};

export default PromoSection;
