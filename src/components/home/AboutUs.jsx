"use client";
import React from "react";
import { motion } from "framer-motion";

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
    <section className="relative py-16 px-6 sm:px-12 bg-gradient-to-br from-blue-50 via-white to-blue-700">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md"
          >
            ✈️ About Us
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-extrabold text-gray-800 leading-snug"
          >
            Making Visa Applications <br />
            <span className="text-blue-500">Simple and Efficient</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-600 text-lg"
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
                className="flex items-start gap-4 p-4  border border-white/30 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="text-3xl">{point.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {point.title}
                  </h3>
                  <p className="text-sm text-gray-600">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 p-8 border border-white/30 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all"
        >
          <img
            src="/images/profile.webp" // Replace with your image path
            alt="Vacation Image"
            className="w-full h-[300px] object-cover rounded-lg mb-6"
          />
            <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-2  gap-6"
        >
          {[
            { value: "50k+", label: "Visas Approved" },
            { value: "20+", label: "Years of Experience" },
            { value: "10k+", label: "Happy Clients" },
            { value: "100+", label: "Awards Won" },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white bg-opacity-40 backdrop-blur-lg shadow-lg rounded-xl text-center hover:shadow-2xl hover:scale-105 transition-transform"
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
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
