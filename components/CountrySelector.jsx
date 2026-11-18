"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check, Search, Globe } from "lucide-react";
import { COUNTRIES, countryFromHost, countryUrl } from "@/lib/countries";
import { useT } from "@/lib/i18n/client";

// Converts "AE" -> 🇦🇪
const flag = (code) =>
  String.fromCodePoint(...[...code].map((c) => 0x1f1a5 + c.charCodeAt(0)));

export default function CountrySelector({ fullWidth = false, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const inputRef = useRef(null);
  const t = useT("navbar").navbar?.country_selector || {};

  /* Show a country only when on its subdomain (e.g. ae.promolecules.com);
     on the main site nothing is selected by default */
  useEffect(() => {
    const found = countryFromHost(window.location.hostname);
    if (found) setSelected(found);
  }, []);

  /* Close on outside click / Escape */
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleSelect = (country) => {
    setSelected(country);
    setOpen(false);
    setQuery("");
    window.dispatchEvent(new CustomEvent("countrychange", { detail: country }));
    onSelect?.(country);

    // Redirect to the country subdomain, keeping the current page path
    const target = countryUrl(country.code, window.location);
    if (window.location.hostname !== new URL(target).hostname) {
      const { pathname, search, hash } = window.location;
      window.location.href = `${target}${pathname}${search}${hash}`;
    }
  };

  const filtered = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div ref={ref} className={`relative ${fullWidth ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.aria_label}
        className={`flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-full transition-colors duration-200 text-white px-4 py-2.5 sm:py-3
          ${fullWidth ? "w-full justify-between" : ""}`}
      >
        <span className="flex items-center gap-2 min-w-0">
          {selected ? (
            <span className="text-base leading-none">{flag(selected.code)}</span>
          ) : (
            <Globe size={18} />
          )}
          <span className="text-xs font-semibold tracking-wider truncate max-w-[110px] xl:max-w-[140px]">
            {selected ? selected.name.toUpperCase() : t.button}
          </span>
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`z-[80] mt-2 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden
            ${fullWidth ? "relative w-full" : "absolute end-0 w-64"}`}
        >
          <div className="p-2 border-b border-white/10">
            <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
              <Search size={14} className="text-white/50" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search_placeholder}
                className="bg-transparent outline-none text-sm text-white placeholder-white/40 w-full"
              />
            </div>
          </div>

          <ul role="listbox" className={`${fullWidth ? "max-h-56" : "max-h-72"} overflow-y-auto py-1`}>
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-white/50">{t.no_results}</li>
            )}
            {filtered.map((c) => {
              const active = selected?.code === c.code;
              return (
                <li key={c.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => handleSelect(c)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-start transition-colors
                      ${active ? "bg-red-500/15 text-red-400" : "text-white/80 hover:bg-white/5 hover:text-white"}`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-base leading-none">{flag(c.code)}</span>
                      {c.name}
                    </span>
                    {active && <Check size={14} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
