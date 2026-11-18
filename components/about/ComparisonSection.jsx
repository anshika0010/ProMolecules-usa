"use client";
import { Check } from "lucide-react";
import { useT } from "@/lib/i18n/client";

export default function ComparisonSection() {
  const t = useT("about").faqSection?.comparisonSection || {};
  const rows = t.rows || [];

  return (
    <section className="max-w-7xl mx-auto bg-black text-white px-6 md:px-16 py-6">
      
      {/* Heading */}
      <div className="text-center mb-14">
        <h2
          className="text-4xl md:text-6xl creepster-regular tracking-wide"
        
        >
          {t.heading?.first}{" "}
          <span className="text-red-600">{t.heading?.second}</span>
        </h2>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 bg-red-600 text-black text-sm font-bold uppercase tracking-wide py-3 px-4">
        <div>{t.columns?.factor}</div>
        <div>{t.columns?.gray}</div>
        <div className="text-end">{t.columns?.promolecules}</div>
      </div>

      {/* Table Rows */}
      <div className="divide-y divide-gray-800">
        {rows.map((row, index) => (
          <div
            key={index}
            className="grid grid-cols-3 py-4 px-4 text-xs md:text-sm items-center"
          >
            {/* Factor */}
            <div className="text-gray-300 uppercase tracking-wide">
              {row.factor}
            </div>

            {/* Gray Column */}
            <div className="text-gray-500 uppercase tracking-wide">
              {row.gray}
            </div>

            {/* Promolecules Column */}
            <div className="flex items-center justify-end gap-2 text-red-600 uppercase tracking-wide font-semibold">
              <span>{row.pro}</span>
              <Check size={16} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
