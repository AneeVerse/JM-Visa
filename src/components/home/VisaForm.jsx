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
    <div className="bg-white p-8 sm:p-10 max-w-4xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Visa Application Form
      </h2>
      <p className="text-center text-gray-500 mb-10">
        Fill out the details below to check visa requirements for your travel.
      </p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Citizen */}
        <div className="flex flex-col">
          <label htmlFor="citizen" className="font-semibold text-gray-700 mb-2">
            I&apos;m a Citizen Of
          </label>
          <select
            id="citizen"
            name="citizen"
            value={formData.citizen}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-accent hover:shadow-md transition"
          >
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        {/* Travelling To */}
        <div className="flex flex-col">
          <label htmlFor="travellingTo" className="font-semibold text-gray-700 mb-2">
            Travelling To
          </label>
          <select
            id="travellingTo"
            name="travellingTo"
            value={formData.travellingTo}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-accent hover:shadow-md transition"
          >
            <option value="">Select Country</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="font-semibold text-gray-700 mb-2">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-accent hover:shadow-md transition"
          >
            <option value="Travel">Travel</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
          </select>
        </div>

        {/* First Name */}
        <div className="flex flex-col sm:col-span-1">
          <label htmlFor="firstName" className="font-semibold text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter here"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-accent hover:shadow-md transition"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col sm:col-span-1">
          <label htmlFor="email" className="font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter here"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-accent hover:shadow-md transition"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col sm:col-span-1">
          <label htmlFor="phoneNumber" className="font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter here"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-accent hover:shadow-md transition"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between sm:col-span-3 mt-6">
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-accent hover:text-primary transition duration-300 shadow-lg font-semibold"
          >
            Check Requirements
          </button>
          <img
            src="/logo/logo.webp" // Replace with your icon path
            alt="Paper Plane"
            className="w-12 h-12"
          />
        </div>
      </form>
    </div>
  );
};

export default VisaForm;
