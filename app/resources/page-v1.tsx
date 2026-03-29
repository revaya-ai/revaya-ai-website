import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import CategoryPill from "@/components/resources/CategoryPill";
import JsonLd from "@/components/JsonLd";
import { getAllResources, getFeaturedResource } from "@/lib/resources";
import type { ResourceFrontmatter } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resource Center",
  description:
    "Guides, frameworks, and case studies on building a Business AI Operating System for founder-led businesses.",
  openGraph: {
    title: "Resource Center | Revaya AI",
    description:
      "Guides, frameworks, and case studies on building a Business AI Operating System for founder-led businesses.",
    type: "website",
    url: "https://revaya.ai/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resource Center | Revaya AI",
    description:
      "Guides, frameworks, and case studies on building a Business AI Operating System for founder-led businesses.",
  },
};

function CollageCard({
  frontmatter,
  variant,
}: {
  frontmatter: ResourceFrontmatter;
  variant: "hero" | "tall" | "wide" | "standard";
}) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  const variantClasses = {
    hero: "col-span-2 row-span-2 min-h-[480px] md:min-h-[540px]",
    tall: "col-span-1 row-span-2 min-h-[480px]",
    wide: "col-span-2 row-span-1 min-h-[240px]",
    standard: "col-span-1 row-span-1 min-h-[280px]",
  };

  const titleClasses = {
    hero: "text-[1.6rem] md:text-[2.2rem] leading-[1.1]",
    tall: "text-[1.3rem] md:text-[1.5rem] leading-[1.15]",
    wide: "text-[1.2rem] md:text-[1.4rem] leading-[1.15]",
    standard: "text-[1.1rem] md:text-[1.25rem] leading-[1.15]",
  };

  return (
    <Link
      href={`/resources/${frontmatter.slug}`}
      className={`group block relative rounded-2xl overflow-hidden ${variantClasses[variant]}`}
    >
      {/* Background — image or colored surface */}
      <div className="absolute inset-0 bg-[#111820]">
        {frontmatter.image ? (
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : null}
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D11] via-[#080D11]/70 to-transparent" />
      </div>

      {/* Content — positioned at bottom */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        {/* Top metadata */}
        <div className="flex items-center gap-3 mb-3">
          <CategoryPill category={frontmatter.category} size="sm" />
          <span className="text-[#6B7A8D] text-[0.75rem]">
            {formattedDate}
          </span>
        </div>

        {/* Title */}
        <h2
          className={`font-display font-bold text-white ${titleClasses[variant]} mb-2`}
        >
          {frontmatter.title}
        </h2>

        {/* Subtitle — only on hero and tall */}
        {(variant === "hero" || variant === "tall") && (
          <p className="text-[#8899AA] text-[0.9rem] leading-relaxed line-clamp-2 mb-3">
            {frontmatter.subtitle}
          </p>
        )}

        {/* Read time + arrow */}
        <div className="flex items-center justify-between">
          <span className="text-[#6B7A8D] text-[0.8rem]">
            {frontmatter.read_time}
          </span>
          <span className="w-8 h-8 rounded-full border border-[#2A3544] flex items-center justify-center group-hover:border-[#028090] group-hover:bg-[#028090]/10 transition-all duration-300">
            <svg
              className="w-3.5 h-3.5 text-[#6B7A8D] group-hover:text-[#028090] transition-colors duration-300 -rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ResourcesPage() {
  const allResources = getAllResources();
  const featured = getFeaturedResource();
  const others = featured
    ? allResources.filter(
        (r) => r.frontmatter.slug !== featured.frontmatter.slug
      )
    : allResources.slice(1);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://revaya.ai",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: "https://revaya.ai/resources",
      },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Resource Center",
    description:
      "Guides, frameworks, and case studies on building a Business AI Operating System for founder-led businesses.",
    url: "https://revaya.ai/resources",
    publisher: {
      "@type": "Organization",
      name: "Revaya AI",
      url: "https://revaya.ai",
    },
  };

  // Assign collage variants based on position
  const collageVariants: Array<"hero" | "tall" | "wide" | "standard"> = [
    "tall",
    "standard",
    "wide",
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={collectionLd} />

      {/* Hero */}
      <section className="relative pt-32 pb-12 md:pt-44 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[#028090]/[0.04] rounded-full blur-[140px]" />
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#553555]/[0.05] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <FadeIn>
            <h1 className="font-display font-black text-[2.5rem] md:text-[4rem] leading-[1.05] text-white mb-2">
              Resource Center
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[#8899AA] text-[1.1rem] md:text-[1.2rem] max-w-[500px]">
              Frameworks, guides, and lessons from building Business AI
              Operating Systems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Collage Grid */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] gap-4 md:gap-5">
          {/* Featured — hero card spanning 2 cols, 2 rows */}
          {featured && (
            <FadeIn className="md:col-span-2 md:row-span-2">
              <CollageCard
                frontmatter={featured.frontmatter}
                variant="hero"
              />
            </FadeIn>
          )}

          {/* Remaining cards — assigned collage variants */}
          {others.map((resource, i) => {
            const variant = collageVariants[i % collageVariants.length];
            const spanClass =
              variant === "tall"
                ? "md:row-span-2"
                : variant === "wide"
                ? "md:col-span-2"
                : "";
            return (
              <FadeIn
                key={resource.frontmatter.slug}
                delay={(i + 1) * 0.05}
                className={spanClass}
              >
                <CollageCard
                  frontmatter={resource.frontmatter}
                  variant={variant}
                />
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24 md:pb-32">
        <div className="bg-gradient-to-b from-[#028090]/[0.06] to-transparent py-20 md:py-24">
          <FadeIn>
            <div className="max-w-[600px] mx-auto px-6 md:px-10 text-center">
              <h2 className="font-display font-bold text-[1.5rem] md:text-[2rem] text-white mb-4">
                Ready to build your Business AI OS?
              </h2>
              <p className="text-[#8899AA] text-[1rem] mb-8">
                Start with a $2,500 AIOS Audit. Two weeks. Full diagnostic.
                Deductible if you move into a full setup.
              </p>
              <Link
                href="/work-with-me"
                className="inline-flex items-center gap-2 font-display text-[0.95rem] font-bold px-7 py-3 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200"
              >
                Start the Conversation
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
