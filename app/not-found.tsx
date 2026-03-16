import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-white py-40 md:py-48">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 text-center">
        <h1 className="font-display font-black text-[2.25rem] md:text-[3rem] leading-[1.1] text-neutral-nearBlack mb-4">
          That page doesn&rsquo;t exist.
        </h1>
        <p className="text-[1.125rem] leading-[1.65] text-neutral-nearBlack/70 mb-10">
          Here&rsquo;s where to go instead.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-brand-primary text-white text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:bg-[#3D263D]"
          >
            Home
          </Link>
          <Link
            href="/solutions"
            className="inline-block border-2 border-brand-primary text-brand-primary text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:bg-brand-primary hover:text-white"
          >
            Solutions
          </Link>
          <Link
            href="/work-with-me"
            className="inline-block border-2 border-brand-primary text-brand-primary text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:bg-brand-primary hover:text-white"
          >
            Work With Me
          </Link>
        </div>
      </div>
    </section>
  );
}
