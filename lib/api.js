import fallbackBlogs from "@/data/blogsFallback.json";

const BASE_URL = "https://magnus.cost2costsupplement.com/api/v1";
const HEADERS = {
  "x-tenant": "promolecules.com",
  "Content-Type": "application/json",
};

// Local snapshot of the blogs, used when the blog API is down or returns an error
// (e.g. {"status":404,"message":"Tenant not found"}), so blog pages never go empty.
function fallbackPage(page = 1) {
  return Number(page) === 1
    ? fallbackBlogs
    : { ...fallbackBlogs, data: [], pagination: { ...fallbackBlogs.pagination, current_page: Number(page) } };
}

// Fetch one page from the API; returns null if the API fails.
async function fetchPage(page, next) {
  try {
    const res = await fetch(`${BASE_URL}/blogs?page=${page}`, { headers: HEADERS, next });
    if (!res.ok) return null;
    const json = await res.json();
    return Array.isArray(json?.data) && json.data.length ? json : null;
  } catch {
    return null;
  }
}

// ✅ Blog list — 10 min cache
export async function fetchBlogs(page = 1) {
  const json = await fetchPage(page, { revalidate: 600, tags: [`blogs-page-${page}`] });
  return json ?? fallbackPage(page);
}

// ✅ All blogs (detail page ke liye)
export async function fetchAllBlogs() {
  const next = { revalidate: 300, tags: ["all-blogs"] };
  const [json1, json2] = await Promise.all([fetchPage(1, next), fetchPage(2, next)]);
  const live = [...(json1?.data ?? []), ...(json2?.data ?? [])];
  if (!live.length) return fallbackBlogs.data;

  // Keep any fallback blog the live API is missing, so old links keep working.
  const slugs = new Set(live.map((b) => b.slug));
  return [...live, ...fallbackBlogs.data.filter((b) => !slugs.has(b.slug))];
}

// ✅ Single blog by slug
export async function fetchBlogBySlug(slug) {
  const allBlogs = await fetchAllBlogs();
  return allBlogs.find((b) => b.slug === slug) ?? null;
}
