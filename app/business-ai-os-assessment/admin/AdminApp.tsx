"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface Submission {
  id: string;
  created_at: string;
  email: string;
  name: string;
  operation_type: string;
  business_type: string;
  total_score: number;
  category: string;
  lowest_section: string;
  total_monthly_opportunity: number;
  annual_opportunity: number;
  tags: string[];
}

export default function AdminApp() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterSection, setFilterSection] = useState("All");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      sessionStorage.setItem("admin-authed", "1");
    } else {
      setAuthError("Incorrect password.");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("admin-authed") === "1") {
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    supabase
      .from("assessment_responses")
      .select(
        "id, created_at, email, name, operation_type, business_type, total_score, category, lowest_section, total_monthly_opportunity, annual_opportunity, tags"
      )
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setSubmissions(data as Submission[]);
        setLoading(false);
      });
  }, [authed]);

  const handleExportCSV = () => {
    const headers = [
      "Date", "Name", "Email", "Operation", "Business", "Score", "Category",
      "Lowest Section", "Monthly Opp", "Annual Opp", "Tags",
    ];
    const rows = filtered.map((s) => [
      new Date(s.created_at).toLocaleDateString(),
      s.name ?? "",
      s.email,
      s.operation_type ?? "",
      s.business_type ?? "",
      s.total_score,
      s.category,
      s.lowest_section,
      `$${Math.round(s.total_monthly_opportunity).toLocaleString()}`,
      `$${Math.round(s.annual_opportunity).toLocaleString()}`,
      (s.tags ?? []).join(", "),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assessment-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const categories = ["All", "Optimized", "Solid Foundation", "Clear Opportunities", "High Potential"];
  const sections = [
    "All", "Founder Dependency", "Knowledge Systems", "Sales & Delivery",
    "Operations & Workflow", "Growth Capacity", "AI Foundation",
  ];

  const filtered = submissions.filter((s) => {
    if (filterCategory !== "All" && s.category !== filterCategory) return false;
    if (filterSection !== "All" && s.lowest_section !== filterSection) return false;
    return true;
  });

  const priorityColor = {
    "High Potential": "text-brand-coral",
    "Clear Opportunities": "text-yellow-400",
    "Solid Foundation": "text-brand-light",
    Optimized: "text-brand-accent",
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-base-bg flex items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h1 className="font-display text-2xl font-black text-white">Admin Access</h1>
            <p className="text-white/40 text-sm mt-1">Assessment submissions</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder:text-white/25 focus:outline-none focus:border-brand-accent/50"
            />
            {authError && <p className="text-brand-coral text-sm">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-brand-primary text-white font-display font-black text-sm uppercase tracking-widest hover:bg-brand-primary/80 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-bg text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-black text-white">
              Assessment Submissions
            </h1>
            <p className="text-white/40 text-sm mt-1">
              {filtered.length} of {submissions.length} total
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="px-5 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-white/30 hover:text-white transition-colors"
          >
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-white/40 text-xs uppercase tracking-wider">Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white/6 border border-white/12 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
            >
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-white/40 text-xs uppercase tracking-wider">Focus Area:</label>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="bg-white/6 border border-white/12 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none"
            >
              {sections.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-white/40">Loading submissions...</p>
        ) : filtered.length === 0 ? (
          <p className="text-white/40">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {["Date", "Name", "Email", "Operation", "Score", "Category", "Focus Area", "Monthly Opp"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-white/40 text-xs uppercase tracking-wider pb-3 pr-4"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3 pr-4 text-white/50 whitespace-nowrap">
                      {new Date(s.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 pr-4 text-white">{s.name ?? "—"}</td>
                    <td className="py-3 pr-4 text-white/70">{s.email}</td>
                    <td className="py-3 pr-4 text-white/50 max-w-[140px] truncate">
                      {s.operation_type?.split(" ")[0] ?? "—"}
                    </td>
                    <td className="py-3 pr-4 font-display font-black text-white">
                      {s.total_score}/59
                    </td>
                    <td className={`py-3 pr-4 font-medium ${priorityColor[s.category as keyof typeof priorityColor] ?? "text-white"}`}>
                      {s.category}
                    </td>
                    <td className="py-3 pr-4 text-white/60">{s.lowest_section}</td>
                    <td className="py-3 pr-4 text-brand-accent font-medium">
                      ${Math.round(s.total_monthly_opportunity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
