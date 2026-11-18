const SITE_URL = "https://www.promolecules.com";

const HEADERS = {
  "x-tenant": "promolecules.com",
  "Content-Type": "application/json",
};

// Fetch blogs by page
async function fetchBlogs(page = 1) {
  try {
    const res = await fetch(
      `https://magnus.cost2costsupplement.com/api/v1/blogs?page=${page}`,
      {
        headers: HEADERS,
        next: {
          revalidate: 3600,
          tags: [`blogs-page-${page}`],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch page ${page}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Blog Fetch Error (Page ${page}):`, error);
    return null;
  }
}

export default async function sitemap() {
  // Static Routes
  const staticRoutes = [
    {
      path: "/",
      priority: 1.0,
      changeFrequency: "daily",
    },

    {
      path: "/about/",
      priority: 0.8,
      changeFrequency: "monthly",
    },
       {
      path: "/hydrapump-liquid-glycerol-pre-workout-supplement/",
      priority: 1.0,
      changeFrequency: "daily",
    },
 {
      path: "/high-stim-pre-workout/",
      priority: 1.0,
      changeFrequency: "daily",
    },


    {
      path: "/blog/",
      priority: 0.9,
      changeFrequency: "daily",
    },

    {
      path: "/contact-us/",
      priority: 0.7,
      changeFrequency: "monthly",
    },

   

    {
      path: "/domestic/",
      priority: 0.8,
      changeFrequency: "weekly",
    },

    {
      path: "/international/",
      priority: 0.8,
      changeFrequency: "weekly",
    },

    {
      path: "/merch/",
      priority: 0.8,
      changeFrequency: "weekly",
    },

    {
      path: "/privacy-policy/",
      priority: 0.3,
      changeFrequency: "yearly",
    },

    {
      path: "/product/",
      priority: 0.8,
      changeFrequency: "weekly",
    },

    {
      path: "/shop/",
      priority: 0.9,
      changeFrequency: "daily",
    },

    // Product Pages
    {
      path: "/product/father-of-insane/",
      priority: 1.0,
      changeFrequency: "daily",
    },

    {
      path: "/product/warflex/",
      priority: 1.0,
      changeFrequency: "daily",
    },

    {
      path: "/product/inopower-r/",
      priority: 1.0,
      changeFrequency: "daily",
    },

    {
      path: "/product/hydrapump/",
      priority: 1.0,
      changeFrequency: "daily",
    },

    {
      path: "/product/thermo-nuke-xt/",
      priority: 1.0,
      changeFrequency: "daily",
    },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  // Dynamic Blog Routes
  let blogRoutes = [];

  try {
    let page = 1;
    const MAX_PAGES = 50;

    while (page <= MAX_PAGES) {
      const data = await fetchBlogs(page);

      if (!data) break;

      const blogs = data?.data || [];

      // Stop if empty
      if (!blogs.length) break;

      const routes = blogs.map((blog) => ({
        url: `${SITE_URL}/blog/${blog.slug}/`,
        lastModified: new Date(
          blog.updatedAt || blog.createdAt || Date.now()
        ),
        changeFrequency: "weekly",
        priority: 0.7,
      }));

      blogRoutes.push(...routes);

      // Pagination meta
      const totalPages =
        data?.meta?.last_page ||
        data?.meta?.totalPages ||
        data?.last_page;

      if (totalPages && page >= totalPages) {
        break;
      }

      page++;
    }
  } catch (error) {
    console.error("Sitemap Blog Error:", error);
  }

  return [...staticRoutes, ...blogRoutes];
}