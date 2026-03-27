import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-[#080D11] py-40 md:py-48">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <h1 className="font-display font-black text-[2.25rem] md:text-[3rem] leading-[1.1] text-white mb-4">
          That page doesn&rsquo;t exist.
        </h1>
        <p className="text-[1.125rem] leading-[1.65] text-white/60 mb-10">
          Here&rsquo;s where to go instead.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-brand-primary text-white text-[1rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:bg-[#3D263D]"
          >
            Home
          </Link>
          <Link
            href="/business-ai-operating-system"
            className="inline-block border border-white/20 text-white text-[1rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:border-white/50 hover:bg-white/5"
          >
            Business AIOS
          </Link>
          <Link
            href="/work-with-me"
            className="inline-block border border-white/20 text-white text-[1rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:border-white/50 hover:bg-white/5"
          >
            Work With Me
          </Link>
        </div>
      </div>
    </section>
  );
}
