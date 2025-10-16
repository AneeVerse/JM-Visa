"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BiMessageDetail } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/client";

const BlogForm = ({ blog, relatedBlogs }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });
  const [isAccepted, setIsAccepted] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
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

    if (!validateForm() || !isAccepted) return;

    setIsLoading(true);
    setPopup({ show: false });

    try {
      const response = await fetch("/api/get-touch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, other: "From Blog Page" }),
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

  return (
    <>
      {/* Popup Message */}
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

      {/* Related Blogs and Contact Form */}
      <aside className="lg:w-1/3 w-full">
        <div className="sticky top-[100px] space-y-8">
          {/* Contact Form */}
          <div className="bg-white bg-opacity-50 rounded-md shadow-sm p-8">
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

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <div className="bg-white bg-opacity-50 rounded-md shadow-sm p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Related Posts
              </h3>
              <div className="space-y-4">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog._id}
                    href={`/blog/${relatedBlog.slug.current}`}
                    className="block group"
                  >
                    <div className="flex gap-4 items-start">
                      {relatedBlog.mainImage && (
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={urlFor(relatedBlog.mainImage).width(80).height(80).url()}
                            alt={relatedBlog.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-500 transition">
                          {relatedBlog.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(relatedBlog.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default BlogForm;
