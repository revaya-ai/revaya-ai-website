const categoryStyles: Record<string, string> = {
  article:
    "bg-[#0D2428] text-[#028090] border-[#15393F]",
  "case-study":
    "bg-[#1E1520] text-[#a06ca0] border-[#2E1F2E]",
  webinar:
    "bg-[#2A1519] text-[#F45B69] border-[#3D1E23]",
  video:
    "bg-[#141E14] text-[#E4FDE1] border-[#1E2E1E]",
};

const categoryLabels: Record<string, string> = {
  article: "Article",
  "case-study": "Case Study",
  webinar: "Webinar",
  video: "Video",
};

export default function CategoryPill({
  category,
  size = "sm",
}: {
  category: string;
  size?: "sm" | "md";
}) {
  const style = categoryStyles[category] || categoryStyles.article;
  const label = categoryLabels[category] || category;

  return (
    <span
      className={`inline-flex items-center border rounded-full font-display font-bold tracking-wide ${style} ${
        size === "sm"
          ? "px-3 py-1 text-[0.7rem]"
          : "px-4 py-1.5 text-[0.8rem]"
      }`}
    >
      {label}
    </span>
  );
}
