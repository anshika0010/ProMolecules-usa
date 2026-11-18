

import React from "react";
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import { getT } from "@/lib/i18n/server";
import PolicyBody from "@/components/policy/PolicyBody";
import {
  Scale,
  Shield,
  HeartPulse,
  CreditCard,
  Truck,
  RotateCcw,
  Copyright,
  AlertTriangle,
  UserCheck,
  Link as LinkIcon,
  Lock,
  RefreshCw,
  Gavel,
  Mail,
} from "lucide-react";

export const metadata = getSEOMetadata("termsConditions");

function SectionCard({ id, icon: Icon, eyebrow, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-b border-stone-200 py-10 first:pt-0 last:border-b-0"
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-900/5 text-red-800 ring-1 ring-red-900/10">
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

const ICONS = {
  "general-use": UserCheck,
  "products-information": Scale,
  "health-disclaimer": HeartPulse,
  "orders-payments": CreditCard,
  "shipping-delivery": Truck,
  "returns-refunds": RotateCcw,
  "intellectual-property": Copyright,
  "limitation-of-liability": AlertTriangle,
  "user-conduct": Shield,
  "third-party-links": LinkIcon,
  "privacy": Lock,
  "changes-to-terms": RefreshCw,
  "governing-law": Gavel,
  "contact-information": Mail,
};

const TermsConditions = async () => {
  const jsonld = getJSONLD("termsConditions");

  const t = await getT("terms");
  const page = t.page || {};
  const sections = (t.sections || []).map((section) => ({
    ...section,
    icon: ICONS[section.id] || UserCheck,
    content: <PolicyBody section={section} />,
  }));

  return (
    <>
      {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonld }}
        />
      )}

      <div className="min-h-screen bg-black font-sans text-stone-800">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
          .font-serif { font-family: 'Fraunces', serif; }
          .font-sans { font-family: 'Inter', sans-serif; }
          .prose-policy p { margin: 0 0 0.85em 0; }
          .prose-policy p:last-child { margin-bottom: 0; }
          .prose-policy ul { margin: 0.5em 0; padding-inline-start: 1.15em; }
          .prose-policy li { margin-bottom: 0.5em; }
          .prose-policy li::marker { color: #f81d1d; }
          .prose-policy a { color: #ee0909; text-decoration: underline; text-underline-offset: 2px; }
        `}</style>

        {/* Body */}
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
          <div>
            {/* Content */}
            <main className="rounded-2xl border border-stone-200 bg-white px-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:px-10">
              <span className="mt-8 inline-block rounded-full bg-red-500 px-5 py-2 font-semibold text-black">
                {page.lastUpdatedLabel} {page.lastUpdated}
              </span>

              <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.08] text-black sm:text-5xl">
                {page.title}
              </h1>
              <h2 className="mt-1 font-serif text-2xl text-red-700 sm:text-3xl">
                {page.subtitle}
              </h2>

              <p className="mt-5 max-w-xl p-4 text-[15px] leading-relaxed text-black">
                {page.intro}
              </p>

              {sections.map((item) => (
                <SectionCard
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  eyebrow={item.eyebrow}
                  title={item.title}
                >
                  {item.content}
                </SectionCard>
              ))}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsConditions;