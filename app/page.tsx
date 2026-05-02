"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight, BarChart3, Brain, Shield, Zap,
  Database, Globe, RefreshCw, Activity, TrendingUp,
  ChevronRight, Check, Menu, X as XIcon,
} from "lucide-react";
import Image from "next/image";

// ─── EQUITY CURVE ────────────────────────────────────────────────────────────

const STRATEGY_PATH =
  "M0,155 C6,153 10,150 16,147 C24,143 30,146 38,140 C46,134 52,138 60,131 C68,124 74,128 82,121 C90,114 96,117 104,109 C112,101 118,105 126,97 C134,89 140,94 148,86 C156,78 162,83 170,74 C178,65 184,70 192,62 C200,54 206,59 214,51 C222,43 228,48 236,40 C244,32 250,37 258,29 C266,21 272,26 280,19 C288,12 294,15 302,10 C310,5 318,4 326,3 C334,2 342,2 350,1";

const BENCHMARK_PATH =
  "M0,155 C12,153 22,151 34,149 C48,147 58,149 72,146 C86,143 96,146 110,142 C124,138 134,141 148,138 C162,135 172,138 186,135 C200,132 210,135 224,132 C238,129 248,132 262,129 C276,126 286,130 300,127 C314,124 324,127 338,124 C344,123 350,121 350,120";

function EquityCurve() {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg viewBox="0 0 350 165" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
        <clipPath id="areaClip">
          <path d={`${STRATEGY_PATH} L350,165 L0,165 Z`} />
        </clipPath>
      </defs>

      {/* Horizontal grid */}
      {[40, 80, 120].map((y) => (
        <line key={y} x1="0" y1={y} x2="350" y2={y}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}

      {/* Area fill */}
      <rect x="0" y="0" width="350" height="165"
        fill="url(#fillGrad)" clipPath="url(#areaClip)" />

      {/* Benchmark dashed */}
      <path d={BENCHMARK_PATH} fill="none"
        stroke="rgba(148,163,184,0.2)" strokeWidth="1.5"
        strokeDasharray="5 4" />

      {/* Strategy line */}
      <path d={STRATEGY_PATH} fill="none"
        stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"
        strokeDasharray="1400" strokeDashoffset={drawn ? 0 : 1400}
        style={{ transition: "stroke-dashoffset 2.2s cubic-bezier(0.4,0,0.2,1)" }} />

      {/* End dot */}
      <circle cx="350" cy="1" r="3.5" fill="#3b82f6"
        opacity={drawn ? 1 : 0}
        style={{ transition: "opacity 0.4s 2s" }} />
    </svg>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const productTabs = [
  {
    id: "backtestiq",
    name: "BacktestIQ",
    headline: "Test before you risk.",
    description:
      "Simulate any strategy against 20+ years of NSE/BSE data across 5 distinct market regimes. Get the exact equity curve, drawdown profile, and risk metrics before deploying a single rupee.",
    metrics: [
      { label: "Data depth", value: "20+ years" },
      { label: "Market regimes", value: "5 periods" },
      { label: "Instruments", value: "NSE + BSE" },
    ],
    icon: BarChart3,
    color: "#3b82f6",
  },
  {
    id: "signaiai",
    name: "SignalAI",
    headline: "Signals, not emotions.",
    description:
      "Real-time analysis of multiple market data streams generating clear, systematic buy/sell signals. Replace gut decisions under pressure with number-backed, reproducible action.",
    metrics: [
      { label: "Data streams", value: "Multi-feed" },
      { label: "Signal latency", value: "< 50ms" },
      { label: "Output", value: "Buy / Sell / Hold" },
    ],
    icon: Brain,
    color: "#a78bfa",
  },
  {
    id: "tradeanalyzer",
    name: "TradeAnalyzer",
    headline: "Know your risk before it knows you.",
    description:
      "Deep performance analysis of past trades with forward-looking position sizing guidance. Identify your edge, eliminate your weaknesses, and define hard risk limits.",
    metrics: [
      { label: "Risk metrics", value: "40+ signals" },
      { label: "Position sizing", value: "Kelly-based" },
      { label: "Drawdown alerts", value: "Real-time" },
    ],
    icon: Shield,
    color: "#f59e0b",
  },
  {
    id: "strategylive",
    name: "StrategyLive",
    headline: "Set it. It runs.",
    description:
      "Fully automated execution of your proven strategies with real-time monitoring, failsafes, and broker-agnostic connectivity. Zero manual intervention.",
    metrics: [
      { label: "Execution", value: "Automated" },
      { label: "Brokers", value: "All major" },
      { label: "Uptime", value: "99.9%" },
    ],
    icon: Zap,
    color: "#22c55e",
  },
];

const techPillars = [
  { icon: Database, title: "Indian Market DNA", description: "AI systems trained on 20+ years of NSE/BSE data across 5 distinct market regimes.", stat: "20+ yrs" },
  { icon: Activity, title: "High-Performance Engineering", description: "Advanced cloud architecture delivering the execution speed advantage that matters.", stat: "< 10ms" },
  { icon: Shield, title: "Built for Reliability", description: "Automated failover and redundant systems. Online when it matters most.", stat: "99.9%" },
  { icon: Globe, title: "Broker-Agnostic", description: "API-first architecture connecting to all major Indian brokers. No lock-in.", stat: "All brokers" },
  { icon: RefreshCw, title: "Adaptive Algorithms", description: "ML models continuously refining signals as market microstructure evolves.", stat: "Real-time" },
  { icon: TrendingUp, title: "Complete Workflow", description: "Unified platform from strategy development to live execution. One stack.", stat: "End-to-end" },
];

const navLinks = ["Products", "Technology", "Contact"];

// ─── SIGNAL FEED DATA ────────────────────────────────────────────────────────

const SIGNAL_ROWS = [
  { time: "09:14:27", symbol: "NIFTY 23850 CE", price: "127.50", change: "+31.2%", oi: "2.3M", type: "BUY", color: "#22c55e" },
  { time: "09:14:31", symbol: "BANKNIFTY 49200 CE", price: "234.75", change: "+18.4%", oi: "890K", type: "BUY", color: "#22c55e" },
  { time: "09:14:35", symbol: "NIFTY SPOT", price: "23,847.50", change: "+0.3%", oi: "—", type: "HOLD", color: "#f59e0b" },
  { time: "09:14:42", symbol: "NIFTY 23800 PE", price: "45.25", change: "-38.2%", oi: "-120K", type: "UNWIND", color: "#f59e0b" },
  { time: "09:14:48", symbol: "INDIA VIX", price: "13.42", change: "-1.8%", oi: "—", type: "CALM", color: "#22c55e" },
  { time: "09:14:55", symbol: "NIFTY FUT NOV", price: "23,851.60", change: "+0.28%", oi: "+4.1 basis", type: "PREMIUM", color: "#94a3b8" },
  { time: "09:15:03", symbol: "NIFTY 24000 CE", price: "18.50", change: "+42.3%", oi: "5.1M", type: "BUY", color: "#22c55e" },
  { time: "09:15:11", symbol: "RELIANCE NOV FUT", price: "2,891.40", change: "-0.4%", oi: "-89K", type: "SHORT", color: "#ef4444" },
  { time: "09:15:18", symbol: "NIFTY 23700 PE", price: "28.75", change: "-22.1%", oi: "-340K", type: "UNWIND", color: "#f59e0b" },
  { time: "09:15:24", symbol: "BANKNIFTY 48800 PE", price: "312.00", change: "+12.8%", oi: "1.1M", type: "SHORT", color: "#ef4444" },
  { time: "09:15:32", symbol: "NIFTY 23900 CE", price: "72.25", change: "+56.3%", oi: "3.8M", type: "BUY", color: "#22c55e" },
  { time: "09:15:39", symbol: "HDFC BANK NOV FUT", price: "1,764.80", change: "+0.6%", oi: "+12K", type: "BUY", color: "#22c55e" },
  { time: "09:15:46", symbol: "NIFTY 23950 CE", price: "41.50", change: "+89.0%", oi: "4.2M", type: "MOMENTUM", color: "#a78bfa" },
  { time: "09:15:54", symbol: "INDIA VIX", price: "13.18", change: "-3.5%", oi: "—", type: "FALLING", color: "#22c55e" },
  { time: "09:16:02", symbol: "BANKNIFTY SPOT", price: "48,923.15", change: "+0.2%", oi: "—", type: "HOLD", color: "#f59e0b" },
  { time: "09:16:09", symbol: "NIFTY 24000 CE", price: "22.25", change: "+65.2%", oi: "5.4M", type: "MOMENTUM", color: "#a78bfa" },
  { time: "09:16:17", symbol: "NIFTY FUT NOV", price: "23,856.90", change: "+0.30%", oi: "+5.1 basis", type: "PREMIUM", color: "#94a3b8" },
  { time: "09:16:25", symbol: "NIFTY 23850 CE", price: "142.00", change: "+46.9%", oi: "2.5M", type: "BUY", color: "#22c55e" },
  { time: "09:16:33", symbol: "PCR RATIO", price: "0.82", change: "-0.04", oi: "—", type: "BULLISH", color: "#22c55e" },
  { time: "09:16:41", symbol: "NIFTY 23700 PE", price: "21.50", change: "-35.8%", oi: "-490K", type: "UNWIND", color: "#f59e0b" },
  { time: "09:16:49", symbol: "NIFTY 23800 CE", price: "198.25", change: "+8.4%", oi: "1.7M", type: "BUY", color: "#22c55e" },
  { time: "09:16:57", symbol: "BANKNIFTY 49000 CE", price: "156.50", change: "+34.2%", oi: "650K", type: "BUY", color: "#22c55e" },
  { time: "09:17:05", symbol: "NIFTY 24100 CE", price: "8.75", change: "+112.1%", oi: "6.2M", type: "MOMENTUM", color: "#a78bfa" },
  { time: "09:17:13", symbol: "INDIA VIX", price: "12.94", change: "-5.3%", oi: "—", type: "FALLING", color: "#22c55e" },
];

// ─── COUNTER ─────────────────────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 80;
    const t = setInterval(() => {
      frame++;
      setCount(Math.round((1 - Math.pow(1 - frame / total, 3)) * target));
      if (frame >= total) clearInterval(t);
    }, 20);
    return () => clearInterval(t);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signalInput, setSignalInput] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const active = productTabs[activeTab];
  const ActiveIcon = active.icon;

  return (
    <div className="min-h-screen bg-[#060810] text-[#e2e8f0]">

      {/* ── NAV ───────────────────────────────────────────────────────── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/[0.07] bg-[#060810]/90 backdrop-blur-xl" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image src="/logo_plusevnew.JPG" alt="PlusEV" width={120} height={32} className="h-8 w-auto" />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact"
              className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25">
              Get in Touch <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
              {menuOpen ? <XIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/[0.07] bg-[#060810]/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-white py-1">{link}</a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}
              className="bg-blue-600 text-white text-center py-2.5 rounded-xl font-semibold text-sm">
              Get in Touch
            </a>
          </motion.div>
        )}
      </header>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background: glow emanates from the chart card on the right */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 55% 65% at 72% 55%, rgba(37,99,235,0.14) 0%, transparent 60%)",
          }} />
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 40% 50% at 28% 45%, rgba(99,102,241,0.06) 0%, transparent 55%)",
          }} />
          <div className="absolute bottom-0 inset-x-0 h-32" style={{
            background: "linear-gradient(to bottom, transparent, #060810)",
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-7">
                <span className="inline-flex items-center gap-2 font-mono text-xs text-blue-400 bg-blue-500/[0.08] border border-blue-500/20 px-4 py-1.5 rounded-full tracking-[0.2em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  E[X] &gt; 0
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
                className="font-display font-extrabold text-white leading-[1.03] tracking-tight mb-6"
                style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}>
                Institutional-Grade<br />
                Quant Trading.<br />
                <span className="text-gradient-blue">For Everyone.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.18 }}
                className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                AI-powered trading technology democratizing access to the same infrastructure
                used by institutional desks — built specifically for Indian markets.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }}
                className="flex flex-wrap gap-4 mb-12">
                <a href="#products"
                  className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5">
                  View Products
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a href="#contact"
                  className="flex items-center gap-2 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-white/[0.04]">
                  Talk to Us <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-slate-600">
                {["Indian Market DNA", "20+ Years of Data", "4 Products", "Broker-Agnostic"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-500/40" />{item}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: live backtest card */}
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="rounded-2xl border border-white/[0.09] bg-[#0b0d1c] overflow-hidden shadow-2xl"
                style={{ boxShadow: "0 0 60px rgba(37,99,235,0.1), 0 25px 50px rgba(0,0,0,0.5)" }}>

                {/* Card header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="font-mono text-xs text-slate-500">BacktestIQ · live preview</span>
                    </div>
                    <p className="text-white font-display font-semibold text-sm">NIFTY Momentum Strategy</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 font-mono font-bold text-lg text-green-400">
                      <TrendingUp className="w-4 h-4" />
                      +287%
                    </div>
                    <p className="text-slate-500 text-xs font-mono">Jan 2018 – Dec 2024</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="px-5 pt-4 pb-2" style={{ height: "168px" }}>
                  <EquityCurve />
                </div>

                {/* Legend */}
                <div className="px-5 pb-3 flex items-center gap-6 font-mono text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-0.5 bg-blue-500 inline-block rounded" />
                    Strategy
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-px bg-slate-600 inline-block" style={{ borderTop: "2px dashed rgba(148,163,184,0.3)" }} />
                    Benchmark +94%
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 border-t border-white/[0.06]">
                  {[
                    { label: "Sharpe Ratio", value: "2.3", good: true },
                    { label: "Max Drawdown", value: "−12%", good: false },
                    { label: "Win Rate", value: "67%", good: true },
                  ].map((m, i) => (
                    <div key={i} className={`px-5 py-3.5 ${i < 2 ? "border-r border-white/[0.06]" : ""}`}>
                      <div className={`font-display font-bold text-base ${m.good ? "text-white" : "text-amber-400"}`}>
                        {m.value}
                      </div>
                      <div className="text-slate-500 text-xs font-mono mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-slate-700 text-xs font-mono mt-3">
                Simulated result — for illustration only
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SIGNAL AI SPOTLIGHT ──────────────────────────────────────── */}
      <section id="signaiai" className="relative py-28 overflow-hidden" style={{ background: "#06080f" }}>

        {/* Left blue glow column */}
        <div className="absolute inset-y-0 left-0 w-44 pointer-events-none" style={{
          background: "linear-gradient(to right, rgba(37,99,235,0.32) 0%, rgba(37,99,235,0.06) 65%, transparent 100%)",
        }} />
        {/* Right purple glow column */}
        <div className="absolute inset-y-0 right-0 w-44 pointer-events-none" style={{
          background: "linear-gradient(to left, rgba(139,92,246,0.28) 0%, rgba(139,92,246,0.05) 65%, transparent 100%)",
        }} />

        {/* Scrolling live signal feed — background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{
          opacity: 0.22,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}>
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 38, ease: "linear", repeat: Infinity }}
            style={{ display: "flex", flexDirection: "column", gap: "0px" }}
          >
            {[...SIGNAL_ROWS, ...SIGNAL_ROWS].map((row, i) => (
              <div key={i} className="flex items-center gap-6 px-10 py-[7px] font-mono text-[11px] whitespace-nowrap border-b border-white/[0.025]">
                <span className="text-slate-700 w-14 shrink-0">{row.time}</span>
                <span className="text-slate-500 w-44 shrink-0">{row.symbol}</span>
                <span className="text-slate-300 font-medium w-24 text-right shrink-0">{row.price}</span>
                <span className={`w-14 text-right shrink-0 ${row.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                  {row.change}
                </span>
                <span className="text-slate-700 w-24 text-right shrink-0">OI {row.oi}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold shrink-0" style={{
                  color: row.color,
                  background: `${row.color}12`,
                  border: `1px solid ${row.color}25`,
                }}>
                  {row.type}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Center content */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="font-mono text-xs text-violet-400 uppercase tracking-[0.3em] mb-4 block">
              SignalAI
            </span>
            <h2 className="font-display font-extrabold text-white tracking-tight mb-4 leading-[1.05]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)" }}>
              Ask your trade.<br />
              <span style={{
                background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Get conviction.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              After your entry, query SignalAI for real-time quantitative analysis — options flow,
              OI changes, VIX, and PCR — so you hold or exit on numbers, not nerves.
            </p>
          </motion.div>

          {/* AI query input */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <form onSubmit={(e) => { e.preventDefault(); if (signalInput.trim() || true) setShowAnalysis(true); }}
              className="relative rounded-2xl mb-4" style={{
                background: "rgba(12, 14, 30, 0.92)",
                border: "1px solid rgba(129, 140, 248, 0.55)",
                boxShadow: "0 0 0 1px rgba(129,140,248,0.1), 0 0 40px rgba(129,140,248,0.18), 0 0 80px rgba(99,102,241,0.08), 0 20px 40px rgba(0,0,0,0.5)",
              }}>
              <div className="flex items-center gap-3 px-5 py-4">
                <Activity className="w-4 h-4 text-violet-400 opacity-50 shrink-0" />
                <input
                  value={signalInput}
                  onChange={(e) => setSignalInput(e.target.value)}
                  className="flex-1 bg-transparent text-white text-sm md:text-[15px] placeholder-slate-600 focus:outline-none min-w-0"
                  placeholder="Analyze NIFTY 23850 CE long entry — show conviction..."
                />
                <button type="submit"
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 text-white shrink-0 hover:shadow-lg hover:shadow-indigo-500/25">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* Analysis output card */}
          {showAnalysis && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl text-left overflow-hidden"
              style={{
                background: "rgba(12, 14, 30, 0.88)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Card header */}
              <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1">SignalAI · Analysis</p>
                  <p className="text-white font-display font-semibold text-sm">NIFTY 23850 CE · Long Entry @ 127</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-2xl text-violet-300">78%</div>
                  <p className="text-[10px] text-slate-500 font-mono">Conviction</p>
                </div>
              </div>

              {/* Conviction bar */}
              <div className="px-5 pt-4 pb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">Signal Strength</span>
                  <span className="font-mono text-[10px] text-violet-400">78 / 100</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(to right, #6366f1, #a78bfa)" }}
                  />
                </div>
              </div>

              {/* Signal indicators */}
              <div className="px-5 pb-4 space-y-2.5">
                {[
                  { label: "Options Flow", value: "Strong call buildup at 23850 CE (+2.5M OI)", bullish: true },
                  { label: "India VIX", value: "13.42 falling → low fear environment", bullish: true },
                  { label: "PCR Ratio", value: "0.82 declining → bulls in control", bullish: true },
                  { label: "Futures Basis", value: "+4.1 pts premium → positive rollover", bullish: true },
                  { label: "Put Unwinding", value: "23800 PE shedding OI → support holding", bullish: false },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className="flex items-start gap-2.5">
                    <span className={`mt-[5px] w-1.5 h-1.5 rounded-full shrink-0 ${s.bullish ? "bg-green-400" : "bg-amber-400"}`} />
                    <div className="min-w-0">
                      <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">{s.label} · </span>
                      <span className="text-slate-300 text-sm">{s.value}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Risk levels */}
              <div className="grid grid-cols-3 border-t border-white/[0.06]">
                {[
                  { label: "Stop Loss", value: "23,780" },
                  { label: "Target", value: "23,950" },
                  { label: "Risk/Reward", value: "2.1×" },
                ].map((m, i) => (
                  <div key={i} className={`px-5 py-3 ${i < 2 ? "border-r border-white/[0.06]" : ""}`}>
                    <div className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-1">{m.label}</div>
                    <div className="font-display font-bold text-white text-base">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="px-5 py-2.5 border-t border-white/[0.06] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[10px] text-slate-600">Live · updated 0.3s ago · NSE feed</span>
              </div>
            </motion.div>
          )}

          {!showAnalysis && (
            <p className="text-slate-700 text-xs font-mono mt-2">
              Press Enter or → to run analysis
            </p>
          )}
        </div>
      </section>

      {/* ── PRODUCTS (TABS) ───────────────────────────────────────────── */}
      <section id="products" className="relative py-28 px-6 overflow-hidden" style={{ background: "#08090f" }}>
        {/* Edge glows */}
        <div className="absolute inset-y-0 left-0 w-72 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(37,99,235,0.1) 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0 w-72 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(245,158,11,0.07) 0%, transparent 100%)" }} />

        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-[0.3em] mb-4 block">
              Product Suite
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Four tools. One edge.
            </h2>
          </motion.div>

          {/* Tab pills */}
          <div className="flex items-center justify-center gap-1.5 mb-10 flex-wrap">
            {productTabs.map((tab, i) => (
              <button key={tab.id} onClick={() => setActiveTab(i)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === i
                    ? "border border-white/20 text-white bg-white/[0.06]"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]"
                }`}>
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.025] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3 p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${active.color}18`, border: `1px solid ${active.color}30` }}>
                    <ActiveIcon className="w-5 h-5" style={{ color: active.color }} />
                  </div>
                  <span className="font-mono text-xs text-slate-600">{active.id}.ts</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                  {active.headline}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8">{active.description}</p>
                <a href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-white/[0.06] p-8 md:p-10 flex flex-col justify-center gap-6">
                {active.metrics.map((m, i) => (
                  <div key={i}>
                    <div className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-1">
                      {m.label}
                    </div>
                    <div className="font-display font-bold text-white text-xl">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 border-y border-white/[0.05]" style={{ background: "#060810" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[
            { value: 20, suffix: "+", label: "Years of Indian market data" },
            { value: 5, suffix: "", label: "Distinct market regimes modeled" },
            { value: 4, suffix: "", label: "Integrated products in the stack" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="font-display text-6xl font-bold text-white mb-2 tabular-nums">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-slate-500 text-sm font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TECHNOLOGY ───────────────────────────────────────────────── */}
      <section id="technology" className="py-28 px-6" style={{ background: "#08090f" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-14">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-[0.3em] mb-4 block">Technology</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
              Built different.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              Every layer engineered specifically for Indian market microstructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 transition-colors">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="font-mono text-[11px] text-amber-400/70 bg-amber-400/[0.08] px-2.5 py-1 rounded-lg border border-amber-400/[0.1]">
                      {pillar.stat}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6" style={{ background: "#060810" }}>
        <div className="max-w-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-12">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-[0.3em] mb-4 block">Contact</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Let&apos;s discuss<br />
              <span className="text-gradient-blue">your edge.</span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Whether you&apos;re a solo quant or a prop firm, we&apos;d love to understand your setup.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-8">
            {!submitted ? (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Name", key: "name", type: "text", ph: "Your name" },
                    { label: "Email", key: "email", type: "email", ph: "you@email.com" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                        {f.label}
                      </label>
                      <input type={f.type} value={formData[f.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder={f.ph} required />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-2">Message</label>
                  <textarea rows={5} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                    placeholder="Tell us about your trading setup and what you're trying to solve..." required />
                </div>
                <button type="submit"
                  className="w-full group bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center gap-2">
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Message Received</h3>
                <p className="text-slate-400 text-sm">We&apos;ll get back to you within 1 hour.</p>
              </motion.div>
            )}
          </motion.div>

          <p className="text-center text-slate-600 text-sm mt-6">
            Or email{" "}
            <a href="mailto:plusev.blr@gmail.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              plusev.blr@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-white/[0.05]" style={{ background: "#06080e" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <Image src="/logo_plusevnew.JPG" alt="PlusEV" width={100} height={28} className="h-7 w-auto opacity-50" />
          <p className="text-xs text-slate-600 text-center">
            © 2026 PlusEV AI Quant Trading Private Limited. All rights reserved.
          </p>
          <a href="mailto:plusev.blr@gmail.com" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
            plusev.blr@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
