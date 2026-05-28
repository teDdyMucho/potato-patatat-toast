"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const GHL_URL = "https://www.gohighlevel.com/?fp_ref=akt-virtual-assistant-services14";

/**
 * Floating GoHighLevel affiliate badge — middle-right of the hero. The label +
 * a curly arrow sit on top, pointing down at a glowing GHL logo image.
 * Clicking opens the affiliate link in a new tab. Desktop only; non-blocking
 * (only the logo is clickable).
 */
export default function GhlAffiliate() {
  return (
    <>
      {/* Desktop — floating right-side badge */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 lg:flex xl:right-12">
      {/* Enticing label + curly arrow on top (gently nudges down toward the logo) */}
      <motion.div
        className="flex flex-col items-center"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-dm font-bold uppercase tracking-[0.22em] text-[#0ABFA3]">
          Recommended
        </span>
        <span
          className="text-center font-syne text-[16px] font-extrabold leading-tight text-white"
          style={{ textShadow: "0 0 14px rgba(10,191,163,0.55)" }}
        >
          Try GoHighLevel <span className="text-[#7fffee]">now</span>
        </span>

        {/* curly arrow pointing down at the logo */}
        <svg width="70" height="52" viewBox="0 0 70 52" fill="none" aria-hidden="true" className="mt-1">
          <path
            d="M10 8 C 2 24, 26 18, 24 30 C 22 40, 44 30, 42 44"
            stroke="#0ABFA3"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M34 38 L43 47 L50 36"
            stroke="#0ABFA3"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* GHL logo → affiliate link */}
      <motion.a
        href={GHL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Try GoHighLevel now"
        className="group pointer-events-auto relative block shrink-0"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* pulsing glow halo */}
        <motion.span
          aria-hidden="true"
          className="absolute -inset-4 rounded-[2rem] bg-[#0ABFA3]/25 blur-2xl"
          animate={{ opacity: [0.55, 0.25, 0.55], scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/image/GHL.png"
          alt="GoHighLevel"
          className="relative h-28 w-auto drop-shadow-[0_0_22px_rgba(10,191,163,0.5)] xl:h-32"
        />
        {/* external-link cue */}
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0ABFA3] text-white shadow-[0_0_10px_rgba(10,191,163,0.7)]">
          <ArrowUpRight size={13} strokeWidth={2.5} />
        </span>
      </motion.a>
      </div>

      {/* Mobile — top-middle of the body: curl arrow points UP at the header image, with the label below.
          Centering lives on this static wrapper because framer-motion's `y` animation overrides any
          Tailwind translate on the animated element itself. */}
      <div className="pointer-events-none absolute left-1/2 top-[74px] z-40 -translate-x-1/2 lg:hidden">
        <motion.a
          href={GHL_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Try GoHighLevel now"
          className="pointer-events-auto flex flex-col items-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* curl arrow pointing up toward the GHL image in the header */}
          <svg
            width="52"
            height="50"
            viewBox="0 0 52 50"
            fill="none"
            aria-hidden="true"
            className="drop-shadow-[0_0_8px_rgba(10,191,163,0.45)]"
          >
            <path
              d="M26 46 C 36 32, 16 28, 26 10"
              stroke="#0ABFA3"
              strokeWidth="2.75"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M18 18 L26 8 L34 18"
              stroke="#0ABFA3"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span
            className="mt-0.5 whitespace-nowrap font-syne text-[13px] font-extrabold text-white"
            style={{ textShadow: "0 0 12px rgba(10,191,163,0.55)" }}
          >
            Try GoHighLevel <span className="text-[#7fffee]">now</span>
          </span>
        </motion.a>
      </div>
    </>
  );
}
