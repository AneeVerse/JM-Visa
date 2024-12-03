"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const images = [
    "/images/tourist1.png", // Replace with your actual image paths
    "/images/tourist1.png",
    "/images/tourist1.png",
    "/images/tourist1.png",
    "/images/tourist1.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [images.length]);

  return (
    <section className="relative bg-white mt-[50px] py-16">
      <img
        src="/ui/Decore.svg" // Replace with your actual image path
        alt="Hero Background"
        className="absolute top-0 hidden lg:block left-[50%] h-full object-cover object-center"
      />
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          {/* Badge */}
          <div className="inline-block px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md">
            ✈️ Simplifying Your Travel Plans!
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-5xl sm:text-6xl font-bold text-gray-800 leading-tight">
            Stress-Free{" "}
            <span className="text-blue-500">Visa Services</span> for{" "}
            <span className="text-blue-500">Your Journey</span> 🌴
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-lg text-gray-600">
            At JM Visa, we make travel, work, and immigration processes
            seamless. Trusted by thousands, we ensure a smooth experience
            tailored to your needs.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-center lg:justify-start gap-4">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-2xl shadow-blue-500 hover:bg-blue-600 hover:scale-105 transition-transform">
              Get Started ➔
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/70 border border-blue-500 text-blue-500 font-semibold rounded-lg shadow-lg hover:bg-blue-500 hover:text-white hover:scale-105 transition-transform backdrop-blur-lg">
              <span>▶</span> Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Main Image */}
            <img
              src={images[currentImageIndex]} // Dynamic image based on currentImageIndex
              alt="Traveler"
              className="w-full object-cover rounded-lg"
            />

            {/* Floating Badge */}
            <div className="absolute top-1/4 left-8 border-white border-[1px] bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
              <img
                src="/icons/award.png" // Replace with your actual image path
                alt="Award Icon"
                className="w-8 h-8 rounded-full shadow-lg object-cover"
              />
              <span className="text-gray-800 font-semibold"> Best Tour Award</span>
            </div>

            {/* Floating Image */}
            <div className="absolute top-[50%] border-white border-[1px] bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow-lg px-4 py-3 flex items-center gap-2 -right-6">
              <img
                src="/icons/star.png" // Replace with your actual image path
                alt="Star Icon"
                className="w-8 h-8 object-cover"
              />
              <p className="text-gray-800 font-semibold">5.0 (24 reviews)</p>
            </div>

            {/* Card */}
            <div className="absolute bottom-16 right-8 border-white border-[1px] bg-white bg-opacity-20 backdrop-blur-sm rounded-lg shadow-lg py-3 px-4 flex items-center gap-4">
              <img
                src="/icons/google-maps.png" // Replace with your actual image path
                alt="Google Maps Icon"
                className="w-8 h-8"
              />
              <div>
                <p className="text-gray-800 font-semibold">
                  Explore the World
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Accents
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/50 rounded-full blur-3xl"></div> */}
    </section>
  );
};

export default HeroSection;
