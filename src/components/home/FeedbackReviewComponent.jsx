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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
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
