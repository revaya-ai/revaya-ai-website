import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#080D11] text-white border-t border-white/[0.06]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Brand */}
          <div>
            <Image src="/revaya-logo-white.png" alt="Revaya AI" width={140} height={40} />
            <p className="mt-3 text-[0.8125rem] text-white/45 max-w-[240px] leading-[1.6]">
              Stop being the business. Start owning one.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            <Link href="/business-ai-operating-system" className="text-[0.8125rem] text-white/55 hover:text-white transition-colors">
              Business AI Operating System
            </Link>
            <Link href="/why-revaya" className="text-[0.8125rem] text-white/55 hover:text-white transition-colors">
              Why Revaya
            </Link>
            <Link href="/work-with-me" className="text-[0.8125rem] text-white/55 hover:text-white transition-colors">
              Work With Me
            </Link>
            <Link href="/business-ai-os-assessment" className="text-[0.8125rem] text-white/55 hover:text-white transition-colors">
              Business AI OS Assessment
            </Link>
          </nav>

          {/* Resources */}
          <nav className="flex flex-col gap-3">
            <span className="text-[0.75rem] uppercase tracking-[0.1em] text-white/30 font-medium mb-1">Resources</span>
            <Link href="/business-ai-os-vs-openclaw" className="text-[0.8125rem] text-white/55 hover:text-white transition-colors">
              Business AI OS vs OpenClaw
            </Link>
            <Link href="/business-ai-os-vs-claude-code-obsidian" className="text-[0.8125rem] text-white/55 hover:text-white transition-colors">
              Business AI OS vs Claude Code + Obsidian
            </Link>
          </nav>

          {/* Legal + social */}
          <div className="flex flex-col gap-3">
            <a
              href="https://www.linkedin.com/company/revaya-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.8125rem] text-white/55 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <Link href="/privacy-policy" className="text-[0.8125rem] text-white/55 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="text-[0.8125rem] text-white/55 hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06]">
          <p className="text-[0.75rem] text-white/30">
            &copy; {new Date().getFullYear()} Revaya AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
