import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import ResourceCard from "@/components/resources/ResourceCard";
import CategoryPill from "@/components/resources/CategoryPill";
import JsonLd from "@/components/JsonLd";
import FaqAccordion from "@/components/FaqAccordion";
import {
  getResourceBySlug,
  getAllSlugs,
  getRelatedResources,
  extractHeadings,
  addHeadingIds,
} from "@/lib/resources";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return { title: "Not Found" };

  const { title, subtitle, image, date, updated, author } =
    resource.frontmatter;

  return {
    title,
    description: subtitle.slice(0, 155),
    openGraph: {
      title,
      description: subtitle.slice(0, 155),
      type: "article",
      url: `https://revaya.ai/resources/${slug}`,
      publishedTime: date,
      modifiedTime: updated || date,
      authors: [author],
      ...(image && { images: [image] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: subtitle.slice(0, 155),
      ...(image && { images: [image] }),
    },
  };
}

const ctaVariants: Record<string, { heading: string; text: string; href: string; label: string }> = {
  default: {
    heading: "Ready to build your Business AI OS?",
    text: "Start with a $2,500 AIOS Audit. Two weeks. Full diagnostic. Deductible if you move into a full setup.",
    href: "/work-with-me",
    label: "Start the Conversation",
  },
  assessment: {
    heading: "Find out where your business stands.",
    text: "Take the free Business AI OS Assessment. Five minutes. Instant score. See where a system would give you back the most time.",
    href: "/business-ai-os-assessment",
    label: "Take the Free Assessment",
  },
  discovery: {
    heading: "Let's talk about your business.",
    text: "Book a discovery call. No pitch, no slides. Just a conversation about where your time is going and what a system could look like.",
    href: "/work-with-me",
    label: "Book a Discovery Call",
  },
  newsletter: {
    heading: "Get frameworks you can use this week.",
    text: "Practical guides on building AI systems for founder-led businesses. No hype. No theory. Just what works.",
    href: "/work-with-me",
    label: "Stay Connected",
  },
};

const authorData: Record<string, { title: string; bio: string; linkedin: string }> = {
  "Shannon Winnicki": {
    title: "Founder, Revaya AI",
    bio: "18 years as a digital product manager inside Fortune 500 companies. Virgin Mobile. Papa Murphy's. Intermedia. Not an outside consultant looking in. On the inside, sitting between the business and the builders. Business AIOS is the same work.",
    linkedin: "https://www.linkedin.com/in/swinnicki/",
  },
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const { frontmatter, htmlContent } = resource;
  const processedHtml = addHeadingIds(htmlContent);
  const headings = extractHeadings(processedHtml);
  const related = getRelatedResources(
    slug,
    frontmatter.related_slugs,
    frontmatter.category
  );
  const cta = ctaVariants[frontmatter.cta_variant || "default"] || ctaVariants.default;
  const author = authorData[frontmatter.author];

  const formattedDate = new Date(frontmatter.date).toLocaleDateString(
    "en-US",
    { month: "long", day: "numeric", year: "numeric" }
  );

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.subtitle,
    author: {
      "@type": "Person",
      name: frontmatter.author,
      url: author?.linkedin || "https://revaya.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "Revaya AI",
      url: "https://revaya.ai",
    },
    datePublished: frontmatter.date,
    ...(frontmatter.updated && { dateModified: frontmatter.updated }),
    ...(frontmatter.image && { image: frontmatter.image }),
    url: `https://revaya.ai/resources/${slug}`,
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.title,
        item: `https://revaya.ai/resources/${slug}`,
      },
    ],
  };

  const faqLd = frontmatter.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: frontmatter.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      {faqLd && <JsonLd data={faqLd} />}

      {/* Article Header */}
      <section className="pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="max-w-[720px] mx-auto px-6 md:px-10">
          <FadeIn>
            {/* Breadcrumbs */}
            <nav className="text-[#556677] text-[0.8rem] mb-6 flex items-center gap-2">
              <Link
                href="/resources"
                className="hover:text-[#8899AA] transition-colors"
              >
                Resources
              </Link>
              <span>/</span>
              <span className="text-[#6B7A8D] line-clamp-1">
                {frontmatter.title}
              </span>
            </nav>

            <CategoryPill category={frontmatter.category} size="md" />

            <h1 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.1] text-white mt-4 mb-4">
              {frontmatter.title}
            </h1>

            <p className="text-[#8899AA] text-[1.1rem] md:text-[1.2rem] leading-relaxed mb-6">
              {frontmatter.subtitle}
            </p>

            <div className="flex items-center gap-3 text-[#556677] text-[0.85rem]">
              <span>{frontmatter.author}</span>
              <span className="w-1 h-1 rounded-full bg-[#2A3544]" />
              <span>{formattedDate}</span>
              <span className="w-1 h-1 rounded-full bg-[#2A3544]" />
              <span>{frontmatter.read_time}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Hero Image */}
      {frontmatter.image && (
        <section className="pb-8 md:pb-12">
          <FadeIn>
            <div className="max-w-[900px] mx-auto px-6 md:px-10">
              <div className="rounded-2xl border border-[#1E2A38] overflow-hidden aspect-[16/9] relative">
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Table of Contents */}
      {headings.length > 2 && (
        <section className="pb-8 md:pb-12">
          <FadeIn>
            <div className="max-w-[720px] mx-auto px-6 md:px-10">
              <div className="rounded-xl border border-[#1E2A38] bg-[#0C1219] p-6 md:p-8">
                <p className="font-display font-bold text-[0.8rem] text-[#6B7A8D] tracking-wide uppercase mb-4">
                  In this article
                </p>
                <ol className="space-y-2">
                  {headings.map((heading, i) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="flex items-start gap-3 text-[#028090] text-[0.9rem] hover:text-[#02a0b0] transition-colors"
                      >
                        <span className="text-[#3D4E5F] text-[0.8rem] font-display font-bold mt-0.5 shrink-0">
                          {i + 1}.
                        </span>
                        <span>{heading.text}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* Article Body */}
      <section className="pb-16 md:pb-20">
        <FadeIn>
          <div
            className="max-w-[720px] mx-auto px-6 md:px-10 article-body"
            dangerouslySetInnerHTML={{ __html: processedHtml }}
          />
        </FadeIn>
      </section>

      {/* Author Card */}
      {author && (
        <section className="pb-16 md:pb-20">
          <FadeIn>
            <div className="max-w-[720px] mx-auto px-6 md:px-10">
              <div className="rounded-2xl border border-[#1E2A38] bg-[#0E1620] p-8 md:p-10">
                <p className="font-display font-bold text-[0.75rem] text-[#556677] tracking-wide uppercase mb-3">
                  Written by
                </p>
                <h3 className="font-display font-bold text-[1.1rem] text-white mb-1">
                  {frontmatter.author}
                </h3>
                <p className="text-[#028090] text-[0.85rem] mb-3">
                  {author.title}
                </p>
                <p className="text-[#8899AA] text-[0.9rem] leading-relaxed mb-4">
                  {author.bio}
                </p>
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#028090] text-[0.85rem] font-display font-bold hover:text-[#02a0b0] transition-colors"
                >
                  Connect on LinkedIn
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* FAQs */}
      {frontmatter.faqs && frontmatter.faqs.length > 0 && (
        <section className="pb-16 md:pb-20">
          <div className="max-w-[720px] mx-auto px-6 md:px-10">
            <FadeIn>
              <h2 className="font-display font-black text-[1.5rem] md:text-[1.75rem] text-white mb-6">
                Frequently Asked Questions
              </h2>
              <FaqAccordion items={frontmatter.faqs} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* Related Content */}
      {related.length > 0 && (
        <section className="pb-24 md:pb-32">
          <div className="max-w-[1100px] mx-auto px-6 md:px-10">
            <FadeIn>
              <h2 className="font-display font-bold text-[1.5rem] md:text-[1.75rem] text-white mb-8">
                Related Resources
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {related.map((r, i) => (
                <FadeIn key={r.frontmatter.slug} delay={i * 0.05}>
                  <ResourceCard frontmatter={r.frontmatter} index={i} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="py-28 md:py-36">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <h2 className="font-display font-black text-[2rem] md:text-[2.75rem] leading-[1.05] text-white mb-6 max-w-[950px] mx-auto">
              {cta.heading}
            </h2>
            <p className="text-[1.0625rem] leading-[1.65] text-white mb-10 max-w-[520px] mx-auto">
              {cta.text}
            </p>
            <Link
              href={cta.href}
              className="inline-block font-display text-[1rem] font-bold px-10 py-4 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_50px_rgba(85,53,85,0.5)] transition-all duration-200"
            >
              {cta.label} →
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
