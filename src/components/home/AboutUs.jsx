"use client";
import React from "react";
import { motion } from "framer-motion";
import { PiShareFatFill } from "react-icons/pi";
import { GoOrganization } from "react-icons/go";
import { CiHeart } from "react-icons/ci";

const AboutUs = () => {
  const points = [
    {
      icon: "🔍",
      title: "Find the Right Visa",
      description:
        "Discover visa options tailored to your travel, education, and work needs with JM Visa.",
    },
    {
      icon: "📋",
      title: "Submit Your Documents",
      description:
        "Provide accurate information and complete your visa application seamlessly.",
    },
    {
      icon: "🌍",
      title: "Travel Hassle-Free",
      description:
        "Enjoy stress-free travel with our expert guidance and fast-track support.",
    },
  ];

  return (
    <section className="relative py-16 px-6 sm:px-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-white bg-opacity-10 text-white font-medium rounded-full backdrop-blur-lg shadow-md"
          >
            ✈️ About Us
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-white leading-snug"
          >
            Making Visa Applications <br />
            <span className="text-blue-500">Simple and Efficient</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white text-lg"
          >
            At JM Visa, we specialize in offering personalized visa services for
            travel, education, and work. Our expert team ensures a smooth and
            efficient process, helping you achieve your dreams hassle-free.
          </motion.p>

          {/* Key Points */}
          <div className="space-y-6">
            {points.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-4 bg-white bg-opacity-10 border border-white/30 backdrop-blur-md rounded-lg hover:shadow-sm transition-all"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="text-3xl">{point.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {point.title}
                  </h3>
                  <p className="text-sm text-white">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 p-8 relative bg-white bg-opacity-10 border-gray-200 border-[1px] backdrop-blur-lg  rounded-2xl hover:shadow-xl transition-all"
        >
          {/* <div className="absolute bg-gradient-to-br -z-20 w-full from-blue-50  h-[400px] to-blue-400 blur-2xl p-2 rounded-full bottom-10 right-4"/> */}
          {/* Main Image */}
          <img
            src="/images/profile.webp" // Replace with your image path
            alt="Vacation Image"
            className="w-full h-[280px] object-cover rounded-lg mb-6 shadow-md"
          />


          {/* Details Section */}
          <div className="space-y-4">
            {/* Trip Info */}
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                Discover Your Next Destination
              </h3>
             
            </div>
            <p className="text-white text-sm">14-29 July | by JM Visa</p>

            {/* Progress Section */}
            <div className="mt-4 flex items-center gap-4">
              <img
                src="/images/flags/india-flag.png"
                alt="Flag"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div className="w-full">
                <p className="text-sm text-white font-semibold">Ongoing</p>
                <p className="text-sm text-white">Explore India</p>
                {/* <div className="mt-2 w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div> */}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GoOrganization className="text-xl text-white" />
                <p className="text-white text-sm font-semibold">
                  32 Country
                </p>
              </div>
              <button className="px-4 py-2 text-sm border-[1px] bg-white bg-opacity-10 backdrop-blur-lg border-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition">
                Explore Countries
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
