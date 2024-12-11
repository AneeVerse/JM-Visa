"use client";

import React, { useEffect } from "react";

const FeedbackReviewComponent = () => {
  useEffect(() => {
    // Dynamically inject the ElfSight script
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="pt-16 bg-white">
      <div className="container mx-auto px-6 text-left">
        {/* Heading */}
        <p className="inline-block mb-6 px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md ">
    ✈️  Feedback
    </p>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          What Our Customers Say
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          See real feedback from our satisfied clients!
        </p>

        {/* ElfSight Widget */}
        <div
          className="elfsight-app-9e640450-f543-48ed-a932-f532853c5e21"
          data-elfsight-app-lazy
        ></div>
      </div>
    </section>
  );
};

export default FeedbackReviewComponent;
