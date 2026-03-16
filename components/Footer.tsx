import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <span className="font-display font-black text-lg text-white">
              Revaya AI
            </span>
            <p className="mt-2 text-footer-text text-white/70 max-w-xs">
              Business AI Operating Systems for service businesses.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            <Link href="/" className="text-footer-text text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/solutions" className="text-footer-text text-white/80 hover:text-white transition-colors">
              Solutions
            </Link>
            <Link href="/why-revaya" className="text-footer-text text-white/80 hover:text-white transition-colors">
              Why Revaya
            </Link>
            <Link href="/work-with-me" className="text-footer-text text-white/80 hover:text-white transition-colors">
              Work With Me
            </Link>
          </nav>

          {/* Legal + social */}
          <div className="flex flex-col gap-3">
            <a
              href="https://www.linkedin.com/company/revaya-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-footer-text text-white/80 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <Link href="/privacy-policy" className="text-footer-text text-white/80 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="text-footer-text text-white/80 hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10">
          <p className="text-[0.75rem] text-white/50">
            &copy; {new Date().getFullYear()} Revaya AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
