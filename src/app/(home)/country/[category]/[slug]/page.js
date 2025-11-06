"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import CountryData from "../../../../../data/CountryData";
import { BiBuildingHouse, BiMessageDetail, BiSupport, BiWorld } from "react-icons/bi";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineFieldTime } from "react-icons/ai";
import { AnimatePresence , motion} from "framer-motion";
import CountryCodeDropdown from "../../../../../components/home/CountryCodeDropdown";

const CountryDetails = () => {
  const params = useParams();
  const {category, slug} = params;
  const router = useRouter();
  const [country, setCountry] = useState(null);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", lastName: "", email: "", phone: "", countryCode: "+91", service: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });
  const [isAccepted, setIsAccepted] = useState(false); // State to track checkbox
    const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryCodeChange = (code) => {
    setFormData({
      ...formData,
      countryCode: code
    });
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
      // Combine country code with phone number
      const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`;
      
      const response = await fetch("/api/get-touch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          phone: fullPhoneNumber,
          other: country.name 
        }),
      });

      const result = await response.json();
      if (result.success) {
        setPopup({ show: true, message: "Form submitted successfully!", success: true });
        setFormData({ name: "", lastName: "", email: "", phone: "", countryCode: "+91", service: "" });
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
  }, [params, router, category, slug]);

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
    Why Choose <span className="">JM Visa Services?</span>
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
        title: "4+ Years of Experience",
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
            <div className="sticky top-[100px] space-y-8">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-auto border border-blue-700/50">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">Get in Touch</h3>
                  <p className="text-blue-200 text-sm">Fill out the form below and our team will contact you shortly</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="First Name"
                      className={`w-full pl-10 pr-4 py-3 bg-blue-700/50 border ${errors.name ? 'border-red-500' : 'border-blue-600/50'} rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-300">{errors.name}</p>
                    )}
                  </div>

                  {/* Last Name Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName || ''}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full pl-10 pr-4 py-3 bg-blue-700/50 border border-blue-600/50 rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={`w-full pl-10 pr-4 py-3 bg-blue-700/50 border ${errors.email ? 'border-red-500' : 'border-blue-600/50'} rounded-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-300">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="flex gap-0">
                    <CountryCodeDropdown
                      value={formData.countryCode}
                      onChange={handleCountryCodeChange}
                      error={errors.phone}
                      height="h-12"
                      bgColor="bg-blue-700/50"
                      borderColor="border-blue-600/50"
                      className="rounded-l-lg"
                    />
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9321315524"
                        className={`w-full pl-10 pr-4 py-3 bg-blue-700/50 border border-l-0 ${errors.phone ? 'border-red-500' : 'border-blue-600/50'} rounded-r-lg text-white placeholder-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200`}
                        required
                      />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-300">{errors.phone}</p>
                  )}

                  {/* Service Selection */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <select
                      id="service"
                      name="service"
                      value={formData.service || ''}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-blue-700/50 border border-blue-600/50 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 appearance-none"
                    >
                      <option value="">Select Service</option>
                      <option value="tourist-visa">Tourist Visa</option>
                      <option value="business-visa">Business Visa</option>
                      <option value="student-visa">Student Visa</option>
                      <option value="work-visa">Work Visa</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div className="flex items-start pt-1">
                    <input
                      type="checkbox"
                      checked={isAccepted}
                      onChange={handleCheckboxChange}
                      className="mt-1 mr-2"
                    />
                    <label className="text-sm text-blue-200">
                      I accept the <a href="/terms-and-condition" className="text-white underline">terms and conditions</a>.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !isAccepted}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                     <div className="flex items-center justify-center">
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                       </svg>
                       Sending...
                     </div>
                   ) : (
                     'Get Started'
                   )}
                 </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </div>
      
    </section>
  );
};

export default CountryDetails;
