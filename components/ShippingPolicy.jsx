'use client';
import { useState, useEffect, useRef } from "react";
import {
  Package,
  Truck,
  Clock,
  ShieldCheck,
  MapPin,
  Globe2,
  Mail,
  RotateCcw,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { useT } from "@/lib/i18n/client";
import PolicyBody from "@/components/policy/PolicyBody";

const sections = [
  { id: "processing", label: "Order Processing", icon: Clock },
  { id: "rates", label: "Rates & Delivery", icon: Truck },
  { id: "tracking", label: "Tracking", icon: Package },
  { id: "quality", label: "Quality Assurance", icon: BadgeCheck },
  { id: "damages", label: "Damages & Lost Packages", icon: ShieldCheck },
  { id: "address", label: "Incorrect Addresses", icon: MapPin },
  { id: "international", label: "International Shipping", icon: Globe2 },
  { id: "returns", label: "Returns", icon: RotateCcw },
  { id: "contact", label: "Contact", icon: Mail },
];

const ICONS = Object.fromEntries(sections.map((s) => [s.id, s.icon]));

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0.1 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function SectionCard({ id, icon: Icon, eyebrow, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-stone-200 py-10 first:pt-0 last:border-b-0"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-900/5 text-teal-800 ring-1 ring-teal-900/10">
          <Icon size={18} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          {eyebrow && (
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-700">
              {eyebrow}
            </p>
          )}
          <h2 className="font-serif text-2xl text-stone-900 sm:text-[1.65rem]">
            {title}
          </h2>
          <div className="prose-policy mt-4 max-w-none text-[15px] leading-relaxed text-stone-600">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ShippingPolicy() {
  const t = useT("shipping");
  const page = t.page || {};
  const contentRef = useRef(null);


  return (
    <div className="min-h-screen bg-black font-sans text-stone-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Fraunces', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .prose-policy p { margin: 0 0 0.85em 0; }
        .prose-policy p:last-child { margin-bottom: 0; }
        .prose-policy ul { margin: 0.5em 0; padding-inline-start: 1.15em; }
        .prose-policy li { margin-bottom: 0.5em; }
        .prose-policy li::marker { color: #b45309; }
        .prose-policy a { color: #115e59; text-decoration: underline; text-underline-offset: 2px; }
      `}</style>

     

      {/* Body */}
      <div className="mx-auto max-w-6xl px-6 py-12 bg-black sm:px-10 sm:py-16">
        <div className="">
         

          {/* Content */}
          <main
            ref={contentRef}
            className="rounded-2xl border border-stone-200 bg-white px-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:px-10"
          >
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-black sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-black p-2 ">
              {page.intro}
            </p>
            {(t.sections || []).map((section) => (
              <SectionCard
                key={section.id}
                id={section.id}
                icon={ICONS[section.id] || Mail}
                eyebrow={section.eyebrow}
                title={section.title}
              >
                <PolicyBody section={section} />
              </SectionCard>
            ))}
          </main>
        </div>
      </div>

    </div>
  );
}