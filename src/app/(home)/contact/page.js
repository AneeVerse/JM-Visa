"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPopup({ show: false });
  
    try {
      const response = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (result.success) {
        setPopup({ show: true, message: "Your message has been sent successfully!", success: true });
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 rounded-lg text-white font-bold ${
                isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
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
              <div className="flex items-center gap-4">
                <FiPhone className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-gray-800 font-medium">Phone</p>
                  <p className="text-gray-600">+1 (123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FiMail className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-gray-800 font-medium">Email</p>
                  <p className="text-gray-600">info@jmvisa.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FiMapPin className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-gray-800 font-medium">Address</p>
                  <p className="text-gray-600">123 Visa Street, New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-[300px] overflow-hidden rounded-lg shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9167394140747!2d-74.0060156845948!3d40.71277577933001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a31650e2a67%3A0xa8b5cfda52a6b4da!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1637844037736!5m2!1sen!2sin"
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
