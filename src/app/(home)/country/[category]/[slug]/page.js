"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CountryData from "@/data/CountryData";
import { BiBuildingHouse, BiMessageDetail, BiSupport, BiWorld } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineFieldTime } from "react-icons/ai";
import { AnimatePresence , motion} from "framer-motion";

const CountryDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [country, setCountry] = useState(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  useEffect(() => {
    if (!params?.category || !params?.slug) return;

    const { category, slug } = params;

    const foundCountry = CountryData[category]?.find(
      (c) =>
        c.name.toLowerCase().replace(" ", "") ===
        slug.toLowerCase().replace("%20", "")
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
    <section className="relative mt-[80px]  px-4 sm:px-6 lg:px-12 py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="max-w-[1280px] mx-auto">
        {/* Main Section: Image and Title Side by Side */}
        <div className="flex flex-col lg:flex-row gap-12 pl-4 sm:pl-8 items-center justify-between lg:items-start">
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            {/* Back Button */}
            <div className="mb-4 hidden lg:block">
              <button
                onClick={() => router.push(`/country`)}
                className="py-3 text-blue-500 font-semibold transition"
              >
                ← Back to {params.category} Countries
              </button>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 leading-tight">
              {country.name}
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Discover the wonders of {country.name}&apos;s{" "}
              <span className="text-blue-500">{country.landmarkName}</span>.
            </p>
            <p className="mt-4 text-gray-500">{country.description}</p>
          </div>
          <div className="lg:w-1/2 w-full max-w-[500px] mr-auto ml-auto md:mr-auto md:ml-auto h-[300px] rounded-lg overflow-hidden shadow-md">
            <img
              src={country.landmark}
              alt={country.altName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-12 flex flex-col lg:flex-row gap-12">
          {/* Main Content Section */}
          <div className="lg:w-2/3 w-full">
            {/* Visa Types */}
            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Types of Visas for {country.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {country.visaTypes.map((visa, index) => (
                  <div
                    key={index}
                    className="bg-white/30 border backdrop-blur-lg rounded-md"
                  >
                    <h3 className="text-xl bg-blue-50 px-6 py-2 rounded-t-lg font-semibold text-gray-800 mb-4">
                      {visa.type}
                    </h3>
                    <ul className="space-y-2  px-6 pb-6 text-gray-600">
                      <li className="flex justify-between items-center">
                        <strong>Processing Time:</strong> <span>{visa.processingTime}</span> 
                      </li>
                      <li className="flex justify-between items-center">
                        <strong>Stay Period:</strong>  <span>{visa.stayPeriod}</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <strong>Validity:</strong>  <span>{visa.validity}</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <strong>Visa Category:</strong>  <span>{visa.visaCategory}</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <strong>Entry:</strong> <span> {visa.entry}</span>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>


          {/* Required Documents */}
<div className="mb-12">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6">
    Required Documents
  </h2>
  <div className="space-y-8">
    {country.documentsRequired.map((doc, index) => (
      <div 
        key={index} 
        className="bg-white/30 border backdrop-blur-lg rounded-md p-6"
      >
        {/* Document Category */}
        <div className="flex items-center gap-3 mb-4">
          {/* <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-500 font-bold rounded-full">
            {index + 1}
          </div> */}
          <h3 className="text-xl font-semibold text-gray-800">
            {doc.category}
          </h3>
        </div>

        {/* Document List */}
        <ul className="list-inside list-disc ml-3 space-y-2 text-gray-600">
          {doc.documents.map((item, docIndex) => (
            <li key={docIndex} className="flex items-start">
              <svg
                className="w-5 h-5 text-blue-500 mt-1 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5-4.5A2.5 2.5 0 0015.5 1h-7A2.5 2.5 0 006 3.5v17A2.5 2.5 0 008.5 23h7a2.5 2.5 0 002.5-2.5v-17z"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        {/* Additional Notes */}
        {doc.note && (
          <p className="mt-4 text-sm text-gray-500 italic border-t pt-4">
           <strong>Note:</strong> {doc.note}
          </p>
        )}
      </div>
    ))}
  </div>
</div>


{/* Sample Visa Copy */}
{country.sampleVisaCopy && (
  <div className="mb-12 text-center">
    <a
      href={country.sampleVisaCopy}
      download
      className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
    >
      Download Sample Visa Copy
    </a>
  </div>
)}

          {/* Application Process */}
<div className="mb-12">
  <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-left">
    How to Apply for a Visa
  </h2>
  <div className="relative">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-8">
      {country.applyProcess.map((step, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center bg-white border border-gray-200 px-3 py-5 rounded-lg  transition-transform transform hover:-translate-y-0"
        >
          {/* Step Icon */}
          <div className="relative w-16 h-16 mb-6 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-full shadow-md">
            <img
              src={step.icon}
              alt={step.title}
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Step Title */}
          <h4 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h4>

          {/* Step Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {step.description}
          </p>

          {/* Step Badge */}
          <div className="absolute -top-3 -left-3 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold shadow-md">
            {step.step}
          </div>
        </div>
      ))}
    </div>

    {/* Connector Line */}
    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 z-[-1] transform -translate-y-1/2"></div>
  </div>
</div>


           {/* FAQs */}
<div className="mb-12">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6">FAQs</h2>
  <div className="space-y-4">
    {country.faqs.map((faq, index) => (
      <div key={index} className="border-b border-gray-300 pb-4">
        <button
          type="button"
          className="flex justify-between items-center w-full text-left text-gray-800 font-medium py-3"
          onClick={() =>
            setExpandedFaqIndex(
              expandedFaqIndex === index ? null : index
            )
          }
        >
          <span>{faq.question}</span>
          {expandedFaqIndex === index ? (
            <AiOutlineMinus className="text-blue-500" />
          ) : (
            <AiOutlinePlus className="text-blue-500" />
          )}
        </button>
        <AnimatePresence>
          {expandedFaqIndex === index && (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ))}
  </div>
</div>
{/* Why Choose Us */}
<div className="mb-12">
  <h2 className="text-3xl font-semibold text-gray-800 text-left mb-8">
    Why Choose <span className="">JM Visa?</span>
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-8">
    {[
      {
        icon: <BiWorld className="text-6xl" />,
        title: "Global Visa Services",
        description: "Covering 200+ countries worldwide with ease.",
      },
      {
        icon: <AiOutlineFieldTime className="text-6xl" />,
        title: "40+ Years of Experience",
        description: "Expertise you can trust in visa processing.",
      },
      {
        icon: <BiBuildingHouse className="text-6xl" />,
        title: "150+ Branches Worldwide",
        description: "Our vast network supports your travel needs.",
      },
      {
        icon: <BiSupport className="text-6xl" />,
        title: "24/7 Visa Assistance",
        description: "Get round-the-clock support from our experts.",
      },
    ].map((item, index) => (
      <div
        key={index}
        className="group relative flex flex-col items-center text-center p-6 bg-white bg-opacity-50 rounded-md border transition-all duration-300"
      >
        {/* Icon */}
        <div className="text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-300">
          {item.icon}
        </div>
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
        {/* Description */}
        <p className="text-sm text-gray-600">{item.description}</p>
        {/* Hover Animation */}
        <div className="absolute inset-0 z-[-1] bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
    ))}
  </div>
</div>



          </div>

          {/* Sticky Contact Form */}
          <aside className="lg:w-1/3 w-full">
            <div className="sticky top-[90px] bg-white bg-opacity-30 border border-white/20 backdrop-blur-lg p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <BiMessageDetail className="text-blue-500" /> Get in Touch
              </h3>
              <form>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-transform"
                >
                  Submit
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CountryDetails;
