"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n/client";


export default function MoreInformationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = useT("about")["who-we-are"]?.moreInformation || {};
  const infoData = t.items || [];

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    
    <section className="relative max-auto-7xl mx-auto min-h-[50vh] lg:min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/dark-candle.webp"
        alt="Background"
        fill
   
        className="object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12  py-16 flex flex-col lg:flex-row  items-center gap-12 lg:gap-16">
        {/* LEFT IMAGE */}
        <div className="relative w-full lg:w-1/2  h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px]  rounded-xl overflow-hidden shadow-2xl">
          <Image
            src="/promolecules-background.webp"
            alt="promolecules-background"
            fill
            className="object-cover"
          />
        </div>
        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2 text-white">
          <h2 className="text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold creepster-regular tracking-wide uppercase mb-8 sm:mb-10">
            {t.heading}
          </h2>
          <div className="space-y-6">
            {infoData.map((item, index) => (
              <div key={index}>
                {/* Header */}
                <div
                  onClick={() => toggleItem(index)}
                  className="group flex items-center justify-between border-b border-white/20 pb-4 cursor-pointer"
                >
                  <span className="text-red-600 creepster-regular text-lg sm:text-xl md:text-2xl tracking-wider uppercase transition duration-300  group-hover:text-white">
                    {item.title}
                  </span>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600  group-hover:bg-black transition duration-300">
                    <ArrowRight
                      size={16}
                      className={`text-white transition-transform duration-300 
                        ${activeIndex === index ? "rotate-90 text-red-600" : "rtl:rotate-180"}`}
                    />
                  </div>
                </div>
                {/* Expandable Content */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p
                        className="global-text-style 
                                    mt-4 leading-relaxed"
                      >
                        {item.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

  );
}
