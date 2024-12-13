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
                    className="bg-white/30 border border-white/20 backdrop-blur-lg p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {visa.type}
                    </h3>
                    <ul className="space-y-2 text-gray-600">
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
              {country.documentsRequired.map((doc, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {doc.category}
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {doc.documents.map((item, docIndex) => (
                      <li key={docIndex}>{item}</li>
                    ))}
                  </ul>
                  {doc.note && (
                    <p className="mt-4 text-sm text-gray-500">{doc.note}</p>
                  )}
                </div>
              ))}
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
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                How to Apply for a Visa
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                {country.applyProcess.map((step, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center bg-white/30 border border-white/20 backdrop-blur-lg p-6 rounded-lg shadow-md"
                  >
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-12 h-12 mb-4"
                    />
                    <h4 className="text-lg font-semibold text-gray-800">
                      Step {step.step}
                    </h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
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
<div className="mb-12 text-center">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6">
    Why choose us? Because we are Awesome!
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    <div className="flex flex-col items-center text-center">
      <BiWorld className="text-5xl text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">
        Visa Services for all Countries
      </h3>
    </div>
    <div className="flex flex-col items-center text-center">
      <AiOutlineFieldTime className="text-5xl text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">
        40 years of experience in Visa processing
      </h3>
    </div>
    <div className="flex flex-col items-center text-center">
      <BiBuildingHouse className="text-5xl text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">
        150+ Branches Worldwide
      </h3>
    </div>
    <div className="flex flex-col items-center text-center">
      <BiSupport className="text-5xl text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-800">
        End-to-End Visa Assistance
      </h3>
    </div>
  </div>
</div>


          </div>

          {/* Sticky Contact Form */}
          <aside className="lg:w-1/3 w-full">
            <div className="sticky top-[90px] bg-white bg-opacity-30 border border-white/20 backdrop-blur-lg p-8 rounded-lg shadow-lg">
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
