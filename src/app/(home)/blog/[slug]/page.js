"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { BiMessageDetail } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

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
    const [isAccepted, setIsAccepted] = useState(false); // State to track checkbox

  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted); // Toggle checkbox state
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

    if (!validateForm() || !isAccepted) return; // Prevent submission if validation fails

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
        const response = await fetch(
          `https://app.jmvisaservices.com/api/blogs?filters[slug][$eq]=${slug}&populate=*`
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
          `https://app.jmvisaservices.com/api/blogs?filters[slug][$ne]=${slug}&populate=*`
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
              {blog?.title || "Untitled Blog"}
            </h1>
            <div className="mt-6 text-gray-600 flex gap-3 items-center">
              <Image
                src={"/images/team2.jpg"}
                alt={blog?.author?.name || "Author"}
                width={35}
                height={35}
                className="rounded-full min-w-fit w-[50px] h-[50px] self-center object-cover"
              />
              <div className="flex flex-col text-sm">
                <span className="font-semibold">
                  {(blog?.author?.name && blog.author.name ) || "Amrita Thakar"}
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
                src={`https://app.jmvisaservices.com${blog?.thumbnail?.url}` || "/images/default-thumbnail.jpg"}
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
            <div className="mb-6">
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
                                  isLoading || !isAccepted  ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                                }`}
                                disabled={isLoading || !isAccepted}
                              >
                                {isLoading ? "Sending..." : "Submit"}
                              </button>
                            </form>
                          </div>
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
                        `https://app.jmvisaservices.com${relatedBlog.thumbnail?.url}` || "/images/default-thumbnail.jpg"
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
