"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Updated for useParams
import services from "@/data/ServicesData";

const ServiceDetails = () => {
  const params = useParams(); // Get dynamic parameters
  const router = useRouter(); // For navigation
  const [service, setService] = useState(null);

  useEffect(() => {
    if (!params?.slug) return; // Ensure the slug exists

    // Find the service by slug
    const matchedService = services.find((s) => s.url === `/${params.slug}`);
    if (!matchedService) {
      router.push("/services"); // Redirect if no match
    } else {
      setService(matchedService);
    }
  }, [params?.slug, router]);

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading Service Details...</p>
      </div>
    );
  }

  return (
    <section className="relative mt-[80px] py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{service.title}</h1>
          <p className="mt-4 text-gray-600 text-lg">{service.description}</p>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[300px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detailed Information */}
        <article className="mt-8 bg-white/30 border border-white/20 backdrop-blur-lg rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Why Choose {service.title}?
          </h2>
          <p className="mt-4 text-gray-600">
            {`We offer comprehensive support for ${service.title.toLowerCase()}, ensuring a seamless process with minimal hassle. Our experienced professionals are here to guide you through every step of the way.`}
          </p>

          <ul className="mt-6 list-disc list-inside text-gray-600">
            <li>Personalized consultation tailored to your needs.</li>
            <li>Expert documentation and process assistance.</li>
            <li>Quick and reliable support for all queries.</li>
          </ul>

          <p className="mt-4 text-gray-600">
            Experience the most efficient and transparent process with our {service.title} service. Let us help you achieve your goals with ease and confidence.
          </p>
        </article>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/services")}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            ← Back to Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
