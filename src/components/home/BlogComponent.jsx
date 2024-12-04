"use client";
import React from "react";
import { MdFormatListBulleted } from "react-icons/md";

const BlogComponent = () => {
  const blogs = [
    {
      id: 1,
      title: "Understanding Visa Requirements",
      description: "A comprehensive guide to visa applications for travelers.",
      image: "/images/blogs/blog1.png", // Replace with your image path
    },
    {
      id: 2,
      title: "Top Destinations for 2024",
      description: "Explore the best countries to visit this year.",
      image: "/images/blogs/blog2.png", // Replace with your image path
    },
    {
      id: 3,
      title: "Visa Tips for First-Time Travelers",
      description: "Essential tips to make your visa process smoother.",
      image: "/images/blogs/blog3.png", // Replace with your image path
    },
    {
      id: 4,
      title: "Travel Safely with JM Visa",
      description: "How JM Visa ensures a hassle-free experience.",
      image: "/images/blogs/blog4.png", // Replace with your image path
    },
    {
      id: 5,
      title: "Documents You Need for Visa Applications",
      description: "A checklist of necessary documents for visa applications.",
      image: "/images/blogs/blog2.png", // Replace with your image path
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-3 sm:px-6">
        {/* Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Explore Our <span className="text-blue-500">Blog</span></h2>
          <a
            href="/blogs"
            className="text-blue-500 min-w-fit hover:text-blue-600 flex items-center justify-center gap-1 font-medium transition"
          >
            <MdFormatListBulleted className="text-4" /> <span>View All</span> 
          </a>
        </div>
        <p className="text-lg text-gray-600 mb-8">
          Stay updated with the latest travel tips, visa guides, and destination
          recommendations.
        </p>

        {/* Horizontal Scrollable Blog Section */}
        <div
          className="flex gap-6 overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: "none", // Hide scrollbar for Firefox
            msOverflowStyle: "none", // Hide scrollbar for Internet Explorer
          }}
        >
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="min-w-[290px] sm:min-w-[300px] bg-white mb-4 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer group"
            >
              {/* Blog Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover group-hover:blur-[4px] transition duration-300 "
              />
              {/* Blog Content */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogComponent;
