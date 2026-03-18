"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessDescription: string;
  teamSize: string;
  bottleneck: string;
  triedSoFar: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessDescription: "",
  teamSize: "",
  bottleneck: "",
  triedSoFar: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card rounded-xl p-8 text-center border border-[#028090]/30">
        <div className="w-12 h-12 rounded-full bg-[#028090]/20 flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10L8 14L16 6" stroke="#028090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="font-display font-black text-[1.25rem] text-white mb-2">
          Thank you.
        </p>
        <p className="text-[1rem] leading-[1.65] text-white/65">
          Your message has been received. I will contact you shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-white/[0.12] rounded-lg px-4 py-3 text-[1rem] text-white bg-[#111820] placeholder-white/20 focus:outline-none focus:border-[#028090] focus:ring-1 focus:ring-[#028090]/30 transition-all duration-150";

  const labelClass =
    "block text-[0.875rem] font-medium text-white/65 mb-1.5";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className={inputClass}
          autoComplete="name"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          autoComplete="email"
          placeholder="you@company.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
          autoComplete="tel"
          placeholder="Optional"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className={labelClass}>
          Company name
        </label>
        <input
          id="company"
          name="company"
          type="text"
          value={form.company}
          onChange={handleChange}
          className={inputClass}
          autoComplete="organization"
          placeholder="Your company"
        />
      </div>

      {/* Business description */}
      <div>
        <label htmlFor="businessDescription" className={labelClass}>
          What does your business do?
        </label>
        <input
          id="businessDescription"
          name="businessDescription"
          type="text"
          value={form.businessDescription}
          onChange={handleChange}
          className={inputClass}
          placeholder="Brief description"
        />
      </div>

      {/* Team size */}
      <div>
        <label htmlFor="teamSize" className={labelClass}>
          How many people are in your company?
        </label>
        <input
          id="teamSize"
          name="teamSize"
          type="text"
          value={form.teamSize}
          onChange={handleChange}
          className={inputClass}
          placeholder="e.g. 5, 10-20"
        />
      </div>

      {/* Bottleneck — required */}
      <div>
        <label htmlFor="bottleneck" className={labelClass}>
          What&rsquo;s the operational bottleneck you&rsquo;re dealing with right now?{" "}
          <span className="text-[#F45B69]">*</span>
        </label>
        <textarea
          id="bottleneck"
          name="bottleneck"
          required
          rows={4}
          value={form.bottleneck}
          onChange={handleChange}
          className={`${inputClass} resize-y min-h-[120px]`}
          placeholder="Be specific — this helps me give you a real read on the fit."
        />
      </div>

      {/* Tried so far — optional */}
      <div>
        <label htmlFor="triedSoFar" className={labelClass}>
          What have you tried so far?{" "}
          <span className="text-white/35 text-[0.8125rem] font-normal">(optional)</span>
        </label>
        <textarea
          id="triedSoFar"
          name="triedSoFar"
          rows={3}
          value={form.triedSoFar}
          onChange={handleChange}
          className={`${inputClass} resize-y min-h-[96px]`}
          placeholder="Tools, consultants, internal efforts..."
        />
      </div>

      {error && (
        <p className="text-[0.875rem] text-[#F45B69]" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full md:w-auto font-display text-[0.9375rem] font-bold px-8 py-3.5 rounded-full bg-[#553555] text-white hover:bg-[#4a2d4a] hover:shadow-[0_0_40px_rgba(85,53,85,0.5)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
