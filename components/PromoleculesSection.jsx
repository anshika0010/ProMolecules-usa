'use client';
import Link from "next/link";
import { useState } from "react";

const CERTS = [
  "USA GMP Certified Manufacturing",
  "Premium Quality Ingredients",
  "Carefully Balanced Formulae",
  "Third-Party Quality Testing",
  "Raw Material Heavy Metal Testing",
  "Clearly Labeled Ingredients",
  "No Pointless Proprietary Blends",
  "Standardized Manufacturing",
];

const INGREDIENTS = [
  "L-Citrulline",
  "Beta Alanine",
  "Creatine",
  "Taurine",
  "Alpha GPC",
  "L-Theanine",
  "Electrolytes",
  "Vitamin B6 & B12",
  "Glycerol",
  "Green Tea Extract",
  "Caffeine Sources",
  "Amino Acids",
];

const PRODUCTS = [
  {
    tag: "PRE-WORKOUT",
    name: "Father of Insane™",
    desc: "Maximum energy, focus, and training intensity for lifters who don't ease into a set.",
  },
  {
    tag: "PRE-WORKOUT",
    name: "Warflex™",
    desc: "Sustained drive and mental lock-in, built for longer, harder training blocks.",
  },
  {
    tag: "PUMP & HYDRATION",
    name: "HydraPump+™",
    desc: "Fuller pumps and steady hydration so output doesn't fall off mid-session.",
  },
  {
    tag: "ATP & ENDURANCE",
    name: "INOPOWER R™",
    desc: "Formulated to support cellular ATP production through endurance work.",
  },
  {
    tag: "THERMOGENIC",
    name: "Thermo Nuke XT™",
    desc: "Built into a structured diet and training plan, not a substitute for one.",
  },
];

const AUDIENCE = [
  "Bodybuilders",
  "Strength Athletes",
  "Powerlifters",
  "Weight Lifters",
  "CrossFit Athletes",
  "Functional Fitness Athletes",
  "Physique Athletes",
  "Endurance Athletes",
  "Serious Gym Enthusiasts",
];

const FAQS = [
  {
    q: "What is Promolecules™?",
    a: "A sports nutrition line covering pre-workouts, hydration mixes, ATP support, and thermogenic products, built for athletes and fitness lovers who want reliable performance.",
  },
  {
    q: "Where are these supplements manufactured?",
    a: "Every Promolecules™ product is manufactured in USA GMP-certified facilities.",
  },
  {
    q: "Who are these supplements for?",
    a: "Adults serious about their training — lifting, running, endurance events, or structured workouts. Always follow the label and talk to your doctor if you have health concerns.",
  },
  {
    q: "Does Promolecules™ test its products?",
    a: "Yes. Every batch follows GMP guidelines, with quality analysis and heavy-metals testing on raw materials.",
  },
  {
    q: "Are these products beginner-friendly?",
    a: "Some carry a high stimulant load and may not suit a beginner. Read the label and only start a regimen if you have the tolerance and experience for it.",
  },
  {
    q: "Where can I buy genuine Promolecules™ products?",
    a: "The official Promolecules™ site, along with cost2costsupplement, Flipkart, and Amazon, are the verified places to buy — this is what guarantees authentic product.",
  },
];

function FaqRow({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-[15px] sm:text-base font-semibold tracking-tight text-white group-hover:text-[#E4141A] transition-colors">
          {item.q}
        </span>
        <span
          className={`shrink-0 text-[#E4141A] text-2xl leading-none font-light transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-white/60 leading-relaxed pr-8">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function PromoleculesSection() {
  const [openFaq, setOpenFaq] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // COLLAPSED / TEASER STATE — tap anywhere on the bar to open the full section
  if (!expanded) {
    return (
      <section className="bg-black text-white">
        <button
          onClick={() => setExpanded(true)}
          className="group w-full text-left border border-white/15 hover:border-[#E4141A] transition-colors px-6 sm:px-10 py-6 flex items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 min-w-0">
            <span className="h-2 w-2 bg-[#E4141A] shrink-0" />
            <div className="min-w-0">
              <p className="font-black uppercase tracking-tighter text-xl sm:text-2xl truncate">
                Promo<span className="text-[#E4141A]">lecules</span>
                <sup className="text-xs align-super">™</sup>
              </p>
              <p className="text-xs sm:text-sm text-white/50 truncate">
                Bio-engineered sports nutrition — tap to view the full range
              </p>
            </div>
          </div>
          <span className="shrink-0 text-[#E4141A] text-2xl font-light group-hover:translate-x-1 transition-transform">
            +
          </span>
        </button>
      </section>
    );
  }

  return (
    <section className="relative bg-black text-white overflow-hidden">
      {/* COLLAPSE BAR */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <button
            onClick={() => setExpanded(false)}
            className="w-full flex items-center justify-between gap-4 py-4 text-left group"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase group-hover:text-[#E4141A] transition-colors">
              Collapse Section
            </span>
            <span className="text-[#E4141A] text-2xl leading-none font-light rotate-45">
              +
            </span>
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="relative border-b border-white/10">
        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 bg-[#E4141A]" />
            <span className="text-xs font-bold tracking-[0.3em] text-white/50 uppercase">
              Bio-Engineered Sports Nutrition
            </span>
          </div>
          <h1 className="font-black uppercase leading-[0.88] tracking-tighter text-[15vw] sm:text-7xl md:text-8xl max-w-4xl">
            Promo
            <span className="text-[#E4141A]">lecules</span>
            <sup className="text-lg align-super">™</sup>
          </h1>
          <p className="mt-8 max-w-xl text-white/60 text-base sm:text-lg leading-relaxed">
            Performance supplements engineered for athletes, bodybuilders, powerlifters, and
            anyone training with intent. Premium ingredients. Effective dosing. Nothing added
            just to pad a label.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={"/product"}>
            <button className="bg-[#E4141A] text-white font-bold uppercase text-sm tracking-wide px-8 py-4 hover:bg-white hover:text-black transition-colors">
              Shop the Range
            </button>
            </Link>

          </div>
        </div>
      </div>

      {/* CERTIFICATIONS STRIP */}
      <div className="border-b border-white/10 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
          <p className="text-xs font-bold tracking-[0.3em] text-[#E4141A] uppercase mb-6">
            Quality First
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4">
            {CERTS.map((c) => (
              <div key={c} className="flex items-start gap-2">
                <span className="mt-1 h-1 w-3 bg-[#E4141A] shrink-0" />
                <span className="text-sm text-white/70 leading-snug">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCT RANGE */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-20">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <h2 className="font-black uppercase tracking-tighter text-4xl sm:text-5xl">
            The Range
          </h2>
          <p className="text-white/40 text-sm max-w-xs">
            Every product is built around one performance goal — not a shelf of overlapping
            formulas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="bg-black p-8 flex flex-col justify-between min-h-[220px] group hover:bg-[#0F0F0F] transition-colors"
            >
              <div>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#E4141A] uppercase">
                  {p.tag}
                </span>
                <h3 className="mt-3 text-2xl font-black tracking-tight">{p.name}</h3>
              </div>
              <p className="mt-6 text-sm text-white/50 leading-relaxed">{p.desc}</p>
            </div>
          ))}
          <div className="bg-[#E4141A] p-8 flex flex-col justify-center min-h-[220px]">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-black/70">
              Full Catalog
            </p>
            <p className="mt-3 text-xl font-black tracking-tight leading-tight">
              Pre-workouts, hydration, ATP support, and thermogenics — all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* INGREDIENTS */}
      <div className="border-y border-white/10 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-20 grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <h2 className="font-black uppercase tracking-tighter text-4xl sm:text-5xl">
              Built From
              <br />
              <span className="text-[#E4141A]">What Works</span>
            </h2>
            <p className="mt-6 text-white/50 text-sm leading-relaxed max-w-sm">
              Every ingredient earns its place in the formula for the effect it produces —
              never to inflate a label.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 content-start">
            {INGREDIENTS.map((i) => (
              <span
                key={i}
                className="border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-[#E4141A] hover:text-white transition-colors"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AUDIENCE */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-20">
        <h2 className="font-black uppercase tracking-tighter text-4xl sm:text-5xl mb-10">
          Who Trains With It
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {AUDIENCE.map((a, idx) => (
            <span key={a} className="flex items-center gap-3 text-lg text-white/70">
              {idx !== 0 && <span className="h-1 w-1 rounded-full bg-[#E4141A]" />}
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="border-t border-white/10 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20">
          <h2 className="font-black uppercase tracking-tighter text-4xl sm:text-5xl mb-10">
            Questions
          </h2>
          <div>
            {FAQS.map((item, idx) => (
              <FaqRow
                key={item.q}
                item={item}
                isOpen={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="relative bg-[#E4141A] text-black">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <h3 className="font-black uppercase tracking-tighter text-3xl sm:text-4xl max-w-md leading-[0.95]">
            Train with purpose. Fuel the same way.
          </h3>
          <Link href={"/shop"}>
          <button className="bg-black text-white font-bold uppercase text-sm tracking-wide px-8 py-4 hover:bg-white hover:text-black transition-colors shrink-0">
            Shop Promolecules™
          </button>
          </Link>
        </div>
      </div>
      
    </section>
  );
}