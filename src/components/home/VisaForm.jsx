"use client";
import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const VisaForm = () => {
  const [formData, setFormData] = useState({
    citizen: "India",
    travellingTo: "",
    category: "Travel",
    firstName: "",
    email: "",
    phoneNumber: "",
    otherCitizen: "",
    otherTravellingTo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required.";
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Phone number must be 10 digits.";
    if (!formData.travellingTo) newErrors.travellingTo = "Please select a destination country.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPopup({ show: false });
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/visa-form", formData);

      if (response.data.success) {
        setPopup({ show: true, message: "Form submitted successfully!", success: true });
        setFormData({
          citizen: "India",
          travellingTo: "",
          category: "Travel",
          firstName: "",
          email: "",
          phoneNumber: "",
          otherCitizen: "",
          otherTravellingTo: "",
        });
      } else {
        setPopup({ show: true, message: "Submission failed. Try again!", success: false });
      }
    } catch (error) {
      console.error(error);
      setPopup({ show: true, message: "Server error! Please try later.", success: false });
    } finally {
      setIsLoading(false);
      setTimeout(() => setPopup({ show: false }), 5000); // Hide popup after 5 seconds
    }
  };

  return (
    <div className="relative py-16 px-3 sm:px-6">
      {/* Success/Error Popup */}
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

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Form Section */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl py-8 px-4 sm:px-8 shadow-lg">
          {/* Heading */}
          <h2 className="text-4xl font-bold text-center text-white mb-6">
            Visa Application Form
          </h2>
          <p className="text-center text-white/80 mb-10">
            Fill out the details below to check visa requirements for your travel.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Citizen */}
            <div className="flex flex-col">
              <label className="text-white mb-2">I'm a Citizen Of</label>
              <select
                name="citizen"
                value={formData.citizen}
                onChange={handleChange}
                className="bg-white/20 text-gray-800 border border-gray-300 rounded-lg p-3"
              >
                <option value="India">India</option>
                <option value="USA">Australia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Ireland">Ireland</option>
                <option value="Austria">Austria</option>
                <option value="Belgium">Belgium</option>
                <option value="Croatia">Croatia</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Estonia">Estonia</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Greece">Greece</option>
                <option value="other">other</option>
              </select>
              {formData.citizen === "other" && (
                <input
                  type="text"
                  name="otherCitizen"
                  value={formData.otherCitizen}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="mt-3 bg-white/20 text-gray-800 border border-gray-300 rounded-lg p-3"
                />
              )}
              {errors.citizen && <p className="text-red-500 text-sm">{errors.citizen}</p>}
            </div>

            {/* Travelling To */}
            <div className="flex flex-col">
              <label className="text-white mb-2">Travelling To</label>
              <select
                name="travellingTo"
                value={formData.travellingTo}
                onChange={handleChange}
                className="bg-white/20 text-gray-800 border border-gray-300 rounded-lg p-3"
              >
                <option value="">Select Country</option>
                <option value="USA">Australia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="UK">UK</option>
                <option value="Ireland">Ireland</option>
                <option value="Austria">Austria</option>
                <option value="Belgium">Belgium</option>
                <option value="Croatia">Croatia</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Denmark">Denmark</option>
                <option value="Estonia">Estonia</option>
                <option value="Finland">Finland</option>
                <option value="France">France</option>
                <option value="Georgia">Georgia</option>
                <option value="Germany">Germany</option>
                <option value="Greece">Greece</option>
                <option value="India">India</option>
                <option value="other">other</option>
              </select>
              {formData.travellingTo === "other" && (
                <input
                  type="text"
                  name="otherTravellingTo"
                  value={formData.otherTravellingTo}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="mt-3 bg-white/20 text-gray-800 border border-gray-300 rounded-lg p-3"
                />
              )}
              {errors.travellingTo && <p className="text-red-500 text-sm">{errors.travellingTo}</p>}
            </div>

            {/* Category */}
            <div className="flex flex-col">
              <label className="text-white mb-2">Select Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="bg-white/20 text-gray-800 border border-gray-300 rounded-lg p-3"
              >
                <option value="Travel">Travel</option>
                <option value="Business">Business</option>
              </select>
            </div>

            {/* First Name */}
            <div className="flex flex-col">
              <label className="text-white mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="bg-white/20 border border-gray-300 rounded-lg p-3 placeholder:text-gray-800 text-gray-800"
                placeholder="Enter your name"
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-white mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/20 border border-gray-300 placeholder:text-gray-800 rounded-lg p-3 text-gray-800"
                placeholder="Enter your email"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-white mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="bg-white/20 border border-gray-300 placeholder:text-gray-800 rounded-lg p-3 text-gray-800"
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                {isLoading ? "Submitting..." : "Check Requirements"}
              </button>
            </div>
          </form>
        </div>

        {/* Google Map Section */}
        <div className="relative w-full h-[500px] lg:h-full rounded-3xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4020.27545473824!2d73.006725!3d19.1107866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4f174af374b22233%3A0x39a66841cc7cfdd5!2sJM%20Visa%20Services!5e1!3m2!1sen!2sin!4v1734419571115!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VisaForm;
