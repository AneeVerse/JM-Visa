"use client";
import React, { useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const VideoTestimonials = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const scrollContainerRef = useRef(null);

  const testimonials = [
    { id: 1, videoUrl: "/videos/reels1.mp4", description: "Client 1" },
    { id: 2, videoUrl: "/videos/reels1.mp4", description: "Client 2" },
    { id: 3, videoUrl: "/videos/reels1.mp4", description: "Client 3" },
    { id: 4, videoUrl: "/videos/reels1.mp4", description: "Client 4" },
    { id: 5, videoUrl: "/videos/reels1.mp4", description: "Client 5" },
    { id: 6, videoUrl: "/videos/reels1.mp4", description: "Client 6" },
    { id: 7, videoUrl: "/videos/reels1.mp4", description: "Client 7" },
  ];

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closePopup = () => {
    setSelectedVideo(null);
  };

  const scroll = (direction) => {
    if (direction === "left") {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pb-16">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
            See What Our <br className="sm:hidden" />
            <span className="text-blue-500">Happy Clients</span> Say
          </h1>
        </div>

        {/* Video Carousel */}
        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
           
           <FaAngleLeft size={20} className="text-blue-500 self-center" />
          </button>

          <div
            ref={scrollContainerRef}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth",
            }}
            className="relative flex gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative min-w-[250px] sm:min-w-[250px] h-[340px] hover:shadow-md rounded-lg overflow-hidden shadow-md transition-transform cursor-pointer"
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

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
            
            <FaAngleRight size={20} className="text-blue-500 self-center" />
          </button>
        </div>
      </div>

      {/* Video Popup */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex p-2 items-center justify-center">
          <div className="relative h-auto w-full max-w-3xl">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl z-50 bg-black/50 p-2 rounded-full"
              onClick={closePopup}
            >
              <IoClose className="w-5 h-5" />
            </button>
            {/* Video Player */}
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-auto rounded-lg shadow-lg"
            ></video>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoTestimonials;
