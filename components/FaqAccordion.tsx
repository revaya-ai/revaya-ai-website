"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  columns?: 1 | 2;
}

export default function FaqAccordion({ items, columns = 1 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const renderItem = (item: FaqItem, i: number) => (
    <div
      key={i}
      className="border-b border-white/[0.07]"
    >
      <button
        onClick={() => setOpenIndex(openIndex === i ? null : i)}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={openIndex === i}
      >
        <span className="text-[1rem] md:text-[1.0625rem] text-white leading-[1.6] pr-4 group-hover:text-[#028090] transition-colors duration-150">
          {item.question}
        </span>
        <span className="shrink-0 text-[#028090] transition-transform duration-200">
          {openIndex === i ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          openIndex === i ? "max-h-[800px] pb-5" : "max-h-0"
        }`}
      >
        <p className="text-[1rem] leading-[1.65] text-white">
          {item.answer}
        </p>
      </div>
    </div>
  );

  if (columns === 2) {
    const mid = Math.ceil(items.length / 2);
    const left = items.slice(0, mid);
    const right = items.slice(mid);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
        <div>{left.map((item, i) => renderItem(item, i))}</div>
        <div>{right.map((item, i) => renderItem(item, mid + i))}</div>
      </div>
    );
  }

  return (
    <div>
      {items.map((item, i) => renderItem(item, i))}
    </div>
  );
}
