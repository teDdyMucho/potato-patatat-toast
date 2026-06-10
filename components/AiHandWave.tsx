"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const WORDS = [
  { top: "AI",    bot: "TOOLS"    },
  { top: "VOICE", bot: "AI"       },
  { top: "AUTO",  bot: "MATION"   },
  { top: "GHL",   bot: "BUILDS"   },
  { top: "VA",    bot: "TEAMS"    },
  { top: "SMART", bot: "LEADS"    },
  { top: "CHAT",  bot: "BOTS"     },
  { top: "WORK",  bot: "FLOWS"    },
];

export default function AiHandWave() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);

  const word = WORDS[idx];

  return (
    <>
      {/* ── Desktop — floating left-side badge, same layout as GhlAffiliate ── */}
      <div className="pointer-events-none absolute left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 lg:flex xl:left-12">

        {/* Label + curly arrow — matches GhlAffiliate exactly */}
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
            Try Our <span className="text-[#7fffee]">AI Tools</span>
          </span>

          {/* curly arrow — mirrored from GhlAffiliate */}
          <svg width="70" height="52" viewBox="0 0 70 52" fill="none" aria-hidden="true" className="mt-1 scale-x-[-1]">
            <path
              d="M10 8 C 2 24, 26 18, 24 30 C 22 40, 44 30, 42 44"
              stroke="#0ABFA3" strokeWidth="2.5" strokeLinecap="round" fill="none"
            />
            <path
              d="M34 38 L43 47 L50 36"
              stroke="#0ABFA3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
            />
          </svg>
        </motion.div>

        {/* ── Word card — same structure as GHL badge ── */}
        <motion.div
          className="pointer-events-auto relative block shrink-0 cursor-pointer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {/* Pulsing glow halo — identical to GHL */}
          <motion.span
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] bg-[#0ABFA3]/25 blur-2xl"
            animate={{ opacity: [0.55, 0.25, 0.55], scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Card box — same size as GHL badge (228 × 112) */}
          <Link
            href="/ai-tools"
            aria-label="Try our AI Tools"
            className="relative block overflow-hidden rounded-xl"
            style={{
              width: "228px",
              height: "112px",
              background: "linear-gradient(135deg, #0b2835 0%, #0d3040 50%, #0b2835 100%)",
              boxShadow: "0 0 22px rgba(10,191,163,0.5)",
            }}
          >
            {/* Subtle grid background */}
            <svg
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              width="228" height="112" xmlns="http://www.w3.org/2000/svg"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <line key={`v${i}`} x1={i*21} y1="0" x2={i*21} y2="112"
                  stroke="#0ABFA3" strokeWidth="0.8" />
              ))}
              {Array.from({ length: 7 }, (_, i) => (
                <line key={`h${i}`} x1="0" y1={i*19} x2="228" y2={i*19}
                  stroke="#0ABFA3" strokeWidth="0.8" />
              ))}
            </svg>

            {/* Corner accents */}
            {[
              "top-0 left-0 border-t border-l",
              "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((cls) => (
              <span
                key={cls}
                className={`pointer-events-none absolute h-4 w-4 border-[#0ABFA3]/70 ${cls}`}
              />
            ))}

            {/* Animated word */}
            <div className="relative flex h-full flex-col items-center justify-center gap-0.5 overflow-hidden px-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  className="flex flex-col items-center gap-0.5"
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -36, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className="font-syne font-black leading-none"
                    style={{
                      fontSize: "36px",
                      letterSpacing: "-0.03em",
                      color: "#0ABFA3",
                      textShadow: "0 0 24px rgba(10,191,163,0.9)",
                    }}
                  >
                    {word.top}
                  </span>
                  <span
                    className="font-syne font-extrabold leading-none text-white"
                    style={{
                      fontSize: "22px",
                      letterSpacing: "-0.02em",
                      textShadow: "0 0 12px rgba(255,255,255,0.3)",
                    }}
                  >
                    {word.bot}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scan line */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#0ABFA3]/60 to-transparent"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
            />

            {/* Teal overlay tint — matches GHL mix-blend */}
            <span className="pointer-events-none absolute inset-0 rounded-xl bg-[#0ABFA3]/8 mix-blend-color" />

            {/* Bottom label */}
            <span
              className="absolute bottom-2 left-0 right-0 text-center font-dm text-[9px] font-bold uppercase tracking-[0.2em] text-[#0ABFA3]/60"
            >
              aktservices.org
            </span>
          </Link>

          {/* ArrowUpRight badge — identical to GHL */}
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0ABFA3] text-white shadow-[0_0_10px_rgba(10,191,163,0.7)]">
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </span>
        </motion.div>
      </div>

      {/* ── Mobile — top-left compact ── */}
      <div className="pointer-events-none absolute left-4 top-[74px] z-40 lg:hidden">
        <motion.div
          className="pointer-events-auto"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            href="/ai-tools"
            aria-label="Try our AI Tools"
            className="relative block overflow-hidden rounded-xl"
            style={{
              width: "82px",
              height: "64px",
              background: "linear-gradient(135deg, #0b2835 0%, #0d3040 50%, #0b2835 100%)",
              boxShadow: "0 0 14px rgba(10,191,163,0.45)",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center gap-0.5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  className="flex flex-col items-center"
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className="font-syne font-black leading-none"
                    style={{ fontSize: "18px", letterSpacing: "-0.03em", color: "#0ABFA3", textShadow: "0 0 14px rgba(10,191,163,0.8)" }}
                  >
                    {word.top}
                  </span>
                  <span
                    className="font-syne font-extrabold leading-none text-white"
                    style={{ fontSize: "13px", letterSpacing: "-0.02em" }}
                  >
                    {word.bot}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#0ABFA3]/60 to-transparent"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
            />
            {/* corners */}
            {["top-0 left-0 border-t border-l","top-0 right-0 border-t border-r","bottom-0 left-0 border-b border-l","bottom-0 right-0 border-b border-r"].map((cls) => (
              <span key={cls} className={`pointer-events-none absolute h-3 w-3 border-[#0ABFA3]/60 ${cls}`} />
            ))}
          </Link>
        </motion.div>
      </div>
    </>
  );
}
