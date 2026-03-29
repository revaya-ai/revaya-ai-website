import { MetadataRoute } from "next";
import { getAllResources } from "@/lib/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const resources = getAllResources();
  const resourceEntries: MetadataRoute.Sitemap = [
    {
      url: "https://www.revaya.ai/resources",
      lastModified: new Date(),
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
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.revaya.ai/solutions",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.revaya.ai/business-ai-operating-system",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.revaya.ai/why-revaya",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.revaya.ai/work-with-me",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.revaya.ai/business-ai-os-assessment",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.revaya.ai/business-ai-os-vs-openclaw",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://www.revaya.ai/business-ai-os-vs-claude-code-obsidian",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...resourceEntries,
  ];
}
