import { MetadataRoute } from "next";
import { getAllResources } from "@/lib/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const resources = getAllResources();
  const resourceEntries: MetadataRoute.Sitemap = [
    {
      url: "https://www.revaya.ai/resources",
      lastModified: new Date("2026-04-26"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...resources.map((r) => ({
      url: `https://www.revaya.ai/resources/${r.frontmatter.slug}` as const,
      lastModified: new Date(r.frontmatter.updated || r.frontmatter.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: "https://www.revaya.ai",
      lastModified: new Date("2026-04-25"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.revaya.ai/solutions",
      lastModified: new Date("2026-03-17"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.revaya.ai/business-ai-operating-system",
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.revaya.ai/why-revaya",
      lastModified: new Date("2026-03-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.revaya.ai/work-with-me",
      lastModified: new Date("2026-04-20"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.revaya.ai/business-ai-os-assessment",
      lastModified: new Date("2026-04-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.revaya.ai/ai-prep-check",
      lastModified: new Date("2026-04-26"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.revaya.ai/business-ai-os-vs-openclaw",
      lastModified: new Date("2026-04-27"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://www.revaya.ai/privacy-policy",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.revaya.ai/terms-of-use",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...resourceEntries,
  ];
}
