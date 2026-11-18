
"use client";

import { useEffect, useState } from "react";
import { countryFromHost } from "@/lib/countries";

export default function CountryPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Country subdomains (ae.promolecules.com, ...) already chose the region.
    if (countryFromHost(window.location.hostname)) return;

    const selected = localStorage.getItem("selectedCountry");

    if (!selected) {
      setOpen(true);
    }
  }, []);

  const handleSelect = (country, link) => {
    localStorage.setItem("selectedCountry", country);
    setOpen(false);

    window.location.href = link;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-[#111] border border-neutral-800 rounded-2xl p-6 w-full max-w-md text-center shadow-2xl">
        
        <h2 className="text-2xl font-bold text-white mb-3">
          Select Your Region
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          Please choose your country to continue.
        </p>

        <div className="grid grid-cols-2 gap-4">
          
          {/* INDIA */}
          <button
            onClick={() =>
              handleSelect("india", "https://promolecules.co.in")
            }
            className="bg-orange-500 hover:bg-orange-400 text-white font-semibold py-3 rounded-xl transition"
          >
            INDIA
          </button>

          {/* US */}
          <button
            onClick={() =>
              handleSelect("us", "https://promolecules.com")
            }
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 rounded-xl transition"
          >
            US
          </button>

        </div>
      </div>
    </div>
  );
}