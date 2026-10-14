"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import productsData from "@/data/productsdetail.json";

const products = productsData.products;

const categories = ["ALL","PRE-WORKOUT","FAT BURNER", "ATP BOOSTER", "MUSCLE HYDRATION"];

function ProductCard({ product }) {
  return (
    <div className="relative group">
      <div className="relative bg-[#0d0d0d] border border-white/5 group-hover:border-red-600/40 rounded-2xl overflow-hidden transition-all duration-500">
        {/* Product Image */}
        <div className="relative h-[180px] sm:h-[200px] md:h-[220px] bg-gradient-to-br from-red-950/60 via-black to-black flex items-center justify-center overflow-hidden">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.featuredimg}
              alt={product.name}
              width={280}
              height={260}
              className="object-contain z-10 group-hover:scale-110 transition-transform duration-500 h-[150px] sm:h-[170px] md:h-[200px] w-auto"
            />
          </Link>
        </div>

        {/* Card Body */}
        <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3">
          <div>
            <p className="text-gray-500 text-[10px] sm:text-xs tracking-widest mt-1 font-bold text-center uppercase">
              {product.category}
            </p>

            <Link href={`/product/${product.slug}`}>
              <h3 className="text-red-700 font-black text-xl sm:text-2xl md:text-5xl creepster-regular text-center group-hover:text-red-400 transition-colors truncate">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="border-t border-white/5" />

          <p className="text-gray-300 text-xs sm:text-sm text-center line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-white font-black text-sm sm:text-2xl">
              ${product.servings?.[0]?.price}
            </span>

            <Link href={`/product/${product.slug}`}>
              <button className="bg-red-600 hover:bg-red-500 text-white text-[10px] sm:text-xs font-black tracking-widest px-3 sm:px-4 py-2 rounded-xl transition-all active:scale-95 whitespace-nowrap">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const activeCategory = categories.includes(categoryFromUrl)
    ? categoryFromUrl
    : "ALL";

  const [sortBy, setSortBy] = useState("DEFAULT");
  const [searchQuery, setSearchQuery] = useState("");

 
  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "ALL") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    const queryString = params.toString();
    const currentPath = window.location.pathname;

    router.push(
      queryString ? `${currentPath}?${queryString}` : currentPath,
      { scroll: false }
    );
  };

  // Filter and sort products
  const filtered = products
    .filter((product) => {
      const matchesCategory =
        activeCategory === "ALL" ||
        product.category === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const priceA = Number(a.servings?.[0]?.price ?? a.price ?? 0);
      const priceB = Number(b.servings?.[0]?.price ?? b.price ?? 0);

      if (sortBy === "PRICE_LOW") {
        return priceA - priceB;
      }

      if (sortBy === "PRICE_HIGH") {
        return priceB - priceA;
      }

      return 0;
    });

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Heading */}
        <h1 className="text-center heading creepster-regular mb-8 sm:mb-12">
          PRODUCTS
        </h1>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryChange(category)}
              className={`text-[11px] sm:text-sm font-black tracking-widest px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg border transition-all duration-200 ${
                activeCategory === category
                  ? "bg-red-600 border-red-600 text-white"
                  : "border-white/10 text-gray-500 hover:border-red-600 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex gap-2 sm:gap-4 justify-center mb-8 sm:mb-10 px-0 sm:px-4">
          {/* Search */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full bg-gray-800 border border-white/10 pl-8 pr-4 py-2 rounded-lg text-xs sm:text-sm outline-none focus:border-red-600/50 transition-colors placeholder:text-gray-600"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="bg-black border border-white/10 pl-8 pr-3 py-2 rounded-lg text-xs sm:text-sm appearance-none cursor-pointer focus:border-red-600/50 transition-colors"
            >
              <option value="DEFAULT">SORT</option>
              <option value="PRICE_LOW">LOW → HIGH</option>
              <option value="PRICE_HIGH">HIGH → LOW</option>
            </select>
          </div>
        </div>

        {/* No Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-red-600 text-4xl font-black creepster-regular">
              NO RESULTS
            </p>

            <p className="text-gray-600 text-sm mt-2 tracking-widest">
              TRY A DIFFERENT SEARCH
            </p>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id ?? product.slug}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
