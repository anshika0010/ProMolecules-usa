"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronRight, FaWhatsapp, FaAmazon } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import MoreProducts from "./MoreProducts";

// Cost2Cost logo (file lives in /public/c2c-logo-black.png)
const C2CLogo = ({ size = 20 }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/c2c white.webp"
    alt="Cost2Cost"
    style={{ height: size, width: "auto" }}
  />
);

const StarIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "#f5a623" : "none"}
    stroke="#f5a623"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// ── Main Component ──────────────────────────────────────────────────────────
export default function ProductDetail({ product }) {
  const [factsOpen, setFactsOpen] = useState(false);
  const [open, setOpen] = useState(0);

  const [selectedFlavour, setSelectedFlavour] = useState(
    product.variants[0].flavour,
  );
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size);
  const [activeImg, setActiveImg] = useState(product.variants[0].image);

  const flavours = [...new Set(product.variants.map((v) => v.flavour))];

  // Unique sizes with their prices from variants
  const servings = [
    ...new Map(
      product.variants.map((v) => [v.size, { size: v.size, price: v.price }]),
    ).values(),
  ];
  const [selectedServing, setSelectedServing] = useState(servings[0]);

  // ── Marketplace buy links ──
  const buyLinks = [
    { label: "Amazon", href: product.amazonLink, Icon: FaAmazon },
    { label: "Flipkart", href: product.flipkartLink, Icon: SiFlipkart },
    { label: "Cost2Cost", href: product.cost2cost, Icon: C2CLogo },
  ].filter((item) => item.href);

  const sections = [
    { title: "DESCRIPTION", content: product.description },
    { title: "KEY BENEFITS", content: product.keyBenefits },
    { title: "WHY CHOOSE US?", content: product.whychooseus },
    { title: "HOW TO USE", content: product.howToUse },
    { title: "SAFETY INFORMATION", content: product.safetyInformation },
    { title: "WHO SHOULD USE", content: product.whoShouldUse },
  ];

  const toggle = (index) => setOpen(open === index ? null : index);

  return (
    <>
      {/* ── Product Layout ── */}
      <div className="min-h-screen bg-gradient-to-br from-black via-[#111] to-[#0d0d0d] text-white font-barlowCondensed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 sm:py-8 mt-6 sm:mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* ── LEFT: Images ── */}
            <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 md:sticky md:top-7 h-fit">
              {/* Main image */}
              <div className="relative flex items-center justify-center h-[280px] sm:h-[380px] md:h-[500px] overflow-hidden border border-gray-800 rounded-2xl bg-[#0d0d0d]">
                <div className="absolute w-[200px] sm:w-[300px] h-[260px] sm:h-[360px] rounded-full bg-[radial-gradient(circle,rgba(224,0,27,0.12)_0%,transparent_70%)]" />
                <Image
                  src={activeImg}
                  alt="product"
                  width={400}
                  height={400}
                  className="h-[240px] sm:h-[320px] md:h-[460px] w-auto object-contain relative z-10 transition-all duration-500 ease-in-out"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(src)}
                    className={`shrink-0 w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-lg border-2 bg-[#111] overflow-hidden transition-all ${
                      activeImg === src
                        ? "border-red-600"
                        : "border-transparent hover:border-white/20"
                    }`}
                  >
                    <Image
                      src={src}
                      width={90}
                      height={90}
                      alt={`thumbnail ${i + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Details ── */}
            <div className="flex flex-col gap-2 sm:gap-2 md:gap-4">
              {/* Name */}
              <h2 className="text-2xl sm:text-5xl md:text-[52px] anton-regular uppercase text-red-600 leading-none drop-shadow-[0_0_30px_rgba(224,0,27,0.3)]">
                {product.name}
              </h2>

              <div className="h-[2px] bg-gradient-to-r from-red-600 to-transparent" />

              {/* Stars */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => {
                  if (i <= 4) {
                    return <StarIcon key={i} filled={true} />;
                  }
                  return (
                    <span
                      key={i}
                      className="relative inline-block w-[1em] h-[1em]"
                    >
                      {/* Empty star base */}
                      <StarIcon filled={false} />
                      {/* Half filled overlay */}
                      <span className="absolute inset-0 overflow-hidden w-[50%]">
                        <StarIcon filled={true} />
                      </span>
                    </span>
                  );
                })}
              </div>

              <p className="global-text-style text-xs sm:text-sm md:text-base">
                {product.title}
              </p>

              {/* Price */}
              <div className="text-xl sm:text-4xl font-black leading-none text-white">
                ${selectedServing?.price}
              </div>

              {/* Flavours */}
              <div>
                <p className="text-red-600 font-bold text-xs uppercase tracking-[2px] mb-2">
                  FLAVOURS
                </p>
                <div className="flex gap-2 flex-wrap">
                  {flavours.map((flavour) => (
                    <button
                      key={flavour}
                      onClick={() => {
                        setSelectedFlavour(flavour);
                        const match =
                          product.variants.find(
                            (v) =>
                              v.flavour === flavour && v.size === selectedSize,
                          ) ||
                          product.variants.find((v) => v.flavour === flavour);
                        if (match) setActiveImg(match.image);
                      }}
                      className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm uppercase tracking-wider border rounded transition ${
                        selectedFlavour === flavour
                          ? "bg-red-600 border-red-600 text-white"
                          : "bg-[#1a1a1a] border-[#333] hover:border-red-500"
                      }`}
                    >
                      {flavour}
                    </button>
                  ))}
                </div>
              </div>

              {/* Servings */}
              <div>
                <p className="text-red-600 font-bold text-xs uppercase tracking-[2px] mb-2">
                  SERVINGS
                </p>
                <div className="flex gap-2 flex-wrap">
                  {servings.map((s) => (
                    <button
                      key={s.size}
                      onClick={() => {
                        setSelectedServing(s);
                        setSelectedSize(s.size);
                        const match =
                          product.variants.find(
                            (v) =>
                              v.size === s.size &&
                              v.flavour === selectedFlavour,
                          ) || product.variants.find((v) => v.size === s.size);
                        if (match) setActiveImg(match.image);
                      }}
                      className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm uppercase tracking-wider border rounded transition ${
                        selectedServing?.size === s.size
                          ? "bg-red-600 border-red-600 text-white"
                          : "bg-[#1a1a1a] border-[#333] hover:border-red-500"
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Buy Links ── */}
              <div className="pt-3 border-t border-[#2a2a2a]">
                {buyLinks.length > 0 ? (
                  <>
                    <p className="text-red-600 font-bold text-xs uppercase tracking-[2px] mb-3">
                      BUY NOW ON
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:w-50">
                      {buyLinks.map(({ label, href, Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer nofollow sponsored"
                          aria-label={`Buy on ${label}`}
                          title={`Buy on ${label}`}
                          className="flex-1 flex items-center justify-center py-3 px-4 rounded-xl border-2 border-red-600 bg-black-600 text-white hover:bg-red-700 hover:border-red-700 transition"
                        >
                          <Icon size={26} />
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-[#111] border border-neutral-800 rounded-xl p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Launching Soon...
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      This product will be available online soon.
                    </p>
                    <a
                      href="https://wa.me/17867892121"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-green-400 hover:text-green-300 transition"
                    >
                      <FaWhatsapp size={15} /> WhatsApp us for early access
                    </a>
                  </div>
                )}
              </div>

              {/* Supplement Facts */}
              <div className="border-t border-[#2a2a2a] pt-3">
                <div
                  onClick={() => setFactsOpen(!factsOpen)}
                  className="flex justify-between items-center py-3 cursor-pointer uppercase font-bold tracking-[2px] text-sm hover:text-red-500 transition"
                >
                  <span>Supplement Facts</span>
                  <span
                    className={`transition-transform duration-300 ${factsOpen ? "rotate-45" : ""}`}
                  >
                    <PlusIcon />
                  </span>
                </div>

                {/* Animated dropdown */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    factsOpen
                      ? "max-h-[600px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-4">
                    {product?.images?.[3] && (
                      <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
                        <Image
                          src={product.images[3]}
                          alt="Supplement Facts"
                          width={600}
                          height={800}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <MoreProducts />
            </div>
          </div>
        </div>
      </div>

      {/* ── Accordion Section ── */}
      <section className="max-w-7xl mx-auto bg-black text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          {/* Product image */}
          <div className="flex justify-center">
            <Image
              src={product.images[2] || product.images[0]}
              alt="product"
              width={400}
              height={400}
              className="h-[260px] sm:h-[380px] lg:h-[500px] w-auto object-contain"
            />
          </div>

          {/* Accordion */}
          <div className="flex flex-col divide-y divide-gray-800">
            {sections.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center py-4 sm:py-6 text-left"
                >
                  <h3 className="text-red-600 text-lg sm:text-2xl tracking-widest font-semibold creepster-regular">
                    {item.title}
                  </h3>
                  <FaChevronRight
                    className={`text-white shrink-0 ml-3 transition-transform duration-300 ${
                      open === index ? "rotate-90" : ""
                    }`}
                  />
                </button>
                {open === index && (
                  <div className="pb-5 global-text-style text-sm sm:text-base max-w-xl">
                    {Array.isArray(item.content) ? (
                      <ul className="list-disc pl-5 space-y-1.5">
                        {item.content.map((text, i) => (
                          <li key={i}>{text}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{item.content}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}