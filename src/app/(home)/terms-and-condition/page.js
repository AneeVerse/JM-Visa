"use client";

import TermsAndConditionsPopup from "@/components/TandC/TermsAndConditionsPopup";
import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="bg-gradient-to-br mt-[60px] from-blue-50 via-white to-blue-100 py-16 px-4 sm:px-12">
      <div className="container mx-auto max-w-4xl">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md">
            📜 Terms and Conditions
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mt-4">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            These terms govern the use of our website and services. Please read
            them carefully.
          </p>
        </div>

        {/* Content Section */}
        <div className=" p-4 sm:p-8">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to JM Visa Services! By accessing or using our website and
              services, you agree to comply with and be bound by these Terms and
              Conditions. If you disagree with any part of these terms, you
              should not use our services.
            </p>
          </section>

          {/* Eligibility */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Eligibility
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You must be at least 18 years of age to use our services. By using
              our services, you warrant that you meet this age requirement and
              have the legal authority to enter into a binding agreement.
            </p>
          </section>

          {/* Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Services</h2>
            <p className="text-gray-600 leading-relaxed">
              JM Visa Services offers visa consultancy and related services. Our services
              include, but are not limited to, providing information, assisting
              with documentation, and submitting applications. We do not have
              control over the approval process conducted by government
              authorities.
            </p>
          </section>

          {/* User Responsibilities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. User Responsibilities
            </h2>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
              <li>
                Provide accurate and complete information required for visa
                processing.
              </li>
              <li>
                Comply with the laws and regulations of your destination
                country.
              </li>
              <li>
                Refrain from using our services for any illegal or unauthorized
                purpose.
              </li>
              <li>
                Promptly notify us of any changes to your information or
                circumstances.
              </li>
            </ul>
          </section>

          {/* Fees and Payments */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Fees and Payments
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are subject to applicable fees, which will be
              communicated to you before proceeding. All payments must be made
              in advance, and fees are non-refundable unless stated otherwise.
            </p>
          </section>

          {/* Disclaimer of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Disclaimer of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              JM Visa Services provides services based on the information you provide. We
              are not liable for:
            </p>
            <ul className="list-disc list-inside text-gray-600 leading-relaxed">
              <li>
                Delays, rejections, or errors caused by government authorities.
              </li>
              <li>
                Inaccurate information or incomplete documentation provided by
                you.
              </li>
              <li>Third-party services or websites linked from our platform.</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content, including text, images, and logos, on our website is
              the property of JM Visa Services. You may not reproduce, distribute, or
              modify any part of our content without prior written consent.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              8. Termination
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to terminate or suspend your access to our
              services at any time, without prior notice, if you breach these
              Terms and Conditions.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              9. Governing Law
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms and Conditions are governed by and construed in
              accordance with the laws of [Your Country/State]. Any disputes
              arising from these terms will be resolved in the courts of [Your
              Jurisdiction].
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              10. Changes to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              JM Visa Services reserves the right to modify these Terms and Conditions at
              any time. Updates will be posted on our website, and continued use
              of our services constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              11. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For any questions regarding these Terms and Conditions, you can
              reach us at:
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
      <TermsAndConditionsPopup/>
    </section>
  );
};

export default TermsAndConditions;
