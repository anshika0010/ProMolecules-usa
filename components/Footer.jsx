"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/promolecules-footer-background.webp')",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-8 lg:py-6">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-10">
          {/* DISCLAIMER */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-red-600 tracking-wide  creepster-regular sm:text-2xl xl:text-4xl mb-2 sm:mb-3">
              DISCLAIMER
            </h3>
            <p className="global-text-style">
       Built for serious athletes and healthy adults only. Promolecules products are designed to
support training performance, not replace professional medical advice. Always consult your
healthcare professional before use, especially if you have any existing conditions.<br></br>
Use responsibly. Start with recommended servings and assess your tolerance. Do not exceed
suggested dosage.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-red-600 tracking-wide  creepster-regular sm:text-2xl xl:text-4xl mb-2 sm:mb-3">
              QUICK LINKS
            </h3>
            <nav className="flex flex-col gap-1 sm:gap-2 global-text-style">
              <FooterLink href="/about" label="ABOUT US" />
              <FooterLink href="/contact-us" label="CONTACT" />
              <FooterLink href="/product" label="PRODUCTS" />
              <FooterLink href="/blog" label="BLOGS" />
              <FooterLink href="/about/faq/" label="FAQ" />
              <FooterLink href="/domestic" label="DOMESTIC" />
              <FooterLink href="/international" label="INTERNATIONAL" />
            </nav>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-red-600 tracking-wide  creepster-regular sm:text-2xl xl:text-4xl mb-2 sm:mb-3">
              CATEGORIES
            </h3>
            <nav className="flex flex-col gap-1 sm:gap-2 global-text-style">
             
              <FooterLink href="/high-stim-pre-workout/" label="PREWORKOUT" />
               <FooterLink href="https://www.fatherofinsane.com/" label="Father of Insane V.2" />
              <FooterLink href="/hydrapump-liquid-glycerol-pre-workout-supplement/" label="HYDRAPUMP" />
              <FooterLink href="/shop" label="FAT BURNER" />
              <FooterLink href="/shop" label="ATP BOOSTER" />
              
       
             
              <FooterLink href="/merch" label="MERCHANDISE" />
            </nav>
          </div>

          {/* CONTACT */}
          <div className="global-text-style">
            <h3 className="text-red-600 creepster-regular tracking-wide sm:text-2xl xl:text-4xl mb-2 sm:mb-3">
              CONTACT
            </h3>
            <div className="space-y-2 text-sm">
              {/* <div>
                <span className="text-white/60 text-xs uppercase tracking-widest">
                  Phone
                </span>
                <p className="mt-0.5">+1 (786) 789-2121</p>
              </div> */}
              <div>
                <span className="text-white/60 text-xs uppercase tracking-widest">
                  Email
                </span>
                <p className="mt-0.5 break-all lowercase">
                  info@promolecules.com
                </p>
              </div>
            <div>
  <span className="text-white/60 text-xs uppercase tracking-widest">
    Social Links
  </span>

  <Link
    href="https://www.instagram.com/promolecules/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <p className="mt-0.5 break-all uppercase">INSTAGRAM</p>
  </Link>

  <Link
    href="https://www.facebook.com/promolecules.official"
    target="_blank"
    rel="noopener noreferrer"
  >
    <p className="mt-0.5 break-all uppercase">FACEBOOK</p>
  </Link>

  <Link
    href="https://www.youtube.com/@Promolecules"
    target="_blank"
    rel="noopener noreferrer"
  >
    <p className="mt-0.5 break-all uppercase">YOUTUBE</p>
  </Link>

  <Link
    href="https://in.pinterest.com/promolecules/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <p className="mt-0.5 break-all uppercase">PINTEREST</p>
  </Link>
</div>
            </div>
          </div>
        </div>

        {/* BIG BRAND TEXT */}
        <div className="mt-10 sm:mt-12 lg:mt-8 overflow-hidden text-center">
          <motion.h2
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="creepster-regular text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-red-700 tracking-wide leading-none relative inline-block"
          >
            PROMOLECULES
            <span className="absolute top-4 md:top-6 right-0 translate-x-full -translate-y-1/2 text-lg sm:text-xl md:text-3xl">
              TM
            </span>
          </motion.h2>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 mt-2 sm:mt-4 lg:mt-5 pt-3 sm:pt-4">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Copyright */}
            <p className="global-text-style text-xs sm:text-sm text-center lg:text-left">
              ©2026 PROMOLECULES™ ALL RIGHTS RESERVED.
            </p>

            {/* Policy links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 global-text-style">
              <FooterSmallLink href="/privacy-policy" label="PRIVACY POLICY" />
              <FooterSmallLink
                href="/terms-conditions"
                label="TERMS OF SERVICE"
              />
              <FooterSmallLink href="/cookies-policy" label="COOKIE POLICY" />
                    <FooterSmallLink href="/shipping-policy" label="SHIPPING POLICY" />
                       <FooterSmallLink href="/return-policy" label="RETURN & EXCHANGE POLICY" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll To Top Button ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 border border-red-500/40 rounded-full shadow-lg shadow-red-900/40 transition-colors duration-200"
          >
            <ArrowUp
              size={20}
              className="text-white group-hover:-translate-y-0.5 transition-transform duration-200"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;

/* ── Reusable links ── */

function FooterLink({ href, label }) {
  return (
    <Link
      href={href}
      className="text-white text-sm font-semibold tracking-wide hover:text-red-600 transition-colors duration-200"
    >
      {label}
    </Link>
  );
}

function FooterSmallLink({ href, label }) {
  return (
    <Link
      href={href}
      className="text-xs font-semibold tracking-wider hover:text-red-600 transition-colors duration-200 whitespace-nowrap"
    >
      {label}
    </Link>
  );
}
