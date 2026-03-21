"use client";

import { useState } from "react";

interface EmailCaptureProps {
  onSubmit: (name: string, email: string) => void;
  isLoading: boolean;
}

export default function EmailCapture({ onSubmit, isLoading }: EmailCaptureProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please enter your first name.");
    if (!email.includes("@")) return setError("Please enter a valid email.");
    onSubmit(name.trim(), email.trim());
  };

  return (
    <div className="min-h-screen bg-base-bg flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md mx-auto text-center space-y-8">

        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-brand-accent/15 border border-brand-accent/25 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="#028090"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div>
          <h2 className="font-display text-3xl font-black text-white">
            Your scorecard is ready.
          </h2>
          <p className="text-white/50 mt-2 text-base">
            Enter your details to see your results.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
              First Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Shannon"
              className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourcompany.com"
              className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50 transition-colors"
            />
          </div>

          {error && (
            <p className="text-brand-coral text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-full bg-brand-primary text-white font-display font-black text-sm uppercase tracking-widest hover:bg-brand-primary/80 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "See My Results"}
          </button>
        </form>

        <p className="text-white/25 text-xs">
          By submitting your email, you are opting in to receive marketing emails from Revaya AI. You can opt out anytime.
        </p>
      </div>
    </div>
  );
}
