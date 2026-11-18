"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useT } from "@/lib/i18n/client";

export default function HeroSection() {
  const t = useT("about")["who-we-are"]?.hero || {};
  return (
    <section className="relative max-w-full mx-auto min-h-[50vh] lg:min-h-[100vh] pt-8 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/promolecules-who-we-are.webp"
        alt="promolecules-who-we-are"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute top-12 sm:top-12 right-9 sm:right-9 z-20">
        <Link href={"/about"}>
          <button
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition"
            aria-label={t.backButton}
          >
            <ArrowLeft size={16} className="text-white rtl:rotate-180" />
          </button>
        </Link>
      </div>

      {/* Bottom Right Text */}
      <div
        className="absolute bottom-6  sm:bottom-8 sm:right-8 md:bottom-16  
                      max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-5xl 
                      z-20 text-right sm:px-0"
      >
        <h1
          className="creepster-regular 
                       text-3xl sm:text-5xl md:text-7xl lg:text-8xl 
                       text-red-700 font-bold tracking-wide"
        >
          {t.title}
        </h1>

        <p
          className="global-text-style
                      leading-relaxed"
        >
          {t.description}
        </p>
      </div>
      
    </section>
  );
}
