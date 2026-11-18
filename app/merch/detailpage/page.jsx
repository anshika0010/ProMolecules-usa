"use client";

import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiMinus, FiPlus, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ProductInformation from "@/components/ProductInformation";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useT } from "@/lib/i18n/client";

export default function ProductDetail() {
  const [qty, setQty] = useState(1);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % tshirts.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? tshirts.length - 1 : prev - 1));
  };

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };

  const m = useT("merch");
  const pd = m.productDetail || {};
  const tc = m.trendingCollection || {};
  const products = m.products || [];
  const tshirts = ["/tshirt1.webp", "/tshirtback.webp", "/tshirtside.webp"];

  return (
    <>
      <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-7xl w-full px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT SIDE - TSHIRT */}
          <div className="flex flex-col items-center justify-center relative">
            <div className="relative w-[100%] md:w-[100%] h-[430px] md:h-[530px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="absolute w-full h-full"
                >
                  <Image
                    src={tshirts[index]}
                    alt="Tshirt"
                    fill
                 
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-6 mt-4">
              <button
                onClick={prevImage}
                aria-label={pd.prevImage}
                className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white text-2xl hover:bg-red-600 transition"
              >
                <FiArrowLeft className="rtl:rotate-180" />
              </button>

              <button
                onClick={nextImage}
                aria-label={pd.nextImage}
                className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white text-2xl hover:bg-red-600 transition"
              >
                <FiArrowRight className="rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-black/60 backdrop-blur-xl p-8 rounded-xl text-white shadow-2xl">
            {/* Title */}
            <h2 className="text-4xl md:text-5xl uppercase font-extrabold creepster-regular text-red-600 tracking-wider mb-3">
              {pd.productTitle}
            </h2>

            {/* Rating */}
            <div className="flex gap-1 mb-4 text-red-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold">{pd.price}</span>
              <span className="line-through text-gray-400 text-xl">
                {pd.oldPrice}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-red-500 font-bold mb-2 uppercase">
                {pd.descriptionHeading}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed uppercase">
                {pd.description}
              </p>
            </div>

            {/* Color */}
            <div className="mb-6">
              <h3 className="text-gray-300 mb-2 font-semibold">
                {pd.colorLabel}
              </h3>
              <div className="w-full h-12 bg-black border border-gray-600 rounded-lg flex items-center justify-between px-4">
                <span>{pd.colorName}</span>
                <span className="text-xl">+</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-gray-300 mb-2 font-semibold">{pd.quantityLabel}</h3>

              <div className="flex items-center bg-red-600 rounded-full w-fit px-4 py-2 gap-6">
                <button onClick={decreaseQty} className="text-white text-xl">
                  <FiMinus />
                </button>

                <span className="text-lg font-bold">{qty}</span>

                <button onClick={increaseQty} className="text-white text-xl">
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Buttons */}
            {/* <div className="flex flex-col gap-4">
              <button className="w-full py-4 bg-black border border-gray-700 rounded-lg font-bold hover:bg-gray-900 transition">
                ADD TO CART
              </button>

              <button className="w-full py-4 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition">
                BUY NOW
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <section className="relative w-full bg-black text-white py-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/candle.webp')" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <p className="text-gray-400 text-xs uppercase tracking-wider max-w-sm">
              {tc.introText}
            </p>

            {/* Right Heading */}
            <div className="text-end">
              <h2 className="text-red-600 text-4xl md:text-6xl creepster-regular uppercase drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">
                {tc.heading}
              </h2>
              <h3 className="text-white text-3xl md:text-5xl creepster-regular uppercase">
                {tc.subheading}
              </h3>

              <p className="text-gray-400 text-xs uppercase tracking-wider mt-4 max-w-md ms-auto">
                {tc.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="group text-center transition duration-500"
              >
                {/* Product Image */}
                <div className="flex justify-center mb-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="h-[400px] object-contain group-hover:scale-105 transition duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Product Info */}
                <h4 className="uppercase text-lg anton-regular font-extrabold tracking-wider mb-2">
                  {product.name}
                </h4>

                <div className="flex justify-center anton-regular  gap-3 text-md">
                  <span className="text-white font-bold">{product.price}</span>
                  <span className="text-gray-500 line-through">
                    {product.oldPrice}
                  </span>
                </div>
                <Link href={product.link}>
                  <button className="px-4 py-2 bg-red-600 rounded-xl font-bold text-white rounded hover:bg-red-700 transition">
                    {tc.viewNow}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProductInformation />

    </>
  );
}
