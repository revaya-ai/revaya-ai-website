"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/business-ai-operating-system", label: "Business AIOS" },
  { href: "/why-revaya", label: "Why Revaya" },
  { href: "/business-ai-os-assessment", label: "Free Assessment" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-3 left-0 right-0 z-50 overflow-x-hidden"
      style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div
        className={`mx-auto flex items-center justify-between h-16 md:h-20 w-full ${
          scrolled
            ? "max-w-[960px] px-4 md:px-8 bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl rounded-full"
            : "max-w-[1200px] px-4 md:px-12 lg:px-20 bg-transparent"
        }`}
        style={{ transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image
            src="/revaya-logo-white.png"
            alt="Revaya AI"
            width={140}
            height={40}
            className="w-[120px] md:w-[140px] h-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-display text-[0.875rem] font-bold tracking-wide transition-colors duration-150 ${
                pathname === href ? "text-[#028090]" : "text-white/60 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/work-with-me"
            className="font-display text-[0.875rem] font-bold px-5 py-2 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200"
          >
            Start the Conversation →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-white transition-all duration-200 ${
                mobileOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-200 ${
                mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-[#0D1A4A] border-b border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white text-[1rem] py-1 transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/work-with-me"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center font-display text-[1rem] font-bold px-5 py-3 rounded-full bg-[#553555] text-white"
              >
                Start the Conversation →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
