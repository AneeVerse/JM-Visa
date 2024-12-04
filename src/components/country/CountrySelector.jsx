"use client";
import React, { useState } from "react";

const CountrySelector = () => {
  const categories = {
    Europe: [
      { name: "Belgium", flag: "/images/flags/be.webp" },
      { name: "France", flag: "/images/flags/fr.webp" },
      { name: "Germany", flag: "/images/flags/de.webp" },
      { name: "Greece", flag: "/images/flags/gr.webp" },
      { name: "Iceland", flag: "/images/flags/is.webp" },
      { name: "Ireland", flag: "/images/flags/ie.webp" },
      { name: "Italy", flag: "/images/flags/it.webp" },
      { name: "Luxembourg", flag: "/images/flags/lu.webp" },
    ],
    NorthAmerica: [
      { name: "Canada", flag: "/images/flags/ca.webp" },
      { name: "Mexico", flag: "/images/flags/mx.webp" },
      { name: "United States", flag: "/images/flags/us.webp" },
    ],
    Asia: [
      { name: "India", flag: "/images/flags/in.webp" },
      { name: "China", flag: "/images/flags/cn.webp" },
      { name: "Japan", flag: "/images/flags/jp.webp" },
      { name: "South Korea", flag: "/images/flags/kr.webp" },
      { name: "Indonesia", flag: "/images/flags/id.webp" },
    ],
    LatinAmerica: [
      { name: "Argentina", flag: "/images/flags/ar.webp" },
      { name: "Brazil", flag: "/images/flags/br.webp" },
      { name: "Chile", flag: "/images/flags/cl.webp" },
    ],
    Oceania: [
      { name: "Australia", flag: "/images/flags/au.webp" },
      { name: "New Zealand", flag: "/images/flags/nz.webp" },
    ],
    Africa: [
      { name: "Nigeria", flag: "/images/flags/ng.webp" },
      { name: "South Africa", flag: "/images/flags/za.webp" },
      { name: "Egypt", flag: "/images/flags/eg.webp" },
    ],
    Antarctica: [
      { name: "Research Stations", flag: "/images/flags/aq.webp" },
    ],
  };

  const [activeCategory, setActiveCategory] = useState("Europe");

  return (
    <section className="relative py-16 px-6 sm:px-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md">
            🌍 Explore Countries
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-gray-800 leading-snug">
            Discover Countries by <br />
            <span className="text-blue-500">Regions and Categories</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Select a region to find visa options for your favorite countries.
          </p>
        </div>

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
                className="flex items-center gap-4 p-4 bg-white/30 border border-white/30 backdrop-blur-lg rounded-lg shadow-md hover:shadow-xl transition-transform hover:scale-105"
              >
                {/* Country Flag */}
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                {/* Country Name */}
                <span className="font-medium text-gray-800">{country.name}</span>
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
