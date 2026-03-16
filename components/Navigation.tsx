"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/why-revaya", label: "Why Revaya" },
  { href: "/work-with-me", label: "Work With Me" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isDark = isHomePage && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 nav-bg-transition ${
        isDark
          ? "bg-transparent"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span
              className={`font-display font-black text-lg tracking-tight ${
                isDark ? "text-white" : "text-brand-primary"
              }`}
            >
              Revaya AI
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-nav-link transition-colors duration-150 ${
                    isDark
                      ? isActive
                        ? "text-brand-accent"
                        : "text-white hover:text-brand-accent"
                      : isActive
                      ? "text-brand-accent"
                      : "text-neutral-nearBlack hover:text-brand-accent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/work-with-me"
              className={`text-cta-btn px-5 py-2.5 rounded border-2 transition-all duration-150 ${
                isDark
                  ? "border-white text-white hover:bg-white hover:text-brand-primary"
                  : "border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
              }`}
            >
              Start the conversation
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 ${isDark ? "text-white" : "text-neutral-nearBlack"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-200 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-200 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-body-std py-2 ${
                    isActive ? "text-brand-accent font-medium" : "text-neutral-nearBlack"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/work-with-me"
              className="mt-2 text-center text-cta-btn px-5 py-3 rounded bg-brand-primary text-white"
            >
              Start the conversation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
