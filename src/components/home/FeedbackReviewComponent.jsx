"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const FeedbackReviewComponent = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [notification, setNotification] = useState(null); // New state for notifications

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

    if (rating >= 4) {
      // Redirect to Google Review if rating is 4 or higher
      const googleReviewUrl = `https://g.page/r/CdX9fMxBaKY5EBE/review`;
      window.open(googleReviewUrl, "_blank");
    } else {
      // Show Thank You popup and message input if rating is below 4
      setShowThankYouPopup(true);
    }
  };

  // Handle Message Submission through API
  const handleSubmitMessage = async () => {
    setIsSubmitting(true); // Disable button and show loading state

    try {
      // Replace with your API endpoint
      const response = await fetch("/api/submitFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        // Message submitted successfully
        setNotification({ type: "success", message: "Your message has been submitted." });
      } else {
        setNotification({ type: "error", message: "There was an error submitting your message." });
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      setNotification({ type: "error", message: "There was an error submitting your message." });
    } finally {
      setIsSubmitting(false); // Re-enable the button
      setShowThankYouPopup(false); // Close the Thank You popup
      setMessage(""); // Clear the message field

      // Auto-hide the notification after 4 seconds
      setTimeout(() => {
        setNotification(null);
      }, 4000);
    }
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
          {/* <button
          
            onClick={() => setShowPopup(true)}
            className=" px-6 text-sm py-[10px] bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-900"
          >
            Leave Review
          </button> */}
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

            {/* Message Input for ratings below 4 */}
            {selectedRating < 4 && (
              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message (optional)"
                  className="w-full p-3 border rounded-md border-gray-300"
                  rows={4}
                ></textarea>
                <button
                  onClick={handleSubmitMessage}
                  className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                  disabled={!message.trim() || isSubmitting} // Disable button if message is empty or submitting
                >
                  {isSubmitting ? "Submitting..." : "Submit Message"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notification Popup */}
      {notification && (
        <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
          duration={0.5}
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <p className="text-white font-semibold">{notification.message}</p>
        </motion.div>
      )}
    </section>
  );
};

export default FeedbackReviewComponent;
