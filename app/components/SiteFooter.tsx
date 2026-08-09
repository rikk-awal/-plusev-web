"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real visitors never fill this
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <footer className="site-footer">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          {/* Logo & Copy */}
          <div className="space-y-3 order-3 md:order-1">
            <a href="/" className="block w-fit">
              <svg
                width="139"
                height="56"
                viewBox="0 0 185 74"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="PlusEV, Quant & Tech Company"
              >
                <rect x="4" y="3" width="50" height="50" rx="6" fill="#04408d" />
                <path d="M16.3 33.8 L28.6 18.4 L40.9 33.8" stroke="#ffffff" strokeWidth="6.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="62" y="38" fontFamily="var(--font-body), sans-serif" fontSize="26" fontWeight="700" fill="#04408d" letterSpacing="0.5">PLUSEV</text>
                <text x="68.1" y="58" fontFamily="var(--font-mono), monospace" fontSize="8.5" fontWeight="700" fill="#04408d" letterSpacing="0.117">AI &#8226; QUANT &#8226; TECH</text>
              </svg>
            </a>
            <div className="flex gap-4 text-xs text-[#02263c]/40">
              <a href="#" className="hover:text-[#38bdf8] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#38bdf8] transition-colors">Terms &amp; Conditions</a>
            </div>
            <p className="text-xs text-[#02263c]/50">© PlusEV 2020-2026. All Rights Reserved.</p>
          </div>

          {/* Newsletter signup */}
          <div className="w-full max-w-xs order-1 md:order-2">
            <p className="text-sm font-medium text-[#02263c] mb-2">
              Sign up for the latest from PLUSEV AI
            </p>
            {status === "success" ? (
              <p className="text-sm text-[#1d4ed8]">Thanks, we&apos;ve received your email.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="flex-1 min-w-0 border border-black/15 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8]"
                  />
                  {/* Honeypot: hidden from sighted users, invisible to screen readers, bots fill it anyway */}
                  <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn !py-2 !px-4 !text-sm whitespace-nowrap"
                  >
                    {status === "loading" ? "Submitting…" : "Submit"}
                  </button>
                </div>
                {status === "error" && (
                  <p className="text-xs text-red-600">{error}</p>
                )}
              </form>
            )}
          </div>

          {/* Contact action & LinkedIn */}
          <div className="flex items-center gap-6 order-2 md:order-3">
            <a
              href="/contact"
              className="btn !py-2.5 !px-6"
            >
              Contact us
            </a>
            <a
              href="https://www.linkedin.com/company/plusev-ai-quant-trading-pvt-ltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hover:opacity-100 transition-opacity"
              aria-label="LinkedIn"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="#0A66C2"
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
