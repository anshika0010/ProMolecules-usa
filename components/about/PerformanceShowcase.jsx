"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n/client";

const LAYOUT = [
    {
      id: 1,
      image: "/promolecules-about.webp",
      alt: "Left Performance",
      align: "text-start",
    },
    {
      id: 2,
      image: "/promolecules-about-background-image.webp",
      alt: "Center Athlete",
      align: "text-center",
      center: true,
    },
    {
      id: 3,
      image: "/promolecules-aboutimage.webp",
      alt: "promolecules-aboutimage",
      align: "text-end md:text-end sm:text-start",
      hex: true,
    },
];

export default function PerformanceShowcase() {
  const items = useT("about")["who-we-are"]?.performanceShowcase || [];
  const data = items.map((item, i) => ({ ...LAYOUT[i], ...item }));

  return (
    <section className="relative  bg-black overflow-hidden">
      <div className="relative z-10  max-w-[1600px] mx-auto px-4 sm:px-6 py-8">

        {/* 🔥 Responsive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">

          {data.map((item) => (
            <div key={item.id} className="space-y-4">

              {/* Image */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[2/3] md:aspect-[3/5] overflow-hidden group">

                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className={`object-cover transition duration-500 
                  ${item.center ? "brightness-90 group-hover:scale-105" : "brightness-75 group-hover:brightness-100"}`}
                />

                {/* Hexagon (only for 3rd card) */}
                {item.hex && (
                  <div
                    className="absolute top-3 right-3 w-10 h-10 border-2 border-red-600 opacity-80"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    }}
                  />
                )}
              </div>

              {/* Text */}
              <div className={item.align}>
                <p className="global-text-style text-white ">
                  {item.text}
                </p>

                <p className="mt-2 text-[10px] sm:text-xs text-red-500 uppercase tracking-widest">
                  {item.tag}
                </p>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}