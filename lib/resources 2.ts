import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const resourcesDirectory = path.join(process.cwd(), "content/resources");

export interface ResourceFrontmatter {
  title: string;
  subtitle: string;
  slug: string;
  category: "article" | "case-study" | "webinar" | "video";
  author: string;
  date: string;
  updated?: string;
  read_time: string;
  image: string | null;
  featured?: boolean;
  cta_variant?: "default" | "assessment" | "discovery" | "newsletter";
  related_slugs?: string[];
  published: boolean;
}

export interface Resource {
  frontmatter: ResourceFrontmatter;
  content: string;
  htmlContent: string;
}

export interface ResourceSummary {
  frontmatter: ResourceFrontmatter;
}

function getMarkdownFiles(): string[] {
  if (!fs.existsSync(resourcesDirectory)) return [];
  return fs
    .readdirSync(resourcesDirectory)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
}

export function getAllResources(): ResourceSummary[] {
  const files = getMarkdownFiles();
  const resources = files
    .map((filename) => {
      const filePath = path.join(resourcesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      return { frontmatter: data as ResourceFrontmatter };
    })
    .filter((r) => r.frontmatter.published)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return resources;
}

export function getFeaturedResource(): ResourceSummary | null {
  const resources = getAllResources();
  return resources.find((r) => r.frontmatter.featured) || resources[0] || null;
}

export function getResourceBySlug(slug: string): Resource | null {
  const files = getMarkdownFiles();
  for (const filename of files) {
    const filePath = path.join(resourcesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as ResourceFrontmatter;
    if (frontmatter.slug === slug && frontmatter.published) {
      const processedContent = remark().use(html).processSync(content);
      return {
        frontmatter,
        content,
        htmlContent: processedContent.toString(),
      };
    }
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllResources().map((r) => r.frontmatter.slug);
}

export function getRelatedResources(
  currentSlug: string,
  relatedSlugs?: string[],
  category?: string,
  limit = 3
): ResourceSummary[] {
  const all = getAllResources().filter(
    (r) => r.frontmatter.slug !== currentSlug
  );

  if (relatedSlugs && relatedSlugs.length > 0) {
    const manual = relatedSlugs
      .map((slug) => all.find((r) => r.frontmatter.slug === slug))
      .filter(Boolean) as ResourceSummary[];
    if (manual.length >= limit) return manual.slice(0, limit);
    const remaining = all
      .filter((r) => !relatedSlugs.includes(r.frontmatter.slug))
      .slice(0, limit - manual.length);
    return [...manual, ...remaining];
  }

  if (category) {
    const sameCategory = all.filter(
      (r) => r.frontmatter.category === category
    );
    if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
    const others = all
      .filter((r) => r.frontmatter.category !== category)
      .slice(0, limit - sameCategory.length);
    return [...sameCategory, ...others];
  }

  return all.slice(0, limit);
}

export function extractHeadings(
  htmlContent: string
): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /<h2[^>]*>(.*?)<\/h2>/gi;
  let match;
  while ((match = regex.exec(htmlContent)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    headings.push({ id, text });
  }
  return headings;
}

export function addHeadingIds(htmlContent: string): string {
  return htmlContent.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_, attrs, text) => {
    const plainText = text.replace(/<[^>]*>/g, "");
    const id = plainText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return `<h2${attrs} id="${id}">${text}</h2>`;
  });
}
