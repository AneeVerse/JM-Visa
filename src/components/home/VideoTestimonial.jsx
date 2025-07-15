"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const MediaTestimonials = () => {
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected media index
  const scrollContainerRef = useRef(null); // Ref for the carousel container
  const mediaContainerRef = useRef(null); // Ref for the popup media container

  const testimonials = [
    // Existing videos
    { id: 1, type: "video", mediaUrl: "/videos/vid1.mp4", description: "Client Testimonial 1" },
    { id: 2, type: "video", mediaUrl: "/videos/vid2.mov", description: "Client Testimonial 2" },
    { id: 3, type: "video", mediaUrl: "/videos/vid3.mp4", description: "Client Testimonial 3" },
    { id: 4, type: "video", mediaUrl: "/videos/vid4.mp4", description: "Client Testimonial 4" },
    { id: 5, type: "video", mediaUrl: "/videos/vid5.mp4", description: "Client Testimonial 5" },

    // New videos (WhatsApp clips)
    { id: 6, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%204.05.08%20PM.mp4", description: "Client Testimonial 6" },
    { id: 7, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%204.04.53%20PM.mp4", description: "Client Testimonial 7" },
    { id: 8, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%204.04.46%20PM.mp4", description: "Client Testimonial 8" },
    { id: 9, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%204.04.36%20PM.mp4", description: "Client Testimonial 9" },
    { id: 10, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%204.03.54%20PM.mp4", description: "Client Testimonial 10" },
    { id: 11, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%204.02.02%20PM.mp4", description: "Client Testimonial 11" },
    { id: 12, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%204.01.27%20PM.mp4", description: "Client Testimonial 12" },
    { id: 13, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%203.58.00%20PM.mp4", description: "Client Testimonial 13" },
    { id: 14, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%203.57.37%20PM.mp4", description: "Client Testimonial 14" },
    { id: 15, type: "video", mediaUrl: "/videos/jm%20visa%20video/WhatsApp%20Video%202025-07-09%20at%203.57.12%20PM.mp4", description: "Client Testimonial 15" },

    // Existing images (first batch)
    { id: 16, type: "image", mediaUrl: "/images/testimonials/11.jpg", description: "Client Review 1" },
    { id: 17, type: "image", mediaUrl: "/images/testimonials/3.png", description: "Client Review 2" },
    { id: 18, type: "image", mediaUrl: "/images/testimonials/9.jpg", description: "Client Review 3" },
    { id: 19, type: "image", mediaUrl: "/images/testimonials/10.jpg", description: "Client Review 4" },

    // NEW images (should appear right after 19)
    { id: 20, type: "image", mediaUrl: "/images/testimonials/new-image/image%20(18).png", description: "Client Review 5" },
    { id: 21, type: "image", mediaUrl: "/images/testimonials/new-image/image%20(17).png", description: "Client Review 6" },
    { id: 22, type: "image", mediaUrl: "/images/testimonials/new-image/image%20(16).png", description: "Client Review 7" },
    { id: 23, type: "image", mediaUrl: "/images/testimonials/new-image/image%20(15).png", description: "Client Review 8" },
    { id: 24, type: "image", mediaUrl: "/images/testimonials/new-image/image%20(14).png", description: "Client Review 9" },
    { id: 25, type: "image", mediaUrl: "/images/testimonials/new-image/image%20(13).png", description: "Client Review 10" },

    // Remaining existing images
    { id: 26, type: "image", mediaUrl: "/images/testimonials/6.png", description: "Client Review 11" },
    { id: 27, type: "image", mediaUrl: "/images/testimonials/2.png", description: "Client Review 12" },
    { id: 28, type: "image", mediaUrl: "/images/testimonials/1.png", description: "Client Review 13" },
    { id: 29, type: "image", mediaUrl: "/images/testimonials/4.png", description: "Client Review 14" },
    { id: 30, type: "image", mediaUrl: "/images/testimonials/5.png", description: "Client Review 15" },
    { id: 31, type: "image", mediaUrl: "/images/testimonials/7.png", description: "Client Review 16" },
    { id: 32, type: "image", mediaUrl: "/images/testimonials/8.JPG", description: "Client Review 17" },
    { id: 33, type: "image", mediaUrl: "/images/testimonials/client-with-certificate.jpg", description: "Client Review 18" },
    { id: 34, type: "image", mediaUrl: "/images/testimonials/client-1.jpg", description: "Client Review 19" },
    { id: 35, type: "image", mediaUrl: "/images/testimonials/client-2.jpg", description: "Client Review 20" },
    { id: 36, type: "image", mediaUrl: "/images/testimonials/client-3.jpg", description: "Client Review 21" },
    { id: 37, type: "image", mediaUrl: "/images/testimonials/client-4.jpg", description: "Client Review 22" },
    { id: 38, type: "image", mediaUrl: "/images/testimonials/client-5.jpg", description: "Client Review 23" },
    { id: 39, type: "image", mediaUrl: "/images/testimonials/client-6.jpg", description: "Client Review 24" },
    { id: 40, type: "image", mediaUrl: "/images/testimonials/client-7.jpg", description: "Client Review 25" },
    { id: 41, type: "image", mediaUrl: "/images/testimonials/client-8.jpg", description: "Client Review 26" },
  ];

  // Reset scroll position when media changes
  useEffect(() => {
    if (mediaContainerRef.current && selectedIndex !== null) {
      mediaContainerRef.current.scrollTo(0, 0);
    }
  }, [selectedIndex]);

  // Improved Smooth Scroll Function
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = 250; // Approximate width of a card including margin
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative pb-16">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        <div className="relative">
          {/* Left scroll button */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleLeft size={20} className="text-white self-center" />
          </button>

          {/* Carousel container */}
          <div
            ref={scrollContainerRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
            className="relative flex gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="relative min-w-[220px] sm:min-w-[220px] h-[340px] hover:shadow-md rounded-lg overflow-hidden shadow-md transition-transform cursor-pointer"
                onClick={() => setSelectedIndex(index)}
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
              </div>
            ))}
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
          >
            <FaAngleRight size={20} className="text-white self-center" />
          </button>
        </div>
      </div>

      {/* Popup for selected media */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white z-50 bg-black/50 p-2 rounded-full"
              onClick={() => setSelectedIndex(null)}
            >
              <IoClose className="w-6 h-6" />
            </button>

            {/* Left navigation button */}
            <button
              onClick={() => setSelectedIndex((prev) => Math.max(prev - 1, 0))}
              disabled={selectedIndex === 0}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-lg z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaAngleLeft size={20} />
            </button>

            {/* Right navigation button */}
            <button
              onClick={() => setSelectedIndex((prev) => Math.min(prev + 1, testimonials.length - 1))}
              disabled={selectedIndex === testimonials.length - 1}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full flex items-center justify-center shadow-lg z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaAngleRight size={20} />
            </button>

            {/* Media container */}
            <div
              ref={mediaContainerRef}
              className="relative max-w-3xl rounded-xl w-full h-full max-h-[90vh]"
            >
              {testimonials[selectedIndex].type === "video" ? (
                <video
                  src={testimonials[selectedIndex].mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-full rounded-xl object-contain"
                />
              ) : (
                <img
                  src={testimonials[selectedIndex].mediaUrl}
                  alt={testimonials[selectedIndex].description}
                  className="w-full h-full max-w-fit rounded-xl mx-auto object-contain"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MediaTestimonials;