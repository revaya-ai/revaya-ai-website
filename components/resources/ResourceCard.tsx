import Link from "next/link";
import Image from "next/image";
import CategoryPill from "./CategoryPill";
import type { ResourceFrontmatter } from "@/lib/resources";

export default function ResourceCard({
  frontmatter,
}: {
  frontmatter: ResourceFrontmatter;
}) {
  const { title, subtitle, slug, category, read_time, date, image, external_url } =
    frontmatter;
  const href = external_url || `/resources/${slug}`;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={href} className="group block">
      <article className="rounded-2xl border border-[#1E2A38] bg-[#111820] overflow-hidden transition-all duration-300 group-hover:border-[#2A3544] group-hover:-translate-y-0.5">
        {/* Thumbnail */}
        <div className="aspect-[3/2] bg-[#0C1219] relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="absolute inset-0 bg-[#0A2028]" />
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <CategoryPill category={category} size="sm" />

          <h3 className="font-display font-bold text-[1.1rem] leading-snug text-white mt-3 mb-2 line-clamp-2">
            {title}
          </h3>

          <p className="text-[#8899AA] text-[0.9rem] leading-relaxed line-clamp-2 mb-4">
            {subtitle}
          </p>

          <div className="flex items-center gap-3 text-[#556677] text-[0.8rem]">
            <span>{read_time}</span>
            <span className="w-1 h-1 rounded-full bg-[#2A3544]" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
