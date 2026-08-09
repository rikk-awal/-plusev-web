"use client";

import { motion, useReducedMotion } from "motion/react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { GenerativeArtScene } from "../components/GenerativeArtScene";

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen bg-white text-[#02263c] overflow-x-hidden selection:bg-[#38bdf8]/20">
      <SiteHeader />

      {/* ─── HERO — same full-bleed photo treatment as the Platform page ────── */}
      <section className="section-hero min-h-[376px] md:min-h-[400px] lg:min-h-[425px] pt-[110px] md:pt-[135px] pb-[70px]">
        <div
          className="section-hero__img"
          style={{ backgroundImage: `url('/images/quant_hero_bg.png')`, transform: "scaleX(-1)" }}
        />

        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <GenerativeArtScene />
        </div>

        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div
            className="absolute rounded-full w-[140px] h-[140px] md:w-[280px] md:h-[280px]"
            style={{
              left: "16%",
              top: "8%",
              background: "radial-gradient(circle, rgba(56,189,248,0.2) 0%, rgba(56,189,248,0) 70%)",
              filter: "blur(30px)",
            }}
          />
          <div
            className="absolute rounded-full w-[95px] h-[95px] md:w-[190px] md:h-[190px]"
            style={{
              left: "10%",
              top: "38%",
              background: "radial-gradient(circle, rgba(29,78,216,0.2) 0%, rgba(29,78,216,0) 70%)",
              filter: "blur(18px)",
            }}
          />
          <div
            className="absolute rounded-full w-[65px] h-[65px] md:w-[130px] md:h-[130px]"
            style={{
              left: "15%",
              top: "55%",
              background: "radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0) 70%)",
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
            Contact us
          </motion.h1>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white max-w-xl mt-4"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)" }}
          >
            The PlusEV team is based in Bengaluru, Karnataka. Reach out by email anytime.
          </motion.p>
        </div>
      </section>

      {/* ─── OUR LOCATIONS ──────────────────────────────────────────────────── */}
      <section className="pt-[15px] pb-[70px]">
        <div className="container max-w-5xl mx-auto px-6">
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="section-image-with-text__title !text-[clamp(1.6rem,3vw,2.2rem)] mb-8"
          >
            Our location
          </motion.h2>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3 className="font-display text-[1.05rem] font-bold tracking-wide">
              BENGALURU, KARNATAKA
            </h3>
            <p className="text-[#02263c] text-[0.95rem] leading-[1.7] mt-2">
              No 63/A, Hsr Layout Sector-3
              <br />
              Near Narayana Hospital
              <br />
              Opp Hsr Club
              <br />
              Bengaluru, Karnataka - 560102
            </p>
            <div className="flex flex-col gap-1 mt-3">
              <a
                href="mailto:team@plusev.in"
                className="text-[#1d4ed8] hover:text-[#38bdf8] transition-colors text-[0.95rem] inline-block w-fit"
              >
                team@plusev.in
              </a>
              <a
                href="mailto:plusev.blr@gmail.com"
                className="text-[#1d4ed8] hover:text-[#38bdf8] transition-colors text-[0.95rem] inline-block w-fit"
              >
                plusev.blr@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
