'use client';

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useT } from "@/lib/i18n/client";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "WHY DO MOST PREWORKOUTS IN THE INDIAN MARKET STOP WORKING AFTER 1-2 WEEKS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "This phenomenon is called Accelerated Tolerance Engineering a deliberate formulation strategy where brands underdose critical compounds like beta alanine (typically 800mg vs. therapeutic 3200mg) and use degraded caffeine derivatives that trigger rapid neural adaptation. The body's adenosine receptors become desensitized within 7-14 days due to inconsistent stimulant quality and lack of receptor modulation technology.Most Indian preworkouts exhibit what we term Stimulant Ceiling Manipulation,mixing pharmaceutical-grade caffeine (30-40%) with industrial waste caffeine (60-70%) to reduce costs. This creates an initial that collapses as your nervous system identifies the inferior compound profile.The Promolecules Paradigm:Father of Insane™ and WARFLEX™ deploy Multi Source Caffeine Architecture—combining Caffeine Anhydrous, Dicaffeine Malate (2XCAFF™), Caffeine Citrate (Citra Caff™), and Caffeine HCL in precisely calculated ratios. This creates Sustained Neural Activation rather than spike and crash patterns. Our USA validated therapeutic dosages (450mg total caffeine in Father of Insane, 395mg in WARFLEX) are calibrated for Zero Neural Adaptation Velocity meaning effects remain consistent across 60-90 day cycles without requiring tolerance breaks.",
      },
    },
    {
      "@type": "Question",
      name: "WHY DO SOME PREWORKOUTS CAUSE EXTREME CRASHING AND ANXIETY?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The crash you experience is Adrenal Burnout Cascade caused by unregulated yohimbine dumping (often 5-10mg vs. safe 2.5mg) and synthetic stimulant contamination. Grey market brands frequently use banned compounds like DMAA analogues or unlabeled synthetic stimulants that create violent sympathetic nervous system activation followed by catastrophic energy depletion.What's worse is Caffeine Source Masking where brands list but source it from toxic industrial synthesis rather than pharmaceutical extraction. This results in cortisol spiking, anxiety loops, heart palpitations, and the dreaded 2 hour post-workout crash that leaves you more depleted than before training.The Promolecules Solution:We follow USA GMP Cardiovascular Safety Ceiling Protocols. Our stimulant blends undergo Sympathetic Nervous System Calibration each compound is balanced with L-Theanine(100mg in WARFLEX) to prevent anxiety spirals while maintaining explosive energy. Alpha Yohimbine is precision-dosed at 2.5mg enough for fat mobilization without triggering panic responses. The result? Clean Energy Escalation that elevates you for 8-10 hours without the brutal crash that ruins your entire day.",
      },
    },
    {
      "@type": "Question",
      name: "ARE HIGH-STIMULANT PREWORKOUTS DANGEROUS FOR THE HEART?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "High stimulants become lethal when subjected to Unlabeled Compound Infiltration a rampant issue in India's grey supplement market. Cardiac events occur when brands overdose stimulants (600-800mg caffeine equivalent), combine incompatible compounds (yohimbine + synephrine at toxic levels), or use counterfeit raw materials contaminated with heavy metals that stress cardiovascular tissue.The danger isn't high caffeine itself it's the lack of Vasodilation Counterbalance Technology. Cheap pre-workouts spike blood pressure without supporting blood vessel expansion, creating dangerous cardiovascular strain during heavy compound lifts.The Promolecules Safeguard:Father of Insane™ is formulated under US FDA-Compliant Stimulant Disclosure Standards. Every milligram is labeled, tested, and balanced with 1000mg L-Citrulline + 1600mg BetaAlanine in WARFLEX to support Nitric Oxide-Mediated Vasodilation. This means blood vessels expand proportionally to stimulant load, keeping cardiovascular stress within safe parameters. Third-party testing eliminates the risk of banned substance contamination that causes heart incidents in unregulated products.",
      },
    },
    {
      "@type": "Question",
      name: "WHY DON'T MOST FAT BURNERS ACTUALLY BURN STUBBORN BELLY AND THIGH FAT?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Budget thermogenics suffer from Single Pathway Thermogenesis Limitation they rely solely on mild caffeine (200-250mg) and green tea extract, which your body adapts to within 2-3 weeks through Metabolic Downregulation Defense. Stubborn fat (belly, love handles, thighs) requires Alpha-Receptor Antagonism and Beta-3 Adrenergic Activation—mechanisms that cheap formulas completely ignore.Moreover, most fat burners fail because they don't address Stubborn Adipose Insulin Resistance the reason fat cells in problem areas refuse to release stored triglycerides even during caloric deficits. Without compounds like Yohimbine HCL and GBBxt, you're essentially burning easy fat while stubborn deposits remain locked.The Promolecules Advantage:Thermo Nuke XT™ deploys Multi-Layer Metabolic Upregulation—combining CitraSyn 50™ (synephrine for metabolic rate increase), GBBxt (carnitine synthesis for fatty acid transport), Yohimbine (alpha-receptor blockade for stubborn fat), Green Tea Extract (EGCG for thermogenesis), and Theobromine (blood flow to adipose tissue). This creates Four-Pathway Fat Oxidation that remains effective even during deep fat-loss plateaus. The 650mg Thermo Nuke Blend is calibrated to break through Adaptive Thermogenesis Resistance the body's attempt to protect fat stores during extended cuts.",
      },
    },
    {
      "@type": "Question",
      name: "CAN FAT BURNERS DAMAGE THE LIVER IN LOW QUALITY BRANDS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Hepatic Toxicity Syndrome occurs when thermogenics contain unlabeled stimulant cocktails, contaminated raw materials with heavy metals (lead, mercury, arsenic), or overdosed compounds that force the liver into continuous detoxification overdrive. Many Indian brands mix 5-8 stimulants without understanding compound interactions creating synergistic toxicity that damages liver enzymes (elevated ALT/AST markers).The liver processes every compound you ingest. When fat burners use Industrial Grade Filler Compounds or banned substances like DNP analogues, your liver cells experience oxidative stress leading to inflammation, fatty liver progression, and in severe cases, acute liver injury requiring hospitalization.The Promolecules Protection:Thermo Nuke XT™ undergoes mandatory Heavy-Metal Clearance Certification in USA GMP facilities. We use Hepatic-Calibrated Thermogenesis formulating at levels that maximize fat loss while staying within safe liver processing capacity. B6 and B12 vitamins support liver methylation pathways. Most critically, our Third Party Toxin Screening guarantees zero contamination from industrial pollutants that plague unregulated manufacturing. Taken correctly (1 capsule/day), Thermo Nuke XT works with your liver, not against it.",
      },
    },
    {
      "@type": "Question",
      name: "WHY DOES WATER RETENTION HAPPEN WITH MANY PUMP PRODUCTS IN INDIA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The bloating you experience is Sodium Dumping Osmotic Imbalance caused by brands using cheap glycerin (often industrial grade) with excessive sodium (800-1200mg per serving) and zero potassium/magnesium balance. This creates Extracellular Fluid Accumulation water trapped outside muscle cells, giving you a puffy, flat appearance instead of vascular fullness.Poor quality pump products also use Electrolyte Void Formulations that drive water into subcutaneous tissue rather than intramuscular space. You look bloated because the hydration isn't targeting muscle cells—it's creating edema in skin tissue.The Promolecules Precision:HydraPump+™ uses Pharmaceutical-Grade Liquid Glycerol (10ml per serving) with precisionbalanced electrolytes: 300mg Sodium + 200mg Potassium + 200mg Magnesium from Pink Himalayan Salt and Magnesium Glycinate. This creates Intramuscular Osmotic Pressure driving water specifically into muscle cells for genuine fullness without subcutaneous spillover. Combined with 3000mg Citrulline Malate 2:1, you achieve Vascular Expansion with Zero Bloat Architecture.",
      },
    },
    {
      "@type": "Question",
      name: "WHY DO MOST HYDRATION PRODUCTS FAIL DURING INTENSE WORKOUTS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The bloating you experience is Sodium Dumping Osmotic Imbalance caused by brands using cheap glycerin (often industrial grade) with excessive sodium (800-1200mg per serving) and zero potassium/magnesium balance. This creates Extracellular Fluid Accumulation water trapped outside muscle cells, giving you a puffy, flat appearance instead of vascular fullness.Poor quality pump products also use Electrolyte Void Formulations that drive water into subcutaneous tissue rather than intramuscular space. You look bloated because the hydration isn't targeting muscle cells—it's creating edema in skin tissue.The Promolecules Precision:HydraPump+™ uses Pharmaceutical-Grade Liquid Glycerol (10ml per serving) with precisionbalanced electrolytes: 300mg Sodium + 200mg Potassium + 200mg Magnesium from Pink Himalayan Salt and Magnesium Glycinate. This creates Intramuscular Osmotic Pressure— driving water specifically into muscle cells for genuine fullness without subcutaneous spillover. Combined with 3000mg Citrulline Malate 2:1, you achieve Vascular Expansion with Zero Bloat Architecture.",
      },
    },
    {
      "@type": "Question",
      name: "WHY DON'T ATP BOOSTERS ACTUALLY IMPROVE ENDURANCE IN MANY USERS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most ATP supplements fail due to Precursor Instability Degradation brands use low quality adenosine compounds that break down in stomach acid before reaching muscle cells. Theyalso massively underdose (50-100mg vs. therapeutic 400-600mg), resulting in SubThreshold Cellular Activation where you get zero performance benefit.Real ATP enhancement requires Mitochondrial Energy Pathway Optimization not just throwing adenosine at the problem. Without supporting compounds like Inosine and Taurine,ATP precursors can't efficiently convert into usable cellular energy.The Promolecules Innovation:INOPOWER-R™ uses Russian-Inspired ATP Architecture combining Adenosine 5-Triphosphate, Hypoxanthine Riboside (Inosine), and Taurine in a synergistic 600mg blend.This trinity creates Direct Cellular Energy Infusion rather than hoping your body converts precursors efficiently. B6 (50mg) and B12 (500mcg) support mitochondrial enzyme function.Users report measurable improvements in rep count, training volume capacity, and reduced between set recovery time,tangible ATP Output Manifestation.",
      },
    },
    {
      "@type": "Question",
      name: "IS IT TRUE THAT MANY INDIAN SUPPLEMENTS ARE CONTAMINATED WITH HEAVY METALS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unfortunately, yes. Independent audits consistently reveal Heavy Metal Infiltration Syndrome in unregulated Indian supplements lead (from contaminated soil in raw material sources), mercury (from industrial processing), and arsenic (from substandard manufacturing facilities). These accumulate in organs over time, causing neurological damage, kidney dysfunction, and increased cancer risk.The problem is Zero Regulation Manufacturing Environments where raw materials aren't tested, facilities aren't inspected, and profit margins take absolute priority over consumer safety. You're essentially ingesting industrial waste disguised as performance nutrition.The Promolecules Guarantee:Every Promolecules product is manufactured in USA GMP-certified facilities with Mandatory Heavy-Metal Clearance Testing. We test raw materials BEFORE formulation, finished products BEFORE packaging, and random batches AFTER distribution. This triple layer screening eliminates contamination risk. Our Third-Party Toxin Verification provides independent confirmation that lead, mercury, arsenic, and cadmium levels are below detectable limits,giving you performance nutrition, not poison.",
      },
    },
    {
      "@type": "Question",
      name: "WHY DO SOME TEST-BOOSTING PREWORKOUTS FAIL TO IMPROVE PERFORMANCE AT ALL?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Because they practice Herbal Marketing Deception,listing Tribulus, Fenugreek, and Ashwagandha at symbolic doses (50-100mg) that create zero hormonal impact.Real testosterone modulation requires clinical dosages (600mg+ for most herbs) sustained over 8-12 weeks. These products give you a caffeine buzz and claimit's testosterone energy.True test boosting requires Hormonal Pathway Activation through compounds like Boron Citrate (shown to increase free testosterone by reducing SHBG binding) combined with training-specific performance enhancers.The Promolecules Approach:WARFLEX™ doesn't pretend to be a testosterone replacement,it's a Performance-Driven Hormonal Support System. The 3mg Boron Citrate reduces SHBG (Sex Hormone Binding Globulin), allowing more free testosterone availability during your training window. Combined with Alpha GPC (500mg for growth hormone support), Eria Jarensis (450mg for dopamine drive), and our XBTR3 Pump Blend, WARFLEX creates Multi-System Performance Amplification,not false hormonal promises, but measurable training capacity enhancement.",
      },
    },
  ],
};


export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const faqs = useT("about").faqSection?.faqSection || [];

  return (
    <>
      {/* ✅ FAQ Schema — injected as JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section
  className="relative max-w-full mx-auto min-h-[320px] sm:min-h-[600px] lg:min-h-[600px] bg-black text-white overflow-hidden"
  style={{ backgroundImage: "url('/candle.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
>

        {/* Content */}
        <div className="relative z-10 px-3 md:px-4 py-3 max-w-6xl mx-auto">
          {faqs.map((item, index) => (
            <div key={index} className="border-b border-gray-800">
              <button
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between py-3 text-start group"
              >
                <span className="text-red-600 uppercase text-sm sm:text-sm md:text-lg tracking-wide font-bold">
                  {item.question}
                </span>

                <ChevronRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    activeIndex === index
                      ? "rotate-90 text-red-600"
                      : "text-gray-500 rtl:rotate-180"
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="pb-6 global-text-style text-sm sm:text-md md:text-lg scale-up-ver-top leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}