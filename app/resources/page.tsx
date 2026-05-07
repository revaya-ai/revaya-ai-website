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

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ─── Featured hero card — large left ─── */
function FeaturedCard({ fm }: { fm: ResourceFrontmatter }) {
  const href = fm.external_url || `/resources/${fm.slug}`;
  return (
    <Link href={href} className="group block relative overflow-hidden rounded-2xl h-full min-h-[480px]">
      {/* Image */}
      <div className="absolute inset-0 bg-[#0D1520]">
        {fm.image && (
          <Image
            src={fm.image}
            alt={fm.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D11] via-[#080D11]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <CategoryPill category={fm.category} size="sm" />
          <span className="text-white/50 text-[0.75rem]">{fmt(fm.date)}</span>
        </div>
        <h2 className="font-display font-black text-white text-[1.6rem] md:text-[2rem] leading-[1.1] mb-2">
          {fm.title}
        </h2>
        <p className="text-white/60 text-[0.9rem] leading-relaxed line-clamp-2 mb-4 max-w-[520px]">
          {fm.subtitle}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-[0.78rem]">{fm.read_time}</span>
          <span className="text-[0.8125rem] font-semibold text-[#028090] group-hover:text-white transition-colors duration-200">
            Read article →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Side list card — compact horizontal ─── */
function SideCard({ fm }: { fm: ResourceFrontmatter }) {
  const href = fm.external_url || `/resources/${fm.slug}`;
  return (
    <Link
      href={href}
      className="group flex gap-4 p-3 rounded-xl bg-[#0D1520] border border-white/[0.06] hover:border-[#028090]/40 transition-all duration-200 flex-1"
    >
      {/* Thumbnail */}
      <div className="relative w-[88px] h-[64px] flex-shrink-0 rounded-lg overflow-hidden bg-[#111820]">
        {fm.image ? (
          <Image
            src={fm.image}
            alt={fm.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#028090]/20 to-[#553555]/20" />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <CategoryPill category={fm.category} size="xs" />
        </div>
        <p className="font-display font-bold text-white text-[0.8125rem] leading-[1.3] line-clamp-2 group-hover:text-[#028090] transition-colors duration-200">
          {fm.title}
        </p>
        <span className="text-white/35 text-[0.72rem]">{fmt(fm.date)} · {fm.read_time}</span>
      </div>
    </Link>
  );
}

/* ─── Grid card — standard 3-col ─── */
function GridCard({ fm }: { fm: ResourceFrontmatter }) {
  const href = fm.external_url || `/resources/${fm.slug}`;
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl bg-[#0D1520] border border-white/[0.06] hover:border-[#028090]/40 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden bg-[#111820] flex-shrink-0">
        {fm.image ? (
          <Image
            src={fm.image}
            alt={fm.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#028090]/15 to-[#553555]/15" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1520]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <CategoryPill category={fm.category} size="sm" />
          <span className="text-white/40 text-[0.72rem]">{fmt(fm.date)}</span>
        </div>
        <h3 className="font-display font-bold text-white text-[1rem] leading-[1.3] mb-2 line-clamp-2 group-hover:text-[#028090] transition-colors duration-200">
          {fm.title}
        </h3>
        <p className="text-white/50 text-[0.8125rem] leading-relaxed line-clamp-2 mb-4">
          {fm.subtitle}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-white/35 text-[0.75rem]">{fm.read_time}</span>
          <span className="text-[0.75rem] font-semibold text-white/30 group-hover:text-[#028090] transition-colors duration-200">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Assessment CTA card — slots into grid ─── */
function AssessmentCard() {
  return (
    <Link
      href="/business-ai-os-assessment"
      className="group flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#553555]/40 bg-[#0D1520] hover:border-[#553555]/80 hover:bg-[#120A18] transition-all duration-200 min-h-[340px] p-8 text-center"
    >
      <div className="w-14 h-14 rounded-full bg-[#553555]/20 border border-[#553555]/40 flex items-center justify-center mb-5 group-hover:bg-[#553555]/30 transition-colors duration-200">
        <svg className="w-6 h-6 text-[#553555]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <p className="text-white/40 text-[0.72rem] uppercase tracking-[0.12em] font-medium mb-2">Free Tool</p>
      <h3 className="font-display font-black text-white text-[1.25rem] leading-[1.2] mb-3">
        Discover your AI<br />Readiness Score
      </h3>
      <p className="text-white/45 text-[0.8125rem] leading-relaxed mb-6 max-w-[220px]">
        Find out where AI can have the most impact in your business right now.
      </p>
      <span className="inline-block font-display text-[0.8125rem] font-bold px-6 py-2.5 rounded-full bg-[#553555] text-white group-hover:bg-[#4a2d4a] transition-colors duration-200">
        Take the Quiz →
      </span>
    </Link>
  );
}

export default function ResourcesPage() {
  const allResources = getAllResources();
  const featured = getFeaturedResource();

  const rest = featured
    ? allResources.filter((r) => r.frontmatter.slug !== featured.frontmatter.slug)
    : allResources.slice(1);

  // Right column: up to 4 side cards
  const sideCards = rest.slice(0, 4);
  // Grid: everything after the side cards
  const gridCards = rest.slice(4);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://revaya.ai" },
      { "@type": "ListItem", position: 2, name: "Resources", item: "https://revaya.ai/resources" },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Resource Center",
    description:
      "Guides, frameworks, and case studies on building an agentic Business AI Operating System for founder-led businesses.",
    url: "https://revaya.ai/resources",
    publisher: { "@type": "Organization", name: "Revaya AI", url: "https://revaya.ai" },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={collectionLd} />

      {/* Page header */}
      <section className="relative pt-32 pb-10 md:pt-44 md:pb-12 overflow-hidden">
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
            <p className="text-white/60 text-[1.1rem] md:text-[1.2rem] max-w-[500px]">
              Frameworks, guides, and lessons from building agentic Business AI Operating Systems.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-24 md:pb-32">

        {/* ── Row 1: Featured + Side stack ── */}
        {featured && (
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
              {/* Featured hero */}
              <div className="lg:col-span-2">
                <FeaturedCard fm={featured.frontmatter} />
              </div>

              {/* Side stack */}
              <div className="flex flex-col gap-4">
                {sideCards.map((r, i) => (
                  <FadeIn key={r.frontmatter.slug} delay={0.05 * (i + 1)}>
                    <SideCard fm={r.frontmatter} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* ── Row 2+: Grid ── */}
        {gridCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridCards.map((r, i) => {
              // Insert assessment CTA after 2nd card
              const cards = [];
              if (i === 2) {
                cards.push(
                  <FadeIn key="assessment-cta" delay={0.1}>
                    <AssessmentCard />
                  </FadeIn>
                );
              }
              cards.push(
                <FadeIn key={r.frontmatter.slug} delay={0.05 * (i + 1)}>
                  <GridCard fm={r.frontmatter} />
                </FadeIn>
              );
              return cards;
            })}
          </div>
        )}
      </section>

      {/* Closing CTA */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6 max-w-[950px] mx-auto">
              Ready to build your agentic Business AI Operating System?
            </h2>
            <p className="text-[1.0625rem] leading-[1.65] text-white/60 mb-10 max-w-[520px] mx-auto">
              Every month without a system is 15+ hours of your time on work that should run itself.
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
