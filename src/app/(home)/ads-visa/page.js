"use client";
import { useCallback } from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaWhatsapp, FaPlane, FaUserTie, FaGlobe, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AdsVisaHero from '../../../components/adsVisa/AdsVisaHero';
import CountryCardsSection from '../../../components/adsVisa/CountryCardsSection';
import FeedbackReviewComponent from '../../../components/home/FeedbackReviewComponent';
import VisitorTracker from '../../../components/common/VisitorTracker';

const AdsVisaPage = () => {
  const scrollToCountryCards = useCallback(() => {
    const countrySection = document.getElementById('country-cards-section');
    if (countrySection) {
      countrySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Background Geo & Visitor Tracking */}
      <VisitorTracker />

      {/* Hero Section */}
      <AdsVisaHero onBookingClick={scrollToCountryCards} />

      {/* Feature Cards Section */}
      <div className="relative z-30 bg-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Why Choose <span className="text-blue-600">JM Visa Services?</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Transparent, professional guidance for visa applicants with step-by-step assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <FaUserTie className="text-blue-600 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-gray-900 mb-2">Expert Advisors</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Experienced consultants providing clear, step-by-step guidance tailored to your travel category.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <FaGlobe className="text-green-600 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-gray-900 mb-2">100+ Countries</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Consultation support for UK, USA, Schengen Europe, Canada, Australia, and worldwide destinations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <FaClock className="text-purple-600 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-gray-900 mb-2">Fast Turnaround</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Prompt document verification and timely processing to prevent delays in your application.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <FaWhatsapp className="text-green-500 text-3xl mb-4 mx-auto" />
              <h4 className="font-semibold text-gray-900 mb-2">WhatsApp Support</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dedicated WhatsApp support for fast answers and real-time updates on your consultation.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Popular Country Cards Section */}
      <CountryCardsSection />

      {/* Real JM Visa Feedback & Reviews Component */}
      <FeedbackReviewComponent />

      {/* About Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Story</h2>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 sm:p-10 border border-blue-100 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                  Visa applications feel stressful because requirements vary and small mistakes can cause delays. We built JM Visa to simplify the journey with clear guidance, practical checklists, and responsive support.
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  If you&apos;re unsure what applies to your case, we help you understand the process and prepare with confidence without overpromising results.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 flex flex-col items-center justify-center text-white text-center min-h-[220px] shadow-lg">
                <Image
                  src="/logo/logo.png"
                  alt="JM Visa Logo"
                  width={90}
                  height={90}
                  className="mb-3 object-contain bg-white/10 rounded-2xl p-2"
                />
                <h3 className="text-2xl font-bold">JM Visa Services</h3>
                <p className="text-blue-100 text-sm mt-1">Your Trusted Visa Consultation Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Help / Need Help Choosing Banner - Exact Easy Visa Styling */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[50px] mb-12 sm:mb-16">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-2xl">
          {/* Background Decorative Bubble Patterns */}
          <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full opacity-50"></div>
          </div>

          <div className="relative z-10 p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Left Content */}
              <div className="flex-1 text-white w-full lg:w-auto">
                <div className="mb-4">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-center lg:text-left">
                    Need Help Choosing?
                  </h3>
                  <p className="text-blue-100 text-sm sm:text-base lg:text-lg leading-relaxed text-center lg:text-left max-w-2xl">
                    Our consultants can help you pick the right visa type and next steps based on your destination and purpose of travel.
                  </p>
                </div>

                <div className="mb-5 text-center lg:text-left">
                  <p className="text-white font-semibold text-sm sm:text-base mb-1">Get In Touch</p>
                  <p className="text-blue-100 text-xs sm:text-sm">
                    Email: info@jmvisaservices.com &amp; Phone: +91 9321315524 / +91 8591070718
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href="https://wa.me/919321315524"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base min-w-[140px]"
                  >
                    <FaWhatsapp className="mr-2 text-green-600 text-lg" />
                    Chat with us
                  </a>
                  <a
                    href="tel:+919321315524"
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 border-2 border-white shadow-lg hover:shadow-xl text-sm sm:text-base min-w-[140px]"
                  >
                    <FaPhoneAlt className="mr-2" />
                    Call Support
                  </a>
                </div>
              </div>

              {/* Right Airplane Floating Badge */}
              <div className="hidden lg:flex flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 xl:w-24 xl:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <FaPlane className="text-blue-600 text-3xl xl:text-4xl transform rotate-12" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full opacity-80"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-white rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 -right-3 w-2 h-2 bg-white rounded-full opacity-40"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsVisaPage;
