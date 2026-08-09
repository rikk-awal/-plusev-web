// ─── CTA WATERMARK SVG (QUANT GRID CONTOUR THEME) ───────────────────────────
// Shared ambient background pattern for CTA sections — faint line-art behind
// the text, never a prominent side-by-side graphic. Matches how Aktis's own
// CTA sections work (a soft watermark behind the text, no illustrated
// column) and keeps both pages on this site consuming one source instead of
// drifting into near-duplicate implementations.
export function CtaWatermark() {
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
