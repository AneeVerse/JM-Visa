"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

const BlogDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params || {};
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    if (!slug) return;

    const fetchBlogDetails = async () => {
      try {
        const response = await fetch(
          `https://integral-cuddle-38b1ccd978.strapiapp.com/api/blogs?filters[slug][$eq]=${slug}&populate=*`
        );
        const data = await response.json();
        if (data?.data?.length) setBlog(data.data[0]);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedBlogs = async () => {
      try {
        const response = await fetch(
          `https://integral-cuddle-38b1ccd978.strapiapp.com/api/blogs?filters[slug][$ne]=${slug}&populate=*`
        );
        const data = await response.json();
        setRelatedBlogs(data?.data || []);
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      }
    };

    fetchBlogDetails();
    fetchRelatedBlogs();
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
    <section className="relative mt-[60px] py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 sm:px-8 lg:px-16">
      <div className="max-w-[1280px] mx-auto">
        {/* Blog Header */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="lg:w-1/2 w-full">
           {/* Back Button */}
           <div className="mb-4 hidden lg:block">
              <button
                onClick={() => router.push(`/blog`)}
                className="py-3 text-blue-500 font-semibold transition"
              >
                ← Back to Blogs
              </button>
            </div>
            <h1
              className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-gray-800 leading-tight"
              style={{ lineHeight: "1.3" }}
            >
              {blog?.title || "Untitled Blog"}
            </h1>
            <div className="mt-6 text-gray-600 flex gap-3 items-center">
              <Image
                src={"/images/default_user.png"}
                alt={blog?.author?.name || "Author"}
                width={35}
                height={35}
                className="rounded-full min-w-fit object-cover"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold">
                  {blog?.author?.name && blog.author.name}
                </span>
                <span>
                  Date: {new Date(blog?.date).toLocaleDateString() || "Unknown Date"}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="aspect-w-16 max-w-[500px] aspect-h-9 rounded-lg h-[300px] mr-auto ml-auto lg:mr-0 lg:ml-auto  overflow-hidden shadow-md">
              <img
                src={blog?.thumbnail?.url || "/images/default-thumbnail.jpg"}
                alt={blog?.title || "Blog Thumbnail"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Content and Related Blogs Section */}
        <div className="mt-16 flex flex-col lg:flex-row gap-12">
          {/* Blog Content */}
          <div className="lg:w-2/3 w-full">
            <article className="prose prose-lg max-w-none article-blog bg-white bg-opacity-50 p-10 rounded-md shadow-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog?.description || "No content available for this blog."}
              </ReactMarkdown>
            </article>
          </div>

          {/* Related Blogs */}
          <aside className="lg:w-1/3 w-full">
            <div className="sticky top-[100px] bg-white bg-opacity-50 rounded-md shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Related Blogs
              </h2>
              <div className="space-y-6">
                {relatedBlogs.map((relatedBlog) => (
                  <div
                    key={relatedBlog.id}
                    className="flex items-start gap-4 border-b pb-4 last:border-b-0"
                  >
                    <img
                      src={
                        relatedBlog.thumbnail?.url || "/images/default-thumbnail.jpg"
                      }
                      alt={relatedBlog.title || "Related Blog"}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-md font-semibold text-gray-800">
                        {relatedBlog.title}
                      </h3>
                      <button
                        onClick={() => router.push(`/blog/${relatedBlog.slug}`)}
                        className="text-blue-500 text-sm mt-2 hover:underline"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

      
      </div>
    </section>
  );
};

export default BlogDetails;
