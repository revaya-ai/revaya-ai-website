import Link from "next/link";
import Image from "next/image";
import CategoryPill from "./CategoryPill";
import type { ResourceFrontmatter } from "@/lib/resources";

const solidColors = [
  { bg: "bg-[#0A2028]", accent: "border-[#15393F]" },
  { bg: "bg-[#1A1020]", accent: "border-[#2E1F2E]" },
  { bg: "bg-[#0C1A24]", accent: "border-[#1A2E3A]" },
  { bg: "bg-[#1A0F14]", accent: "border-[#30171F]" },
];

export default function ResourceCard({
  frontmatter,
  index = 0,
}: {
  frontmatter: ResourceFrontmatter;
  index?: number;
}) {
  const { title, subtitle, slug, category, read_time, date, image, external_url } =
    frontmatter;
  const href = external_url || `/resources/${slug}`;
  const solid = solidColors[index % solidColors.length];

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={href} className="group block">
      <article className="rounded-2xl border border-[#1E2A38] bg-[#111820] overflow-hidden transition-all duration-300 group-hover:border-[#2A3544] group-hover:-translate-y-0.5">
        {/* Thumbnail — image or solid color with title */}
        <div className="aspect-[3/2] relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className={`absolute inset-0 ${solid.bg} flex items-end p-5`}>
              <div className={`absolute inset-0 border ${solid.accent} rounded-none`} />
              <div className="relative">
                <CategoryPill category={category} size="sm" />
                <p className="font-display font-bold text-[1rem] text-white leading-snug mt-2 line-clamp-3">
                  {title}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {image && <CategoryPill category={category} size="sm" />}

          <h3 className={`font-display font-bold text-[1.1rem] leading-snug text-white line-clamp-2 mb-2 ${image ? "mt-3" : "mt-0"}`}>
            {image ? title : subtitle}
          </h3>

          {image && (
            <p className="text-[#8899AA] text-[0.9rem] leading-relaxed line-clamp-2 mb-4">
              {subtitle}
            </p>
          )}

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
