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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dear Applicant,</h2>
            <p className="text-gray-600 leading-relaxed">
              Thank you for choosing JM Visa Services for your visa assistance. We value your trust and are committed to providing professional guidance throughout the visa application process. Kindly review the following terms and conditions carefully:
            </p>
          </section>

          {/* No Guarantee of Visa Approval */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. No Guarantee of Visa Approval</h2>
            <p className="text-gray-600 leading-relaxed">
              JM Visa Services provides professional visa guidance and application assistance but does not guarantee visa approval. The decision is solely made by the respective embassy/consulate.
            </p>
          </section>

          {/* Accuracy of Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Accuracy of Information</h2>
            <p className="text-gray-600 leading-relaxed">
              It is your responsibility to ensure that all information and documents provided are accurate and complete. JM Visa Services is not liable for any visa rejection due to false, misleading, or incomplete information provided.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              JM Visa Services will not be held responsible for any visa rejection, processing delays, or travel disruptions resulting from decisions made by the embassy/consulate.
            </p>
          </section>

          {/* Non-Refundable Payments */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Non-Refundable Payments</h2>
            <p className="text-gray-600 leading-relaxed">
              All payments made to the embassy and JM Visa Services are strictly non-refundable, regardless of the outcome of the visa application.
            </p>
          </section>

          {/* Additional Terms and Conditions */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Terms and Conditions:</h2>
            <ul className="list-disc ml-4 text-gray-600 leading-relaxed space-y-2">
              <li className="ml-1 [&>*]:ml-[-1.25rem]">This is a basic document list; the Embassy reserves the right to request additional documents after submission. These must be provided for further processing.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">Confirmed air tickets and hotel bookings are not mandatory for the visa process.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">JM Visa Services is not responsible for the cost of confirmed air tickets and hotel bookings purchased before or during the visa process and decision.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">We cannot influence visa decisions or processing times in any manner.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">Visa fees are non-refundable once paid to the authorities under any circumstances.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">JM Visa Services charges and air ticket blocking charges are non-refundable once the application is submitted, regardless of the circumstances.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">We do not have any influence over visa processing and decision-making processes.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">We cannot expedite the visa process once an application is submitted.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">All communications will be conducted via our company landline and email address only.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">Document exchange will occur via email only.</li>
              <li className="ml-1 [&>*]:ml-[-1.25rem]">Documents in regional languages must be duly translated into English.</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              For any questions regarding these Terms and Conditions, you can
              reach us at:
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@jmvisaservices.com"
                className="text-blue-500 hover:underline"
              >
                info@jmvisaservices.com
              </a>
            </p>
            <p className="text-gray-600 flex gap-1 items-center flex-wrap">
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+919321315524"
                className="text-blue-500 hover:underline"
              >
                +91 9321315524
              </a>

              <a
                href="tel:+918591070718"
                className="text-blue-500 hover:underline"
              >
                +91 8591070718
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> Shop No 11, City Light CHS, CBSE School, Plot No.25, near Terna Orchids The International School, Sector 1, Kopar Khairane, Navi Mumbai, Maharashtra 400709
            </p>
          </section>
        </div>
      </div>
      <TermsAndConditionsPopup/>
    </section>
  );
};

export default TermsAndConditions;
