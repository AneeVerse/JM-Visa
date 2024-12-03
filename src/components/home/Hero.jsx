"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/images/banner.webp",
    "/images/banner2.jpg",
    "/images/banner.webp",
    "/images/banner2.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative mt-[50px] h-[75vh] md:h-[80vh] flex items-center justify-center bg-gray-900">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt={`Background ${index}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center md:text-left max-w-6xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-white"
        >
          Simplify Your <span className="text-blue-400">Visa Journey</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-4 text-lg sm:text-xl text-gray-300"
        >
          Expert visa services to make your travel dreams a reality.
        </motion.p>

        {/* Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
          <button className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-full shadow-lg hover:bg-white hover:text-blue-500 transition duration-300">
            Learn More
          </button>
        </motion.div>
      </div>

      {/* Floating Glassmorphic Info Cards */}
      <motion.div
        className="absolute hidden sm:block top-12 left-5 md:left-12 w-[200px] md:w-[260px] bg-white/20 rounded-xl backdrop-blur-md border border-white/10 shadow-xl p-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-base md:text-lg font-semibold text-white">Visa Approvals</h3>
        <p className="text-sm md:text-base text-gray-300 mt-2">98% approval success rate.</p>
      </motion.div>
      <motion.div
        className="absolute hidden sm:block bottom-12 right-5 md:right-12 w-[200px] md:w-[260px] bg-white/20 rounded-xl backdrop-blur-md border border-white/10 shadow-xl p-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-base md:text-lg font-semibold text-white">Trusted Partner</h3>
        <p className="text-sm md:text-base text-gray-300 mt-2">Helping travelers since 2010.</p>
      </motion.div>
    </section>
  );
};

export default Hero;
