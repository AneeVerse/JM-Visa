"use client";
import React, { useState, useEffect } from "react";
const blogsData = [
    {
      "id": 1,
      "title": "Understanding Visa Processes",
      "description": "A detailed guide on the visa application process.",
      "image": "/images/work-visa.jpg"
    },
    {
      "id": 2,
      "title": "Top Travel Destinations for 2024",
      "description": "Discover the most popular travel spots for 2024.",
      "image": "/images/business-visa.png"
    }
  ]
  

const BlogPage = () => {
  const [blogs, setBlogs] = useState(blogsData);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch blogs from API
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://api.example.com/blogs"); // Replace with your API endpoint
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="relative mt-[80px] py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Header */}
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

        {/* Search Bar */}
        <div className="relative mb-8 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 bg-white/30 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="relative group bg-white/20 border border-white/30 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Blog Image */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                {/* Blog Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">{blog.description}</p>
                  <a
                    href={`/blogs/${blog.id}`}
                    className="mt-4 inline-block text-blue-500 font-medium hover:underline"
                  >
                    Read More ➔
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No blogs found. Try adjusting your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default BlogPage;
