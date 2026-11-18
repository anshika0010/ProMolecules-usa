"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useT, useLocale } from "@/lib/i18n/client";

function formatDate(dateStr, locale) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(locale === "en" ? "en-GB" : locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

const BLOGS_PER_PAGE = 9;
const ALL = "__all__";

export default function BlogClient({ blogs = [] }) {
  const t = useT("blog").page?.blog_listing || {};
  const { locale } = useLocale();
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [visibleCount, setVisibleCount] = useState(BLOGS_PER_PAGE);
  const loaderRef = useRef(null);

  const categories = [
    ALL,
    ...new Set(blogs.map((b) => b.category.name)),
  ];

  // Category change hone pe reset karo
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCount(BLOGS_PER_PAGE); // ✅ reset to 9
  };

  const filtered =
    activeCategory === ALL
      ? blogs
      : blogs.filter((b) => b.category.name === activeCategory);

  const visibleBlogs = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // ✅ Intersection Observer — scroll pe next 9 load karo
  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setVisibleCount((prev) => prev + BLOGS_PER_PAGE);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px", // 100px pehle trigger hoga
      threshold: 0.1,
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [handleObserver]);

  return (
    <div className="bg-black text-[#f0ece4] min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full min-h-[50vh] lg:min-h-screen overflow-hidden text-white">
        <Image
          src="/promolecules-bloghero-benner-image.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[50vh] lg:min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-10 w-full items-center">
            <div className="max-w-md">
              <p className="text-xs sm:text-sm uppercase font-bold tracking-wider leading-relaxed text-white/90">
                {t.hero_tagline}
              </p>
            </div>
            <div className="text-start lg:text-end space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl creepster-regular uppercase font-bold">
                <span className="block text-white tracking-widest">{t.hero_title?.[0]}</span>
                <span className="block text-red-600 tracking-widest">{t.hero_title?.[1]}</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <div className="w-full overflow-x-auto my-8">
        <div className="flex flex-nowrap justify-start md:justify-center gap-4 min-w-max px-2">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition ${
                activeCategory === cat
                  ? "bg-red-600 text-white"
                  : "border border-white/20 text-white/70 hover:border-red-600 hover:text-white"
              }`}
            >
              {cat === ALL ? t.categories?.view_all : cat}
            </button>
          ))}
        </div>
      </div>

      {/* BLOG GRID */}
      <section className="px-6 lg:px-20 py-8">
        {visibleBlogs.length === 0 ? (
          <p className="text-center text-gray-500">{t.empty_state}</p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {visibleBlogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="bg-[#111] group transition rounded-md hover:-translate-y-1 flex flex-col shadow-md shadow-red-400"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={blog.featured_image || "/dummyimage.webp"}
                    alt={blog.name}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest">
                    <span className="text-red-600">{blog.category.name}</span>
                    <span className="w-[3px] h-[3px] bg-gray-600 rounded-full"></span>
                    <span className="text-gray-500">{formatDate(blog.publish_date, locale)}</span>
                  </div>

                  <h2 className="text-md font-bold group-hover:text-red-600 transition line-clamp-1">
                    {blog.name}
                  </h2>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t.by} {blog.author?.name}
                    </p>
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-black transition">
                      ↗
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2 flex-wrap">
                      {(Array.isArray(blog.tags)
                        ? blog.tags
                        : typeof blog.tags === "string"
                        ? blog.tags.split(",")
                        : []
                      ).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] border border-neutral-700 px-2 py-[1px] uppercase tracking-wider text-gray-500 rounded-full"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ✅ Loader — jab ye screen pe aaye, next 9 load ho */}
        <div ref={loaderRef} className="w-full flex justify-center py-10">
          {hasMore ? (
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest">
              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              {t.loading}
            </div>
          ) : (
            visibleBlogs.length > 0 && (
              <p className="text-gray-600 text-xs uppercase tracking-widest">
                {t.loaded}
              </p>
            )
          )}
        </div>
      </section>
    </div>
  );
}