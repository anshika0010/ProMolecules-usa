"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useT } from "@/lib/i18n/client";

/** `data` overrides the home-page text (the shop page passes its own). */
export default function TrendingCategory({ data }) {
  const home = useT("home", { optional: true }).trending_category_section;
  const t = data || home || {};
  const categories = t.categories || [];
  const [headFirst, ...headRest] = (t.heading || "").split(" ");

  return (
    <section className="relative max-w-[1600px] mx-auto bg-black py-10 sm:py-14 md:py-20 px-6 sm:px-9 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_transparent_60%)] opacity-30" />

      {/* Heading */}
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
  
  {/* Left — Heading */}
<div className="flex-shrink-0">
  <h2 className="creepster-regular heading leading-none text-start">
    {headFirst}{" "}
    <br className="hidden sm:block" />
    <span className="creepster-regular heading leading-none ms-4 sm:ms-4 md:ms-[100px]  p-2">
      {headRest.join(" ")}
    </span>
  </h2>
</div>

  {/* Right — Para */}
  <div className="hidden md:flex justify-end max-w-[40%]">
    <p className="global-text-style uppercase text-justify">
      {t.description}
    </p>
  </div> 

</div>

      {/* Categories */}
      <div className="relative z-10 mt-8 space-y-0">
        {categories.map((item, index) => (
          <Link
            key={index}
            href={item.link || "#"}
            rel="noopener noreferrer"
            className="block"
          >
            <div
              className="group relative flex items-center justify-between 
                border-b border-white/10 overflow-hidden 
                transition-all duration-500 hover:rounded-xl cursor-pointer
                gap-3 sm:gap-4"
            >
              {/* Hover Background Image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                <Image
                  src="/promolecules-productcardbg.webp"
                  alt="hover bg"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Left: Image */}
              <div
                className="relative flex-shrink-0
                  w-[90px] h-[90px]
                  sm:w-[160px] sm:h-[140px]
                  md:w-[240px] md:h-[170px]
                  lg:w-[280px] lg:h-[190px]
                  rounded-lg border border-white/10 overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={item.hoverImage}
                  alt={item.title}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              {/* Middle: Text */}
              <div className="flex flex-col justify-center flex-1 min-w-0 px-1 sm:px-3">
                <h3
                  className="creepster-regular text-red-600 
                    text-lg xs:text-xl sm:text-3xl md:text-4xl
                    transition-colors duration-500 group-hover:text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="mt-1 sm:mt-2 
                    global-text-style leading-relaxed
                    transition-colors duration-500 group-hover:text-white
                    text-xs sm:text-sm md:text-base
                    line-clamp-2 sm:line-clamp-3"
                >
                  {item.desc}
                </p>
              </div>

              {/* Right: Arrow */}
              <div className="flex-shrink-0 pe-1 sm:pe-2">
                <ArrowRight
                  className="text-white 
                    w-5 h-5 
                    sm:w-7 sm:h-7 
                    md:w-10 md:h-10 
                    lg:w-14 lg:h-14
                    transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}