"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import SearchModal from "../components/SearchModal";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();

  /* ── Hide on scroll-down, show on scroll-up ── */
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 60) {
        setShowNavbar(false);
        setIsOpen(false); // close mobile menu when hiding
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  /* ── Lock body scroll when cart or mobile menu is open ── */
  useEffect(() => {
    const locked = cartOpen || isOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, isOpen]);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "HOME",    href: "/" },
     { name: "SHOP",    href: "/shop" },
    { name: "ABOUT",   href: "/about" },
   
    { name: "BLOGS",   href: "/blog" },
    { name: "CONTACT", href: "/contact-us" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* ── Icon button shared style ── */
  const iconBtn =
    "flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/10 hover:bg-white/10 rounded-full transition-colors duration-200";

  return (
    <>
      {/* ════════════════════════════════════════
          NAV BAR
      ════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4
          backdrop-blur-xl bg-black/20
          transition-transform duration-300
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3 sm:gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="flex-shrink-0 z-10">
            <Image
              src="/promolecules-logo.webp"
              alt="Promolecules logo"
              width={150}
              height={150}
              priority
              className="object-contain w-28 sm:w-34 md:w-36 lg:w-40"
            />
          </Link>

          {/* ── Desktop nav pill  (lg+) ── */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 backdrop-blur-xl border border-white/10 rounded-full px-3 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-bold px-4 xl:px-6 2xl:px-8 py-1.5 rounded-full transition-all duration-300 text-xs xl:text-sm tracking-wider whitespace-nowrap
                  ${isActive(link.href)
                    ? "bg-red-400 text-black"
                    : "text-white hover:bg-white/10"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ── Tablet nav links (md–lg, no pill) ── */}
          <div className="hidden md:flex lg:hidden items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-bold px-3 py-1.5 rounded-full transition-all duration-200 text-[11px] tracking-widest whitespace-nowrap
                  ${isActive(link.href)
                    ? "text-red-400 underline underline-offset-4 decoration-2"
                    : "text-white/70 hover:text-white"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ── Right icons ── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Search — visible md+ */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`${iconBtn} hidden md:flex p-3 sm:p-3.5`}
              aria-label="Search products"
            >
              <Search size={18} className="text-white sm:w-5 sm:h-5" />
            </button>

            {/* Cart — visible md+ */}
            {/* <button
              onClick={() => setCartOpen(true)}
              className={`${iconBtn} hidden md:flex p-3 sm:p-3.5`}
              aria-label="View shopping cart"
            >
              <ShoppingCart size={18} className="text-white sm:w-5 sm:h-5" />
            </button> */}

            {/* Hamburger — visible below lg (but on mobile only; tablet shows links above) */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/30 text-white transition-colors hover:bg-white/10"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════
            MOBILE / TABLET DRAWER  (below lg)
        ════════════════════════════════════════ */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out
            ${isOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}
        >
          <div className="bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 space-y-5">

            {/* Links — only shown on mobile (<md); tablet already has them in the header */}
            <div className="flex flex-col space-y-1 md:hidden">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-bold tracking-wider text-sm px-3 py-2.5 rounded-xl transition-colors duration-200
                    ${isActive(link.href)
                      ? "bg-red-500/15 text-red-400"
                      : "text-white/60 hover:text-white hover:bg-white/5"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icon row — search + cart, always in the drawer */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setSearchOpen(true); setIsOpen(false); }}
                className={`${iconBtn} flex-1 gap-2 py-3`}
                aria-label="Search products"
              >
                <Search size={18} className="text-white" />
                <span className="text-white text-xs font-semibold tracking-widest">SEARCH</span>
              </button>
              {/* <button
                onClick={() => { setCartOpen(true); setIsOpen(false); }}
                className={`${iconBtn} flex-1 gap-2 py-3`}
                aria-label="View shopping cart"
              >
                <ShoppingCart size={18} className="text-white" />
                <span className="text-white text-xs font-semibold tracking-widest">CART</span>
              </button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          CART BACKDROP
      ════════════════════════════════════════ */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300
          ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ════════════════════════════════════════
          CART DRAWER
      ════════════════════════════════════════ */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full
          w-full xs:w-[90vw] sm:w-[400px] max-w-full
          bg-[#0a0a0a] border-l border-white/10
          flex flex-col
          transition-transform duration-500 ease-in-out
          ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShoppingCart size={18} className="text-red-500" />
            <span className="text-white font-bold tracking-widest text-xs sm:text-sm uppercase">
              Your Cart
            </span>
          </div>
          {/* <button
            onClick={() => setCartOpen(false)}
            className="text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
            aria-label="Close cart"
          >
            <X size={16} />
          </button> */}
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-8 text-center gap-5 sm:gap-6">
          <div className="relative">
            {/* <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/10 border border-red-500/20 flex items-center justify-center">
              <ShoppingCart size={28} className="text-red-500 sm:w-8 sm:h-8" />
            </div> */}
            <span className="absolute inset-0 rounded-full border border-red-500/30 animate-ping" />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h2 className="text-white font-extrabold text-lg sm:text-xl tracking-wide uppercase">
              We're Working On It
            </h2>
            <p className="text-white text-xs sm:text-sm leading-relaxed max-w-[240px]">
              Our cart experience is currently under construction. Check back
              soon — something powerful is coming.
            </p>
          </div>

          <div className="w-12 h-px bg-red-600/40" />

          <span className="text-red-500/70 text-xs tracking-[0.2em] uppercase font-semibold">
            Coming Soon
          </span>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-t border-white/10">
          <Link
            href="/shop"
            onClick={() => setCartOpen(false)}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm tracking-widest uppercase py-3 sm:py-3.5 rounded-full transition-colors duration-200"
          >
            Browse Shop
          </Link>
        </div>
      </div>

      {/* ── Search Modal ── */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;    