"use client";
import dynamic from "next/dynamic";

// Spline loads a WebGL scene from CDN — disable SSR to avoid hydration mismatch
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" style={{ background: "#010c1e" }} />,
});

export function SplineHeroBg() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <Spline
        scene="https://prod.spline.design/us3ALejTXl6usHZ7/scene.splinecode"
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      />
    </div>
  );
}
