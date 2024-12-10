"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const CountrySelector = () => {
  const categories = {
    Europe: [
      { name: "Belgium", flag: "/images/flags/be.webp", landmark: "/images/landmarks/Atomium in Belgium Visa.webp", landmarkName: "Atomium" },
      { name: "France", flag: "/images/flags/fr.webp", landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Eiffel Tower" },
      { name: "Germany", flag: "/images/flags/de.webp", landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Brandenburg Gate" },
      { name: "Greece", flag: "/images/flags/gr.webp", landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Parthenon" },
      { name: "Iceland", flag: "/images/flags/is.webp", landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Blue Lagoon" },
      { name: "Ireland", flag: "/images/flags/ie.webp", landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Cliffs of Moher" },
      { name: "Italy", flag: "/images/flags/it.webp", landmark: "/images/landmarks/italy.webp", landmarkName: "Colosseum" },
      { name: "Luxembourg", flag: "/images/flags/lu.webp", landmark: "/images/landmarks/Vianden Castle in Luxembourg Visa.webp", landmarkName: "Vianden Castle" },
    ],
    NorthAmerica: [
      { name: "Canada", flag: "/images/flags/ca.webp",landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Colosseum"  },
      { name: "Mexico", flag: "/images/flags/mx.webp", landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Colosseum"  },
      { name: "United States", flag: "/images/flags/us.webp", landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Colosseum" },
    ],
    Asia: [
      { name: "India", flag: "/images/flags/in.webp", landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Taj Mahal" },
      { name: "China", flag: "/images/flags/cn.webp", landmark: "/images/landmarks/china.webp", landmarkName: "Great Wall of China" },
      { name: "Japan", flag: "/images/flags/jp.webp", landmark: "/images/landmarks/japan.webp", landmarkName: "Mount Fuji" },
      { name: "South Korea", flag: "/images/flags/kr.webp", landmark: "/images/landmarks/south-korea.webp", landmarkName: "Gyeongbokgung Palace" },
      { name: "Indonesia", flag: "/images/flags/id.webp", landmark: "/images/landmarks/indonesia.webp", landmarkName: "Borobudur Temple" },
    ],
    // LatinAmerica: [
    //   { name: "Argentina", flag: "/images/flags/ar.webp", landmark: "Iguazu Falls" },
    //   { name: "Brazil", flag: "/images/flags/br.webp", landmark: "Christ the Redeemer" },
    //   { name: "Chile", flag: "/images/flags/cl.webp", landmark: "Easter Island" },
    // ],
    Oceania: [
      { name: "Australia", flag: "/images/flags/au.webp", landmark: "/images/landmarks/australia.webp", landmarkName: "Sydney Opera House" },
      { name: "New Zealand", flag: "/images/flags/nz.webp", landmark: "/images/landmarks/new-zealand.webp", landmarkName: "Milford Sound" },
    ],
    Africa: [
      { name: "Nigeria", flag: "/images/flags/ng.webp", landmark: "/images/landmarks/nigeria.webp", landmarkName: "Zuma Rock" },
      { name: "South Africa", flag: "/images/flags/za.webp", landmark: "/images/landmarks/south-africa.webp", landmarkName: "Table Mountain" },
      { name: "Egypt", flag: "/images/flags/eg.webp", landmark: "/images/landmarks/egypt.webp", landmarkName: "Pyramids of Giza" },
    ],
  };

  const [activeCategory, setActiveCategory] = useState("Europe");

  return (
    <section className="relative py-16 px-3 sm:px-6 md:px-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto">
        {/* Heading */}
        <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md">
            🌍 Explore Countries
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-800 leading-snug">
            Discover Famous Landmarks by <br />
            <span className="text-blue-500">Region and Country</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Select a region to explore popular countries and their landmarks.
          </p>
        </div>
        </motion.div>

        {/* Categories */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full border font-medium text-sm transition ${
                activeCategory === category
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white/30 text-gray-600 backdrop-blur-md hover:bg-white/50 hover:shadow-md"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Country Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories[activeCategory].length > 0 ? (
            categories[activeCategory].map((country, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center bg-white/30 border border-white/30 backdrop-blur-lg rounded-lg shadow-md hover:shadow-xl transition-transform hover:scale-105 overflow-hidden"
              >
                {/* Landmark Image */}
                <img
                  src={country.landmark}
                  alt={country.landmarkName}
                  className="w-full h-32 md:h-[190px] object-cover"
                />
                <div className="absolute top-2 left-0 bg-white/50 backdrop-blur-sm text-gray-600 px-2 py-1 rounded-r-full text-xs font-medium">
                  {country.landmarkName}
                </div>

                {/* Country Info */}
                <div className="flex flex-col items-center p-4">
                  {/* Flag */}
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  {/* Country Name */}
                  <span className="mt-2 font-medium text-gray-800 text-lg">
                    {country.name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No countries available in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CountrySelector;