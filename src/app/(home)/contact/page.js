"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage("");
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setResponseMessage("Your message has been sent successfully!");
      } else {
        setResponseMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Error connecting to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative mt-[80px] bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-3 sm:px-12">
      {/* Hero Section */}
      <motion.div
        className="container mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <div className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md">
          ✈️ Get in Touch
        </div>
        <h1 className="mt-4 text-4xl font-bold text-gray-800">
          Contact JM Visa
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Have questions or need assistance? Our team is here to help you with
          all your visa-related inquiries.
        </p>
      </motion.div>

      {/* Contact Form & Info */}
      <div className="container mx-auto mt-16 flex flex-col lg:flex-row gap-12">
        {/* Left Section - Contact Form */}
        <motion.div
          className="lg:w-1/2 bg-white/30 border border-white/20 backdrop-blur-lg rounded-3xl shadow-xl py-8 px-5 sm:px-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-600">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-3 bg-white/20 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-600">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 bg-white/20 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-gray-600">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-3 bg-white/20 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Write your message here"
                value={formData.message}
                onChange={handleChange}
                className="px-4 py-3 bg-white/20 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`px-6 py-3 text-white font-semibold rounded-lg shadow-lg transition ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
          {responseMessage && (
            <p className="mt-4 text-center text-gray-600">{responseMessage}</p>
          )}
        </motion.div>

        {/* Right Section - Contact Info */}
        <motion.div
          className="lg:w-1/2 bg-white/30 border border-white/20 backdrop-blur-lg rounded-3xl shadow-xl px-5 py-8 flex flex-col gap-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Contact Details</h2>
          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100/50 rounded-full text-blue-500">
                <FiPhone className="text-2xl" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Phone</p>
                <p className="text-gray-600">+1 (123) 456-7890</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100/50 rounded-full text-blue-500">
                <FiMail className="text-2xl" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Email</p>
                <p className="text-gray-600">info@jmvisa.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100/50 rounded-full text-blue-500">
                <FiMapPin className="text-2xl" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">Address</p>
                <p className="text-gray-600">123 Visa St, New York, NY 10001</p>
              </div>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="w-full h-[250px] overflow-hidden rounded-lg shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9167394140747!2d-74.0060156845948!3d40.71277577933001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a31650e2a67%3A0xa8b5cfda52a6b4da!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1637844037736!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUsPage;
