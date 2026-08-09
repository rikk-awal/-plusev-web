/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { GenerativeArtScene } from "./components/GenerativeArtScene";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { CtaWatermark } from "./components/CtaWatermark";

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
  // Three visual states: skeleton (faint full-width outline + placeholder digits,
  // the visible "before" the sweep resolves FROM), mid-countdown, and settled —
  // the latter two share the solid style; only displayCount differs between them.
  return (
    <g>
      <rect
        x={barX}
        y={y}
        width={width}
        height={height}
        fill="#1d4ed8"
        fillOpacity={revealed ? (isLast ? 0.9 : 0.18) : 0.04}
        stroke="#1d4ed8"
        strokeOpacity={revealed ? 1 : 0.25}
        strokeWidth={isLast ? 1.5 : 1}
        style={{
          transition:
            "fill-opacity 0.35s ease-out, stroke-opacity 0.35s ease-out",
        }}
      >
        <title>{FUNNEL_STAGES[index].label}</title>
      </rect>
      <text
        x={120 + width / 2 + 8}
        y={y + height / 2 + 3}
        fontSize="8"
        fontFamily="monospace"
        fill="#02263c"
        fillOpacity={revealed ? 0.75 : 0.3}
        style={{ transition: "fill-opacity 0.35s ease-out" }}
      >
        {revealed ? displayCount.toLocaleString() : "———"}
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

  // Counts down toward the real survivor count for one stage — early ticks are a
  // plausible-looking higher number, later ticks converge and decelerate into the answer.
  const runFunnelStageCountdown = (
    index: number,
    finalValue: number,
    startDelaySeconds: number,
    totalTicks: number,
  ) => {
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

  // Walks the funnel top to bottom — triggered every time it scrolls into view, replayable on hover.
  // Scroll path: skeleton is already visible (unrevealed stages render as faint full-width
  // outlines), so hold ~400ms on it before sweeping, then sweep slower (~3-3.5s total) since
  // the viewer's attention is still arriving. Hover path: viewer is already engaged — no
  // pre-hold, original fast timing, unchanged from before.
  const runFunnelSweep = (trigger: "scroll" | "hover") => {
    funnelTimeouts.current.forEach((id) => window.clearTimeout(id));
    funnelTimeouts.current = [];

    if (prefersReducedMotion) {
      setFunnelRevealed(Array(9).fill(true));
      setFunnelCounts(FUNNEL_STAGES.map((s) => s.count));
      return;
    }

    setFunnelRevealed(Array(9).fill(false));
    const isScroll = trigger === "scroll";
    const preHoldSeconds = isScroll ? 0.4 : 0;
    const stepDelay = isScroll ? 0.25 : 0.18;
    const totalTicks = isScroll ? 8 : 6;
    FUNNEL_STAGES.forEach((stage, i) =>
      runFunnelStageCountdown(
        i,
        stage.count,
        preHoldSeconds + i * stepDelay,
        totalTicks,
      ),
    );
  };

  // Fires on every viewport entry (viewport.once is false on the funnel wrappers), so
  // scrolling away and back replays the full scroll-style reveal each time.
  const handleFunnelViewportEnter = () => {
    runFunnelSweep("scroll");
  };

  // No "has the reveal happened yet" guard needed: hover is only physically possible on a
  // visible element, and viewport-enter (no longer once-gated) has already fired by then.
  const handleFunnelHover = () => {
    runFunnelSweep("hover");
  };

  const funnelBarWidths = FUNNEL_STAGES.map((_, i) => 160 - i * 17.5);

  // Framer's whileInView/onViewportEnter only reliably fires re-entry through the same
  // edge the element first entered from (e.g. scroll down past it, then scroll back up —
  // re-entering through the top edge — doesn't retrigger). A plain IntersectionObserver
  // fires on every false→true transition regardless of which edge, so it replays correctly
  // no matter how the viewer scrolls back to it.
  const funnelRefDesktop = useRef<SVGGElement | null>(null);
  const funnelRefMobile = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const targets = [funnelRefDesktop.current, funnelRefMobile.current].filter(
      (el): el is SVGGElement => el !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleFunnelViewportEnter();
          }
        });
      },
      { threshold: 0 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              Developing positive&#8209;expectancy trading&nbsp;infrastructure
              <br />
              <span
                style={{
                  fontSize: "clamp(0.81rem, 1.57vw, 1.34rem)",
                  letterSpacing: "normal",
                  whiteSpace: "normal",
                }}
              >
                We are engineers, traders & AI researchers in financial&nbsp;markets.
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
        <div className="container max-w-5xl mx-auto px-6 -mt-[10px] md:-mt-[57px]">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="section-image-with-text__title mb-10"
          >
            Quantitative trading infrastructure
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
                Building systematic trading strategies through data mining,
                hypothesis generation, backtesting, trade autopsy, edge
                extraction, signal isolation & production deployment.
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
                    ref={funnelRefDesktop}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
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
                  PlusEV engineers AI-native trading infrastructure for Indian
                  markets, with global markets on the roadmap.{" "}
                  <strong className="font-semibold">Our mission</strong> is to
                  make institutional-grade quantitative trading technology
                  accessible and affordable.
                </p>
                <p>
                  We have built a proprietary platform that computes
                  probability density and expectancy to capture market
                  micro-structure imbalances.
                </p>
              </div>

              <div className="flex flex-row items-center gap-[28px]">
                <a href="/platform" className="btn">
                  Platform
                </a>
                <a href="/contact" className="btn">
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
                    ref={funnelRefMobile}
                    initial={prefersReducedMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
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
                  style={{ fontSize: "clamp(1.8rem, 3.4vw, 2.55rem)" }}
                >
                  Let's talk
                </a>
              </h2>

              <h3 className="section-cta__subtitle mt-2">
                We are a small team that tests every idea before trusting
                it. If that sounds interesting, we would love to hear from
                you.
              </h3>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
