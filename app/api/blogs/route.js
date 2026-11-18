import { NextResponse } from "next/server";
import { fetchBlogs } from "@/lib/api";

// Proxy for client components; falls back to the local blog snapshot if the API fails.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ?? "1";
  return NextResponse.json(await fetchBlogs(page));
}
