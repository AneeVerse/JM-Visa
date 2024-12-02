"use client"
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const images = [
    "/images/jm-banner.jpg", // Replace these with your actual image paths
    "/images/jm-banner2.png",
    "/images/jm-banner.jpg",
    "/images/jm-banner2.png",
    "/images/jm-banner.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative mt-[65px] w-full h-[400px] sm:h-[400px] md:h-[500px] overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIndex === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              zIndex: currentIndex === index ? 10 : 0,
            }}
          ></motion.div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-gradient-to-t from-black/50 via-transparent to-black/30">
        <h1 className="text-4xl sm:text-3xl md:text-5xl font-bold text-center">
          Simplify Your Journey, Achieve Dreams
        </h1>
        <p className="mt-4 text-lg sm:text-base text-center max-w-2xl">
          Explore expert immigration solutions tailored to your needs.
        </p>
        <button className="mt-6 px-8 py-3 bg-accent text-black font-semibold rounded-lg shadow-lg hover:bg-white transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
