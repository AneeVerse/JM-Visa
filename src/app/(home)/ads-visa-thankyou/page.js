"use client";

import { useEffect } from 'react';
import { FaCheckCircle, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import Link from 'next/link';

export default function AdsVisaThankYouPage() {
  useEffect(() => {
    document.title = 'Thank You | JM Visa - Visa Consultation Confirmation';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 shadow-md">
          <FaCheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Thank You for Your Consultation Request!
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Our JM Visa experts will assist you with your visa requirements.
        </p>
        
        <div className="mt-4 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          Service: Visa Consultation
        </div>

        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 mt-10">
          <div className="p-8 sm:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {/* What to Expect Card */}
              <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100">
                <FaClock className="h-7 w-7 text-blue-600 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">What to Expect</h3>
                <p className="text-sm text-gray-600">
                  Our visa advisor will call you within 30 minutes to discuss your requirements.
                </p>
              </div>

              {/* Call Support Card */}
              <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100">
                <FaPhone className="h-7 w-7 text-blue-600 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">Direct Phone Support</h3>
                <p className="text-sm text-gray-600">
                  Call us at:<br />
                  <Link href="tel:+919321315524" className="font-semibold text-blue-600 hover:text-blue-800">
                    +91 9321315524
                  </Link>
                  <br />
                  <Link href="tel:+918591070718" className="font-semibold text-blue-600 hover:text-blue-800">
                    +91 8591070718
                  </Link>
                </p>
              </div>

              {/* Email Card */}
              <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100">
                <FaEnvelope className="h-7 w-7 text-blue-600 mb-3" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">Email Support</h3>
                <p className="text-sm text-gray-600">
                  Write to us at:<br />
                  <Link href="mailto:info@jmvisaservices.com" className="font-semibold text-blue-600 hover:text-blue-800">
                    info@jmvisaservices.com
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/"
                className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
