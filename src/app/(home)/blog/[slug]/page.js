"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogDetails = () => {
  const params = useParams(); // Using `useParams` hook to access dynamic params
  const router = useRouter(); // Router to handle navigation
  const { slug } = params || {}; // Destructure `slug` from params
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return; // Wait until slug is available

    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(
          `https://integral-cuddle-38b1ccd978.strapiapp.com/api/blogs?filters[slug][$eq]=${slug}&populate=*`
        );
        const data = await response.json();

        if (data?.data?.length) {
          setBlog(data.data[0]); // Get the first (and only) result
        } else {
          console.error("Blog not found:", data);
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Blog not found. Please check the URL.</p>
      </div>
    );
  }

  return (
    <section className="relative mt-[70px] py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100 px-3 sm:px-6 lg:px-12">
      <div className="container mx-auto">
        {/* Blog Header */}
        <div className="mb-8">
          <img
            src={blog?.thumbnail?.url || "/images/default-thumbnail.jpg"}
            alt={blog?.title || "Blog"}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <h1 className="mt-6 text-4xl font-extrabold text-gray-800">
            {blog?.title || "Untitled Blog"}
          </h1>
          <p className="mt-4 text-gray-600">
            {blog?.author?.name && `By ${blog.author.name}`} |{" "}
            {new Date(blog?.date).toLocaleDateString() || "Unknown Date"}
          </p>
        </div>

        {/* Blog Content */}
        <article className="article-blog max-w-none border border-white/30 backdrop-blur-md py-6 px-3 sm:px-6">
          {blog?.description ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
            >
              {blog.description}
            </ReactMarkdown>
          ) : (
            <p>No content available for this blog.</p>
          )}
        </article>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => router.push("/blog")}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            ← Back to Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
