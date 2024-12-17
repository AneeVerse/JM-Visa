"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://integral-cuddle-38b1ccd978.strapiapp.com/api/blogs?populate=*"
        );
        const data = await response.json();
        console.log("Fetched blogs:", data);

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

  return (
    <section className="relative mt-[70px] py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-blue-200/50 text-blue-600 font-medium rounded-full backdrop-blur-lg shadow-md">
            📰 Explore Our Blogs
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
            Stay Updated with <span className="text-blue-500">Insights</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse through our latest articles and updates tailored for you.
          </p>
        </div>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => {
              return (
                <Link href={`/blog/${blog.slug}`} 
                  key={blog.id}
                  className="relative group bg-white/20 border border-white/30 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden"
                >
                  {/* Blog Image */}
                  <img
                    src={blog.thumbnail.url || "/images/default-thumbnail.jpg"}
                    alt={blog.title || "Blog"}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                  />
                  {/* Blog Content */}
                  <div className="p-4">
                    <h3 className="text-lg line-clamp-2 font-semibold text-gray-800">
                      {blog.title || "Untitled Blog"}
                    </h3>
                    {/* <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {blog.description || "No description available."}
                    </p> */}
                    <span
                      className="mt-4 inline-block text-blue-500 font-medium hover:underline"
                    >
                      Read More ➔
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No blogs available at the moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
