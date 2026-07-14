// lib/seo.js

import seoData from "@/data/seoData.json";

export function getSEOMetadata(pageKey) {
  const seo = seoData[pageKey];

  if (!seo) {
    console.warn(
      `SEO data not found for key: "${pageKey}", falling back to home`
    );
    return getSEOMetadata("home");
  }

  // Robots
  const robotsObj = {
    index: true,
    follow: true,
  };

  if (seo.robots) {
    seo.robots.split(",").forEach((item) => {
      const key = item.trim().toLowerCase();

      if (key === "index") robotsObj.index = true;
      if (key === "noindex") robotsObj.index = false;

      if (key === "follow") robotsObj.follow = true;
      if (key === "nofollow") robotsObj.follow = false;
    });
  }

  return {
    title: seo.title,
    description: seo.description,

    // Keywords
    keywords: seo.keywords,

    // Canonical
    alternates: {
      canonical: seo.canonical,
    },

    // Author & Publisher
    authors: seo.author
      ? [
          {
            name: seo.author,
          },
        ]
      : [],

    publisher: seo.publisher,

    // Open Graph
    openGraph: {
      title: seo.og?.title,
      description: seo.og?.description,
      url: seo.og?.url,
      siteName: seo.og?.site_name,
      locale: seo.og?.locale,
      type: seo.og?.type || "website",
      images: seo.og?.image
        ? [
            {
              url: seo.og.image,
              alt: seo.og.image_alt || seo.og.title,
            },
          ]
        : [],
    },

    // Twitter
    twitter: {
      card: seo.twitter?.card || "summary_large_image",
      title: seo.twitter?.title,
      description: seo.twitter?.description,
      images: seo.twitter?.image ? [seo.twitter.image] : [],
      creator: seo.twitter?.creator,
      site: seo.twitter?.site,
    },

    // Robots
    robots: {
      index: robotsObj.index,
      follow: robotsObj.follow,
      googleBot: {
        index: robotsObj.index,
        follow: robotsObj.follow,
      },
    },

    // Extra Meta Tags
    other: {
      language: seo.language,
      publisher: seo.publisher,
      distribution: seo.distribution,
      rating: seo.rating,
      "revisit-after": seo.revisit_after,
      googlebot: seo.googlebot,
      bingbot: seo.bingbot,
      "geo.region": seo.geo?.region,
      "geo.placename": seo.geo?.placename,
    },
  };
}

// JSON-LD Schema
export function getJSONLD(pageKey) {
  const seo = seoData[pageKey];

  if (!seo || !seo.ldjson) return null;

  return JSON.stringify(
    Array.isArray(seo.ldjson) ? seo.ldjson : [seo.ldjson]
  );
}