"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CountryData from "@/data/CountryData";

const CountryDetails = () => {
  const params = useParams(); // Access the dynamic route parameters
  const router = useRouter();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    // Ensure the params are available
    if (!params?.category || !params?.slug) return;

    const { category, slug } = params;

    // Find the country in the data
    const foundCountry = CountryData[category]?.find(
      (c) => c.name.toLowerCase().replace(" ", "") === slug.toLowerCase().replace("%20", "")
    );

    if (!foundCountry) {
      router.push(`/country`); // Redirect if no match
    } else {
      setCountry(foundCountry);
    }
  }, [params, router]);

  if (!country) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading Country Details...</p>
      </div>
    );
  }

  return (
    <section className="relative mt-[80px] py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto">
        {/* Country Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{country.name}</h1>
          <p className="mt-2 text-gray-600 text-lg">
            Explore {country.name}&apos;s iconic landmark:{" "}
            <span className="text-blue-500">{country.landmarkName}</span>.
          </p>
        </div>

        {/* Landmark Image */}
        <div className="relative w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <img
            src={country.landmark}
            alt={country.altName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Country Details */}
        <article className="mt-8 bg-white/30 border border-white/20 backdrop-blur-lg rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            About {country.landmarkName}
          </h2>
          <p className="mt-4 text-gray-600">
            {country.landmarkName} is one of the most celebrated landmarks in{" "}
            {country.name}. It showcases the rich culture, history, and
            architectural brilliance that define the region.
          </p>
          <ul className="mt-6 list-disc list-inside text-gray-600">
            <li>Experience breathtaking views of {country.landmarkName}.</li>
            <li>Learn about the history and cultural significance of {country.name}.</li>
            <li>Discover nearby attractions for an immersive experience.</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Whether you&apos;re a history buff or a cultural explorer, {country.name} offers
            a wealth of experiences through its landmarks like {country.landmarkName}.
          </p>
        </article>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push(`/country/${params.category}`)}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            ← Back to {params.category} Countries
          </button>
        </div>
      </div>
    </section>
  );
};

export default CountryDetails;
