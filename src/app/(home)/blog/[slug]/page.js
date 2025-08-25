"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import { BiMessageDetail } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { getPostBySlug, getAllPosts } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/client";
import Link from "next/link";

const portableTextComponents = {
  types: {
    image: ({ value }) => (
      value && value.asset ? (
        <img
          src={urlFor(value).url()}
          alt={value.alt || 'Blog image'}
          className="my-6 rounded-lg shadow-md w-full h-auto object-contain"
        />
      ) : null
    ),
    table: ({ value }) => {
      if (!value || !value.rows || value.rows.length === 0) return null;
      const header = value.rows[0];
      const bodyRows = value.rows.slice(1);
      return (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-blue-500">
                {header.cells.map((cell, j) => (
                  <th key={j} className="px-4 py-3 text-white font-bold border border-blue-500 text-left">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {row.cells.map((cell, j) => (
                    <td key={j} className="border px-4 py-3 align-top">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    youtube: ({ value }) => {
      if (!value || !value.url) return null;
      // Extract the YouTube video ID from the URL
      const match = value.url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
      );
      const videoId = match ? match[1] : null;
      if (!videoId) return null;
      return (
        <div className="my-6 w-full aspect-w-16 aspect-h-9">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-64 md:h-96 rounded-lg shadow-md"
          ></iframe>
        </div>
      );
    },
  },
};

const BlogDetails = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params || {};
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", success: false });
  const [isAccepted, setIsAccepted] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", phone: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !isAccepted) return;

    setIsLoading(true);
    setPopup({ show: false });

    try {
      const response = await fetch("/api/get-touch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, other: "From Blog Page" }),
      });

      const result = await response.json();
      if (result.success) {
        setPopup({ show: true, message: "Form submitted successfully!", success: true });
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setPopup({ show: true, message: "Failed to send the message. Try again.", success: false });
      }

      setTimeout(() => {
        setPopup({ show: false });
      }, 5000);
    } catch (error) {
      setPopup({ show: true, message: "Server error! Please try later.", success: false });
      setTimeout(() => {
        setPopup({ show: false });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!slug) return;

    const fetchBlogDetails = async () => {
      try {
        const post = await getPostBySlug(slug);
        setBlog(post);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedBlogs = async () => {
      try {
        const posts = await getAllPosts();
        const related = posts
          .filter(post => post.slug.current !== slug)
          .slice(0, 3);
        setRelatedBlogs(related);
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
      {/* Popup Message */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 text-white ${
              popup.success ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {popup.message}
          </motion.div>
        )}
      </AnimatePresence>

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
              {blog.title}
            </h1>
            <div className="mt-6 text-gray-600 flex gap-3 items-center">
              {blog.authorImage && (
                <Image
                  src={urlFor(blog.authorImage).url()}
                  alt={blog.author}
                  width={50}
                  height={50}
                  className="rounded-full min-w-fit w-[50px] h-[50px] self-center object-cover"
                />
              )}
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{blog.author}</span>
                <span>
                  Date: {new Date(blog.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            {blog.mainImage && (
              <div className="aspect-w-16 max-w-[500px] aspect-h-9 rounded-lg h-[300px] mr-auto ml-auto lg:mr-0 lg:ml-auto overflow-hidden shadow-md">
                <img
                  src={urlFor(blog.mainImage).url()}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Content and Related Blogs Section */}
        <div className="mt-16 flex flex-col lg:flex-row gap-12">
          {/* Blog Content */}
          <div className="lg:w-2/3 w-full">
            <article className="prose prose-lg max-w-none article-blog bg-white bg-opacity-50 p-10 rounded-md shadow-sm">
              <PortableText value={blog.body} components={portableTextComponents} />
            </article>
            {/* FAQ Section */}
            {blog.faqs && blog.faqs.length > 0 && (
              <div className="mt-12 mb-12">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">FAQs</h2>
                <div className="space-y-4">
                  {blog.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-300 pb-4">
                      <button
                        type="button"
                        className="flex justify-between items-center w-full text-left text-gray-800 font-medium py-3"
                        onClick={() => setExpandedFaqIndex(expandedFaqIndex === index ? null : index)}
                      >
                        <span>{faq.question}</span>
                        {expandedFaqIndex === index ? (
                          <span className="text-blue-500">-</span>
                        ) : (
                          <span className="text-blue-500">+</span>
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedFaqIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 mt-2">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related Blogs and Contact Form */}
          <aside className="lg:w-1/3 w-full">
            <div className="sticky top-[100px] space-y-8">
              {/* Contact Form */}
              <div className="bg-white bg-opacity-50 rounded-md shadow-sm p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <BiMessageDetail className="text-blue-500" /> Get in Touch
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className={`mt-2 p-3 w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className={`mt-2 p-3 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                      className={`mt-2 p-3 w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>

                  {/* Terms and Conditions Checkbox */}
                  <div className="mb-4 flex items-center">
                    <input
                      type="checkbox"
                      checked={isAccepted}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">
                      I accept the <a href="/terms-and-condition" className="text-blue-500">terms and conditions</a>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`w-full px-6 py-3 text-white font-semibold rounded-lg shadow-md ${
                      isLoading || !isAccepted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={isLoading || !isAccepted}
                  >
                    {isLoading ? "Sending..." : "Submit"}
                  </button>
                </form>
              </div>

              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <div className="bg-white bg-opacity-50 rounded-md shadow-sm p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Related Posts
                  </h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link
                        key={relatedBlog._id}
                        href={`/blog/${relatedBlog.slug.current}`}
                        className="block group"
                      >
                        <div className="flex gap-4 items-start">
                          {relatedBlog.mainImage && (
                            <div className="w-20 h-20 flex-shrink-0">
                              <img
                                src={urlFor(relatedBlog.mainImage).width(80).height(80).url()}
                                alt={relatedBlog.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <div>
                            <h4 className="font-medium text-gray-800 group-hover:text-blue-500 transition">
                              {relatedBlog.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(relatedBlog.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
