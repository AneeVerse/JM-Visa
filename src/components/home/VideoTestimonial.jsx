"use client";
import React, { useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const MediaTestimonials = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const scrollContainerRef = useRef(null);

  const testimonials = [
    { id: 1, type: "video", mediaUrl: "/videos/vid1.mp4", description: "Client Testimonial 1" },
    { id: 2, type: "video", mediaUrl: "/videos/vid2.mov", description: "Client Testimonial 2" },
    { id: 5, type: "image", mediaUrl: "/images/testimonials/3.png", description: "Client Review 1" },
    { id: 8, type: "image", mediaUrl: "/images/testimonials/6.png", description: "Client Review 2" },
    { id: 6, type: "image", mediaUrl: "/images/testimonials/2.png", description: "Client Review 3" },
    { id: 3, type: "image", mediaUrl: "/images/testimonials/1.png", description: "Client Review 4" },
    { id: 4, type: "image", mediaUrl: "/images/testimonials/4.png", description: "Client Review 5" },
    { id: 7, type: "image", mediaUrl: "/images/testimonials/5.png", description: "Client Review 6" },
    { id: 9, type: "image", mediaUrl: "/images/testimonials/7.png", description: "Client Review 7" },
  ];

  const handleMediaClick = (mediaUrl) => {
    setSelectedMedia(mediaUrl);
  };

  const closePopup = () => {
    setSelectedMedia(null);
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollDistance = 300;
      const step = 10;
      let remainingDistance = scrollDistance;

      const scrollStep = () => {
        if (remainingDistance <= 0) return;
        const stepDistance = Math.min(step, remainingDistance);
        container.scrollLeft += direction === "left" ? -stepDistance : stepDistance;
        remainingDistance -= stepDistance;
        requestAnimationFrame(scrollStep);
      };
      scrollStep();
    }
  };

  return (
    <section className="relative pb-16">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleLeft size={20} className="text-white self-center" />
          </button>

          <div
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            className="relative flex gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative min-w-[220px] sm:min-w-[220px] h-[340px] hover:shadow-md rounded-lg overflow-hidden shadow-md transition-transform cursor-pointer"
                onClick={() => handleMediaClick(testimonial.mediaUrl)}
              >
                {testimonial.type === "video" ? (
                  <video
                    src={testimonial.mediaUrl}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  ></video>
                ) : (
                  <img
                    src={testimonial.mediaUrl}
                    alt={testimonial.description}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-4 text-sm sm:text-base font-medium">
                  {testimonial.description}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleRight size={20} className="text-white self-center" />
          </button>
        </div>
      </div>

      {selectedMedia && (
        <div className="fixed top-0 bottom-0 w-full h-full bg-black/90 z-50 flex p-2 justify-center ">
          <div className="relative w-full max-w-3xl">
            <button
              className="absolute top-4 right-4 text-white text-2xl z-50 bg-black/50 p-2 rounded-full"
              onClick={closePopup}
            >
              <IoClose className="w-5 h-5" />
            </button>
            {selectedMedia.endsWith(".mp4") || selectedMedia.endsWith(".mov") ? (
              <video
                src={selectedMedia}
                controls
                autoPlay
                className="w-full h-full rounded-lg shadow-lg"
              ></video>
            ) : (
              <img
                src={selectedMedia}
                alt="Selected Media"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaTestimonials;
