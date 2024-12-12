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
          "https://integral-cuddle-38b1ccd978.strapiapp.com/api/blogs?populate=*"
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

  // Scroll Function
  const scroll = (direction) => {
    if (direction === "left") {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Auto Scroll
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (scrollContainerRef.current) {
  //       scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  //     }
  //   }, 5000); // Auto scroll every 5 seconds
  //   return () => clearInterval(interval); // Cleanup on component unmount
  // }, []);

  return (
    <section className="bg-white py-16 relative">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Explore Our <span className="text-blue-500">Blog</span>
          </h2>
          <Link href={"/blog"} className=" py-2 self-end text-blue-500 min-w-fit flex gap-1 items-center justify-center font-semibold">
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
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-50 bg-opacity-50 text-white h-[40px] w-[40px] rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
            >
              <FaAngleLeft size={20} className="text-blue-500 self-center" />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth"
              style={{
                scrollbarWidth: "none", // Hide scrollbar in Firefox
                msOverflowStyle: "none", // Hide scrollbar in Internet Explorer
                scrollBehavior: "smooth"
              }}
            >
              {blogs.map((blog) => (
                <Link
                  href={`/blog/${blog.slug}`}
                  key={blog.id}
                  className="min-w-[290px] w-[290px]  bg-white mb-4 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer group"
                >
                  {/* Blog Image */}
                  <img
                    src={
                      blog?.thumbnail?.url ||
                      "/images/default-thumbnail.jpg"
                    }
                    alt={blog?.attributes?.title || "Blog"}
                    className="w-full h-48 object-cover group-hover:blur-[4px] transition duration-300"
                  />
                  {/* Blog Content */}
                  <div className="p-4">
                    <h3 className="text-xl line-clamp-3 font-semibold text-gray-800 mb-2">
                      {blog?.title || "Untitled Blog"}
                    </h3>
                    {/* <p className="text-gray-600 text-sm">
                      {blog?.description.slice(0,120) || "No description available."}
                    </p> */}
                  </div>
                </Link>
              ))}
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-50 bg-opacity-50 text-white h-[40px] w-[40px] rounded-full hidden sm:flex items-center justify-center shadow-lg z-10"
            >
            
            <FaAngleRight size={20} className="text-blue-500 self-center" />
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
