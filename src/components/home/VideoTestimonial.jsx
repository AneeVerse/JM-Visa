"use client";
import React, { useState } from "react";

const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const testimonials = [
    { id: 1, videoUrl: "/videos/reels1.mp4", description: "Client 1" },
    { id: 2, videoUrl: "/videos/reels1.mp4", description: "Client 2" },
    { id: 3, videoUrl: "/videos/reels1.mp4", description: "Client 3" },
    { id: 4, videoUrl: "/videos/reels1.mp4", description: "Client 4" },
    { id: 5, videoUrl: "/videos/reels1.mp4", description: "Client 5" },
  ];

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closePopup = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-left mb-8">
          <div className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md">
            🎥 Client Testimonials
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
            See What Our <span className="text-blue-500">Happy Clients</span> Say
          </h1>
        </div>

        {/* Video Carousel */}
        <div className="relative flex gap-6 overflow-x-auto scroll-smooth no-scrollbar">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative min-w-[200px] sm:min-w-[300px] h-[340px] sm:h-[340px] rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleVideoClick(testimonial.videoUrl)}
            >
              {/* Video */}
              <video
                src={testimonial.videoUrl}
                muted
                loop
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              ></video>
              {/* Overlay Description */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-sm sm:text-base font-medium">
                {testimonial.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative h-full w-auto max-w-3xl">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl z-50 bg-black/50 p-2 rounded-full"
              onClick={closePopup}
            >
              ✖
            </button>
            {/* Video Player */}
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-auto h-full rounded-lg shadow-lg"
            ></video>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoTestimonials;
