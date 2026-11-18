// app/blog/[slug]/page.js

import { fetchAllBlogs } from "@/lib/api";
import BlogDetailClient from "./BlogDetailClient";
import Messages from "@/lib/i18n/Messages";

async function getBlog(slug) {
  try {
    const allBlogs = await fetchAllBlogs();
    return allBlogs.find((b) => b.slug === slug) ?? null;
  } catch {
    return null;
  }
}

/* ─── SEO: generateMetadata ──────────────────────────────── */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog post could not be found.",
    };
  }

  const seo = blog.seo; // kuch blogs mein null hoga

  // SEO fields ke liye safe fallbacks
  const title = seo?.meta_title || blog.name || "Blog";
  const description =
    seo?.meta_description ||
    blog.description?.replace(/<[^>]*>/g, "").slice(0, 160) || // HTML strip karke first 160 chars
    "";
  const ogImage =
    seo?.og_image ||
    blog.featured_image || // featured_image agar available hai
    "https://www.earthmaafoods.com/images/earthmaalogo-blue.webp";

  return {
    title,
    description,
    keywords: seo?.meta_keywords || "",
    authors: seo?.meta_author
      ? [{ name: seo.meta_author }]
      : blog.author?.name
      ? [{ name: blog.author.name }]
      : [],
    robots: seo?.meta_robots || "index,follow",
    alternates: {
      canonical:
        seo?.canonical_tag ||
        `https://www.earthmaafoods.com/blog/${slug}/`,
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      url: seo?.og_url || `https://www.earthmaafoods.com/blog/${slug}/`,
      type: "article",
      publishedTime: blog.publish_date || null,
      authors: [blog.author?.name || "EarthmaaFoods"],
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitter_title || title,
      description: seo?.twitter_description || description,
      images: [seo?.twitter_image || ogImage],
    },
  };
}

/* ─── Static Params ──────────────────────────────────────── */
export async function generateStaticParams() {
  try {
    const allBlogs = await fetchAllBlogs();
    return allBlogs.map((blog) => ({ slug: blog.slug }));
  } catch {
    return [];
  }
}

/* ─── Page Component ─────────────────────────────────────── */
export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  // JSON-LD Schema — sirf tab inject karo jab seo aur schema exist kare
  const schema = blog?.seo?.schema ?? null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <Messages ns={["blog"]} locale="en">
        <BlogDetailClient blog={blog} />
      </Messages>
    </>
  );
}