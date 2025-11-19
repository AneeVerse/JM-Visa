"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { MdFormatListBulleted } from "react-icons/md";
import testimonials from "./VideoTestimonialData";

const MediaTestimonials = () => {
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected media index
  const [viewAll, setViewAll] = useState(false); // Toggle for view all mode
  const scrollContainerRef = useRef(null); // Ref for the carousel container
  const mediaContainerRef = useRef(null); // Ref for the popup media container

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

  const videoTestimonials = testimonials.filter((item) => item.type === "video");
  const imageTestimonials = testimonials.filter((item) => item.type !== "video");
  const limitedTestimonials = [...videoTestimonials.slice(0, 5), ...imageTestimonials];
  const displayedTestimonials = viewAll ? testimonials : limitedTestimonials;

  const getOriginalIndex = (testimonialId) =>
    testimonials.findIndex((item) => item.id === testimonialId);

  return (
    <section className="relative pb-16">
      <div className="container mx-auto px-5 sm:px-6 lg:px-12">
        {/* Heading and View All */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Client <span className="text-blue-500">Testimonials</span>
          </h2>
          {!viewAll && (
            <Link
              href="/testimonials"
              className="py-2 self-end text-blue-500 min-w-fit flex gap-1 items-center justify-center font-semibold"
            >
              <MdFormatListBulleted className="text-4" /> <span>View All</span>
            </Link>
          )}
          {viewAll && (
            <button
              onClick={() => setViewAll(false)}
              className="py-2 self-end text-blue-500 min-w-fit flex gap-1 items-center justify-center font-semibold"
            >
              <FaAngleLeft className="text-4" /> <span>Back to Carousel</span>
            </button>
          )}
        </div>
        {/* Carousel or Grid */}
        {!viewAll ? (
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
              {displayedTestimonials.map((testimonial) => {
                const originalIndex = getOriginalIndex(testimonial.id);
                return (
                <div
                  key={testimonial.id}
                  className="relative min-w-[220px] sm:min-w-[220px] h-[340px] hover:shadow-md rounded-lg overflow-hidden shadow-md transition-transform cursor-pointer"
                  onClick={() => setSelectedIndex(originalIndex)}
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
                );
              })}
            </div>
            {/* Right scroll button */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-10 w-10 rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
            >
              <FaAngleRight size={20} className="text-white self-center" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedTestimonials.map((testimonial) => {
              const originalIndex = getOriginalIndex(testimonial.id);
              return (
              <div
                key={testimonial.id}
                className="relative h-[340px] hover:shadow-md rounded-lg overflow-hidden shadow-md transition-transform cursor-pointer"
                onClick={() => setSelectedIndex(originalIndex)}
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
              );
            })}
          </div>
        )}
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