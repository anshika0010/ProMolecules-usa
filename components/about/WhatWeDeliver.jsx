"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/client";
import Highlight from "@/lib/i18n/Highlight";

export default function WhatWeDeliver() {
  const t = useT("about")["what-we-deliver"] || {};
  const services = t.services || [];

  return (
    <>
    <section className="bg-black text-white max-w-7xl mx-auto border-t border-gray-800">

      {/* MIDDLE STATEMENT */}
      <div className="border-b border-gray-800 py-6 sm:py-8 px-1 sm:px-3 text-center">
        <p className="max-w-5xl mx-auto 
          text-base xs:text-sm sm:text-sm md:text-sm lg:text-md 
          font-bold leading-relaxed uppercase">
          <Highlight text={t.middleStatement} phrases={t.middleStatementHighlights} />
        </p>
      </div>
      </section>
<section className="bg-black text-white max-w-full mx-auto ">
      {/* OUR SERVICES TITLE */}
      <div className="border-b border-gray-800 py-3 sm:py-4 w-full text-center px-4">
        <h3 className="creepster-regular heading">
          <span className="text-white">{t.servicesHeading?.first}</span>{" "}
          <span className="text-red-600">{t.servicesHeading?.second}</span>
        </h3>

        <p className="global-text-style mt-4 sm:mt-6 max-w-3xl mx-auto uppercase tracking-wide
          text-[5px] sm:text-xs md:text-base px-2">
          {t.servicesDescription}
        </p>
      </div>

{/* SERVICES GRID */}
<div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-800 px-0 mb-4 md:mb-16 w-full">
  {services.map((service, index) => (
    <div
      key={index}
      className={`
        group
        p-6 sm:p-8 md:p-10 text-center space-y-4 sm:space-y-6
        border-b border-gray-800
        transition-all duration-500
        hover:bg-gradient-to-b hover:from-red-950/60 hover:via-red-900/30 hover:to-transparent
        ${index < services.length - 1 ? "md:border-e" : ""}
      `}
    >
      {/* Number + Title */}
      <h4 className="text-red-600 creepster-regular uppercase
        text-xl sm:text-xl md:text-lg lg:text-xl xl:text-2xl
        transition-all duration-300
        group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-orange-400
      ">
        {service.number}. {service.title}
      </h4>

      {/* Description */}
      <p className="global-text-style transition-colors duration-300 group-hover:text-red-100">
        {service.desc}
      </p>

      {/* Image */}
      <div className="relative w-full 
        h-[180px] xs:h-[200px] sm:h-[220px] md:h-[200px] lg:h-[240px] xl:h-[260px]
        mt-2 rounded-lg overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-all duration-500 saturate-0 brightness-75 group-hover:saturate-100 group-hover:brightness-50"
        />
       
      </div>
    </div>
  ))}
</div>
    </section>
    </>
  );
}