"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useT, useLocale } from "@/lib/i18n/client";

// ✅ Hydration fix — locale hardcode karo, browser locale use mat karo
function formatDate(dateStr, locale) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-GB" : locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", 
  });
}

export default function BlogDetailClient({ blog }) {
  const t = useT("blog").page?.blog_detail || {};
  const { locale } = useLocale();
  if (!blog) {
    return (
      <div className="bg-[#0a0a0a] min-h-screen flex flex-col mt-6">
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1 gap-6 mt-32">
          <h1 className="text-5xl font-bold text-red-600 creepster-regular uppercase tracking-widest">
            {t.not_found_title}
          </h1>
          <p className="text-gray-500 text-sm uppercase tracking-widest">
            {t.not_found_description}
          </p>
        </div>
      </div>
    );
  }

  const initial = blog.author?.name?.charAt(0)?.toUpperCase() ?? "A";

  return (
    <div className="bg-[#0a0a0a] text-[#f0ece4] min-h-screen max-w-7xl mx-auto ">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full h-[60vh]  overflow-hidden">
    <Image
  src={blog.featured_image ?? "/blogdummy.webp"}
  alt={blog.name}
  fill
  priority
  className="object-contain brightness-40 z-0"
/>

<div className="absolute inset-0 z-20 flex flex-col justify-end pb-12 px-6 max-w-4xl mx-auto left-0 right-0 w-full">          <div className="flex items-center gap-3 mb-5 text-xs uppercase tracking-widest">
            <span className="bg-red-600 text-white px-3 py-1 font-bold">
              {blog.category?.name ?? t.category_fallback}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">
           {blog.publish_date}
            </span>
          </div>

          {/* <h1 className="creepster-regular text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white leading-tight">
            {blog.name}
          </h1> */}

          <div className="flex items-center gap-3 mt-6">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {initial}
            </div>
            <div>
              <p className="text-sm text-white font-semibold">
                {blog.author?.name}
              </p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                {t.author_label}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className=" relative max-w-7xl mx-auto px-6 py-14">
        

        <div className="w-full h-[2px] bg-gradient-to-r rtl:bg-gradient-to-l from-red-600 via-red-600/40 to-transparent mb-12" />

        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        <div className="w-full h-[2px] bg-gradient-to-r rtl:bg-gradient-to-l from-red-600 via-red-600/40 to-transparent mt-14 mb-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {initial}
            </div>
            <div>
              <p className="text-white font-semibold">{t.brand}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                {t.published_prefix} {formatDate(blog.publish_date, locale)}
              </p>
            </div>
          </div>
          <Link
            href="/blog"
            className="px-6 py-3 border border-red-600 text-red-500 text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition"
          >
            <span className="inline-block rtl:rotate-180">←</span> {t.back_to_all_blogs}
          </Link>
        </div>
      </div>
    </div>
  );
}
