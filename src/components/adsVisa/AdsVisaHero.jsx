"use client";
import { motion } from 'framer-motion';
import FormComponent from '../common/FormComponent';

const AdsVisaHero = ({ onBookingClick }) => {
  const handleHeroCta = () => {
    if (onBookingClick) {
      onBookingClick();
    }
  };

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] flex items-center bg-gradient-to-r from-purple-100/80 via-blue-50 to-indigo-100/70 pt-[100px] sm:pt-[110px] lg:pt-[115px] pb-14 sm:pb-16 lg:pb-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 xl:px-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col space-y-6 sm:space-y-7 lg:col-span-7 text-center lg:text-left"
          >
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-black text-gray-900 leading-[1.15] tracking-tight">
              <span className="text-blue-600">Expert Visa Consultants</span> for UK, US, Schengen & Australia
            </h1>

            {/* Subheading text */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Get visa consultation for tourist and business travel to the UK, US, Schengen (Europe) and Australia with a simple, step-by-step process and fast WhatsApp support whenever you need clarity. We&apos;re an independent consultancy (not a government website), and we don&apos;t promise approvals; final decisions are always made by the relevant authorities.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start text-xs sm:text-sm text-gray-700 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>WhatsApp Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>10+ Years Experience</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Multi‑Country Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-3 w-full max-w-lg sm:max-w-none mx-auto lg:mx-0">
              <button
                onClick={handleHeroCta}
                className="flex-1 sm:flex-none w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl font-bold text-sm sm:text-base text-center"
              >
                Get Free Consultation
              </button>
              <button
                onClick={handleHeroCta}
                className="flex-1 sm:flex-none w-full sm:w-auto bg-white text-blue-600 border-2 border-blue-600 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full hover:bg-blue-50 transition-all shadow-md hover:shadow-lg font-bold text-sm sm:text-base text-center"
              >
                View Visa Options
              </button>
            </div>
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md">
              <FormComponent redirectPath="/ads-visa-thankyou" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdsVisaHero;
