"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useT } from "@/lib/i18n/client";

const FEATURE_IMAGES = [
    {
      id: 1,
      image: "/focus.jpg",
      alt: "Razor Focus Skeleton",
    },
    {
      id: 2,
      image: "/energy.jpg",
      alt: "Extreme Energy Skeleton",
    },
    {
      id: 3,
      image: "/strength.jpg",
      alt: "Strength and Stamina Anatomy",
    },
];

const UltraHighPerformanceSection = () => {
  const t = useT("home").ultra_high_performance_section || {};
  const features = (t.features || []).map((f, i) => ({ ...FEATURE_IMAGES[i], ...f }));

  return (
    <section className="relative bg-black max-w-7xl mx-auto overflow-hidden py-4  lg:py-6">
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6">
        {/* Main Title */}
        <div className="flex justify-center text-center mb-12 sm:mb-16">
          <div className="relative flex flex-col items-center">
            <h1 className="creepster-regular heading">
              {t.main_title}
            </h1>

            <div className="h-1 bg-red-600  w-24 sm:w-40 md:w-60 lg:w-full max-w-[900px] rounded-full" />

            <h3 className="creepster-regular heading"
            >
              {t.subtitle}
            </h3>

            <div className="h-1 bg-red-600  w-16 sm:w-24 rounded-full" />
          </div>
        </div>

        

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="group relative">
              <div className="space-y-6 text-center">
                {/* ✅ Image FIRST */}
             <motion.div
  initial={{ y: 80, opacity: 0 }}
  whileInView={{ y: 0, opacity: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="relative mx-auto w-full max-w-2xl"
>
  <div className="relative rounded-lg">
    <div className="relative bg-black  rounded-lg">
      <div className="relative aspect-[9/12] rounded-lg overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.alt}
          fill
          className="object-contain transition-all duration-500 group-hover:scale-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/60 via-red-900/20 to-transparent " />
      </div>
    </div>
  </div>
</motion.div>

                {/* ✅ Title */}
                <h3
                  className="text-white uppercase creepster-regular 
    text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                >
                  {feature.title}
                </h3>

                {/* ✅ Description */}
                <p className="global-text-style uppercase sm:text-xs md:text-sm leading-relaxed tracking-wider max-w-xs sm:max-w-sm mx-auto font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] lg:w-[800px] h-24 sm:h-32 bg-red-600/5 blur-[100px]" />
    </section>
  );
};

export default UltraHighPerformanceSection;
