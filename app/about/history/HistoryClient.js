// app/about/history/HistoryClient.js
"use client";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import GrowthEvolution from "@/components/about/GrowthEvolution";
import Blogs from "@/components/Blogs";
import Link from "next/link";
import { useT } from "@/lib/i18n/client";
import Highlight from "@/lib/i18n/Highlight";

export default function HistoryClient({ jsonld }) {
  const t = useT("about").history?.historyHero || {};
  return (
    <>
      {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonld }}
        />
      )}

      {/* Hero + BG Image Combined Section */}
      <section className="relative max-w-9xl mx-auto min-h-[50vh] lg:min-h-screen overflow-hidden">
        {/* Background Image */}
        <Image
          src={t.backgroundImage}
          alt={t.backgroundAlt}
          fill
          priority
          className="object-cover object-center"
        />

        {/* Back Button */}
        <div className="absolute top-12 sm:top-12 right-9 sm:right-9 z-20">
          <Link href={t.backButtonUrl || "/about"}>
            <button
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition"
              aria-label={t.backButton}
            >
              <ArrowLeft size={16} className="text-white rtl:rotate-180" />
            </button>
          </Link>
        </div>

      {/* Hero Content */}
<div className="relative z-10 flex flex-col justify-center items-center min-h-[50vh] lg:min-h-[100vh] px-4 sm:px-8 md:px-16 lg:px-20 pt-16 sm:pt-20 pb-10 sm:pb-14">
  <h1 className="text-center text-[36px] xs:text-[44px] sm:text-[52px] md:text-[88px] lg:text-[110px] creepster-regular text-white">
    <Highlight text={t.heading} phrases={[t.highlight]} />
  </h1>

  <p className="text-center max-w-4xl mx-auto py-3 global-text-style anton-regular uppercase text-gray-200">
    {t.description}
  </p>

  {/* Bottom: Subtitle */}
  <div className="pt-10">
    <p className="text-base text-center sm:text-lg md:text-xl lg:text-2xl anton-regular uppercase leading-relaxed tracking-wide text-gray-200">
      {t.subtitle}
    </p>
  </div>
</div>
      </section>

      <Blogs />
   
      <GrowthEvolution />
    </>
  );
}
