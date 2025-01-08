"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import Link from "next/link";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
    }
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.message) validationErrors.message = "Message is required";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPopup({ show: false });
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setPopup({ show: true, message: "Form submitted successfully!", success: true });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setPopup({ show: true, message: "Failed to send the message. Try again.", success: false });
      }

      // Hide popup after 5 seconds
      setTimeout(() => {
        setPopup({ show: false });
      }, 5000);
    } catch (error) {
      setPopup({ show: true, message: "Server error! Please try later.", success: false });

      // Hide popup after 5 seconds
      setTimeout(() => {
        setPopup({ show: false });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative mt-[80px] bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-4 pb-16 px-3 sm:px-12">
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

      {/* Contact Form & Map */}
      <div className="container mx-auto mt-12 flex flex-col lg:flex-row gap-12">
        {/* Contact Form */}
        <div className="lg:w-1/2 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-blue-500`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-blue-500`}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                rows="4"
                className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-blue-500`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg text-white font-bold ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info & Map */}
        <div className="lg:w-1/2 flex flex-col gap-8">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Information</h2>
            <div className="space-y-6">
              <Link href={"tel:+919321315524"} className="flex items-center gap-4">
                <FiPhone className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-gray-800 font-medium">Phone</p>
                  <p className="text-gray-600">+919321315524 / +918591070718</p>
                </div>
              </Link>
              <Link href={"mailto:info@jmvisaservices.com"} className="flex cursor-pointer items-center gap-4">
                <FiMail className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-gray-800 font-medium">Email</p>
                  <p className="text-gray-600">info@jmvisaservices.com</p>
                </div>
              </Link>
              <div className="flex items-center gap-4">
                <FiMapPin className="text-blue-500 min-w-fit text-3xl" />
                <div>
                  <p className="text-gray-800 font-medium">Address</p>
                  <p className="text-gray-600">Shop No 11, City Light CHS, CBSE School, Plot No.25, near Terna Orchids The International School, Sector 1, Kopar Khairane, Navi Mumbai, Maharashtra 400709</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-[300px] overflow-hidden rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4020.27545473824!2d73.006725!3d19.1107866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4f174af374b22233%3A0x39a66841cc7cfdd5!2sJM%20Visa%20Services!5e1!3m2!1sen!2sin!4v1734419571115!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
