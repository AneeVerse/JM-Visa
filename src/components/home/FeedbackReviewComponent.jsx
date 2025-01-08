"use client";

import React, { useEffect, useState } from "react";

const FeedbackReviewComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  // Load EmbedSocial script
  useEffect(() => {
    const script = document.createElement("script");
    script.id = "EmbedSocialHashtagScript";
    script.src = "https://embedsocial.com/cdn/ht.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("EmbedSocialHashtagScript");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Handle Star Selection
  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setShowPopup(false); // Hide star rating popup

    setTimeout(() => {
      if (rating >= 4) {
        // Redirect to Google Review if rating is 4 or higher
        const googleReviewUrl = `https://www.google.com/maps/place/JM+Visa+Services/@19.1107798,73.0050874,350m/data=!3m1!1e3!4m8!3m7!1s0x4f174af374b22233:0x39a66841cc7cfdd5!8m2!3d19.1107866!4d73.006725!9m1!1b1!16s%2Fg%2F11txqcs1k4?hl=en&entry=ttu&g_ep=EgoyMDI1MDEwMi4wIKXMDSoASAFQAw%3D%3D`;
        window.open(googleReviewUrl, "_blank");
      } else {
        // Show Thank You popup if rating is 3 or below
        setShowThankYouPopup(true);
      }
    }, 500);
  };

  return (
    <section className="pt-16">
      <div className="container mx-auto px-6 text-left">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div>
            <p className="inline-block mb-6 px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md">
              ✈️ Feedback
            </p>
            <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
              See What Our <br className="sm:hidden" />
              <span className="text-blue-500">Happy Clients</span> Say
            </h1>
          </div>
          {/* Leave Review Button */}
          <button
            onClick={() => setShowPopup(true)}
            className="mt-6 px-6 text-sm py-[10px] bg-blue-700 text-white font-semibold rounded-md  hover:bg-blue-900"
          >
            Leave Review
          </button>
        </div>

        {/* EmbedSocial Reviews */}
        <div className="embedsocial-hashtag" data-ref="32db521878074b8f0ff34379b2d89eee9ad8ec93"></div>
      </div>

      {/* Popup for Star Rating */}
      {showPopup && (
        <div className="fixed w-full h-screen z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg z-50 relative">
            {/* Close Icon */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute z-50 top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* Popup Heading */}
            <h2 className="text-xl font-semibold mb-4">Rate Your Experience</h2>

            {/* Star Ratings */}
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className={`text-3xl ${
                    star <= selectedRating ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popup for Thank You Message */}
      {showThankYouPopup && (
        <div className="fixed w-full h-screen z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg z-50 relative">
            {/* Close Icon */}
            <button
              onClick={() => setShowThankYouPopup(false)}
              className="absolute z-50 top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {/* Thank You Message */}
            <h2 className="text-xl font-semibold my-4 text-green-500">
              Thank you for your feedback!
            </h2>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeedbackReviewComponent;
