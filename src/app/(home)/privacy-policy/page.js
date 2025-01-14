"use client";

import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-gradient-to-br mt-[60px] from-blue-50 via-white to-blue-100 py-16 px-4 sm:px-12">
      <div className="container mx-auto max-w-4xl">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md">
            🔒 Your Privacy Matters
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mt-4">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Learn how JM Visa  Services collects, uses, and protects your personal data.
          </p>
        </div>

        {/* Content Section */}
        <div className="rounded-lg p-4 sm:p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At  , we value your trust and are committed to safeguarding
              your personal information. This Privacy Policy outlines how we
              collect, use, and protect your data.
            </p>
          </section>

          {/* Information Collection */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
              <li>
                <strong>Personal Details:</strong> Name, contact information,
                and identification details.
              </li>
              <li>
                <strong>Travel Information:</strong> Passport details, travel
                history, and visa-related data.
              </li>
              <li>
                <strong>Online Activity:</strong> How you interact with our
                website and services.
              </li>
            </ul>
          </section>

          {/* Use of Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The data we collect helps us:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
              <li>Provide seamless visa application services.</li>
              <li>Enhance your experience on our website.</li>
              <li>Send notifications and promotional updates.</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We never sell your data. However, we may share your information
              with:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
              <li>
                <strong>Trusted Partners:</strong> Third-party service
                providers for visa processing.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or
                government regulations.
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Your Rights
            </h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
              <li>Access the personal data we hold about you.</li>
              <li>Request corrections or updates to your data.</li>
              <li>Opt out of marketing communications at any time.</li>
              <li>Request deletion of your personal information.</li>
            </ul>
          </section>

          {/* Security Measures */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We take strict measures to protect your data using advanced
              security protocols. However, we recommend you also take steps to
              safeguard your sensitive information.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              7. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For any privacy-related questions, reach out to us:
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@jmvisa.com"
                className="text-blue-500 hover:underline"
              >
                support@jmvisa.com
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-blue-500 hover:underline"
              >
                +1 234-567-890
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> JM Visa Services, 123 Travel Lane,
              Cityville, Country
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
