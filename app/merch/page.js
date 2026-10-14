// app/merch/page.js
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getSEOMetadata, getJSONLD } from "@/lib/seo";
import Image from "next/image";

export const metadata = getSEOMetadata("merch");

const PowerYouCanWear = () => {
  const jsonld = getJSONLD("merch");

  const products = [
    {
      id: 1,
      name: "Father Of Insane Skell",
       price: "$ 49.00",
      oldPrice: "$50.00",
      image: "/tshirt1.webp",
      link: "/merch/detailpage",
      outOfStock: true 
    },
    {
      id: 2,
      name: "Father Of Insane Fusion",
    price: "$ 49.00",
      oldPrice: "$50.00",
      image: "/tshirt2.webp",
      link: "/merch/detailpage",
      outOfStock: true 
    },
    {
      id: 3,
      name: "Father Of Insane Nitro",
     price: "$ 49.00",
      oldPrice: "$50.00",
      image: "/tshirt3.webp",
      link: "/merch/detailpage",
      outOfStock: true 
    },
  ];

  return (
    <>
      {jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonld }}
        />
      )}

      <section className="relative w-full h-screen overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/product5.webp')" }}
        />
        <div className="relative z-10 flex items-center justify-between h-full px-6 md:px-16">
          <div className="max-w-lg">
            <h1 className="leading-none mb-6">
              <span className="block text-red-600 text-4xl md:text-6xl creepster-regular uppercase tracking-widest">
                Power You Can
              </span>
              <span className="block text-white text-5xl md:text-7xl creepster-regular uppercase">
                Wear
              </span>
            </h1>
            <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wide">
              Premium fitness apparel crafted for strength and durability.
              Designed for those who push limits and demand performance.
            </p>
          </div>
        </div>
      </section>


     <section className="relative w-full bg-black text-white py-20 overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-20"
    style={{ backgroundImage: "url('/candle.webp')" }}
  />
  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {products.map((product) => (
        <div key={product.id} className="group text-center transition duration-500">
          
          {/* Image wrapper with overlay */}
          <div className="relative flex justify-center mb-6">
       <Image
  src={product.image}
  alt={product.name}
  width={800}
  height={400}
  className="w-full h-[400px] object-contain"
/>

            {/* Out of Stock overlay — only shown if product.outOfStock is true */}
            {product.outOfStock && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="bg-black/70 backdrop-blur-sm border border-red-600 px-6 py-3 rounded-xl">
                  <span className="text-red-500 font-extrabold uppercase tracking-widest text-lg">
                    Out of Stock
                  </span>
                </div>
              </div>
            )}
          </div>

          <h4 className="uppercase text-lg anton-regular font-extrabold tracking-wider mb-2">
            {product.name}
          </h4>
          <div className="flex justify-center anton-regular gap-3 text-md">
            <span className="text-white font-bold">{product.price}</span>
            <span className="text-gray-500 line-through">{product.oldPrice}</span>
          </div>
          <Link href={product.link}>
            <button
              className={`px-4 py-2 rounded-xl font-bold text-white transition ${
                product.outOfStock
                  ? "bg-gray-600 cursor-not-allowed opacity-60"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={product.outOfStock}
            >
              {product.outOfStock ? "OUT OF STOCK" : "VIEW NOW"}
            </button>
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="relative w-full min-h-[50vh] lg:min-h-[50vh] bg-black text-white overflow-hidden">
        <div className="relative z-10 flex items-center justify-between h-full px-6 md:px-16">
          <div className="hidden md:flex items-end justify-center">
            <Image src="/father-of-insane-fusion-merchboy.webp" alt="father-of-insane-fusion-merchboy" fill className="left-0 bottom-0 object-cover" />
          </div>
          <div className="w-full md:w-1/2 max-w-xl ml-auto">
            <p className="text-white text-xl md:text-2xl creepster-regular uppercase tracking-widest mb-2">
              Dark Gothic
            </p>
            <h2 className="text-red-600 text-5xl md:text-7xl creepster-regular font-bold uppercase leading-none drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]">
              Collection
            </h2>
            <p className="mt-6 text-gray-400 text-sm uppercase tracking-wide leading-relaxed max-w-md">
              Dark gothic collection is not fashion — it's rebellion in fabric.
              Born from shadows, inspired by chaos, and designed for those who
              rule their own darkness.
            </p>
            <button className="group mt-8 flex items-center gap-4 border border-gray-600 rounded-full px-6 py-3 hover:border-red-600 transition duration-300">
              <span className="uppercase text-sm tracking-widest">Explore Now</span>
              <span className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 group-hover:border-red-600 transition">
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

     {/* <section className="relative w-full bg-black text-white py-20 overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-20"
    style={{ backgroundImage: "url('/candle.webp')" }}
  />
  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {products.map((product) => (
        <div key={product.id} className="group text-center transition duration-500">

          <div className="relative flex justify-center mb-6">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="h-[400px] object-contain group-hover:scale-105 transition duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            />

            {product.outOfStock && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="bg-black/70 backdrop-blur-sm border border-red-600 px-6 py-3 rounded-xl">
                  <span className="text-red-500 font-extrabold uppercase tracking-widest text-lg">
                    Out of Stock
                  </span>
                </div>
              </div>
            )}
          </div>

          <h4 className="uppercase text-lg anton-regular font-extrabold tracking-wider mb-2">
            {product.name}
          </h4>
          <div className="flex justify-center anton-regular gap-3 text-md">
            <span className="text-white font-bold">{product.price}</span>
            <span className="text-gray-500 line-through">{product.oldPrice}</span>
          </div>
          <Link href={product.link}>
            <button
              className={`px-4 py-2 rounded-xl font-bold text-white transition ${
                product.outOfStock
                  ? "bg-gray-600 cursor-not-allowed opacity-60"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={product.outOfStock}
            >
              {product.outOfStock ? "OUT OF STOCK" : "VIEW NOW"}
            </button>
          </Link>
        </div>
      ))}
    </div>
  </div>
</section> */}

    </>
  );
};

export default PowerYouCanWear;