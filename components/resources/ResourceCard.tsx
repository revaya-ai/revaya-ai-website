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
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#0F1923] border border-[#1E2A38] flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-[#2A3544]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
            </div>
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
