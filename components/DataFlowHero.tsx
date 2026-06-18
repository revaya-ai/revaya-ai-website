"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type Layer = { name: string; desc: string; color: string };

const LAYERS: Layer[] = [
  { name: "Context", desc: "what your business knows", color: "25,179,194" },
  { name: "Data", desc: "connected, clean, current", color: "154,110,154" },
  { name: "Intelligence", desc: "decisions, not dashboards", color: "228,253,225" },
  { name: "Automate", desc: "the work runs itself", color: "244,91,105" },
];

type Props = {
  eyebrow?: string;
  headline?: React.ReactNode;
  subcopy?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  layers?: Layer[];
};

export default function DataFlowHero({
  eyebrow = "Business AI Operating System",
  headline = (
    <>
      What is the one problem you can&rsquo;t hire for, can&rsquo;t solve, and{" "}
      <em className="italic text-teal">can&rsquo;t scale?</em>
    </>
  ),
  subcopy = "Start with the problem costing you the most. I find your single most expensive bottleneck, build a system that runs it the way you would, and show you every decision it makes. Not the whole business at once. The one thing first.",
  primaryCta = { label: "Book a fit call", href: "/work-with-me" },
  secondaryCta = { label: "See the system", href: "/business-ai-operating-system" },
  layers = LAYERS,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const x = c.getContext("2d");
    if (!x) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0;
    let particles: { x: number; y: number; v: number; r: number; col: string }[] = [];
    let lanes: number[] = [];
    const cols = layers.map((l) => l.color);

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      lanes = cols.map((_, i) => w * (0.16 + 0.68 * (i / (cols.length - 1))));
    };
    const spawn = () => {
      const lane = (Math.random() * lanes.length) | 0;
      particles.push({ x: lanes[lane] + (Math.random() - 0.5) * 22, y: -10, v: 0.7 + Math.random() * 1.1, r: 1.2 + Math.random() * 1.8, col: cols[lane] });
    };
    const draw = () => {
      x.clearRect(0, 0, w, h);
      lanes.forEach((lx, i) => {
        const g = x.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, `rgba(${cols[i]},0)`);
        g.addColorStop(0.5, `rgba(${cols[i]},0.1)`);
        g.addColorStop(1, `rgba(${cols[i]},0)`);
        x.strokeStyle = g; x.lineWidth = 1.5;
        x.beginPath(); x.moveTo(lx, 0); x.lineTo(lx, h); x.stroke();
      });
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (!reduce) p.y += p.v;
        if (p.y > h + 10) { particles.splice(i, 1); continue; }
        x.beginPath(); x.moveTo(p.x, p.y - 10); x.lineTo(p.x, p.y);
        x.strokeStyle = `rgba(${p.col},0.35)`; x.lineWidth = p.r; x.stroke();
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 7); x.fillStyle = `rgba(${p.col},0.9)`; x.fill();
      }
      if (!reduce && particles.length < 90 && Math.random() < 0.6) spawn();
      raf = requestAnimationFrame(draw);
    };

    size();
    for (let k = 0; k < 40; k++) { spawn(); particles[k].y = Math.random() * h; }
    draw();
    window.addEventListener("resize", size);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, [layers]);

  return (
    <section className="relative grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-10 max-w-content mx-auto px-6 lg:px-12 pt-36 lg:pt-40 pb-20">
      <div className="relative z-10">
        <span className="inline-block text-[13px] tracking-[0.16em] uppercase text-teal border border-teal/30 rounded-full px-4 py-1.5 mb-6 bg-teal/[0.06]">
          {eyebrow}
        </span>
        <h1 className="font-display font-normal text-[clamp(38px,5vw,68px)] leading-[1.05] tracking-[-0.02em] text-white">
          {headline}
        </h1>
        <p className="mt-6 max-w-[480px] text-[clamp(16px,1.4vw,18px)] leading-relaxed text-paper/80">
          {subcopy}
        </p>
        <div className="mt-9 flex gap-3.5 flex-wrap">
          <Link href={primaryCta.href} className="bg-coral text-white font-semibold text-base px-7 py-4 rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_38px_-12px_rgba(244,91,105,0.7)] transition-all">
            {primaryCta.label}
          </Link>
          <Link href={secondaryCta.href} className="text-paper/90 font-medium text-base px-6 py-4 rounded-full border border-white/15 hover:border-white/40 transition-colors">
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="relative h-[480px] lg:h-[540px] flex flex-col justify-center gap-[60px] z-10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" aria-hidden="true" />
        {layers.map((l) => (
          <div key={l.name} className="relative z-10 flex items-center gap-4 bg-ink-2/30 border border-white/[0.09] rounded-2xl px-5 py-4 backdrop-blur-sm">
            <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: `rgb(${l.color})`, boxShadow: `0 0 14px rgb(${l.color})` }} />
            <span className="font-display text-[19px] text-white">{l.name}</span>
            <span className="text-[13px] text-paper/60 ml-auto text-right">{l.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
