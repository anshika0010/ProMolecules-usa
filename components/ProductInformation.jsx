"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useT } from "@/lib/i18n/client";
export default function ProductInformation() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const m = useT("merch");
  const info = m.productInformation || {};
  const cr = m.customerReviews || {};
  const items = info.items || [];
  const ratings = cr.ratings || [];
  const totalRatings = cr.totalRatings || 1;
  return (
    <>
    <div className="w-full bg-black text-white py-16 px-6 md:px-20">
      
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-widest creepster-regular mb-10">
        <span className="text-white">{info.headingFirst} </span>
        <span className="text-red-600">{info.headingSecond}</span>
      </h2>

      {/* Accordion */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="border-t border-gray-700 pt-6">
            
            {/* Title Row */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center text-start"
            >
              <span className="text-lg md:text-xl font-semibold tracking-wide">
                {item.title}
              </span>

              <span className="text-2xl">
                {openIndex === index ? <FiMinus /> : <FiPlus />}
              </span>
            </button>

            {/* Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? "max-h-40 mt-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-400 leading-relaxed">
                {item.content}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
     <div className="relative w-full py-20 px-6 md:px-20 text-white overflow-hidden">

      {/* Background Image */}
      <Image
        src="/candle.webp" 
        alt="background"
        fill
        className="object-cover"
      />

 

      <div className="relative z-10 max-w-7xl mx-auto">



        {/* Customer Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div>
            <h3 className="text-2xl font-bold uppercase mb-8">
              {cr.heading}
            </h3>

            <div className="flex items-center gap-4 mb-3">
              <span className="text-4xl font-bold">{cr.rating}</span>
              <FaStar className="text-yellow-400 text-xl" />
              <span className="text-gray-400 text-sm uppercase">
                {cr.basedOn}
              </span>
            </div>

            <p className="text-gray-500 text-sm mb-6">
              {cr.ratingSince}
            </p>

            <p className="text-gray-500 text-sm uppercase">
              {cr.topOtherBrand}
            </p>
          </div>

          {/* RIGHT SIDE - Progress Bars */}
          <div className="space-y-6">
            {ratings.map((item) => {
              const percentage = (item.count / totalRatings) * 100;

              return (
                <div key={item.stars} className="flex items-center gap-6">
                  
                  {/* Star Label */}
                  <span className="w-20 text-sm uppercase text-gray-300">
                    {item.stars} {cr.starsLabel}
                  </span>

                  {/* Progress Bar */}
                  <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  {/* Count */}
                  <span className="w-8 text-sm text-gray-400 text-end">
                    {item.count}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
