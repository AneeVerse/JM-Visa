"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const CountrySelector = () => {
  const categories = {
    Asia: [ 
       { name: "Japan", flag: "/images/flags/jp.webp", landmark: "/images/landmarks/Mount Fuji in Japan Visa.webp", landmarkName: "Mount Fuji", altName: "Mount Fuji in Japan Visa" },
       { name: "China", flag: "/images/flags/cn.webp", landmark: "/images/landmarks/Great Wall of China in China Visa.webp", landmarkName: "Great Wall of China", altName: "Great Wall of China in China Visa" },
       { name: "South Korea", flag: "/images/flags/kr.webp", landmark: "/images/landmarks/Gyeongbokgung Palace in South Korea Visa.webp", landmarkName: "Gyeongbokgung Palace", altName: "Gyeongbokgung Palace in South Korea Visa" },
      { name: "India", flag: "/images/flags/in.webp", landmark: "/images/landmarks/Taj_Mahal.jpg", landmarkName: "Taj Mahal", altName: "Taj Mahal in India Visa" },
      { name: "UAE", flag: "/images/flags/ae.webp", landmark: "/images/landmarks/burj-khalifa.webp", landmarkName: "Burj Khalifa", altName: "Burj Khalifa in UAE Visa" },
      { name: "Saudi Arabia", flag: "/images/flags/sa.webp", landmark: "/images/landmarks/kaaba.webp", landmarkName: "Kaaba", altName: "Kaaba in Saudi Arabia Visa" },
      { name: "Qatar", flag: "/images/flags/qa.webp", landmark: "/images/landmarks/museum-of-islamic-art.webp", landmarkName: "Museum of Islamic Art", altName: "Museum of Islamic Art in Qatar Visa" },
      { name: "Oman", flag: "/images/flags/om.webp", landmark: "/images/landmarks/sultan-qaboos-mosque.webp", landmarkName: "Sultan Qaboos Mosque", altName: "Sultan Qaboos Mosque in Oman Visa" },
      { name: "Bahrain", flag: "/images/flags/bh.webp", landmark: "/images/landmarks/bahrain-world-trade-center.webp", landmarkName: "World Trade Center", altName: "World Trade Center in Bahrain Visa" },
      { name: "Kuwait", flag: "/images/flags/kw.webp", landmark: "/images/landmarks/kuwait-towers.webp", landmarkName: "Kuwait Towers", altName: "Kuwait Towers in Kuwait Visa" },
      { name: "Singapore", flag: "/images/flags/sg.webp", landmark: "/images/landmarks/marina-bay-sands.webp", landmarkName: "Marina Bay Sands", altName: "Marina Bay Sands in Singapore Visa" },
      { name: "Malaysia", flag: "/images/flags/my.webp", landmark: "/images/landmarks/petronas-towers.webp", landmarkName: "Petronas Towers", altName: "Petronas Towers in Malaysia Visa" },
      { name: "Thailand", flag: "/images/flags/th.webp", landmark: "/images/landmarks/grand-palace.webp", landmarkName: "Grand Palace", altName: "Grand Palace in Thailand Visa" },
      { name: "Vietnam", flag: "/images/flags/vn.webp", landmark: "/images/landmarks/ha-long-bay.webp", landmarkName: "Ha Long Bay", altName: "Ha Long Bay in Vietnam Visa" },
     { name: "Hong Kong", flag: "/images/flags/hk.webp", landmark: "/images/landmarks/victoria-peak.webp", landmarkName: "Victoria Peak", altName: "Victoria Peak in Hong Kong Visa" },
      { name: "Indonesia", flag: "/images/flags/id.webp", landmark: "/images/landmarks/Borobudur Temple in Indonesia Visa.webp", landmarkName: "Borobudur Temple", altName: "Borobudur Temple in Indonesia Visa" },
      { name: "Maldives", flag: "/images/flags/mv.webp", landmark: "/images/landmarks/maldives-resorts.webp", landmarkName: "Resorts", altName: "Resorts in Maldives Visa" },
      { name: "Nepal", flag: "/images/flags/np.webp", landmark: "/images/landmarks/mount-everest.webp", landmarkName: "Mount Everest", altName: "Mount Everest in Nepal Visa" },
      { name: "Bhutan", flag: "/images/flags/bt.webp", landmark: "/images/landmarks/tigers-nest-monastery.webp", landmarkName: "Tiger's Nest Monastery", altName: "Tiger's Nest Monastery in Bhutan Visa" },
      { name: "Sri Lanka", flag: "/images/flags/lk.webp", landmark: "/images/landmarks/sigiriya-rock.webp", landmarkName: "Sigiriya Rock", altName: "Sigiriya Rock in Sri Lanka Visa" },
    ],
    Europe: [
      { name: "United Kingdom", flag: "/images/flags/uk.webp", landmark: "/images/landmarks/big-ben.webp", landmarkName: "Big Ben", altName: "Big Ben in United Kingdom Visa" },
      {name: "IceLand", flag: "/images/flags/is.webp", landmark: "/images/landmarks/Blue Lagoon in Iceland Visa.webp", landmarkName: "Blue Lagoon", altName: "Blue Lagoon in IceLand Visa" },
      {name: "Luxembourg", flag: "/images/flags/lu.webp", landmark: "/images/landmarks/Vianden Castle in Luxembourg Visa.webp", landmarkName: "City of Luxembourg", altName: "City of Luxembourg in Luxembourg Visa" },
      { name: "Germany", flag: "/images/flags/de.webp", landmark: "/images/landmarks/Brandenburg Gate in Germany Visa.webp", landmarkName: "Brandenburg Gate", altName: "Brandenburg Gate in Germany Visa" },
      { name: "France", flag: "/images/flags/fr.webp", landmark: "/images/landmarks/Eiffel Tower in France Visa.webp", landmarkName: "Eiffel Tower", altName: "Eiffel Tower in France Visa" },
      { name: "Italy", flag: "/images/flags/it.webp", landmark: "/images/landmarks/colosseum.webp", landmarkName: "Colosseum", altName: "Colosseum in Italy Visa" },
      { name: "Spain", flag: "/images/flags/es.webp", landmark: "/images/landmarks/sagrada-familia.webp", landmarkName: "Sagrada Familia", altName: "Sagrada Familia in Spain Visa" },
      { name: "Netherlands", flag: "/images/flags/nl.webp", landmark: "/images/landmarks/windmills.webp", landmarkName: "Windmills", altName: "Windmills in Netherlands Visa" },
      { name: "Switzerland", flag: "/images/flags/ch.webp", landmark: "/images/landmarks/matterhorn.webp", landmarkName: "Matterhorn", altName: "Matterhorn in Switzerland Visa" },
      { name: "Sweden", flag: "/images/flags/se.webp", landmark: "/images/landmarks/stockholm-palace.webp", landmarkName: "Stockholm Palace", altName: "Stockholm Palace in Sweden Visa" },
      { name: "Norway", flag: "/images/flags/no.webp", landmark: "/images/landmarks/geirangerfjord.webp", landmarkName: "Geirangerfjord", altName: "Geirangerfjord in Norway Visa" },
      { name: "Austria", flag: "/images/flags/at.webp", landmark: "/images/landmarks/schonbrunn-palace.webp", landmarkName: "Schonbrunn Palace", altName: "Schonbrunn Palace in Austria Visa" },
      { name: "Denmark", flag: "/images/flags/dk.webp", landmark: "/images/landmarks/little-mermaid.webp", landmarkName: "Little Mermaid Statue", altName: "Little Mermaid Statue in Denmark Visa" },
      { name: "Belgium", flag: "/images/flags/be.webp", landmark: "/images/landmarks/Atomium in Belgium Visa.webp", landmarkName: "Atomium", altName: "Atomium in Belgium Visa" },
      { name: "Portugal", flag: "/images/flags/pt.webp", landmark: "/images/landmarks/belem-tower.webp", landmarkName: "Belem Tower", altName: "Belem Tower in Portugal Visa" },
      { name: "Poland", flag: "/images/flags/pl.webp", landmark: "/images/landmarks/wawel-castle.webp", landmarkName: "Wawel Castle", altName: "Wawel Castle in Poland Visa" },
      { name: "Finland", flag: "/images/flags/fi.webp", landmark: "/images/landmarks/helsinki-cathedral.webp", landmarkName: "Helsinki Cathedral", altName: "Helsinki Cathedral in Finland Visa" },
      { name: "Greece", flag: "/images/flags/gr.webp", landmark: "/images/landmarks/Parthenon in Greece Visa.webp", landmarkName: "Parthenon", altName: "Parthenon in Greece Visa" },
      { name: "Ireland", flag: "/images/flags/ie.webp", landmark: "/images/landmarks/Cliffs of Moher in Ireland Visa.webp", landmarkName: "Cliffs of Moher", altName: "Cliffs of Moher in Ireland Visa" },
      { name: "Russia", flag: "/images/flags/ru.webp", landmark: "/images/landmarks/st-basils-cathedral.webp", landmarkName: "St. Basil's Cathedral", altName: "St. Basil's Cathedral in Russia Visa" },
      { name: "Schengen Countries", flag: "/images/flags/eu.png", landmark: "/images/landmarks/europe.webp", landmarkName: "Europe Landmarks", altName: "Landmarks in Schengen Countries Visa" },
    ],
    NorthAmerica: [
      { name: "United States", flag: "/images/flags/us.webp", landmark: "/images/landmarks/Tourist Places in United States Visa.webp", landmarkName: "Statue of Liberty", altName: "Statue of Liberty in the United States Visa" },
      { name: "Canada", flag: "/images/flags/ca.webp", landmark: "/images/landmarks/Tourist Places in Canada Visa.webp", landmarkName: "Niagara Falls", altName: "Niagara Falls in Canada Visa" },
      { name: "Mexico", flag: "/images/flags/mx.webp", landmark: "/images/landmarks/Tourist Places in Mexico Visa.webp", landmarkName: "Chichen Itza", altName: "Chichen Itza in Mexico Visa" },
    ],
    SouthAmerica: [
      { name: "Brazil", flag: "/images/flags/br.webp", landmark: "/images/landmarks/christ-the-redeemer.webp", landmarkName: "Christ the Redeemer", altName: "Christ the Redeemer in Brazil Visa" },
      { name: "Argentina", flag: "/images/flags/ar.webp", landmark: "/images/landmarks/iguazu-falls.webp", landmarkName: "Iguazu Falls", altName: "Iguazu Falls in Argentina Visa" },
      { name: "Chile", flag: "/images/flags/cl.webp", landmark: "/images/landmarks/torres-del-paine.webp", landmarkName: "Torres del Paine", altName: "Torres del Paine in Chile Visa" },
      { name: "Colombia", flag: "/images/flags/co.webp", landmark: "/images/landmarks/castillo-san-felipe.webp", landmarkName: "Castillo San Felipe", altName: "Castillo San Felipe in Colombia Visa" },
      { name: "Peru", flag: "/images/flags/pe.webp", landmark: "/images/landmarks/machu-picchu.webp", landmarkName: "Machu Picchu", altName: "Machu Picchu in Peru Visa" },
    ],
    Africa: [
      { name: "South Africa", flag: "/images/flags/za.webp", landmark: "/images/landmarks/Table Mountain in South Africa Visa.webp", landmarkName: "Table Mountain", altName: "Table Mountain in South Africa Visa" },
      { name: "Kenya", flag: "/images/flags/ke.webp", landmark: "/images/landmarks/masai-mara.webp", landmarkName: "Masai Mara", altName: "Masai Mara in Kenya Visa" },
      { name: "Mauritius", flag: "/images/flags/mu.webp", landmark: "/images/landmarks/ile-aux-cerfs.webp", landmarkName: "Ile aux Cerfs", altName: "Ile aux Cerfs in Mauritius Visa" },
      { name: "Seychelles", flag: "/images/flags/sc.webp", landmark: "/images/landmarks/anse-source-dargent.webp", landmarkName: "Anse Source d'Argent", altName: "Anse Source d'Argent in Seychelles Visa" },
      { name: "Morocco", flag: "/images/flags/ma.webp", landmark: "/images/landmarks/chefchaouen.webp", landmarkName: "Chefchaouen", altName: "Chefchaouen in Morocco Visa" },
      { name: "Egypt", flag: "/images/flags/eg.webp", landmark: "/images/landmarks/Pyramids of Giza in Egypt  Visa.webp", landmarkName: "Pyramids of Giza", altName: "Pyramids of Giza in Egypt Visa" },
      { name: "Nigeria", flag: "/images/flags/ng.webp", landmark: "/images/landmarks/Zuma Rock in Nigeria Visa.webp", landmarkName: "Zuma Rock", altName: "Zuma Rock in Nigeria Visa" },
      { name: "Tanzania", flag: "/images/flags/tz.webp", landmark: "/images/landmarks/mount-kilimanjaro.webp", landmarkName: "Mount Kilimanjaro", altName: "Mount Kilimanjaro in Tanzania Visa" },
    ],
    Oceania: [
      { name: "Australia", flag: "/images/flags/au.webp", landmark: "/images/landmarks/Sydney Opera House in Australia Visa.webp", landmarkName: "Sydney Opera House", altName: "Sydney Opera House in Australia Visa" },
      { name: "New Zealand", flag: "/images/flags/nz.webp", landmark: "/images/landmarks/Milford Sound in New Zealand Visa.webp", landmarkName: "Milford Sound", altName: "Milford Sound in New Zealand Visa" },
      { name: "Fiji", flag: "/images/flags/fj.webp", landmark: "/images/landmarks/cloud-9.webp", landmarkName: "Cloud 9", altName: "Cloud 9 in Fiji Visa" },
    ],
  };
  

  const [activeCategory, setActiveCategory] = useState("Asia");

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
                  alt={country.altName}
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
