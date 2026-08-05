"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="mx-auto max-w-[1900px] px-6 md:px-10 lg:px-[120px]">
        <div className="flex justify-between items-center h-[85px]">
          {/* Logo */}
          <div className="relative z-50">
            <a href="/" className="block">
              <svg
                width="185"
                height="74"
                viewBox="0 0 185 74"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="PlusEV, Quant & Tech Company"
              >
                <rect
                  x="4"
                  y="3"
                  width="50"
                  height="50"
                  rx="6"
                  fill="#04408d"
                />
                <path
                  d="M16.3 33.8 L28.6 18.4 L40.9 33.8"
                  stroke="#ffffff"
                  strokeWidth="6.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <text
                  x="62"
                  y="38"
                  fontFamily="var(--font-body), sans-serif"
                  fontSize="26"
                  fontWeight="700"
                  fill="#04408d"
                  letterSpacing="0.5"
                >
                  PLUSEV
                </text>
                <text
                  x="62.5"
                  y="59"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="7.8"
                  fontWeight="700"
                  fill="#04408d"
                  letterSpacing="0.1"
                >
                  Quant &amp; Tech Company
                </text>
              </svg>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <a
              href="/platform"
              className="font-mono text-[16px] uppercase tracking-[0.2em] transition-colors duration-300"
            >
              Platform
            </a>
            <a
              href="/#technology"
              className="font-mono text-[16px] uppercase tracking-[0.2em] transition-colors duration-300"
            >
              Team
            </a>
            <a
              href="/#contact"
              className="font-mono text-[16px] uppercase tracking-[0.2em] transition-colors duration-300"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Nav Trigger */}
          <div className="lg:hidden relative z-50">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="flex flex-col gap-1.5 justify-center items-end w-8 h-8 cursor-pointer rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:ring-offset-2"
              aria-label="Toggle navigation menu"
            >
              <span
                className={`h-[2px] bg-[#02263c] transition-all duration-300 ${navOpen ? "w-6 rotate-45 translate-y-[8px]" : "w-6"}`}
              />
              <span
                className={`h-[2px] bg-[#02263c] transition-all duration-300 ${navOpen ? "w-0 opacity-0" : "w-5"}`}
              />
              <span
                className={`h-[2px] bg-[#02263c] transition-all duration-300 ${navOpen ? "w-6 -rotate-45 -translate-y-[8px]" : "w-4"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 right-0 bottom-0 top-[94px] z-40 flex flex-col justify-between pt-[40px] px-8 pb-10 bg-[#02263c]"
            style={{
              backgroundImage: `url('/images/quant_hero_bg.png')`,
              backgroundPosition: "bottom left",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >

            <nav className="flex flex-col gap-8 relative z-10">
              <a
                href="/platform"
                onClick={() => setNavOpen(false)}
                className="font-mono text-2xl uppercase tracking-widest !text-white hover:!text-[#38bdf8] transition-colors"
              >
                Platform
              </a>
              <a
                href="/#technology"
                onClick={() => setNavOpen(false)}
                className="font-mono text-2xl uppercase tracking-widest !text-white hover:!text-[#38bdf8] transition-colors"
              >
                Team
              </a>
              <a
                href="/#contact"
                onClick={() => setNavOpen(false)}
                className="font-mono text-2xl uppercase tracking-widest !text-white hover:!text-[#38bdf8] transition-colors"
              >
                Contact
              </a>
            </nav>

            <div className="border-t border-white/15 pt-6 relative z-10">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/25 text-white hover:border-[#38bdf8] hover:text-[#38bdf8] transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
