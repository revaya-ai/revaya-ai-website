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
      <div className="bg-brand-light border border-[rgba(17,75,95,0.12)] rounded p-8 text-center">
        <p className="font-display font-black text-[1.25rem] text-brand-dark mb-2">
          Thank you.
        </p>
        <p className="text-[1rem] leading-[1.65] text-neutral-nearBlack">
          Your message has been received. I will contact you shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-[rgba(17,75,95,0.25)] rounded px-4 py-3 text-[1rem] text-neutral-nearBlack bg-white placeholder-transparent focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-[rgba(2,128,144,0.15)] transition-all duration-150";

  const labelClass =
    "block text-[0.875rem] font-medium text-neutral-nearBlack mb-1.5";

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
        />
      </div>

      {/* Bottleneck — required */}
      <div>
        <label htmlFor="bottleneck" className={labelClass}>
          What&rsquo;s the operational bottleneck you&rsquo;re dealing with right now?{" "}
          <span className="text-brand-coral">*</span>
        </label>
        <textarea
          id="bottleneck"
          name="bottleneck"
          required
          rows={4}
          value={form.bottleneck}
          onChange={handleChange}
          className={`${inputClass} resize-y min-h-[120px]`}
        />
      </div>

      {/* Tried so far — optional */}
      <div>
        <label htmlFor="triedSoFar" className={labelClass}>
          What have you tried so far?{" "}
          <span className="text-neutral-nearBlack/50 text-[0.8125rem] font-normal">(optional)</span>
        </label>
        <textarea
          id="triedSoFar"
          name="triedSoFar"
          rows={3}
          value={form.triedSoFar}
          onChange={handleChange}
          className={`${inputClass} resize-y min-h-[96px]`}
        />
      </div>

      {error && (
        <p className="text-[0.875rem] text-brand-coral" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full md:w-auto bg-brand-primary text-white text-[0.9375rem] font-medium px-7 py-3.5 rounded transition-all duration-150 hover:bg-[#3D263D] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending..." : "Send this to Shannon"}
      </button>
    </form>
  );
}
