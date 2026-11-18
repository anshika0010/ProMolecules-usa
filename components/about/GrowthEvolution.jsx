"use client";
import { useState } from "react";
import { useT } from "@/lib/i18n/client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Engineered Stimulation, Not Guesswork",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The brand's first focus was neurological activation — understanding how the central nervous system responds to layered stimulant delivery rather than single-source caffeine overload. This led to the development of multi-phase stimulation systems seen in products like Father of Insane™, where intensity is engineered, not randomly increased.",
      },
    },
    {
      "@type": "Question",
      name: "WHEN WAS PROMOLECULES FOUNDED?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Promolecules™ was founded in the early 2020s during a period when high-stimulant supplements were rapidly gaining popularity but lacked structured formulation. It emerged in response to growing demand for stronger yet more intelligently engineered performance systems.",
      },
    },
    {
      "@type": "Question",
      name: "WHY WAS PROMOLECULES CREATED?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Promolecules™ was created to challenge the industry's habit of underdosing key ingredients or overdosing caffeine for marketing impact. The goal was to build performance supplements that deliver real intensity through structured formulation, not hype-driven stimulation.",
      },
    },
    {
      "@type": "Question",
      name: "WHAT PROBLEM DID PROMOLECULES AIM TO SOLVE?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The brand aimed to solve three core issues: hidden proprietary blends, chaotic stimulant crashes, and inconsistent batch quality. Promolecules™ focused on creating disciplined, bioengineered formulas that provide controlled activation, sustained output, and transparent positioning for serious athletes.",
      },
    },
    {
      "@type": "Question",
      name: "HOW HAS PROMOLECULES EVOLVED OVER TIME?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Promolecules™ begin with ultra high-stim performance systems and expanded into hybrid pre-workouts, thermogenics, stimulant-free ATP enhancers, hydration-based pump systems, and protein support. The evolution reflects a broader performance ecosystem rather than a single product category.",
      },
    },
    {
      "@type": "Question",
      name: "WHAT HAS REMAINED CONSTANT SINCE THE BEGINNING?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "What has remained constant is the principle of structured intensity. Promolecules™ continues to prioritize controlled stimulation, athlete-focused positioning, transparent messaging about product strength, and performance systems built for progression — not casual consumption",
      },
    },
  ],
};

export default function GrowthEvolution() {
  const [active, setActive] = useState(0);

  const t = useT("about").history || {};
  const j = t.journeySection || {};
  const faqs = t.growthEvolutionFaq || [];
  const headWords = (j.heading || "").split(" ");

  return (
    <>
      {/* ✅ FAQ Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="max-w-[1600px] mx-auto bg-black text-white px-4 sm:px-6 md:px-8 py-10 sm:py-14">
        {/* Main Heading */}
        <div className=" text-center">
          <h2 className="creepster-regular text-[36px] sm:text-[52px] md:text-[68px] lg:text-[80px] leading-tight">
            <span className="text-white">{headWords.slice(0, -1).join(" ")} </span>
            <span className="text-red-600">{headWords.slice(-1)}</span>
          </h2>
        </div>

        {/* Divider */}
        <div className=" border-t border-gray-800" />
      </section>
      <section className="relative max-w-[1600px] mx-auto min-h-screen bg-black text-white px-3 md:px-4 py-0 md:py-5 mb-6 overflow-hidden">
        {/* Content Grid */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-2  ">
          {/* Red Tagline */}
          <p className="text-red-600 leading-tight flex items-start creepster-regular uppercase text-[22px] sm:text-[28px] md:text-[36px] lg:text-[42px] tracking-wider leading-snug ">
            {j.tagline}
          </p>

          <p className="text-gray-300 items-end max-w-2xl mx-auto text-sm sm:text-xl md:text-xl text-center">
            {j.description}
          </p>
        </div>
        <h2 className="hidden md:block text-red-600 creepster-regular text-4xl md:text-7xl text-end px-6 mb-8">
          {j.growthHeading}
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* LEFT CONTENT */}
          <div className="order-2 md:order-1">
            <p className="global-text-style text-red-600 tracking-wide mb-10 max-w-lg">
              {j.intro}
            </p>

            <div className="border-t border-gray-800 mb-6"></div>

            <div className="space-y-4">
              {faqs.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => setActive(active === index ? null : index)}
                    className="w-full flex items-center justify-between text-start py-4 border-b border-gray-800 group"
                    aria-expanded={active === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <span className="text-red-600 font-semibold tracking-wide text-sm md:text-base">
                      {item.question}
                    </span>

                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        active === index
                          ? "rotate-90 text-red-600"
                          : "text-gray-500 rtl:rotate-180"
                      }`}
                    />
                  </button>

                  {active === index && (
                    <div className="global-text-style py-4 scale-up-ver-top leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative order-1 md:order-2">
            <div className="relative w-full h-[450px] bg-gradient-to-b from-red-900/40 to-black overflow-hidden">
              <Image
                src={j.image}
                alt={j.imageAlt}
                fill
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
