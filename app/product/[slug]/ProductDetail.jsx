"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import MoreProducts from "./MoreProducts";
import { FaWhatsapp } from "react-icons/fa";

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

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#22c55e"
    strokeWidth="2.5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CartIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

// ── Cart Popup ──────────────────────────────────────────────────────────────
function CartPopup({ isOpen, onClose, product, flavour, quantity, mode }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#0d0d0d] border-l border-[#222] z-[999] flex flex-col
      transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <CartIcon />
            <span className="font-barlowCondensed font-bold tracking-[0.2em] uppercase text-sm">
              {mode === "buynow" ? "Checkout" : "Your Cart"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 grid place-items-center text-[#555] hover:text-white transition-colors rounded border border-[#1e1e1e] hover:border-[#444]"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Confirmation strip */}
        <div className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-green-500/10 border-b border-green-500/20">
          <CheckIcon />
          <span className="text-green-400 text-xs tracking-[0.15em] uppercase font-medium">
            {mode === "buynow" ? "Ready to checkout!" : "Item added to cart!"}
          </span>
        </div>

        {/* Product row */}
        <div className="px-4 sm:px-6 py-5 flex gap-2 sm:gap-2 md:gap-4 border-b border-[#1e1e1e]">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#111] border border-[#222] rounded overflow-hidden shrink-0">
            <Image
              src={flavour?.images?.[0] || product.images[0]}
              alt={product.name}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div>
              <h1 className="font-black uppercase tracking-wider text-red-500 text-sm  truncate creepster-regular">
                {product.name}
              </h1>
              {flavour && (
                <p className="text-[#555] text-xs tracking-widest uppercase mt-1">
                  {flavour.name}
                </p>
              )}
            </div>
            <span className="text-[#444] text-xs tracking-widest">
              Qty: {quantity}
            </span>
          </div>
        </div>

        {/* Flipkart / Coming Soon */}
        <div className="px-4 sm:px-6 py-4">
          {product?.flipkartLink ? (
            <div className="bg-[#111] border border-neutral-800 rounded-xl px-4 py-3 flex items-center justify-between hover:border-red-600 transition">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Buy on Flipkart
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Purchase securely from Flipkart.
                </p>
              </div>

              {/* ✅ FIXED */}
              <a
                href={product.flipkartLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-black px-3 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-300 transition shrink-0 ml-3"
              >
                Buy Now
              </a>
            </div>
          ) : (
            <div className="bg-[#111] border border-neutral-800 rounded-xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Launching Soon...
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                This product will be available on Flipkart soon.
              </p>

              {/* ✅ FIXED */}
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
      </div>
    </>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function ProductDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [factsOpen, setFactsOpen] = useState(false);
  const [open, setOpen] = useState(0);

  const [selectedFlavour, setSelectedFlavour] = useState(
    product.variants[0].flavour,
  );
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size);
  const [activeImg, setActiveImg] = useState(product.variants[0].image);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartMode, setCartMode] = useState("cart");

  // ✅ Add these two lines
  const flavours = [...new Set(product.variants.map((v) => v.flavour))];
  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const handleAddToCart = () => {
    setCartMode("cart");
    setCartOpen(true);
  };
  // Unique sizes with their prices from variants
  const servings = [
    ...new Map(
      product.variants.map((v) => [v.size, { size: v.size, price: v.price }]),
    ).values(),
  ];
  const handleBuyNow = () => {
    setCartMode("buynow");
    setCartOpen(true);
  };
  const [selectedServing, setSelectedServing] = useState(servings[0]);

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
      <CartPopup
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        product={product}
        flavour={selectedFlavour}
        quantity={quantity}
        mode={cartMode}
      />

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
              <div className="flex gap-2 overflow-x-auto  scrollbar-hide">
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
    } else {
      return (
        <span key={i} className="relative inline-block w-[1em] h-[1em]">
          {/* Empty star base */}
          <StarIcon filled={false} />
          {/* Half filled overlay */}
          <span className="absolute inset-0 overflow-hidden w-[50%]">
            <StarIcon filled={true} />
          </span>
        </span>
      );
    }
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
                        setActiveImg(match.image); // ✅ add prefix
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
              {/* Servings */}
              <div>
                <p className="text-red-600 font-bold text-xs uppercase tracking-[2px] mb-2">
                  SERVINGS
                </p>
                <div className="flex gap-2 flex-wrap">
                  {servings.map(
                    (
                      s, // ✅ product.servings → servings
                    ) => (
                      <button
                        key={s.size}
                        onClick={() => {
                          setSelectedServing(s);
                          setSelectedSize(s.size); // ✅ size state bhi update karo
                          const match =
                            product.variants.find(
                              (v) =>
                                v.size === s.size &&
                                v.flavour === selectedFlavour,
                            ) ||
                            product.variants.find((v) => v.size === s.size);
                          if (match) setActiveImg(match.image); // ✅ image update
                        }}
                        className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm uppercase tracking-wider border rounded transition ${
                          selectedServing?.size === s.size
                            ? "bg-red-600 border-red-600 text-white"
                            : "bg-[#1a1a1a] border-[#333] hover:border-red-500"
                        }`}
                      >
                        {s.size}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Quantity */}
              {/* <div className="pt-3 border-t border-[#2a2a2a]">
                <p className="text-red-600 font-bold text-xs uppercase tracking-[2px] mb-3">
                  QUANTITY
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2 md:gap-4">
                  <div className="flex border border-[#333] rounded-lg overflow-hidden w-fit">
                    <button
                      className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] transition text-lg font-bold"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      −
                    </button>
                    <span className="w-12 text-center leading-[42px] bg-[#111] text-base font-bold">
                      {quantity}
                    </span>
                    <button
                      className="w-10 h-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] transition text-lg font-bold"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div> */}

              {/* CTA Buttons */}
              {/* <div className="flex flex-row gap-3 pt-1">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 border-2 border-white py-3 font-bold tracking-[2px] sm:tracking-[3px] rounded-xl uppercase hover:bg-white hover:text-black transition text-sm sm:text-base"
                >
                  Add To Cart
                </button> 
                 <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-red-600 border-2 border-red-600 py-3 font-bold tracking-[2px] sm:tracking-[3px] rounded-xl uppercase hover:bg-red-700 transition text-sm sm:text-base"
                >
                  Buy Now
                </button>
              </div> */}

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
