"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const headings = [
  { title: "WHO WE ARE", url: "/about/who-we-are" },
  { title: "WHAT WE DELIVER", url: "/about/what-we-deliver" },
  { title: "HISTORY", url: "/about/history" },
  { title: "FAQ", url: "/about/faq" },
];

const socials = [
  { name: "Instagram", url: "https://www.instagram.com/promolecules/" },
  { name: "Facebook", url: "https://www.facebook.com/promolecules.official" },
  { name: "Twitter", url: "https://x.com/promolecules" },
  { name: "YouTube", url: "https://www.youtube.com/@Promolecules" },
  { name: "Pinterest", url: "https://www.pinterest.com/promolecules/" },
];

const AboutPage = () => {
  return (
    // NOTE: min-h-screen (not a fixed 50vh) so the section always grows to
    // fit its content instead of clipping on short/mobile viewports.
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/promolecules-about-banner.webp"
        alt="About Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Subtle overlay so red/black text stays legible over the photo on all screens */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Main Content */}
      {/* flex-col + justify-between keeps the heading list and the social
         row apart in NORMAL document flow (no absolute overlap on mobile),
         while still pinning the social row to the bottom on tall/desktop screens. */}
      <div
        className="
          relative z-10 w-full max-w-7xl mx-auto min-h-screen
          flex flex-col justify-between
          px-4 sm:px-6 lg:px-10
          py-8 sm:py-10 md:py-14
          gap-10 sm:gap-12
        "
      >
        {/* Title + Nav headings */}
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-14">
          <h1 className="text-black text-start text-3xl sm:text-4xl md:text-5xl creepster-regular font-bold uppercase">
            About Promolecules™
          </h1>

          <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-14">
            {headings.map((item, index) => (
              <div key={index} className="relative group w-full overflow-hidden">
                {/* Marquee Hover Strip (desktop hover only, no effect on touch) */}
                <div className="absolute -top-10 sm:-top-12 md:-top-16 left-0 w-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none hidden md:block">
                  {/* Edge Gradients */}
                  <div className="absolute left-0 top-0 h-full w-16 md:w-24 bg-gradient-to-r from-black to-transparent z-10" />
                  <div className="absolute right-0 top-0 h-full w-16 md:w-24 bg-gradient-to-l from-black to-transparent z-10" />

                  <div className="marquee-wrapper whitespace-nowrap">
                    <span className="marquee-text text-xs sm:text-sm md:text-base">
                      {item.title} • {item.title} • {item.title} • {item.title} •
                    </span>
                    <span className="marquee-text text-xs sm:text-sm md:text-base">
                      {item.title} • {item.title} • {item.title} • {item.title} •
                    </span>
                  </div>
                </div>

                {/* Heading Row */}
                <Link
                  href={item.url}
                  className="flex items-center justify-center md:justify-between gap-3 sm:gap-4 group"
                >
                  <h2
                    className="
                    anton-regular
                    text-red-600
                    uppercase
                    font-black
                    leading-[0.9]
                    tracking-wide
                    text-[22px]
                    xs:text-[26px]
                    sm:text-[36px]
                    md:text-[56px]
                    lg:text-[80px]
                    xl:text-[100px]
                    text-center md:text-left
                    break-words
                    transition-all duration-300
                    group-hover:text-white
                    group-hover:blur-sm
                    group-hover:opacity-40
                    "
                  >
                    {item.title}
                  </h2>

                  {/* Arrow Icon (desktop only, keeps mobile rows compact) */}
                  <ArrowRight
                    size={60}
                    className="text-red-600 hidden md:block shrink-0 group-hover:text-white"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links — part of normal flow now, so it can never overlap
           the nav list on small screens; still reads as a bottom bar on
           larger screens thanks to justify-between on the parent. */}
        <div
          className="
          w-full
          flex flex-wrap justify-center md:justify-between
          gap-x-4 gap-y-3 sm:gap-x-5
          text-white uppercase tracking-widest
          "
        >
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
              anton-regular
              font-bold
              transition
              text-xs sm:text-sm md:text-base lg:text-lg
              hover:text-red-500
              "
            >
              {social.name} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPage;