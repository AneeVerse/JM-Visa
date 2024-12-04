"use client";
import React, { useState } from "react";

const CountrySelector = () => {
  const categories = {
    Europe: [
      { name: "Belgium", flag: "/images/flags/belgium.png" },
      { name: "France", flag: "/images/flags/france.png" },
      { name: "Germany", flag: "/images/flags/germany.png" },
      { name: "Greece", flag: "/images/flags/greece.png" },
      { name: "Iceland", flag: "/images/flags/iceland.png" },
      { name: "Ireland", flag: "/images/flags/ireland.png" },
      { name: "Italy", flag: "/images/flags/italy.png" },
      { name: "Luxembourg", flag: "/images/flags/luxembourg.png" },
    ],
    Asia: [
      { name: "India", flag: "/images/flags/india.png" },
      { name: "China", flag: "/images/flags/china.png" },
      { name: "Japan", flag: "/images/flags/japan.png" },
    ],
    Oceania: [
      { name: "Australia", flag: "/images/flags/australia.png" },
      { name: "New Zealand", flag: "/images/flags/new-zealand.png" },
    ],
    Africa: [
        { name: "Nigeria", flag: "" },
        { name: "South Africa", flag: "" },
      ],
      Antarctica: [],
  };

  const [activeCategory, setActiveCategory] = useState("Europe");

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Explore Countries by Category
          </h2>
          <p className="text-lg text-gray-600">
            Select a region to find the countries you’re interested in.
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
                className="flex items-center gap-4 p-4 bg-white/20 border border-white/30 rounded-lg shadow-lg backdrop-blur-md transition-transform hover:scale-105"
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
