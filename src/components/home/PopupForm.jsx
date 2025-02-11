"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";

const PopupForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responsePopup, setResponsePopup] = useState({ show: false, success: false, message: "" });
  const [isAccepted, setIsAccepted] = useState(false); // State to track checkbox

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000); // Show popup after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted); // Toggle checkbox state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate() || !isAccepted) return; // Check if checkbox is accepted

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/get-touch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setResponsePopup({ show: true, success: true, message: "Form submitted successfully!" });
        setFormData({ name: "", email: "", phone: "" });
        setShowPopup(false);
      } else {
        setResponsePopup({ show: true, success: false, message: "Failed to submit the form." });
      }
    } catch (error) {
      setResponsePopup({ show: true, success: false, message: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setResponsePopup({ show: false, success: false, message: "" });
      }, 3000); // Auto-hide response message after 3 seconds
    }
  };

  return (
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white mx-2 rounded-lg shadow-lg w-full max-w-md p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Get in Touch</h2>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <AiOutlineClose className="text-2xl" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="abhi@aneeverse.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="1234567890"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
                  disabled={isSubmitting || !isAccepted}
                  className={`w-full py-2 px-4 rounded-md text-white font-semibold shadow-md transition ${
                    isSubmitting || !isAccepted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {responsePopup.show && (
          <motion.div
            className={`fixed top-4 right-4 flex items-center gap-4 px-6 py-4 rounded-lg shadow-lg z-50 ${
              responsePopup.success ? "bg-green-500" : "bg-red-500"
            } text-white`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            {responsePopup.success ? (
              <BiCheckCircle className="text-2xl" />
            ) : (
              <BiErrorCircle className="text-2xl" />
            )}
            <span>{responsePopup.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PopupForm;
