"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiMessageDetail } from "react-icons/bi";
import Footer from "../../components/layout/Footer";

const Franchise = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const franchiseContent = {
        stats: [
            { number: "50+", label: "Successful Franchises" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "Support System" },
            { number: "5", label: "Continents Covered" },
        ],
        benefits: [
            "Established brand reputation and marketing support",
            "Comprehensive training & operational support",
            "Exclusive territory rights",
            "Ongoing technical assistance",
            "Access to proprietary software systems",
        ],
        requirements: [
            "Minimum 1500 sq.ft commercial space in prime location",
            "2+ years of business management experience",
            "Initial investment of ₹20-25 lakhs",
            "Strong local network and market understanding",
            "Commitment to service excellence",
        ],
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            newErrors.email = "Valid email required";
        if (!/^\d{10}$/.test(formData.phone))
            newErrors.phone = "Valid 10-digit number required";
        if (!formData.experience.trim())
            newErrors.experience = "Please describe your experience";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/send-franchise-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setFormData({ name: "", email: "", phone: "", experience: "" });
                setSubmitStatus({ type: "success", message: result.message });
            } else {
                setSubmitStatus({ type: "error", message: result.error });
            }
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: "Network error. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow mt-[60px] bg-gradient-to-br from-blue-50 via-white to-blue-100">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-bold text-gray-800"
                        >
                            Become a JM Visa Franchise Partner
                        </motion.h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Join India&apos;s most trusted visa service network and build a
                            successful business with our proven franchise model
                        </p>
                        <a
                            href="#enquiry-form"
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Apply Now
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="grid max-w-7xl mx-auto grid-cols-2 mt-12 md:grid-cols-4 gap-4">
                        {franchiseContent.stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-xl text-center shadow-sm"
                            >
                                <div className="text-2xl font-bold text-blue-600">
                                    {stat.number}
                                </div>
                                <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Main Content */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Left Content */}
                        <div className="lg:col-span-3 space-y-12">
                            {/* Benefits */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm"
                            >
                                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                                    Why Choose Us?
                                </h2>
                                <ul className="space-y-4">
                                    {franchiseContent.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-1 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                                <svg
                                                    className="w-4 h-4 text-green-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="text-gray-600">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Requirements */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white p-8 rounded-2xl shadow-sm"
                            >
                                <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                                    Requirements
                                </h2>
                                <ul className="space-y-4">
                                    {franchiseContent.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 mt-1 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600">•</span>
                                            </div>
                                            <span className="text-gray-600">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Right Form */}
                        <div id="enquiry-form" className="lg:col-span-2 pt-12 lg:pt-0">
                            <div className="sticky top-24 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                    <BiMessageDetail className="text-blue-500 text-xl" />
                                    Franchise Application
                                </h2>

                                {submitStatus && (
                                    <div
                                        className={`mb-6 p-4 rounded-lg ${submitStatus.type === "success"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        {submitStatus.message}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"
                                                } focus:ring-2 focus:ring-blue-500 transition-all`}
                                            placeholder="John Doe"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
                                                    } focus:ring-2 focus:ring-blue-500 transition-all`}
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, phone: e.target.value })
                                                }
                                                className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"
                                                    } focus:ring-2 focus:ring-blue-500 transition-all`}
                                                placeholder="9876543210"
                                            />
                                            {errors.phone && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Business Experience
                                        </label>
                                        <textarea
                                            name="experience"
                                            value={formData.experience}
                                            onChange={(e) =>
                                                setFormData({ ...formData, experience: e.target.value })
                                            }
                                            rows="4"
                                            className={`w-full px-4 py-3 rounded-lg border ${errors.experience ? "border-red-500" : "border-gray-300"
                                                } focus:ring-2 focus:ring-blue-500 transition-all`}
                                            placeholder="Describe your relevant business experience..."
                                        ></textarea>
                                        {errors.experience && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.experience}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg transition-all ${isSubmitting
                                                ? "opacity-75 cursor-not-allowed"
                                                : "hover:from-blue-700 hover:to-blue-600 hover:shadow-lg"
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <svg
                                                    className="animate-spin h-5 w-5 mr-3"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Submitting...
                                            </span>
                                        ) : (
                                            "Apply Now"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact & Map Section */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
                            <h2 className="text-3xl font-semibold text-gray-800">
                                Contact Details
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600">📌</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Head Office</h3>
                                        <p className="text-gray-600 max-w-[350px] mt-1">
                                            Shop No 11, City Light CHS, CBSE School, Plot No.25, near Terna Orchids The International School, Sector 1, Kopar Khairane, Navi Mumbai, Maharashtra 400709
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600">📞</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Contact</h3>
                                        <div className="text-gray-600 space-y-1 mt-1">
                                           <p> +91 9321315524</p>
                                           <p>  +91 8591070718</p>
                                           <p>
                                           info@jmvisaservices.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm h-full">
                            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                                Our Location
                            </h2>
                            <div className="aspect-video rounded-xl overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4020.27545473824!2d73.006725!3d19.1107866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4f174af374b22233%3A0x39a66841cc7cfdd5!2sJM%20Visa%20Services!5e1!3m2!1sen!2sin!4v1734419571115!5m2!1sen!2sin"
                                    className="w-full h-full"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
                <Footer />
            </div>
        </div>
    );
};

export default Franchise;