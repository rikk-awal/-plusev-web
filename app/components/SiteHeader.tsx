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
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="relative z-50">
            <a href="/" className="block">
              <svg
                className="site-header__logo"
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
                  x="68.1"
                  y="59"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="8.5"
                  fontWeight="700"
                  fill="#04408d"
                  letterSpacing="0.117"
                >
                  AI &#8226; QUANT &#8226; TECH
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
              href="/contact"
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
                href="/contact"
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
                className="inline-flex items-center justify-center w-10 h-10 opacity-90 hover:opacity-100 transition-opacity"
                aria-label="LinkedIn"
              >
                <svg className="w-7 h-7" viewBox="0 0 24 24">
                  <path
                    fill="#0A66C2"
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
