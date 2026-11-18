"use client";

import Image from "next/image";
import Link from "next/link";

export default function MoreProducts({ products = [], heading }) {

  return (
    <section className="bg-black text-white py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <h2 className="text-red-600 creepster-regular text-2xl sm:text-3xl md:text-4xl mb-6">
          {heading}
        </h2>

        {/* Product List */}
        <div className="border border-white/20 divide-y divide-white/20 rounded-lg overflow-hidden">

          {products.map((item, index) => (
            <Link
              key={index}
              href={`/product/${item.slug}`}
              className="block"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-white/5 transition">

                {/* Left Side */}
                <div className="flex items-center gap-4">

                  <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm tracking-wide">
                      {item.name}
                    </h3>

                    <p className="text-xs text-white/70 mt-1">
                      <span className="font-semibold text-white">
                        ${item.servings?.[0]?.price}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Button */}
                {/* <button
                  className="w-full sm:w-auto border border-white px-5 py-2 text-xs tracking-wider uppercase hover:bg-white hover:text-black transition"
                >
                  Add To Cart
                </button> */}

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}