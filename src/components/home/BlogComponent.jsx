"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";

const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  // Fetch Blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://app.jmvisaservices.com/api/blogs?populate=*&sort[0]=createdAt:desc"
        );
        const data = await response.json();
        if (data?.data) {
          setBlogs(data.data);
        } else {
          console.error("Invalid response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Enhanced Scroll Function
  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollDistance = 300; // Total distance to scroll
      const step = 10; // Smaller step for smoother transition
      let remainingDistance = scrollDistance;

      const scrollStep = () => {
        if (remainingDistance <= 0) return; // Stop scrolling when distance is covered
        const stepDistance = Math.min(step, remainingDistance);
        container.scrollLeft += direction === "left" ? -stepDistance : stepDistance;
        remainingDistance -= stepDistance;
        requestAnimationFrame(scrollStep); // Smoothly transition frame by frame
      };

      scrollStep();
    }
  };

  return (
    <section className="bg-white py-16 relative">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Explore Our <span className="text-blue-500">Blog</span>
          </h2>
          <Link
            href={"/blog"}
            className="py-2 self-end text-blue-500 min-w-fit flex gap-1 items-center justify-center font-semibold"
          >
            <MdFormatListBulleted className="text-4" /> <span>View All</span>
          </Link>
        </div>
        <p className="text-lg text-gray-600 mb-8">
          Stay updated with the latest travel tips, visa guides, and destination
          recommendations.
        </p>

        {/* Horizontal Scroll Section */}
        {loading ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="relative">
            {/* Left Scroll Button */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-[40px] w-[40px] rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
            >
              <FaAngleLeft size={20} className="text-white self-center" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth"
              style={{
                scrollbarWidth: "none", // Hide scrollbar in Firefox
                msOverflowStyle: "none", // Hide scrollbar in Internet Explorer
              }}
            >
              {blogs.map((blog) => (
                <Link
                  href={`/blog/${blog.slug}`}
                  key={blog.id}
                  className="w-[280px] sm:w-[300px] lg:w-[340px] mb-3  bg-white flex flex-col gap-3 p-5 border  rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  {/* Blog Image */}
                  <img
                    src={
                      `https://app.jmvisaservices.com${blog?.thumbnail?.url}` || "/images/default-thumbnail.jpg"
                    }
                    alt={blog?.attributes?.title || "Blog"}
                    className="w-full h-48 object-cover rounded-xl  transition duration-300"
                  />
                  {/* Blog Content */}
                    <h3 className="text-xl line-clamp-2 font-semibold text-gray-800 ">
                      {blog?.title || "Untitled Blog"}
                    </h3>
                </Link>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white h-[40px] w-[40px] rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
            >
              <FaAngleRight size={20} className="text-white self-center" />
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">No blogs available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default BlogComponent;
