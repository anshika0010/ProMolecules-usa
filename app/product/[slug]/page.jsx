import productsData from "@/language/English/productDetails.json";
import ProductPageClient from "./ProductPageClient";
import Messages from "@/lib/i18n/Messages";
import { getProducts, getProductSummaries } from "@/lib/i18n/server";

export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    slug: product.slug,
  }));
}

// ✅ SEO — har product ka alag metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = (await getProducts()).find((p) => p.slug === slug);

  if (!product?.seo) {
    return {
      title: "Product | Promolecules™",
      description: "Premium supplements by Promolecules.",
    };
  }

  const seo = product.seo;

  const robotsObj = {
    index: true,
    follow: true,
  };

  seo.robots?.split(",").forEach((r) => {
    const key = r.trim().toLowerCase();

    if (key === "index") robotsObj.index = true;
    if (key === "noindex") robotsObj.index = false;

    if (key === "follow") robotsObj.follow = true;
    if (key === "nofollow") robotsObj.follow = false;
  });

  return {
    title: seo.title,
    description: seo.description,

    // ✅ Keywords
    keywords: seo.keywords,

    // ✅ Author
    authors: seo.author
      ? [
          {
            name: seo.author,
          },
        ]
      : [],

    // ✅ Publisher
    publisher: seo.publisher,

    // ✅ Canonical
    alternates: {
      canonical: seo.canonical,
    },

    // ✅ Open Graph
    openGraph: {
      title: seo.og?.title,
      description: seo.og?.description,
      url: seo.og?.url,
      siteName: seo.og?.site_name,
      locale: seo.og?.locale,
      type:
        seo.og?.type === "product"
          ? "website"
          : seo.og?.type || "website",

      images: seo.og?.image
        ? [
            {
              url: seo.og.image,
              alt: seo.og?.image_alt,
            },
          ]
        : [],
    },

    // ✅ Twitter
    twitter: {
      card: seo.twitter?.card || "summary_large_image",
      site: seo.twitter?.site,
      title: seo.twitter?.title,
      description: seo.twitter?.description,
      images: seo.twitter?.image
        ? [
            {
              url: seo.twitter.image,
              alt: seo.twitter?.image_alt,
            },
          ]
        : [],
    },

    // ✅ Robots
    robots: {
      index: robotsObj.index,
      follow: robotsObj.follow,

      googleBot: {
        index: robotsObj.index,
        follow: robotsObj.follow,
      },
    },

    // ✅ Extra Meta Tags
    other: {
      publisher: seo.publisher,
      language: seo.language,
      googlebot: seo.googlebot,
      bingbot: seo.bingbot,
      distribution: seo.distribution,
      rating: seo.rating,
      "revisit-after": seo.revisit_after,

      "geo.region": seo.geo?.region,
      "geo.placename": seo.geo?.placename,

      "application-name": "Promolecules™",
      "apple-mobile-web-app-title": "Promolecules™",
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = (await getProducts()).find((p) => p.slug === slug);

  if (!product) {
    return <div className="text-white p-10">Product Not Found</div>;
  }
  const moreProducts = await getProductSummaries();

  // JSON-LD structured data
  const jsonld = product?.seo?.ldjson
    ? JSON.stringify(product.seo.ldjson)
    : null;

  return (
    <>
      {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonld }}
        />
      )}
      <Messages ns={["product"]}>
        <ProductPageClient product={product} moreProducts={moreProducts} />
      </Messages>
    </>
  );
}