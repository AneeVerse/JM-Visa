"use client";
import React, { useState } from "react";
import axios from "axios";

const VisaForm = () => {
  const [formData, setFormData] = useState({
    citizen: "India",
    travellingTo: "",
    category: "Travel",
    firstName: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.example.com/visa", formData); // Replace with your API URL
      alert("Form submitted successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Error submitting the form. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 py-16 px-6">
      {/* Glassmorphism Card */}
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-lg">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Visa Application Form
        </h2>
        <p className="text-center text-white/80 mb-10">
          Fill out the details below to check visa requirements for your travel.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Citizen */}
          <div className="flex flex-col">
            <label htmlFor="citizen" className="font-semibold text-white mb-2">
              I&apos;m a Citizen Of
            </label>
            <select
              id="citizen"
              name="citizen"
              value={formData.citizen}
              onChange={handleChange}
              className="bg-white/20 text-white border border-white/30 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 placeholder-white shadow-md transition"
            >
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          {/* Travelling To */}
          <div className="flex flex-col">
            <label
              htmlFor="travellingTo"
              className="font-semibold text-white mb-2"
            >
              Travelling To
            </label>
            <select
              id="travellingTo"
              name="travellingTo"
              value={formData.travellingTo}
              onChange={handleChange}
              className="bg-white/20 text-white border border-white/30 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 placeholder-white shadow-md transition"
            >
              <option value="">Select Country</option>
              <option value="Canada">Canada</option>
              <option value="Germany">Germany</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label htmlFor="category" className="font-semibold text-white mb-2">
              Select Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-white/20 text-white border border-white/30 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 placeholder-white shadow-md transition"
            >
              <option value="Travel">Travel</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* First Name */}
          <div className="flex flex-col">
            <label
              htmlFor="firstName"
              className="font-semibold text-white mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your name"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-white/20 text-white border border-white/30 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 placeholder-white shadow-md transition"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white/20 text-white border border-white/30 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 placeholder-white shadow-md transition"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="font-semibold text-white mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-white/20 text-white border border-white/30 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 placeholder-white shadow-md transition"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition"
            >
              Check Requirements
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisaForm;
