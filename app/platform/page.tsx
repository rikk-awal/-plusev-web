"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

// ─── THE AUTOPSY: 13 real disease detectors (D1–D13) ────────────────────────
const DISEASES = [
  { code: "D1", name: "Market state mismatch" },
  { code: "D2", name: "Market state transition" },
  { code: "D3", name: "Grade failure" },
  { code: "D4", name: "Exit inefficiency" },
  { code: "D5", name: "Entry timing" },
  { code: "D6", name: "Direction failure" },
  { code: "D7", name: "Component failure" },
  { code: "D8", name: "Cost dominance" },
  { code: "D9", name: "Overtrading" },
  { code: "D10", name: "Holding period" },
  { code: "D11", name: "Sizing amplification" },
  { code: "D12", name: "Temporal decay" },
  { code: "D13", name: "Risk profile" },
];

// ─── Carousel: three real differentiators, illustrated ──────────────────────
const RADAR_LABELS = [
  { text: "Timeframe", x: 100, y: 7, anchor: "middle" },
  { text: "Trend", x: 188.4, y: 71.3, anchor: "start" },
  { text: "Entry", x: 154.7, y: 179, anchor: "middle" },
  { text: "Key-level", x: 45.3, y: 179, anchor: "middle" },
  { text: "Risk:reward", x: 11.6, y: 71.3, anchor: "end" },
];
const RADAR_OUTER = "100,25 171.3,76.8 144.1,160.7 55.9,160.7 28.7,76.8";
const RADAR_SCORE = "100,43.8 164.2,79.1 126.5,136.4 64.7,148.5 50.1,83.8";

const SCATTER_PTS = [
  { x: 125.3, y: 21.1 }, { x: 170.2, y: 15 }, { x: 154.6, y: 52.9 }, { x: 96.6, y: 70.9 },
  { x: 97.1, y: 62.4 }, { x: 103.5, y: 25.8 }, { x: 142.3, y: 103.2 }, { x: 114.2, y: 43.7 },
  { x: 161.3, y: 109.8 }, { x: 156.4, y: 61.5 }, { x: 185, y: 35.5 }, { x: 174.9, y: 55.4 },
  { x: 127.5, y: 45.8 }, { x: 139.1, y: 88.0 }, { x: 133.9, y: 74.1 }, { x: 156.1, y: 64.4 },
];

const TRADE_LINE = "10,67.6 17.5,65 25,61.2 32.5,58.8 40,56.3 47.5,53.5 55,52 62.5,49.4 70,46.5 77.5,43.1 85,49.6 92.5,57.1 100,63.6 107.5,73.6 115,83.1 122.5,81.3 130,83.2 137.5,85.1 145,85.7 152.5,86.1 160,84.8 167.5,82.8 175,82.9 182.5,81.2 190,79.9";

function RadarDiagram() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" role="img" aria-label="Radar chart showing five weighted scoring factors converging to a grade">
      <polygon points={RADAR_OUTER} fill="none" stroke="#02263c" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 3" />
      <polygon points={RADAR_SCORE} fill="#1d4ed8" fillOpacity="0.15" stroke="#1d4ed8" strokeWidth="1.5" />
      {RADAR_OUTER.split(" ").map((pt, i) => {
        const [x, y] = pt.split(",").map(Number);
        return <line key={i} x1="100" y1="100" x2={x} y2={y} stroke="#02263c" strokeOpacity="0.1" strokeWidth="0.75" />;
      })}
      {RADAR_LABELS.map((l, i) => (
        <text key={i} x={l.x} y={l.y} textAnchor={l.anchor as "start" | "middle" | "end"} fontSize="8.5" fontFamily="monospace" fill="#02263c" fillOpacity="0.55">
          {l.text}
        </text>
      ))}
      <text x="100" y="103" textAnchor="middle" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#1d4ed8">A+</text>
    </svg>
  );
}

function DiagnosisScan({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 200 130" className="w-full h-full" role="img" aria-label="Equity line for a trade with the failure point annotated">
      <polyline points={TRADE_LINE} fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
      <circle cx="107.5" cy="73.6" r="3" fill="#38bdf8" />
      {!compact && (
        <>
          <line x1="107.5" y1="73.6" x2="60" y2="30" stroke="#38bdf8" strokeWidth="1" />
          <text x="12" y="24" fontSize="9" fontFamily="monospace" fill="#38bdf8" fontWeight="bold">D8 · Cost dominance</text>
        </>
      )}
    </svg>
  );
}

function ParamScatter() {
  return (
    <svg viewBox="0 0 200 130" className="w-full h-full" role="img" aria-label="Scatter of optimization trials converging on an optimum across a parameter space">
      <rect x="5" y="5" width="190" height="120" fill="none" stroke="#02263c" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 3" />
      {SCATTER_PTS.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.2" fill="#1d4ed8" fillOpacity={0.25 + (i / SCATTER_PTS.length) * 0.5} />
      ))}
      <circle cx="150" cy="70" r="6" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="150" cy="70" r="10.5" fill="none" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}

function PipelineFlow() {
  const steps = [
    { label: "Walk-forward", tag: "01" },
    { label: "Out-of-sample", tag: "02" },
    { label: "Production", tag: "03" },
  ];
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full" role="img" aria-label="Three-stage validation pipeline: walk-forward, out-of-sample testing, then production">
      {steps.map((s, i) => (
        <g key={s.tag}>
          <rect x="30" y={20 + i * 75} width="140" height="46" fill={i === 2 ? "#1d4ed8" : "#ffffff"} fillOpacity={i === 2 ? 0.9 : 1} stroke="#1d4ed8" strokeWidth="1.25" />
          <text x="45" y={20 + i * 75 + 20} fontSize="8" fontFamily="monospace" fill={i === 2 ? "#ffffff" : "#38bdf8"} fontWeight="bold">{s.tag}</text>
          <text x="45" y={20 + i * 75 + 34} fontSize="10.5" fontFamily="var(--font-display)" fill={i === 2 ? "#ffffff" : "#02263c"}>{s.label}</text>
        </g>
      ))}
      <line x1="100" y1="66" x2="100" y2="95" stroke="#1d4ed8" strokeWidth="1.25" />
      <line x1="100" y1="141" x2="100" y2="170" stroke="#1d4ed8" strokeWidth="1.25" />
    </svg>
  );
}

function CTAVisual() {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" role="img" aria-label="Abstract overlapping equity trace lines" preserveAspectRatio="xMidYMid slice">
      <polyline points="0,140 40,120 80,150 120,90 160,110 200,60 240,80 300,40" fill="none" stroke="#1d4ed8" strokeOpacity="0.15" strokeWidth="1.5" />
      <polyline points="0,160 50,150 90,170 130,130 170,145 210,100 250,120 300,90" fill="none" stroke="#38bdf8" strokeOpacity="0.25" strokeWidth="1.5" />
      <polyline points="0,100 60,110 100,80 150,100 190,60 230,75 270,40 300,55" fill="none" stroke="#1d4ed8" strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="300" cy="55" r="3" fill="#1d4ed8" fillOpacity="0.5" />
    </svg>
  );
}

const SLIDES = [
  {
    key: "scoring",
    label: "Setup scoring & grading",
    body: "Every setup is scored across five weighted factors — timeframe alignment, trend strength, entry technique, key-level proximity, and risk-reward — and assigned an A+ through C grade. Position size follows the grade.",
    art: <RadarDiagram />,
  },
  {
    key: "autopsy",
    label: "Trade autopsy",
    body: "Every closed trade is checked against 13 known failure modes. The system doesn't just log a loss — it names the disease, like cost dominance above, and routes the fix.",
    art: <DiagnosisScan />,
  },
  {
    key: "optimization",
    label: "Regime-aware optimization",
    body: "Parameters are tuned by Bayesian search across a 76-dimensional space — 44 global, 32 regime-conditional — using a Gaussian Process surrogate. What works in a trend isn't assumed to work in a range.",
    art: <ParamScatter />,
  },
];

export default function Platform() {
  const prefersReducedMotion = useReducedMotion();
  const [slide, setSlide] = useState(0);

  const goPrev = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setSlide((s) => (s + 1) % SLIDES.length);

  return (
    <div className="relative min-h-screen bg-white text-[#02263c] overflow-x-hidden selection:bg-[#38bdf8]/20">
      <SiteHeader />

      {/* ─── HERO — same full-bleed photo treatment as the homepage ────────── */}
      <section className="section-hero min-h-[394px] pt-[135px] pb-[70px]">
        <div className="section-hero__img" style={{ backgroundImage: `url('/images/quant_hero_bg.png')` }} />
        <div className="section-hero__overlay" />
        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-hero__title-line max-w-2xl"
          >
            From hypothesis to production, provably.
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white/75 max-w-xl mt-4"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
          >
            Every strategy earns its way through a validation pipeline before it risks a rupee of real capital.
          </motion.p>
        </div>
      </section>

      {/* ─── OPPORTUNITY FOR IMPACT — two text columns, pull-quote + copy ──── */}
      <section className="pt-[15px] pb-[80px]">
        <div className="container max-w-5xl mx-auto px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#02263c]/40 mb-6">
            The problem
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-[#1d4ed8] font-medium"
              style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.8rem)", lineHeight: 1.4 }}
            >
              Most edges are noise wearing a backtest — and a backtest passing is not proof of anything.
            </motion.p>
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-[#555555]"
              style={{ fontSize: "1rem", lineHeight: 1.7 }}
            >
              A strategy that looks good on five years of history can still be curve-fit to the exact data it was tested on. PlusEV treats every hypothesis as guilty until proven otherwise: of roughly 1,240 ideas that enter the pipeline in a research cycle, one survives to production.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── CAROUSEL — three differentiators, one illustrated slide each ──── */}
      <section className="pb-[100px] border-t border-black/5 pt-[70px] overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="section-image-with-text__title !text-[clamp(1.5rem,2.8vw,2.1rem)] mb-10">
            Expanding what a validation pipeline can catch.
          </h2>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[260px]">
              <div className="w-full max-w-[260px] mx-auto">
                {SLIDES[slide].art}
              </div>
              <div className="text-center md:text-left">
                <p className="text-[#1d4ed8] font-display font-medium text-[1.15rem] mb-3">
                  {SLIDES[slide].label}
                </p>
                <p className="text-[#555555] text-[0.95rem] leading-[1.7] max-w-md mx-auto md:mx-0">
                  {SLIDES[slide].body}
                </p>
              </div>
            </div>

            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8 w-9 h-9 flex items-center justify-center text-[#1d4ed8] hover:text-[#38bdf8] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-full"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8 w-9 h-9 flex items-center justify-center text-[#1d4ed8] hover:text-[#38bdf8] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-full"
            >
              ›
            </button>
          </div>

          <div className="flex justify-center gap-2.5 mt-8">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                onClick={() => setSlide(i)}
                aria-label={`Go to slide ${i + 1}: ${s.label}`}
                className={`w-2 h-2 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] ${i === slide ? "bg-[#1d4ed8]" : "bg-[#02263c]/15"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE AUTOPSY — text-left / diagnosis-scan-right (mirrors Aktis's
          "Power to see and know": annotated image with a callout, on the right) */}
      <section className="pb-[60px] border-t border-black/5 pt-[70px]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="section-image-with-text__title !text-[clamp(1.6rem,3vw,2.2rem)]">
                The power to diagnose, not just record.
              </h2>
              <div className="h-[3px] w-[120px] bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]/10 rounded-[2px] mb-6" />
              <p className="text-[#555555] text-[0.95rem] leading-[1.7]">
                A key part of our approach is diagnosing precisely why a trade failed, not just recording that it did. Every closed trade is checked against 13 known failure modes — the trade shown here was flagged for cost dominance, where slippage and commissions ate the edge before the setup ever had a chance.
              </p>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="w-full max-w-md mx-auto"
            >
              <DiagnosisScan />
            </motion.div>
          </div>

          {/* Compact supporting reference — the full 13-item taxonomy, de-emphasized */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-black/5">
            {DISEASES.map((d) => (
              <span
                key={d.code}
                title={d.name}
                className="font-mono text-[10px] uppercase tracking-wider text-[#02263c]/50 border border-black/10 rounded-full px-3 py-1"
              >
                {d.code} · {d.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BUILT TO RUN — pipeline-diagram-left / text-right (mirrors
          Aktis's "Scaling for the future": image-left / text-right) ───────── */}
      <section className="pb-[100px] border-t border-black/5 pt-[70px]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-[220px] mx-auto"
            >
              <PipelineFlow />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h2 className="section-image-with-text__title !text-[clamp(1.6rem,3vw,2.2rem)]">
                Built to run, not just backtest.
              </h2>
              <div className="h-[3px] w-[120px] bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]/10 rounded-[2px] mb-6" />
              <p className="text-[#555555] text-[0.95rem] leading-[1.7]">
                Optimized parameters are re-tested on data the optimizer never saw. Walk-Forward Efficiency — out-of-sample Sharpe divided by in-sample Sharpe — has to clear 0.5 alongside five other filters, before a strategy is allowed to face out-of-sample and statistical significance testing. Only what survives every gate gets paper-traded, then production.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA — bold underlined heading-link + copy left, abstract
          equity-trace visual right (mirrors Aktis's photo-right CTA) ──────── */}
      <section id="contact" className="relative overflow-hidden border-t border-black/5">
        <div className="container max-w-5xl mx-auto px-6 py-[90px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <a
                href="mailto:plusev.blr@gmail.com"
                className="inline-block font-display font-bold text-[#1d4ed8] hover:text-[#38bdf8] transition-colors border-b-[3px] border-[#1d4ed8] hover:border-[#38bdf8] pb-1"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
              >
                Get in touch ›
              </a>
              <p className="text-[#555555] mt-5 max-w-sm" style={{ fontSize: "0.95rem", lineHeight: 1.7 }}>
                Reach out to learn more about how PlusEV is systematizing and automating trading — solo quant or prop firm, we want to understand your setup.
              </p>
            </motion.div>

            <div className="w-full h-[180px] lg:h-[220px] opacity-80">
              <CTAVisual />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
