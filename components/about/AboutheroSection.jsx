"use client";

import ContactForm from "@/components/ContactForm";
import React from "react";
import { useT } from "@/lib/i18n/client";

export default function ContactheroSection() {
  const c = useT("contact");
  const t = c.contactHero || {};
  const f = t.features || [];




  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative  bg-cover bg-center flex items-center py-2 sm:py-4 md:py-10 mt-6 md:py-0"
        style={{ backgroundImage: "url('/candle.webp')" }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 w-full max-w-[1600px] mx-auto">

          <h4 className="text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl creepster-regular uppercase ">
            <span className="text-gray-200">{t.heading?.first} </span>
            <span className="text-red-600">{t.heading?.second}</span>
          </h4>

          <div className="mt-6">
            <p className="text-gray-300 luppercase text-md sm:text-lg md:text-xl lg:text-3xl font-bold anton-regular break-all">
              {t.email}
            </p>
          </div>

          {/* LOWER INFO */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start pt-16 text-white">

            <div className="flex item-center justify-center ">
              <h2 className="text-3xl creepster-regular uppercase leading-snug text-gray-200">
                {t.tagline}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-xs uppercase tracking-wider">

              <div>
                <h4 className="text-red-600  text-md font-bold">{f[0]?.title}</h4>
                <p className="global-text-style">{f[0]?.description}</p>
              </div>

              <div>
                <h5 className="text-red-600  text-md font-bold">{f[1]?.title}</h5>
                <p className="global-text-style">{f[1]?.description}</p>
              </div>

              <div>
                <h6 className="text-red-600 text-md font-bold">{f[2]?.title}</h6>
                <p className="global-text-style">{f[2]?.description}</p>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* CONTACT FORM SECTION */}
   <ContactForm/>


{/* CTA SECTION */}
<section className="bg-black py-10 sm:py-14 md:py-16 px-4 border-t border-gray-800">
  <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
    <h2 className="creepster-regular uppercase 
      text-4xl
      xs:text-5xl
      sm:text-6xl
      md:text-7xl
      lg:text-8xl
      xl:text-9xl">
      <span className="text-gray-200">{c.ctaSection?.heading?.first} </span>
      <span className="text-red-600">{c.ctaSection?.heading?.second}</span>
    </h2>
  </div>  
</section>

    </>
  );
}

