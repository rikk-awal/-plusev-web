/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { GenerativeArtScene } from "./components/GenerativeArtScene";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

// ─── CTA WATERMARK SVG (QUANT GRID CONTOUR THEME) ───────────────────────────
function CtaWatermark() {
  return (
    <svg
      className="w-full h-full text-[#1d4ed8]/10"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 80 C 40 100, 60 70, 100 120 C 140 170, 160 110, 190 130"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M10 110 C 50 140, 80 90, 110 150 C 140 210, 170 130, 190 160"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M10 50 C 30 70, 50 40, 80 90 C 110 140, 140 80, 190 100"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <line
        x1="100"
        y1="0"
        x2="100"
        y2="200"
        stroke="currentColor"
        strokeWidth="0.25"
        strokeDasharray="4 4"
      />
      <line
        x1="0"
        y1="100"
        x2="200"
        y2="100"
        stroke="currentColor"
        strokeWidth="0.25"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

// ─── FUNNEL (the real 9-stage research pipeline, shown as attrition — most ideas die) ────
const FUNNEL_STAGES = [
  { label: "Hypothesis generation", count: 1240 },
  { label: "4-factor scoring", count: 412 },
  { label: "Grading", count: 96 },
  { label: "Trade autopsy", count: 41 },
  { label: "Signal isolation", count: 23 },
  { label: "Edge extraction", count: 11 },
  { label: "Walk-forward validation", count: 6 },
  { label: "Paper trading", count: 3 },
  { label: "Production deployment", count: 1 },
];

// Purely presentational — all timing/state lives in the parent, driven by one shared sweep.
function FunnelStage({
  index,
  width,
  y,
  height,
  revealed,
  displayCount,
  isLast,
}: {
  index: number;
  width: number;
  y: number;
  height: number;
  revealed: boolean;
  displayCount: number;
  isLast: boolean;
}) {
  const barX = 120 - width / 2;
  return (
    <g>
      <rect
        x={barX}
        y={y}
        width={revealed ? width : 0}
        height={height}
        fill="#1d4ed8"
        fillOpacity={isLast ? 0.9 : 0.18}
        stroke="#1d4ed8"
        strokeWidth={isLast ? 1.5 : 1}
        style={{ transition: "width 0.35s ease-out" }}
      >
        <title>{FUNNEL_STAGES[index].label}</title>
      </rect>
      <text
        x={120 + width / 2 + 8}
        y={y + height / 2 + 3}
        fontSize="8"
        fontFamily="monospace"
        fill="#02263c"
        fillOpacity={0.75}
      >
        {displayCount.toLocaleString()}
      </text>
      {isLast && (
        <g stroke="#38bdf8">
          <circle
            cx={120}
            cy={y + height / 2}
            r={10}
            strokeWidth={1}
            opacity={0.3}
          />
          <circle
            cx={120}
            cy={y + height / 2}
            r={17}
            strokeWidth={1}
            opacity={0.15}
          />
        </g>
      )}
    </g>
  );
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [funnelRevealed, setFunnelRevealed] = useState<boolean[]>(
    Array(9).fill(false),
  );
  const [funnelCounts, setFunnelCounts] = useState<number[]>(
    FUNNEL_STAGES.map((s) => s.count),
  );
  const funnelTimeouts = useRef<number[]>([]);
  const hasFunnelRevealed = useRef(false);

  // Counts down toward the real survivor count for one stage — early ticks are a
  // plausible-looking higher number, later ticks converge and decelerate into the answer.
  const runFunnelStageCountdown = (
    index: number,
    finalValue: number,
    startDelaySeconds: number,
  ) => {
    const totalTicks = 6;
    const runTick = (tick: number) => {
      if (tick === 0) {
        setFunnelRevealed((prev) =>
          prev.map((v, i) => (i === index ? true : v)),
        );
      }
      if (tick > totalTicks) {
        setFunnelCounts((prev) =>
          prev.map((v, i) => (i === index ? finalValue : v)),
        );
        return;
      }
      const progress = tick / totalTicks;
      const noise = Math.max(
        1,
        Math.round(finalValue * (0.4 + Math.random() * 2.2)),
      );
      setFunnelCounts((prev) =>
        prev.map((v, i) =>
          i === index
            ? Math.round(noise * (1 - progress) + finalValue * progress)
            : v,
        ),
      );
      const nextDelay = 40 + progress * 140;
      funnelTimeouts.current.push(
        window.setTimeout(() => runTick(tick + 1), nextDelay),
      );
    };
    funnelTimeouts.current.push(
      window.setTimeout(() => runTick(0), startDelaySeconds * 1000),
    );
  };

  // Walks the funnel top to bottom — first triggered on scroll into view, replayable on hover.
  const runFunnelSweep = () => {
    funnelTimeouts.current.forEach((id) => window.clearTimeout(id));
    funnelTimeouts.current = [];

    if (prefersReducedMotion) {
      setFunnelRevealed(Array(9).fill(true));
      setFunnelCounts(FUNNEL_STAGES.map((s) => s.count));
      return;
    }

    setFunnelRevealed(Array(9).fill(false));
    const stepDelay = 0.18;
    FUNNEL_STAGES.forEach((stage, i) =>
      runFunnelStageCountdown(i, stage.count, i * stepDelay),
    );
  };

  const handleFunnelFirstReveal = () => {
    if (hasFunnelRevealed.current) return;
    hasFunnelRevealed.current = true;
    runFunnelSweep();
  };

  const handleFunnelHover = () => {
    if (!hasFunnelRevealed.current) return;
    runFunnelSweep();
  };

  const funnelBarWidths = FUNNEL_STAGES.map((_, i) => 160 - i * 17.5);

  return (
    <div className="relative min-h-screen bg-white text-[#02263c] overflow-x-hidden selection:bg-[#38bdf8]/20">
      <SiteHeader />

      {/* ─── HERO SECTION ─────────────────────────────────────────────────────── */}
      {/* Aktis structure: hero carries ONLY the headline over a full-bleed photo. */}
      <section className="section-hero min-h-[376px] md:min-h-[400px] lg:min-h-[425px] pt-[110px] md:pt-[135px] pb-[70px]">
        <div
          className="section-hero__img"
          style={{ backgroundImage: `url('/images/quant_hero_bg.png')` }}
        />

        {/* Signature moment — Gaussian probability dome + self-drawing equity traces, mirrored to the left (text sits right) */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <GenerativeArtScene />
        </div>

        {/* Ambient glow orbs — static soft blue bokeh cluster for depth; no motion (restraint: one signature moment, not several) */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full w-[140px] h-[140px] md:w-[280px] md:h-[280px]"
            style={{
              right: "16%",
              top: "8%",
              background:
                "radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(56,189,248,0) 70%)",
              filter: "blur(30px)",
            }}
          />
          <div
            className="absolute rounded-full w-[95px] h-[95px] md:w-[190px] md:h-[190px]"
            style={{
              right: "10%",
              top: "38%",
              background:
                "radial-gradient(circle, rgba(29,78,216,0.2) 0%, rgba(29,78,216,0) 70%)",
              filter: "blur(18px)",
            }}
          />
          <div
            className="absolute rounded-full w-[65px] h-[65px] md:w-[130px] md:h-[130px]"
            style={{
              right: "15%",
              top: "55%",
              background:
                "radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0) 70%)",
              filter: "blur(9px)",
            }}
          />
        </div>

        <div className="section-hero__overlay" />

        <div className="w-full px-6 md:px-10 relative z-10 -mt-[10px] md:-mt-[41px]">
          <div className="max-w-7xl ml-auto flex justify-start md:justify-end">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                prefersReducedMotion ? { duration: 0 } : { duration: 0.7 }
              }
              className="section-hero__title-line text-left md:text-right"
            >
              Developing positive-expectancy trading&nbsp;infrastructure.
              <br />
              <span
                style={{
                  fontSize: "clamp(0.81rem, 1.57vw, 1.34rem)",
                  letterSpacing: "normal",
                  whiteSpace: "normal",
                }}
              >
                We are engineers, traders & researchers in financial markets.
              </span>
            </motion.p>
          </div>
        </div>

        {/* Pulsing scroll indicator line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#38bdf8]/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─── SECTION 1: ONE SYSTEM. FOUR INSTRUMENTS ──────────────────────────── */}
      <section id="platform" className="section-image-with-text">
        <div className="container max-w-5xl mx-auto px-6 -mt-[57px]">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-image-with-text__title mb-10"
          >
            Quantitative trading infrastructure.
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-start">
            {/* Left Column: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h3 className="section-image-with-text__subtitle">
                Building systematic trading strategies through hypothesis
                generation, backtesting, trade autopsy, edge extraction, signal
                isolation, forward testing & production deployment.
              </h3>

              {/* Visual: contour backdrop + dotted frame + floating node, stacked under the title/subtitle like Aktis's left column. Desktop only — mobile gets its own copy positioned after the Platform/Contact row, matching Aktis's mobile flow. */}
              <div className="section-image-with-text__image mt-10 !hidden lg:!flex">
                <div className="highlight-frame w-[157px] h-[157px] sm:w-[242px] sm:h-[242px]" />

                {/* The real 9-stage research funnel — most hypotheses die, one survives to production */}
                <svg
                  className="relative z-10 w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Wireframe illustration of a funnel showing hypotheses narrowing at each research stage down to one production strategy"
                >
                  <motion.g
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    onViewportEnter={handleFunnelFirstReveal}
                    onMouseEnter={handleFunnelHover}
                    transition={{ duration: 0.5 }}
                  >
                    {FUNNEL_STAGES.map((stage, i) => (
                      <FunnelStage
                        key={`stage-${i}`}
                        index={i}
                        width={funnelBarWidths[i]}
                        y={20 + i * 22}
                        height={14}
                        revealed={funnelRevealed[i]}
                        displayCount={funnelCounts[i]}
                        isLast={i === FUNNEL_STAGES.length - 1}
                      />
                    ))}
                  </motion.g>
                </svg>
              </div>
            </motion.div>

            {/* Right Column: gradient-line + description + CTAs, matching Aktis's right column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 lg:mt-[47px]"
            >
              {/* Copper gradient top line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 120 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="h-[3px] bg-gradient-to-r from-[#38bdf8] to-[#1d4ed8]/10 mt-[8px] lg:mt-[122px] mb-[40px] rounded-[2px]"
              />

              <div className="section-image-with-text__description">
                <p>
                  PlusEV is committed to making institutional-grade quantitative
                  trading technology accessible and affordable through AI-native
                  trading infrastructure built specifically for Indian markets,
                  with global markets on the roadmap.
                </p>
                <p>
                  We have built a proprietary platform that integrates
                  BacktestIQ, SignalAI, TradeAnalyzer, and StrategyLive to
                  continuously compute probability density and expectancy to
                  capture micro-structure anomalies, ensuring automated
                  execution with real-time risk filters and fail-safes.
                </p>
              </div>

              <div className="flex flex-row items-center gap-[28px]">
                <a href="/platform" className="btn">
                  Platform
                </a>
                <a href="/#contact" className="btn">
                  Contact
                </a>
              </div>

              {/* Mobile-only funnel graphic — matches Aktis's mobile flow: graphic sits between the Platform/Contact row and the next section, not up near the subtitle like on desktop. */}
              <div className="section-image-with-text__image mt-10 lg:!hidden">
                <div className="highlight-frame w-[157px] h-[157px] sm:w-[242px] sm:h-[242px]" />
                <svg
                  className="relative z-10 w-[200px] h-[200px] md:w-[250px] md:h-[250px]"
                  viewBox="0 0 240 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Wireframe illustration of a funnel showing hypotheses narrowing at each research stage down to one production strategy"
                >
                  <motion.g
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    onViewportEnter={handleFunnelFirstReveal}
                    onMouseEnter={handleFunnelHover}
                    transition={{ duration: 0.5 }}
                  >
                    {FUNNEL_STAGES.map((stage, i) => (
                      <FunnelStage
                        key={`stage-mobile-${i}`}
                        index={i}
                        width={funnelBarWidths[i]}
                        y={20 + i * 22}
                        height={14}
                        revealed={funnelRevealed[i]}
                        displayCount={funnelCounts[i]}
                        isLast={i === FUNNEL_STAGES.length - 1}
                      />
                    ))}
                  </motion.g>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION VERTICAL SPACE ────────────────────────────────────────── */}
      <div className="section-vertical-space">
        <div className="hidden xl:block h-[20px] bg-white" />
        <div className="hidden md:block xl:hidden h-[15px] bg-white" />
        <div className="md:hidden h-[10px] bg-white" />
      </div>

      {/* ─── SECTION 2: JOIN US / CTA ────────────────────────────────────────── */}
      <section id="technology" className="section-cta">
        {/* Particle Watermark Background */}
        <div className="aktis-watermark w-[350px] h-[350px] md:w-[500px] md:h-[500px] right-[50px] md:right-[150px] top-[10px]">
          <CtaWatermark />
        </div>

        <div className="container max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: CTA Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="section-cta__title">
                <a
                  href="mailto:plusev.blr@gmail.com"
                  className="btn"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
                >
                  Let's talk.
                </a>
              </h2>

              <h3 className="section-cta__subtitle mt-2">
                We are a small team of engineers, traders & researchers figuring
                this out from first principles. If that sounds interesting, we'd
                love to hear from you.
              </h3>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
