"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TermsAndConditionsPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [hideButton, setHideButton] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHideButton(true);
    setIsLoading(true);
    setPopupMessage("Submitting...");

    try {
      const response = await fetch("/api/termsform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setPopupMessage("Form submitted successfully!");
        // Close the popup after 2 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 600);
      } else {
        setPopupMessage("Failed to submit. Please try again.");
        setHideButton(false);
      }
    } catch (error) {
      setPopupMessage("Error occurred. Please try again.");
      setHideButton(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-72 sm:w-80 lg:w-[400px] mx-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Terms & Conditions</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{ display: hideButton ? "none" : "block" }}
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold transition-all duration-200 transform disabled:bg-blue-300"
                  >
                    {isLoading ? "Submitting..." : "Agree and Submit"}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center text-gray-600 text-sm">
                <p>{popupMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TermsAndConditionsPopup;
