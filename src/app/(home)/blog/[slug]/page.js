import React from "react";
import { PortableText } from '@portabletext/react';
import Image from "next/image";
import { BiMessageDetail } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { getPostBySlug, getAllPosts, client } from "../../../../sanity/lib/client";
import { urlFor } from "../../../../sanity/lib/client";
import Link from "next/link";

export const revalidate = 60;

// ✅ Generate Dynamic Metadata
export async function generateMetadata({ params }) {
  const slugParam = params.slug;
  // Fetch post data from Sanity
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    metaDescription,
    "slug": slug.current,
    "thumbnail": coalesce(mainImage.externalImage, mainImage.sanityImage.asset->url, mainImage.asset->url),
    "shortDescription": coalesce(shortDescription, excerpt, ""),
    "date": publishedAt,
    "timeToRead": timeToRead,
    "author": author->{name},
    "seo": {
      metaTitle,
      metaDescription,
      ogTitle,
      ogDescription,
      ogUrl,
      ogType,
      ogLocale,
      ogLocaleAlternate,
      ogSiteName,
      "ogImage": ogImage.asset->url,
      ogImageWidth,
      ogImageHeight,
      ogImageType,
      articlePublishedTime,
      articleModifiedTime,
      twitterCard,
      twitterTitle,
      twitterDescription,
      "twitterImage": twitterImage.asset->url,
      twitterAuthor,
      twitterLabel1,
      twitterData1,
      twitterLabel2,
      twitterData2,
      keywords,
      canonicalUrl,
      noIndex,
      msapplicationTileImage
    }
  }`;
  const post = await client.fetch(query, { slug: slugParam });
  if (!post) {
    return { title: "Blog | JM Visa", description: "This blog post does not exist." };
  }

  // Helper to truncate description for SEO
  function truncate(str, n) {
    return (str && str.length > n) ? str.slice(0, n - 1) + "…" : str;
  }

  // Basic metadata
  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = truncate(post.metaDescription || post.seo?.metaDescription || post.shortDescription || "Read this article on JM Visa.", 155);
  
  // Open Graph
  const ogTitle = metaTitle;
  const ogDescription = truncate(post.metaDescription || post.seo?.ogDescription || post.shortDescription || metaDescription, 155);
  const ogUrl = post.seo?.ogUrl || `https://jmvisa.com/blog/${post.slug}`;
  const ogType = post.seo?.ogType || 'article';
  const ogLocale = post.seo?.ogLocale || 'en_US';
  const ogLocaleAlternate = (post.seo?.ogLocaleAlternate && post.seo.ogLocaleAlternate.length > 0)
    ? post.seo.ogLocaleAlternate
    : [
        "en_US", "en_GB", "fr_FR", "de_DE", "es_ES", "it_IT", "pt_PT", "ru_RU", "zh_CN", "ja_JP", "ko_KR", "hi_IN"
      ];
  const ogSiteName = post.seo?.ogSiteName || 'JM Visa';
  const ogImage = post.seo?.ogImage || post.thumbnail;

  // Twitter
  const twitterCard = post.seo?.twitterCard || 'summary_large_image';
  const twitterTitle = post.seo?.twitterTitle || ogTitle;
  const twitterDescription = post.seo?.twitterDescription || ogDescription;
  const twitterImage = post.seo?.twitterImage || ogImage;
  
  // Other SEO
  const keywords = post.seo?.keywords || [];
  const canonicalUrl = post.seo?.canonicalUrl || ogUrl;
  const publishedTime = post.seo?.articlePublishedTime || post.date;
  
  const metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords.join(', '),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      type: ogType,
      locale: ogLocale,
      alternateLocale: ogLocaleAlternate,
      siteName: ogSiteName,
      images: [
        { url: ogImage, width: post.seo?.ogImageWidth || 1200, height: post.seo?.ogImageHeight || 630, alt: post.title, type: post.seo?.ogImageType || 'image/webp' }
      ],
      article: { publishedTime, modifiedTime: post.seo?.articleModifiedTime, authors: [post.author?.name] }
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
      creator: post.seo?.twitterAuthor || post.author?.name
    },
    authors: [{ name: post.author?.name }],
    other: {
      'twitter:label1': post.seo?.twitterLabel1 || 'Written by',
      'twitter:data1': post.seo?.twitterData1 || post.author?.name,
      'twitter:label2': post.seo?.twitterLabel2 || 'Est. reading time',
      'twitter:data2': post.seo?.twitterData2 || `${post.timeToRead || 5} minutes`,
      'msapplication-TileImage': post.seo?.msapplicationTileImage || ''
    },
    alternates: { canonical: canonicalUrl },
    robots: post.seo?.noIndex ? { index: false, follow: true } : undefined
  };
  
  return metadata;
}

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

import BlogForm from "../../../../components/blog/BlogForm";

async function BlogDetailsPage({ params }) {
  const { slug } = params;
  
  try {
    const blog = await getPostBySlug(slug);
    const allPosts = await getAllPosts();
    const relatedBlogs = allPosts
      .filter(post => post.slug.current !== slug)
      .slice(0, 3);

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
                <Link
                  href="/blog"
                  className="py-3 text-blue-500 font-semibold transition"
                >
                  ← Back to Blogs
                </Link>
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
            </div>

            {/* Related Blogs and Contact Form */}
            <BlogForm blog={blog} relatedBlogs={relatedBlogs} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Error loading blog post. Please try again later.</p>
      </div>
    );
  }
};

export default BlogDetailsPage;
