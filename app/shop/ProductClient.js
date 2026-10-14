// app/product/ProductClient.js
"use client";

import { useState } from "react";
import TrendingCategory from "@/components/TrendingCategory";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ProductClient({ jsonld }) {

  const products = [
    {
      title: "Father of Insane",
      image: "/father-of-insane-pre-workout-65-Servings.webp",
      price: "$1599",
      description:
        "Nitrox boosts explosive power and stamina with advanced nitric oxide technology.",
      thumbnail: "/father-of-insane.webp",
      link: "/product/father-of-insane",
    },
    {
      title: "Warflex",
      image: "/warflex-pre-workout-35-Servings.webp",
      price: "$1899",
      description:
        "Hybrid pre workout built for real performance Combines energy, pump, and focus Balanced high-stim formula.",
      thumbnail: "/warflex-thumbnail.webp",
      link: "/product/warflex",
    },

    {
      title: "Inopower-R",
      image: "/promolecules-inpower-r.webp",
      price: "$2099",
      description:
        "Clean energy without caffeine dependency Built on ATP energy system Supports endurance at cellular level.",
      thumbnail: "/inpower.webp",
      link: "/product/inopower-r/",
    },
    {
      title: "Thermo Nuke XT",
      image: "/thermonuke.png",
      price: "$1799",
      description:
        "Built for serious fat loss phases Targets metabolism, not just stimulation.Thermogenic formula that increases heat output.",
      thumbnail: "/thermo-thumbnail.webp",
      link: "/product/thermo-nuke-xt/",
    },
    {
      title: "Hydrapump+",
      image: "/hydra.webp",
      price: "$1799",
      description:
        "Hydrapump + is a liquid glycerol-based pump system built for real muscle performance.",
      thumbnail: "/hydrapump-thumbnail.webp",
      link: "/product/hydrapump",
    },
  ];

  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <>
      {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonld }}
        />
      )}

      <section
        className="relative max-w-[1600px] mx-auto bg-black text-white overflow-hidden bg-cover bg-center bg-no-repeat pt-1"
        style={{ backgroundImage: "url('/smoke2.gif')" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          {/* ── DESKTOP LAYOUT (lg+) ── */}
          <div className="hidden lg:flex flex-row items-center justify-between gap-18">
            {/* LEFT: text + thumbnails */}
            <div className="flex-1 space-y-6 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5 }}
                >
                  {activeProduct?.link && (
                    <Link href={activeProduct.link}>
                      <h1 className="text-4xl md:text-7xl font-bold creepster-regular text-red-600 uppercase tracking-wide line-camp-1 hover:underline">
                        {activeProduct.title}
                      </h1>
                    </Link>
                  )}
                  <p className="global-text-style py-6 max-w-md">
                    {activeProduct.description}
                  </p>
                  {activeProduct?.link && (
                    <Link href={activeProduct.link}>
                      <button className="bg-red-600 mt-4 cursor-pointer hover:bg-red-700 active:scale-95 transition-all px-4 py-2.5 sm:px-6 sm:py-3 rounded-2xl text-[10px] sm:text-xs uppercase tracking-wider font-semibold w-full sm:w-auto">
                        View Details →
                      </button>
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Thumbnails */}
              <div className="relative z-10 pt-[200px]">
                <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
                  {products.map((product, index) => {
                    const isActive = activeProduct.title === product.title;
                    return (
                      <div
                        key={index}
                        onClick={() => setActiveProduct(product)}
                        className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 transition cursor-pointer rounded-lg border
  ${
    isActive
      ? "shadow-[0_0_25px_rgba(220,38,38,0.9)] scale-110 opacity-100 grayscale-0"
      : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0"
  }`}
                      >
                        <Image
                          src={product.thumbnail}
                          alt="Thumbnail"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: product image */}
            <div className="flex-1 relative w-full h-[600px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.image}
                  initial={{ opacity: 1, x: "40vw" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 1, x: "-90vw" }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeProduct.image}
                    alt="Product"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── MOBILE / TABLET LAYOUT (<lg) ── */}
          <div className="flex lg:hidden flex-col items-center gap-6 w-full">
            {/* 1. THUMBNAILS ROW */}
            <div className="flex flex-wrap justify-center gap-3 w-full">
              {products.map((product, index) => {
                const isActive = activeProduct.title === product.title;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveProduct(product)}
                    className={`relative w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 transition cursor-pointer rounded-lg border
                      ${
                        isActive
                          ? "shadow-[0_0_20px_rgba(220,38,38,0.9)] scale-110 opacity-100"
                          : "opacity-55 hover:opacity-90"
                      }`}
                  >
                    <Image
                      src={product.thumbnail}
                      alt="Thumbnail"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                );
              })}
            </div>

            {/* 2. PRODUCT IMAGE */}
            <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[380px] md:h-[440px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct.image}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeProduct.image}
                    alt="Product"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3. TEXT + CTA */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.title + "-mobile"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-3 w-full max-w-md px-2"
              >
                <h3 className="text-3xl xs:text-4xl sm:text-5xl font-bold creepster-regular text-red-600 uppercase">
                  {activeProduct.title}
                </h3>
                <p className="global-text-style">{activeProduct.description}</p>
                {activeProduct?.link && (
                  <Link href={activeProduct.link}>
                    <button className="bg-red-600 mt-2 hover:bg-red-700 transition px-6 py-3 rounded-2xl text-xs uppercase tracking-wider font-semibold">
                      View Details →
                    </button>
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <TrendingCategory />
    </>
  );
}
