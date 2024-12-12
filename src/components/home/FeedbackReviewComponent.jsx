"use client";

import React, { useEffect } from "react";

const FeedbackReviewComponent = () => {
  useEffect(() => {
    // Dynamically inject the EmbedSocial script
    const script = document.createElement("script");
    script.id = "EmbedSocialHashtagScript";
    script.src = "https://embedsocial.com/cdn/ht.js";
    script.async = true;
    document.head.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      const existingScript = document.getElementById("EmbedSocialHashtagScript");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className="pt-16">
      <div className="container mx-auto px-6 text-left">
        {/* Heading */}
        <p className="inline-block mb-6 px-4 py-2 bg-blue-100/50 text-blue-500 font-medium rounded-full backdrop-blur-lg shadow-md">
          ✈️ Feedback
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
            See What Our <br className="sm:hidden" />
            <span className="text-blue-500">Happy Clients</span> Say
          </h1>

        {/* EmbedSocial Widget */}
        <div
          className="embedsocial-hashtag"
          data-ref="32db521878074b8f0ff34379b2d89eee9ad8ec93"
        >
          <a
            className="feed-powered-by-es feed-powered-by-es-slider-img es-widget-branding"
            href="https://embedsocial.com/blog/embed-google-reviews/"
            target="_blank"
            title="Embed Google reviews"
          >
            <img
              src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp"
              alt="EmbedSocial"
            />
            <div className="es-widget-branding-text">Embed Google reviews</div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeedbackReviewComponent;
