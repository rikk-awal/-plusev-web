"use client";
import { useRef, useEffect } from "react";

// ── Equity traces (2D canvas) ────────────────────────────────────────────────
const N_PATHS = 10;
const N_PTS = 260;

type Path = { pts: { x: number; y: number }[]; opacity: number; width: number; hero: boolean };

function buildPaths(W: number, H: number): Path[] {
  const paths: Path[] = [];
  for (let i = 0; i < N_PATHS; i++) {
    const hero = i === 0;
    const sigma = hero ? 5 : 3 + Math.random() * 6;
    const drift = -(0.5 + Math.random() * 1.1);
    const startY = H * (0.28 + Math.random() * 0.44);
    const opacity = hero ? 0.20 : 0.04 + Math.random() * 0.05;
    const width = hero ? 1.0 : 0.5 + Math.random() * 0.4;
    const pts: { x: number; y: number }[] = [];
    let y = startY;
    for (let j = 0; j < N_PTS; j++) {
      pts.push({ x: (j / (N_PTS - 1)) * W, y });
      y = Math.max(H * 0.06, Math.min(H * 0.90, y + drift + (Math.random() - 0.5) * 2 * sigma));
    }
    paths.push({ pts, opacity, width, hero });
  }
  return paths;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function GenerativeArtScene() {
  const traceRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const tc = traceRef.current;
    if (!tc) return;

    const tg = tc.getContext("2d");
    if (!tg) return;

    const resize2d = () => { tc.width = tc.clientWidth; tc.height = tc.clientHeight; };
    resize2d();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let paths = buildPaths(tc.width, tc.height);
    let traceProgress = reduceMotion ? 1 : 0;
    let traceRaf = 0;

    const drawTraces = () => {
      tg.clearRect(0, 0, tc.width, tc.height);
      const maxIdx = Math.floor(traceProgress * N_PTS);
      for (const { pts, opacity, width, hero } of paths) {
        if (maxIdx < 2) continue;
        const end = Math.min(maxIdx, pts.length - 1);
        tg.beginPath();
        tg.moveTo(pts[0].x, pts[0].y);
        for (let j = 1; j <= end; j++) tg.lineTo(pts[j].x, pts[j].y);
        tg.strokeStyle = `rgba(59,130,246,${opacity})`;
        tg.lineWidth = width;
        tg.stroke();
        if (hero && traceProgress < 1) {
          const tip = pts[end];
          tg.beginPath();
          tg.arc(tip.x, tip.y, 2.5, 0, Math.PI * 2);
          tg.fillStyle = "rgba(59,130,246,0.65)";
          tg.fill();
        }
      }
      if (traceProgress < 1) {
        traceProgress = Math.min(1, traceProgress + 0.0038);
        traceRaf = requestAnimationFrame(drawTraces);
      }
    };
    const traceDelay = setTimeout(() => drawTraces(), 500);

    const handleResize = () => {
      resize2d();
      paths = buildPaths(tc.width, tc.height);
      if (reduceMotion) {
        traceProgress = 1;
        drawTraces();
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(traceDelay);
      cancelAnimationFrame(traceRaf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={traceRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
