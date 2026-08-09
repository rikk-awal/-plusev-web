"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { GenerativeArtScene } from "../components/GenerativeArtScene";
import { CtaWatermark } from "../components/CtaWatermark";

// ─── THE AUTOPSY: 14 real disease detectors (D1–D14) ────────────────────────
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
  { code: "D14", name: "Exit capture inefficiency" },
];

// ─── Carousel: three panels of one research loop, drawn as one matched set
// (same viewBox, same ink, same single accent) so they read as one system
// when shown together, not three unrelated widgets ────────────────────────

// Deterministic pseudo-random so density fields are stable across re-renders
// without hand-authoring dozens of coordinates. Integer-only hash (not
// Math.sin — trig functions aren't guaranteed bit-identical between Node's
// SSR and the browser's V8, which was causing a hydration mismatch here).
function jitter(seed: number) {
  let x = Math.imul(seed | 0, 0x9e3779b1) | 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b) | 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) | 0;
  x = (x ^ (x >>> 16)) >>> 0;
  return x / 4294967295;
}

// Panel 1 — a real ledger: ~50 rows tightly stacked, almost all struck
// through, one left open. Density from repetition is our hatching.
const LEDGER_ALIVE_IDX = 33;
const LEDGER_ROW_COUNT = 50;
const LEDGER_BASE_SPACING = 2.69;
const LEDGER_ALIVE_GAP = 5.7; // extra breathing room on both sides of the surviving row

const LEDGER_ROWS = (() => {
  const rows = [];
  let y = 2;
  for (let i = 0; i < LEDGER_ROW_COUNT; i++) {
    if (i > 0) {
      y += i === LEDGER_ALIVE_IDX || i === LEDGER_ALIVE_IDX + 1 ? LEDGER_ALIVE_GAP : LEDGER_BASE_SPACING;
    }
    const j = jitter(i * 7.31);
    // Rows closest to the survivor fade out first — a halo of quiet around it —
    // instead of every dead row carrying the same weight.
    const halo = Math.min(1, Math.abs(i - LEDGER_ALIVE_IDX) / 8);
    rows.push({ y, xEnd: 150 + j * 42, tone: 0.35 + halo * 0.65 * (0.7 + j * 0.3) });
  }
  return rows;
})();

// Every panel narrates the same beat through motion: the dead mass settles in
// first, then the survivor draws itself across (pathLength 0→1), landing
// ~150ms later — "many died, then one held," told without a word. Keyed to
// `active` so re-selecting a panel in the carousel replays the beat each
// time, not just on first scroll into view.
function LedgerRecord({ active, prefersReducedMotion }: { active: boolean; prefersReducedMotion: boolean | null }) {
  const alive = LEDGER_ROWS[LEDGER_ALIVE_IDX];
  const skip = !!prefersReducedMotion;
  return (
    <svg viewBox="0 0 200 140" className="w-full h-auto" role="img" aria-label="A dense ledger of hypotheses, nearly all struck through as dead, one left open and on record">
      <motion.g key={String(active)} initial={skip ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
        {LEDGER_ROWS.map((r, i) => {
          if (i === LEDGER_ALIVE_IDX) return null;
          return (
            <g key={i}>
              <line x1="6" y1={r.y} x2={r.xEnd} y2={r.y} stroke="#02263c" strokeOpacity={r.tone * 0.16} strokeWidth="0.6" />
              <line x1="6" y1={r.y + 1} x2={r.xEnd} y2={r.y - 1} stroke="#02263c" strokeOpacity={r.tone * 0.2} strokeWidth="0.5" />
            </g>
          );
        })}
      </motion.g>
      <g key={`survivor-${active}`}>
        <motion.line
          x1="6" y1={alive.y + 1.2} x2="196" y2={alive.y + 1.2}
          stroke="#38bdf8" strokeOpacity="0.15" strokeWidth="3"
          initial={skip ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
        />
        <motion.line
          x1="6" y1={alive.y} x2="196" y2={alive.y}
          stroke="#1d4ed8" strokeOpacity="0.95" strokeWidth="2.75"
          initial={skip ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
        />
        <motion.circle
          cx="6" cy={alive.y} r="2.5" fill="#1d4ed8"
          initial={skip ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: 0.55 }}
        />
        <motion.rect
          x="188" y={alive.y - 4} width="8" height="8" fill="#38bdf8"
          initial={skip ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: 0.55 }}
        />
      </g>
    </svg>
  );
}

// Panel 2 — a fan of ~40 control paths (the null distribution) against the
// single tested path that clears them, with the gap filled, not just ruled.
const CONTROL_ORIGIN = { x: 6, y: 110 };
const CONTROL_PATHS = Array.from({ length: 53 }, (_, i) => {
  const j1 = jitter(i * 3.7);
  const j2 = jitter(i * 3.7 + 1.9);
  const endY = 88 + j1 * 26;
  const midY = CONTROL_ORIGIN.y - (CONTROL_ORIGIN.y - endY) * (0.45 + j2 * 0.25);
  return `${CONTROL_ORIGIN.x},${CONTROL_ORIGIN.y} 68,${(CONTROL_ORIGIN.y + midY) / 2} 132,${midY} 196,${endY}`;
});
const CONTROL_REF = `${CONTROL_ORIGIN.x},${CONTROL_ORIGIN.y} 68,104 132,98 196,93`;
const CONDITION_PATH = `${CONTROL_ORIGIN.x},${CONTROL_ORIGIN.y} 68,86 132,52 196,22`;
const GAP_FILL = `${CONTROL_ORIGIN.x},${CONTROL_ORIGIN.y} 68,86 132,52 196,22 196,93 132,98 68,104 ${CONTROL_ORIGIN.x},${CONTROL_ORIGIN.y}`;

function ControlGap({ active, prefersReducedMotion }: { active: boolean; prefersReducedMotion: boolean | null }) {
  const skip = !!prefersReducedMotion;
  return (
    <svg viewBox="0 0 200 140" className="w-full h-auto" role="img" aria-label="A fan of control paths from the same starting point against the single tested path that clears them, with the gap between shaded">
      <defs>
        <linearGradient id="controlGapFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <motion.g key={String(active)} initial={skip ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
        {CONTROL_PATHS.map((p, i) => (
          <polyline key={i} points={p} fill="none" stroke="#02263c" strokeOpacity="0.06" strokeWidth="0.5" />
        ))}
        <polygon points={GAP_FILL} fill="url(#controlGapFill)" />
        <polyline points={CONTROL_REF} fill="none" stroke="#02263c" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2.5 2" />
        <circle cx={CONTROL_ORIGIN.x} cy={CONTROL_ORIGIN.y} r="2" fill="#02263c" fillOpacity="0.4" />
        <circle cx="196" cy="93" r="2.25" fill="#02263c" fillOpacity="0.4" />
      </motion.g>
      <g key={`survivor-${active}`}>
        <motion.polyline
          points={CONDITION_PATH} fill="none" stroke="#1d4ed8" strokeWidth="3"
          initial={skip ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
        />
        <motion.circle
          cx="196" cy="22" r="4" fill="#38bdf8"
          initial={skip ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: 0.55 }}
        />
      </g>
    </svg>
  );
}

// Panel 3 — a field of failed attempts under a rising staircase of
// thresholds; each survivor becomes the bar the next attempt must clear.
const BAR_STEPS = [
  { x: 10, y: 116 },
  { x: 68, y: 88 },
  { x: 128, y: 56 },
  { x: 192, y: 22 },
];
const BAR_SCATTER = Array.from({ length: 65 }, (_, i) => {
  const j1 = jitter(i * 5.2);
  const j2 = jitter(i * 5.2 + 3.1);
  const x = 8 + j1 * 184;
  const trendY = 118 - (x / 192) * 84;
  const y = Math.min(130, trendY + 6 + j2 * 28);
  return { x, y };
});

// A single attempt that cleared the final threshold — the panel's protagonist,
// otherwise implied only by the staircase itself, never actually shown.
const BAR_SURVIVOR = { x: 179, y: 11 };

function RisingBar({ active, prefersReducedMotion }: { active: boolean; prefersReducedMotion: boolean | null }) {
  const skip = !!prefersReducedMotion;
  const lastStep = BAR_STEPS[BAR_STEPS.length - 1];
  return (
    <svg viewBox="0 0 200 140" className="w-full h-auto" role="img" aria-label="A field of failed attempts beneath a rising staircase of thresholds, with one attempt shown clearing the final threshold. Each survivor becomes the bar the next attempt has to clear">
      <motion.g key={String(active)} initial={skip ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
        <line x1="6" y1="132" x2="196" y2="132" stroke="#02263c" strokeOpacity="0.18" strokeWidth="1" />
        {BAR_SCATTER.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.1" fill="#02263c" fillOpacity="0.1" />
        ))}
        {BAR_STEPS.slice(0, -1).map((s) => (
          <g key={s.x}>
            <line x1={s.x} y1={s.y} x2={s.x} y2="132" stroke="#02263c" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="2 2" />
            <circle cx={s.x} cy={s.y} r="2.75" fill="#1d4ed8" fillOpacity="0.7" />
          </g>
        ))}
      </motion.g>
      <g key={`survivor-${active}`}>
        <motion.polyline
          points={BAR_STEPS.map((s) => `${s.x},${s.y}`).join(" ")} fill="none" stroke="#1d4ed8" strokeWidth="2.5"
          initial={skip ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
        />
        <motion.g initial={skip ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.2, delay: 0.55 }}>
          <line x1={lastStep.x} y1={lastStep.y} x2={lastStep.x} y2="132" stroke="#02263c" strokeOpacity="0.15" strokeWidth="0.75" strokeDasharray="2 2" />
          <circle cx={lastStep.x} cy={lastStep.y} r="4.5" fill="#38bdf8" />
          <circle cx={BAR_SURVIVOR.x} cy={BAR_SURVIVOR.y} r="4" fill="none" stroke="#38bdf8" strokeWidth="0.75" strokeOpacity="0.6" />
          <circle cx={BAR_SURVIVOR.x} cy={BAR_SURVIVOR.y} r="2.5" fill="#1d4ed8" />
        </motion.g>
      </g>
    </svg>
  );
}

// A plain labeled comparison, not a chart: a checklist of the market states
// this strategy was validated in, and the one state this trade was actually
// taken in, shown separately with an ✗ instead of a ✓. No axes, no data to
// read, no connector line (a line back to the list would re-imply "it moved
// from there," which is D2, not D1) — just two labeled facts that don't match.
const VALIDATED_STATES = ["Trending up", "Range-bound", "Low volume"];

function DiagnosisScan() {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-auto" role="img" aria-label="A list of the market states this strategy was validated in, with the state the trade was actually taken in shown separately as not on that list">
      <text x="10" y="14" fontSize="6.5" fontFamily="monospace" fill="#02263c" fillOpacity="0.45" fontWeight="bold">VALIDATED IN</text>

      {VALIDATED_STATES.map((label, i) => {
        const y = 26 + i * 20;
        return (
          <g key={label}>
            <rect x="10" y={y} width="150" height="15" rx="7.5" fill="none" stroke="#02263c" strokeOpacity="0.18" strokeWidth="1" />
            <polyline points={`17,${y + 8.5} 20,${y + 11.5} 26,${y + 4.5}`} fill="none" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="34" y={y + 10.5} fontSize="8.5" fontFamily="var(--font-display)" fill="#02263c" fillOpacity="0.65">{label}</text>
          </g>
        );
      })}

      <line x1="10" y1="94" x2="160" y2="94" stroke="#02263c" strokeOpacity="0.12" strokeWidth="1" />

      <text x="10" y="108" fontSize="6.5" fontFamily="monospace" fill="#1d4ed8" fillOpacity="0.7" fontWeight="bold">EXECUTED IN</text>

      <rect x="10" y="112" width="150" height="15" rx="7.5" fill="none" stroke="#dc2626" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="17" y1="116.5" x2="26" y2="123.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="116.5" x2="17" y2="123.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
      <text x="34" y="122.5" fontSize="8.5" fontFamily="var(--font-display)" fill="#02263c" fillOpacity="0.65">Momentum move</text>
      <text x="168" y="122.5" fontSize="9" fontFamily="monospace" fill="#1d4ed8" fontWeight="bold">D1</text>
    </svg>
  );
}

// Bold, thick-stroke chevron — matches the weight of Aktis's carousel
// arrows. A plain "‹ ›" text glyph reads too thin/quiet at this size.
function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  const points = direction === "left" ? "62,16 28,50 62,84" : "28,16 62,50 28,84";
  return (
    <svg viewBox="0 0 90 100" className="w-full h-full">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A row of marks fading from solid to invisible, left to right — the edge
// decaying with time, exactly as the body copy says. One mark, still clearly
// alive, gets caught by a bracket and carried on solid instead of fading with
// the rest. Opacity is the only variable (never height/size — the moment
// this becomes a bar chart it re-imports the chart-literacy problem that
// forced two other illustrations on this page to be rebuilt from scratch).
// First pass shipped with no text and didn't land — a fading row alone reads
// as a generic gradient, not "an edge decaying." Fixed the same way
// DiagnosisScan was fixed: real words carry the story, not just geometry.
const EDGE_ROW_COUNT = 20;
const EDGE_CAPTURE_INDEX = 8;

function EdgeCapture() {
  const squares = Array.from({ length: EDGE_ROW_COUNT }, (_, i) => {
    const x = 8 + i * 9.2;
    const base = 1 - (i / (EDGE_ROW_COUNT - 1)) * 0.93;
    const j = jitter(i * 5.7);
    const opacity = Math.max(0.04, Math.min(1, base + (j - 0.5) * 0.06));
    return { x, opacity };
  });
  const cap = squares[EDGE_CAPTURE_INDEX];

  return (
    <svg viewBox="0 0 200 110" className="w-full h-auto" role="img" aria-label="A row of marks fading from solid to invisible, left to right, labeled 'edge found' at the start and 'missed' at the end. One mark, still clearly visible, is labeled 'caught' and carried forward solid instead of fading with the rest">
      <text x="8" y="14" fontSize="6.5" fontFamily="monospace" fill="#02263c" fillOpacity="0.45" fontWeight="bold">EDGE FOUND</text>

      {squares.map((s, i) =>
        i === EDGE_CAPTURE_INDEX ? null : (
          <rect key={i} x={s.x} y="47" width="7" height="7" fill="#02263c" fillOpacity={s.opacity} />
        )
      )}

      <g stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d={`M ${cap.x - 4} 34 h ${7 + 8} M ${cap.x - 4} 34 v 5 M ${cap.x + 11} 34 v 5`} />
        <path d={`M ${cap.x - 4} 64 h ${7 + 8} M ${cap.x - 4} 64 v -5 M ${cap.x + 11} 64 v -5`} />
      </g>
      <rect x={cap.x} y="47" width="7" height="7" fill="#16a34a" />

      <line x1={cap.x + 7} y1="50" x2={cap.x + 34} y2="40" stroke="#16a34a" strokeWidth="1.5" />
      <circle cx={cap.x + 34} cy="40" r="3" fill="#16a34a" />
      <text x={cap.x + 40} y="42.5" fontSize="7" fontFamily="monospace" fill="#16a34a" fontWeight="bold">CAUGHT</text>

      <text x="130" y="80" fontSize="6.5" fontFamily="monospace" fill="#02263c" fillOpacity="0.3" fontWeight="bold">MISSED</text>
    </svg>
  );
}

const SLIDES = [
  {
    key: "record",
    label: "The hypothesis on record",
    body: "Every mechanism is written into the Mining Ledger, a timestamped, traceable record, before it's ever tested, locked in place before the outcome is known.",
    art: LedgerRecord,
  },
  {
    key: "control",
    label: "The day it didn't happen",
    body: "The effect is measured against the same market in the same hours on the days its condition never appeared, so what counts is the gain over an ordinary day, not the gain over zero.",
    art: ControlGap,
  },
  {
    key: "bar",
    label: "The bar the failures raise",
    body: "What survives goes forward as a candidate and becomes the standard the next hypothesis has to clear, while everything that dies is logged and accounted for, shrinking the ground left to search.",
    art: RisingBar,
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
      <section className="section-hero min-h-[376px] md:min-h-[400px] lg:min-h-[425px] pt-[110px] md:pt-[135px] pb-[70px]">
        <div
          className="section-hero__img"
          style={{ backgroundImage: `url('/images/quant_hero_bg.png')`, transform: "scaleX(-1)" }}
        />

        {/* Signature moment, mirrored from the homepage — text sits left here, so the equity
            traces + glow orbs sit right instead of left (background photo is flipped to match) */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <GenerativeArtScene />
        </div>

        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full w-[140px] h-[140px] md:w-[280px] md:h-[280px]"
            style={{
              left: "16%",
              top: "8%",
              background:
                "radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(56,189,248,0) 70%)",
              filter: "blur(30px)",
            }}
          />
          <div
            className="absolute rounded-full w-[95px] h-[95px] md:w-[190px] md:h-[190px]"
            style={{
              left: "10%",
              top: "38%",
              background:
                "radial-gradient(circle, rgba(29,78,216,0.2) 0%, rgba(29,78,216,0) 70%)",
              filter: "blur(18px)",
            }}
          />
          <div
            className="absolute rounded-full w-[65px] h-[65px] md:w-[130px] md:h-[130px]"
            style={{
              left: "15%",
              top: "55%",
              background:
                "radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0) 70%)",
              filter: "blur(9px)",
            }}
          />
        </div>

        <div className="section-hero__overlay" />
        <div className="container max-w-5xl mx-auto px-6 relative z-10 -mt-[20px] md:-mt-[32px]">
          <motion.h1
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-hero__title-line max-w-2xl"
          >
            We test every trading idea
            <br />
            Most don&apos;t survive
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white max-w-xl mt-4"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
          >
            PlusEV&apos;s proprietary research process is helping to transform systematic trading by putting each one through checks and balances at every step, so&nbsp;only what survives reaches live execution.
          </motion.p>
        </div>
      </section>

      {/* ─── OPPORTUNITY FOR IMPACT — two text columns, pull-quote + copy ──── */}
      <section className="pt-[15px] pb-[30px] md:pb-[60px]">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="section-image-with-text__title !text-[clamp(1.6rem,3vw,2.2rem)] mb-6">
            Opportunity for impact
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display text-[#1d4ed8]"
              style={{ fontSize: "clamp(1.3rem, 2.4vw, 1.8rem)", lineHeight: 1.4 }}
            >
              Our platform makes AI-native, institutional-grade validation accessible, and replaces discretionary conviction with systematic, evidence-based decisions.
            </motion.p>
            <div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 120 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-[3px] bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]/10 rounded-[2px] mb-4"
              />
              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-[#02263c]"
                style={{ fontSize: "1rem", lineHeight: 1.7 }}
              >
                We let proof do the gatekeeping: nothing reaches live execution until it&apos;s been proven against data it was never seen on.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CAROUSEL — three differentiators, one illustrated slide each ──── */}
      <section className="pb-[60px] border-t border-black/5 pt-[70px] overflow-hidden">
        <div className="container max-w-5xl mx-auto px-6">
          <h2 className="section-image-with-text__title !text-[clamp(1.5rem,2.8vw,2.1rem)] mb-10">
            Every hypothesis teaches the next one
          </h2>

          <div className="relative">
            {/* All three panels stay visible together — only the active one holds
                color, the other two mute to a lighter mono-ink treatment — so the
                loop reads as one system, not three unrelated widgets. The active
                panel is drawn much larger: at thumbnail size the density these
                panels now carry (dozens of ledger rows, control paths, scatter
                points) just reads as noise. Mobile drops to one panel at a time —
                a row of three is illegible under ~400px. */}
            <div className="relative flex justify-center items-center gap-5 sm:gap-8 md:gap-10 min-h-[160px] sm:min-h-[200px] md:min-h-[270px]">
              {SLIDES.map((s, i) => (
                <div
                  key={s.key}
                  className={`transition-all duration-[400ms] ease-out ${
                    i === slide
                      ? "w-[220px] sm:w-[280px] md:w-[380px]"
                      : "hidden sm:block sm:w-[70px] md:w-[90px]"
                  }`}
                  style={{
                    filter: i === slide ? "none" : "grayscale(1)",
                    opacity: i === slide ? 1 : 0.6,
                  }}
                >
                  <s.art active={i === slide} prefersReducedMotion={prefersReducedMotion} />
                </div>
              ))}
            </div>

            {/* Arrows sit beside the caption block, not the image row — matching
                Aktis's own layout — as bold chevrons, not thin text glyphs.
                Fixed min-height keeps them and the dots from jumping as the
                three descriptions vary in length. */}
            <div className="relative max-w-lg mx-auto mt-10 min-h-[110px] sm:min-h-[90px]">
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="absolute -left-4 sm:-left-14 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 text-[#1d4ed8] hover:text-[#38bdf8] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-full"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                onClick={goNext}
                aria-label="Next slide"
                className="absolute -right-4 sm:-right-14 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 text-[#1d4ed8] hover:text-[#38bdf8] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] rounded-full"
              >
                <ChevronIcon direction="right" />
              </button>

              <div className="text-center">
                <p className="text-[#1d4ed8] font-display font-medium text-[1.15rem] mb-3">
                  {SLIDES[slide].label}
                </p>
                <p className="text-[#02263c] text-[0.95rem] leading-[1.7]">
                  {SLIDES[slide].body}
                </p>
              </div>
            </div>
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
                The power to name what failed
              </h2>
              <div className="h-[3px] w-[120px] bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]/10 rounded-[2px] mb-6" />
              <p className="text-[#02263c] text-[0.95rem] leading-[1.7]">
                Trade autopsy checks every closed trade against 14 known failure modes, so a loss comes back with a cause attached rather than a number. No trade closes without an explanation. This example was flagged for market state mismatch: the edge was validated in one market state and executed in another. Some failure modes are more than a note in the log: trigger one, and the strategy is blocked from going live until it&apos;s fixed.
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

          {/* Compact supporting reference — the full 14-item taxonomy, de-emphasized,
              except D1, which stays in the accent color to tie back to the
              illustration above showing exactly that failure mode. Caption
              above the chip row cites the CRITICAL_DISEASES gate count
              (5 of 14) so the "blocked from going live" claim in the body
              copy has a concrete number attached to it. */}
          <div className="mt-12 pt-8 border-t border-black/5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#02263c]/40 mb-3">
              5 of 14 are gate-critical.
            </p>
            <div className="grid grid-cols-2 justify-items-start gap-1.5 md:flex md:flex-wrap md:gap-2">
              {DISEASES.map((d) => (
                <span
                  key={d.code}
                  title={d.name}
                  className={
                    d.code === "D1"
                      ? "font-mono text-[9px] md:text-[10px] uppercase tracking-normal md:tracking-wider text-[#1d4ed8] border border-[#1d4ed8]/40 rounded-full px-2 py-0.5 md:px-3 md:py-1"
                      : "font-mono text-[9px] md:text-[10px] uppercase tracking-normal md:tracking-wider text-[#02263c]/50 border border-black/10 rounded-full px-2 py-0.5 md:px-3 md:py-1"
                  }
                >
                  {d.code} · {d.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SAFER PARTICIPATION — edge-capture-diagram-left / text-right
          (mirrors Aktis's "Scaling for the future": image-left / text-right) */}
      <section className="pb-[60px] border-t border-black/5 pt-[70px]">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-sm mx-auto order-2 lg:order-1"
            >
              <EdgeCapture />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="order-1 lg:order-2"
            >
              <h2 className="section-image-with-text__title !text-[clamp(1.6rem,3vw,2.2rem)]">
                Built for safer market participation
              </h2>
              <div className="h-[3px] w-[120px] bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]/10 rounded-[2px] mb-6" />
              <p className="text-[#02263c] text-[0.95rem] leading-[1.7]">
                A validated edge decays. The probability that made it real in research may not hold by the time the trade reaches the market. PlusEV is infrastructure across the whole research-to-execution pipeline, built so nothing reaches the market unchecked. SEBI&apos;s algo framework runs on that same rule: investors get access only &quot;with requisite safeguards,&quot; never without them.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA — same section-cta treatment as the homepage (gradient
          background, padding, watermark, .btn arrow-on-hover link), just
          page-specific text — not a one-off reimplementation ───────────── */}
      <section id="contact" className="section-cta">
        <div className="aktis-watermark w-[350px] h-[350px] md:w-[500px] md:h-[500px] right-[50px] md:right-[150px] top-[10px]">
          <CtaWatermark />
        </div>

        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative z-10"
            >
              <h2 className="section-cta__title">
                <a
                  href="mailto:plusev.blr@gmail.com"
                  className="btn"
                  style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.55rem)" }}
                >
                  Get in touch
                </a>
              </h2>

              <h3 className="section-cta__subtitle mt-2">
                Reach out to see what survives our testing, and why the rest doesn&apos;t.
              </h3>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
