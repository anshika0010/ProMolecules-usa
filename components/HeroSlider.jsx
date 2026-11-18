"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useT } from "@/lib/i18n/client";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = useT("home").slider || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[currentSlide];
  if (!slide) return null;

  /* ── Shared sub-components ───────────────────────────── */

  const BuyButton = ({ className = "" }) => (
    <Link
      href={slide.link}
      className={`group flex items-center gap-2 bg-black border-2 border-white/30 hover:border-white/60 text-white px-6 py-2 rounded-full transition-all duration-300 hover:bg-white/5 ${className}`}
    >
      {/* <span className="font-bold text-sm tracking-wider">BUY NOW</span> */}
      <div className="bg-white/20 group-hover:bg-white/30 p-2 rounded-full transition-colors">
        <ChevronRight size={14} />
      </div>
    </Link>
  );

  const DotIndicators = ({ className = "" }) => (
    <div className={`flex gap-1.5 ${className}`}>
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => setCurrentSlide(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={`h-2 w-5  rounded-full transition-all duration-300 ${
            i === currentSlide ? "w-5 bg-white" : "w-1.5 bg-white/40"
          }`}
        />
      ))}
    </div>
  );

  const MiniSlides = () => (
    <div className="space-y-3">
      {slides.map(
        (s, index) =>
          index !== currentSlide && (
            <div
              key={s.id}
              onClick={() => setCurrentSlide(index)}
              className="cursor-pointer transition-all duration-300 active:scale-95 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3 pr-4 rounded-r-2xl rounded-l-full border border-white/15 bg-white/[0.07] backdrop-blur-md">
                <div className="relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-white/20 bg-white/10 overflow-hidden">
                  <Image
                    src={s.productImage}
                    alt={s.title}
                    fill
                    priority
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="flex-1 min-w-0 py-3">
                  <p className="creepster-regular text-red-500 text-sm sm:text-base font-bold uppercase tracking-wide truncate">
                    {s.title}
                  </p>
                  <p className="text-white/55 text-[11px] sm:text-xs leading-snug line-clamp-2 mt-0.5 text-left [unicode-bidi:plaintext]">
                    {s.description}
                  </p>
                </div>
                <div className="flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                  <ChevronRight size={12} className="text-white/60" />
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );

  return (
    // Same layout in every language: on RTL sites (Arabic, Farsi) only the text is translated,
    // the hero is not mirrored. `bidi` keeps punctuation of RTL sentences in the right place.
    <div dir="ltr">
      {/* ═══════════════════════════════════════════════════
          MOBILE  — portrait phones  (< 640px)
      ═══════════════════════════════════════════════════ */}
      <div className="relative sm:hidden w-full overflow-hidden">
        <motion.div
          key={`mob-bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[9/14]"
        >
          <Image
            src={slide.mobileBackgroundImage || slide.backgroundImage}
            alt={slide.title}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        </motion.div>

        {/* Overlaid bottom content */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 z-10">
          <motion.p
            key={`mob-title-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="creepster-regular text-white text-3xl font-black uppercase tracking-wider mb-3"
          >
            {slide.title}
          </motion.p>

          <motion.div
            key={`mob-btn-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <BuyButton />
            <DotIndicators className="ml-auto" />
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          TABLET  — landscape phones & tablets  (640px–1023px)
      ═══════════════════════════════════════════════════ */}
      <div className="relative hidden sm:flex lg:hidden w-full overflow-hidden min-h-[60vh]">
        {/* Background */}
        <motion.div
          key={`tab-bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.backgroundImage}
            alt="Background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Left-side gradient so text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        {/* Content — left-aligned card */}
        <div className="relative z-10 flex flex-col justify-end w-full max-w-[1024px] mx-auto px-6 sm:px-10 pb-10 pt-16">
          <motion.p
            key={`tab-title-${currentSlide}`}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="creepster-regular text-white text-4xl sm:text-5xl font-black uppercase tracking-wider mb-3"
          >
            {slide.title}
          </motion.p>

          <motion.p
            key={`tab-desc-${currentSlide}`}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="global-text-style max-w-md mb-5 text-sm sm:text-base text-left [unicode-bidi:plaintext]"
          >
            {slide.description}
          </motion.p>

          <motion.div
            key={`tab-controls-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-5"
          >
            <BuyButton />
            <DotIndicators />
          </motion.div>

          {/* Mini slide previews in a horizontal row on tablet */}
          <div className="flex gap-3 mt-6 max-w-lg">
            {slides.map(
              (s, index) =>
                index !== currentSlide && (
                  <div
                    key={s.id}
                    onClick={() => setCurrentSlide(index)}
                    className="cursor-pointer flex-1 flex items-center gap-2 pr-3 rounded-r-2xl rounded-l-full border border-white/15 bg-white/[0.07] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  >
                    <div className="relative flex-shrink-0 w-12 h-12 rounded-full border border-white/20 bg-white/10 overflow-hidden">
                      <Image src={s.productImage} alt={s.title} fill priority className="object-contain p-1.5" />
                    </div>
                    <div className="flex-1 min-w-0 py-2">
                      <p className="creepster-regular text-red-500 text-xs font-bold uppercase tracking-wide truncate">
                        {s.title}
                      </p>
                      <p className="text-white/50 text-[10px] leading-snug line-clamp-2 mt-0.5 hidden sm:block text-left [unicode-bidi:plaintext]">
                        {s.description}
                      </p>
                    </div>
                    <ChevronRight size={12} className="text-white/50 flex-shrink-0" />
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          DESKTOP  — 1024px and above
      ═══════════════════════════════════════════════════ */}
      <div className="relative hidden lg:block min-h-[100vh] w-full overflow-hidden pt-4">
        {/* Background */}
        <motion.div
          key={`desk-bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <Image
            src={slide.backgroundImage}
            alt="Background"
            width={1920}
            height={1080}
            priority
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center min-h-[100vh]">
          <div className="max-w-[1600px] mx-auto px-6 xl:px-10 w-full">
            <div className="grid lg:grid-cols-2 gap-6 items-center">

              {/* Left spacer (product image lives inside the background) */}
              <div className="relative h-[900px]" />

              {/* Right — text & controls */}
              <div className="space-y-4 text-center lg:text-left anton-regular font-extrabold">
                <motion.p
                  key={`desk-title-${currentSlide}`}
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="creepster-regular text-4xl xl:text-5xl 2xl:text-6xl font-black uppercase tracking-wider text-white"
                >
                  {slide.title}
                </motion.p>

                <p className="global-text-style max-w-xl xl:max-w-2xl mx-auto lg:mx-0 text-left [unicode-bidi:plaintext]">
                  {slide.description}
                </p>

                <div className="flex justify-center lg:justify-start">
                  <BuyButton />
                </div>

                {/* Mini slides — vertical stack */}
                <div className="pt-3 lg:pt-10">
                  <MiniSlides />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;