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
    "Guides, frameworks, and case studies on building an agentic Business AI Operating System for founder-led businesses.",
  openGraph: {
    title: "Resource Center | Revaya AI",
    description:
      "Guides, frameworks, and case studies on building an agentic Business AI Operating System for founder-led businesses.",
    type: "website",
    url: "https://revaya.ai/resources",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resource Center | Revaya AI",
    description:
      "Guides, frameworks, and case studies on building an agentic Business AI Operating System for founder-led businesses.",
  },
};

/* ─── Solid color palette for cards without images ─── */
const solidColors = [
  { bg: "bg-[#0A2028]", accent: "border-[#15393F]" }, // teal-dark
  { bg: "bg-[#1A1020]", accent: "border-[#2E1F2E]" }, // purple-dark
  { bg: "bg-[#0C1A24]", accent: "border-[#1A2E3A]" }, // navy
  { bg: "bg-[#1A0F14]", accent: "border-[#30171F]" }, // warm-dark
];

/* ─── Shape definitions for the collage grid ─── */
interface CardShape {
  colSpan: string;
  rowSpan: string;
  radius: string;
  minH: string;
  titleSize: string;
  showSubtitle: boolean;
  padding: string;
}

const shapes: CardShape[] = [
  // 0: Hero — large, extra-rounded
  {
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    radius: "rounded-[2rem]",
    minH: "min-h-[460px] md:min-h-[500px]",
    titleSize: "text-[1.5rem] md:text-[2.1rem] leading-[1.08]",
    showSubtitle: true,
    padding: "p-6 md:p-8",
  },
  // 1: Tall pill — narrow, very rounded
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    radius: "rounded-[2.5rem]",
    minH: "min-h-[460px] md:min-h-[500px]",
    titleSize: "text-[1.2rem] md:text-[1.4rem] leading-[1.12]",
    showSubtitle: true,
    padding: "p-6 md:p-7",
  },
  // 2: Wide bar — short and wide, standard rounded
  {
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-1",
    radius: "rounded-2xl",
    minH: "min-h-[220px]",
    titleSize: "text-[1.15rem] md:text-[1.35rem] leading-[1.12]",
    showSubtitle: false,
    padding: "p-5 md:p-7",
  },
  // 3: Square — compact, extra-rounded
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    radius: "rounded-[2rem]",
    minH: "min-h-[220px]",
    titleSize: "text-[1.05rem] md:text-[1.2rem] leading-[1.12]",
    showSubtitle: false,
    padding: "p-5 md:p-6",
  },
  // 4: Standard card — mid rounded
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    radius: "rounded-3xl",
    minH: "min-h-[240px]",
    titleSize: "text-[1.1rem] md:text-[1.25rem] leading-[1.12]",
    showSubtitle: false,
    padding: "p-5 md:p-6",
  },
  // 5: Full-width banner — spans all 3 columns
  {
    colSpan: "md:col-span-3",
    rowSpan: "md:row-span-1",
    radius: "rounded-[2rem]",
    minH: "min-h-[280px] md:min-h-[320px]",
    titleSize: "text-[1.4rem] md:text-[1.8rem] leading-[1.08]",
    showSubtitle: true,
    padding: "p-6 md:p-10",
  },
];

/*
 * Image rule: show the image if the card has one AND meets one of:
 * - Every 3rd card in sequence (index 0, 3, 6...)
 * - Full-width banner cards (shape 5) always show their image
 * The rest are solid-color cards, creating a rhythm.
 */

function CollageCardV2({
  frontmatter,
  shape,
  globalIndex,
}: {
  frontmatter: ResourceFrontmatter;
  shape: CardShape;
  globalIndex: number;
}) {
  const formattedDate = new Date(frontmatter.date).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  const isFullWidth = shape.colSpan === "md:col-span-3";
  const showImage = frontmatter.image && (globalIndex % 3 === 0 || isFullWidth);
  const hasImage = showImage;
  const solid = solidColors[globalIndex % solidColors.length];
  const href = frontmatter.external_url || `/resources/${frontmatter.slug}`;

  return (
    <Link
      href={href}
      className={`group block relative overflow-hidden h-full ${shape.radius} ${shape.minH}`}
    >
      {/* Background */}
      <div className={`absolute inset-0 ${hasImage ? "bg-[#111820]" : solid.bg}`}>
        {hasImage && frontmatter.image && (
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        )}
        {/* Gradient overlay — heavier on image cards, subtle on solid */}
        <div
          className={`absolute inset-0 ${
            hasImage
              ? "bg-gradient-to-t from-[#080D11] via-[#080D11]/60 to-transparent"
              : "bg-gradient-to-t from-[#080D11]/30 to-transparent"
          }`}
        />
      </div>

      {/* Decorative border — visible on solid cards */}
      {!hasImage && (
        <div className={`absolute inset-0 ${shape.radius} border ${solid.accent}`} />
      )}

      {/* Content */}
      <div className={`relative h-full flex flex-col justify-end ${shape.padding}`}>
        <div className="flex items-center gap-3 mb-2.5">
          <CategoryPill category={frontmatter.category} size="sm" />
          <span className="text-white text-[0.72rem]">
            {formattedDate}
          </span>
        </div>

        <h2
          className={`font-display font-bold text-white ${shape.titleSize} mb-1.5`}
        >
          {frontmatter.title}
        </h2>

        <p className={`text-white text-[0.85rem] leading-relaxed mb-2.5 ${shape.showSubtitle ? "line-clamp-3" : "line-clamp-2"}`}>
          {frontmatter.subtitle}
        </p>

        <div className="flex items-center justify-between mt-auto pt-1">
          <span className="text-white text-[0.78rem]">
            {frontmatter.read_time}
          </span>
          <span className="w-7 h-7 rounded-full border border-[#2A3544] flex items-center justify-center group-hover:border-[#028090] group-hover:bg-[#0D2428] transition-all duration-300">
            <svg
              className="w-3 h-3 text-white group-hover:text-[#028090] transition-colors duration-300 -rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
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
      "Guides, frameworks, and case studies on building an agentic Business AI Operating System for founder-led businesses.",
    url: "https://revaya.ai/resources",
    publisher: {
      "@type": "Organization",
      name: "Revaya AI",
      url: "https://revaya.ai",
    },
  };

  /*
   * Shape assignment logic:
   * - Featured article: hero (shape 0), 2col x 2row
   * - Remaining cards get shapes based on whether they have an image:
   *   - Cards with image: full-width banner (shape 5) or hero-adjacent tall (shape 1)
   *   - Cards without image (solid): tall pill (shape 1), square (shape 3), standard (shape 4)
   * - The cycling pattern for 4+ cards: tall, square, full-banner, standard, repeat
   */
  // First pass: tall pill, full-width banner, then cycle square, standard, wide
  const cyclingShapes = [1, 5, 3, 4, 2];

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={collectionLd} />

      {/* Hero */}
      <section className="relative pt-32 pb-10 md:pt-44 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[#028090]/[0.04] rounded-full blur-[140px]" />
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#553555]/[0.05] rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1430px] mx-auto px-4 md:px-8">
          <FadeIn>
            <h1 className="font-display font-black text-[2.5rem] md:text-[4rem] leading-[1.05] text-white mb-2">
              Resource Center
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-white text-[1.1rem] md:text-[1.2rem] max-w-[500px]">
              Frameworks, guides, and lessons from building agentic Business AI
              Operating Systems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Collage Grid — V2: unique shapes, tight column gaps, 40px row gaps */}
      <section className="max-w-[1430px] mx-auto px-4 md:px-8 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[230px] gap-x-2.5 gap-y-10 md:gap-x-3 md:gap-y-10">
          {/* Featured — hero shape */}
          {featured && (
            <FadeIn className={`${shapes[0].colSpan} ${shapes[0].rowSpan}`}>
              <CollageCardV2
                frontmatter={featured.frontmatter}
                shape={shapes[0]}
                globalIndex={0}
              />
            </FadeIn>
          )}

          {/* Remaining — assigned shapes via cycling pattern */}
          {others.map((resource, i) => {
            const shapeIndex = cyclingShapes[i % cyclingShapes.length];
            const shape = shapes[shapeIndex];
            return (
              <FadeIn
                key={resource.frontmatter.slug}
                delay={(i + 1) * 0.05}
                className={`${shape.colSpan} ${shape.rowSpan}`}
              >
                <CollageCardV2
                  frontmatter={resource.frontmatter}
                  shape={shape}
                  globalIndex={i + 1}
                />
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1430px] mx-auto px-4 md:px-8 text-center">
          <FadeIn>
            <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6 max-w-[950px] mx-auto">
              Ready to build your agentic Business AI Operating System?
            </h2>
            <p className="text-[1.0625rem] leading-[1.65] text-white mb-10 max-w-[520px] mx-auto">
              Every month without a system is 15+ hours of your time on
              work that should run itself. At $150/hour, that is $9,750 a
              month you do not get back.
            </p>
            <Link
              href="/work-with-me"
              className="inline-block font-display text-[1rem] font-bold px-10 py-4 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_50px_rgba(85,53,85,0.5)] transition-all duration-200"
            >
              Start the Conversation →
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
