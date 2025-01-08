"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CountryData from "@/data/CountryData";
import { BiBuildingHouse, BiMessageDetail, BiSupport, BiWorld } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineFieldTime } from "react-icons/ai";
import { AnimatePresence , motion} from "framer-motion";

const CountryDetails = () => {
  const params = useParams();
  const {category, slug} = params;
  const router = useRouter();
  const [country, setCountry] = useState(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });
  const [isAccepted, setIsAccepted] = useState(false); // State to track checkbox
    const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted); // Toggle checkbox state
  };


  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !isAccepted) return; // Prevent submission if validation fails

    setIsLoading(true);
    setPopup({ show: false });

    try {
      const response = await fetch("/api/get-touch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, other: country.name }),
      });

      const result = await response.json();
      if (result.success) {
        setPopup({ show: true, message: "Form submitted successfully!", success: true });
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setPopup({ show: true, message: "Failed to send the message. Try again.", success: false });
      }

      setTimeout(() => {
        setPopup({ show: false });
      }, 5000);
    } catch (error) {
      setPopup({ show: true, message: "Server error! Please try later.", success: false });
      setTimeout(() => {
        setPopup({ show: false });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!category || !slug) return;
    console.log(category, slug);


    const foundCountry = CountryData[category]?.find(
      (c) =>
        c.name.toLowerCase().replace(" ", "") ===
        slug.toLowerCase().replace("%20", "")
    );

    if (!foundCountry) {
      router.push(`/country`);
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
       <AnimatePresence>
              {popup.show && (
                <motion.div
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100%", opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 text-white ${
                    popup.success ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {popup.message}
                </motion.div>
              )}
            </AnimatePresence>
            
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
              <form onSubmit={handleSubmit}>
              <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`mt-2 p-3 w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={`mt-2 p-3 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number"
                    className={`mt-2 p-3 w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                 {/* Terms and Conditions Checkbox */}
                 <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={isAccepted}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">
                    I accept the <a href="/terms-and-condition" className="text-blue-500">terms and conditions</a>.
                  </label>
                </div>

                <button
                  type="submit"
                  className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md ${
                    isLoading || !isAccepted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  disabled={isLoading || !isAccepted}
                >
                  {isLoading ? "Sending..." : "Submit"}
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
