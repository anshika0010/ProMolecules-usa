"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useT } from "@/lib/i18n/client";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const t = useT("footer").footer || {};
  const h = t.section_headings || {};
  const contact = t.contact || {};

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
              {h.disclaimer}
            </h3>
            <p className="global-text-style">
              {(t.disclaimer || "").split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </React.Fragment>
              ))}
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-red-600 tracking-wide  creepster-regular sm:text-2xl xl:text-4xl mb-2 sm:mb-3">
              {h.quick_links}
            </h3>
            <nav className="flex flex-col gap-1 sm:gap-2 global-text-style">
              {(t.quick_links || []).map((l) => (
                <FooterLink key={l.href} href={l.href} label={l.label} />
              ))}
            </nav>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-red-600 tracking-wide  creepster-regular sm:text-2xl xl:text-4xl mb-2 sm:mb-3">
              {h.categories}
            </h3>
            <nav className="flex flex-col gap-1 sm:gap-2 global-text-style">
              {(t.categories || []).map((l) => (
                <FooterLink key={l.href} href={l.href} label={l.label} />
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div className="global-text-style">
            <h3 className="text-red-600 creepster-regular tracking-wide sm:text-2xl xl:text-4xl mb-2 sm:mb-3">
              {h.contact}
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-white/60 text-xs uppercase tracking-widest">
                  {contact.email_label}
                </span>
                <p className="mt-0.5 break-all lowercase">{contact.email}</p>
              </div>
              <div>
                <span className="text-white/60 text-xs uppercase tracking-widest">
                  {contact.social_links_label}
                </span>
                {(contact.social_links || []).map((l) => (
                  <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                    <p className="mt-0.5 break-all uppercase">{l.label}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BIG BRAND TEXT */}
        <div dir="ltr" className="mt-10 sm:mt-12 lg:mt-8 overflow-hidden text-center">
          <motion.h2
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="creepster-regular text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-red-700 tracking-wide leading-none relative inline-block"
          >
            {t.brand_text}
            <span className="absolute top-4 md:top-6 right-0 translate-x-full -translate-y-1/2 text-lg sm:text-xl md:text-3xl">
              {t.trademark}
            </span>
          </motion.h2>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 mt-2 sm:mt-4 lg:mt-5 pt-3 sm:pt-4">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Copyright */}
            <p className="global-text-style text-xs sm:text-sm text-center lg:text-start">
              {t.copyright}
            </p>

            {/* Policy links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 global-text-style">
              {(t.policy_links || []).map((l) => (
                <FooterSmallLink key={l.href} href={l.href} label={l.label} />
              ))}
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
            aria-label={t.scroll_to_top_aria_label}
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
