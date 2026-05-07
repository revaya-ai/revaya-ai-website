"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/business-ai-operating-system", label: "Business AIOS" },
  { href: "/why-revaya", label: "Why Revaya" },
  { href: "/business-ai-os-assessment", label: "Assessment Quiz" },
];

const resourcesDropdown = [
  { href: "/resources", label: "Articles" },
  { href: "/ai-prep-check", label: "AI Prep Check" },
  { href: "/business-ai-os-assessment", label: "Assessment Quiz" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isResourcesActive =
    pathname === "/resources" ||
    pathname === "/ai-prep-check" ||
    resourcesDropdown.some((l) => l.href === pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div
        className={`flex items-center justify-between h-16 w-full px-4 ${
          scrolled
            ? "bg-[#0d1a4a]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
        style={{ transition: "background 0.4s ease" }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image
            src="/revaya-logo-white.png"
            alt="Revaya AI"
            width={140}
            height={40}
            className={`h-auto transition-all duration-400 ${
              scrolled ? "w-[110px] lg:w-[120px]" : "w-[120px] lg:w-[140px]"
            }`}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className={`hidden lg:flex items-center ${scrolled ? "gap-5" : "gap-10"}`}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-display font-bold tracking-wide transition-all duration-200 whitespace-nowrap ${
                scrolled ? "text-[0.8rem]" : "text-[0.875rem]"
              } ${
                pathname === href
                  ? "text-[#028090]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Resources dropdown */}
          <div ref={resourcesRef} className="relative">
            <button
              onClick={() => setResourcesOpen((o) => !o)}
              className={`font-display font-bold tracking-wide transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                scrolled ? "text-[0.8rem]" : "text-[0.875rem]"
              } ${
                isResourcesActive
                  ? "text-[#028090]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Resources
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {resourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 bg-[#0d1a4a]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-xl overflow-hidden"
                >
                  {resourcesDropdown.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setResourcesOpen(false)}
                      className={`block px-4 py-3 text-[0.8125rem] font-display font-bold tracking-wide transition-colors ${
                        pathname === href
                          ? "text-[#028090] bg-white/[0.04]"
                          : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/work-with-me"
            className="font-display text-[0.875rem] font-bold px-5 py-2 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200 whitespace-nowrap"
          >
            Start a Conversation →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex lg:hidden p-2 text-white"
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
            className="overflow-hidden lg:hidden"
          >
            <div className="bg-[#0D1A4A] border-b border-white/[0.06] px-6 py-4 flex flex-col gap-4">
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

              {/* Resources section in mobile */}
              <div className="flex flex-col gap-2">
                <p className="text-white/30 text-[0.75rem] uppercase tracking-widest font-medium pt-1">
                  Resources
                </p>
                {resourcesDropdown.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white/70 hover:text-white text-[1rem] py-1 pl-3 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <Link
                href="/work-with-me"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center font-display text-[1rem] font-bold px-5 py-3 rounded-full bg-[#553555] text-white"
              >
                Start a Conversation →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
