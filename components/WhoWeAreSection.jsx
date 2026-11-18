"use client";
import { motion } from "framer-motion";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useT } from "@/lib/i18n/client";

const WhoWeAreSection = () => {
  const t = useT("home").who_we_are_section || {};
  return (
    <section className="w-full bg-black overflow-hidden py-2 sm:py-4 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Title Block */}
    <div className="flex flex-col items-center mb-6 sm:mb-8 md:mb-10 text-center px-4">
      <p
     
        className="creepster-regular heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {t.title}
      </p>
 
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-[3px] sm:h-1 bg-red-500 
          w-[80px] sm:w-[200px] md:w-[280px] lg:w-[420px]
          rounded-full mt-2 origin-center"
      />
 
      <p
       
        className="global-text-style mt-3 sm:mt-4 
          max-w-[260px] xs:max-w-xs sm:max-w-sm md:max-w-xl 
          text-xs sm:text-sm md:text-base
          leading-relaxed px-2 sm:px-4"
      >
        {t.subtitle}
      </p>
    </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-2 md:gap-8 items-center sm:items:center">

          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hover:scale-[1.03] transition-transform duration-300 px-2"
          >
         <div className="hidden lg:block">
  <h2 className="text-red-600 font-extrabold uppercase text-xl mb-3">
    {t.card_1?.heading}
  </h2>
  <p className="global-text-style leading-relaxed">
    {t.card_1?.text}
  </p>
</div>
          </motion.div>

          {/* CTA — center column */}
         <div
     
      className="flex justify-center px-4"
    >
      <Link
        href="/about/who-we-are/"
        aria-label="View more about us"
        className="group flex items-center gap-3 sm:gap-4 
          border-2 border-white/20 hover:border-red-500 
          text-white 
          px-5 py-2.5 sm:px-6 sm:py-3 
          rounded-full 
          transition-all duration-300 hover:bg-red-600/10
          w-full max-w-[200px] sm:max-w-fit justify-center"
      >
        <span className="font-bold text-[11px] sm:text-xs tracking-[0.15em] uppercase whitespace-nowrap">
          {t.cta}
        </span>
        <div className="bg-white/10 group-hover:bg-red-600 p-1.5 sm:p-2 rounded-full transition-colors duration-300 flex-shrink-0">
          <ArrowRight size={14} className="text-white sm:w-[18px] sm:h-[18px]" />
        </div>
      </Link>
    </div>
          {/* Card 2 */}
        <motion.div
  initial={{ opacity: 0, x: 20 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="hidden lg:block hover:scale-[1.03] transition-transform duration-300 px-2"
>
  <h2 className="text-red-600 font-extrabold uppercase text-xl mb-3">
    {t.card_2?.heading}
  </h2>
  <p className="global-text-style leading-relaxed">
    {t.card_2?.text}
  </p>
</motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;