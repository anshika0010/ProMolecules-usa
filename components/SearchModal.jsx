"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import productsData from "@/language/English/productDetails.json";
import { useT } from "@/lib/i18n/client";

const ALL_PRODUCTS = productsData.products.map((p) => ({
  slug: p.slug,
  name: p.name,
  category: p.category,
  image: p.featuredimg || p.images[0],
  price: p.variants[0].price,        
}));

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const tp = useT("product");
  const t = tp.searchModal || {};
  const categoryLabel = (value) =>
    (tp.categories || []).find((c) => c.value === value)?.label || value;

  // Auto focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      setResults([]);
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        categoryLabel(p.category).toLowerCase().includes(q)
    );
    setResults(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 z-[90] flex flex-col max-h-[90vh] mx-auto max-w-2xl mt-6 sm:mt-16 mx-4 sm:mx-auto rounded-2xl bg-[#0d0d0d] border border-white/10 overflow-hidden shadow-2xl shadow-black/60">
        
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b border-white/10">
          <Search size={20} className="text-red-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 bg-transparent text-white placeholder-white/30 text-base sm:text-lg outline-none font-barlowCondensed tracking-wider"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label={t.clear}
              className="text-white/30 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label={t.close}
            className="text-white/30 hover:text-white transition-colors ms-1 border border-white/10 rounded-lg p-1.5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="overflow-y-auto flex-1 scrollbar-hide">
          {/* No query state */}
          {!query && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-6">
              <Search size={40} className="text-white/10" />
              <p className="text-white/30 text-sm tracking-widest uppercase font-barlowCondensed">
                {t.typeToSearch}
              </p>
            </div>
          )}

          {/* No results */}
          {query && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-6">
              <p className="text-white/20 text-sm tracking-widest uppercase font-barlowCondensed">
                {t.noResults} &quot;{query}&quot;
              </p>
            </div>
          )}

          {/* Results list */}
          {results.length > 0 && (
            <ul className="divide-y divide-white/5">
              {results.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-4 sm:px-5 py-4 hover:bg-white/5 transition-colors group"
                  >
                    {/* Image */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#111] border border-white/10 overflow-hidden shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm sm:text-base uppercase tracking-wider truncate font-barlowCondensed">
                        {product.name}
                      </p>
                      <p className="text-red-500 text-xs tracking-widest uppercase mt-0.5">
                        {categoryLabel(product.category)}
                      </p>
                    </div>

                    {/* Price + Arrow */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-white font-black text-sm sm:text-base">
                        ${product.price}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-white/20 group-hover:text-red-500 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 transition-all duration-200"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-white/20 text-xs tracking-widest uppercase">
            {results.length > 0 ? `${results.length} ${results.length > 1 ? t.results : t.result}` : ""}
          </span>
          <span className="text-white/20 text-xs tracking-widest">
            {t.escToClose}
          </span>
        </div>
      </div>
    </>
  );
}