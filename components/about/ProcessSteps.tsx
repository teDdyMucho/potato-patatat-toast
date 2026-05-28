"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Discovery & Systems Audit",
    desc: "We map your current tools, workflows, and gaps. We find what can be automated, what AI can replace, and where integration is missing. Your custom stack blueprint comes from here.",
  },
  {
    step: "02",
    title: "Stack Design & Tool Selection",
    desc: "We select GoHighLevel, n8n, Retell AI, Claude AI, Supabase, Monday.com — the exact combination your business needs. No overbuilt, no underbuilt. Purpose-designed.",
  },
  {
    step: "03",
    title: "Build, Integrate & Connect",
    desc: "We build every system and wire them together. Leads from voice AI flow to GHL pipelines. Lead scraper outputs trigger email sequences. Everything connected — zero manual handoffs.",
  },
  {
    step: "04",
    title: "Deploy AI Into Your Workforce",
    desc: "AI agents go live as active members of your team — answering calls, responding to leads, posting content, tracking tasks, and reporting metrics. Your business runs while your team sleeps.",
  },
  {
    step: "05",
    title: "Monitor, Maintain & Optimize",
    desc: "We watch every system post-launch. Errors resolved before they impact operations. Prompts updated as your business evolves. Stack maintained at zero downtime — indefinitely.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, when: "beforeChildren" },
  },
};

// Teal light bar that sweeps left → right across the panel as it boots up.
const sweepVariants: Variants = {
  hidden: { x: "-30%", opacity: 0 },
  show: {
    x: "130%",
    opacity: [0, 1, 1, 0],
    transition: { duration: 0.9, ease: "easeInOut", delay: 0.05 },
  },
};

const nodeVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: "backOut", delay: 0.18 } },
};

const textVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut", delay: 0.24 } },
};

/**
 * Process steps as futuristic HUD panels: each rises in and a teal light bar
 * sweeps across it while the number node powers on with a glow — revealed as
 * it scrolls into view.
 */
export default function ProcessSteps() {
  return (
    <div className="max-w-3xl space-y-6">
      {steps.map((item) => (
        <motion.div
          key={item.step}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={cardVariants}
          className="relative overflow-hidden rounded-card border border-[#155E53]/40 bg-[#0b0d10]/80 px-6 py-5 shadow-[0_0_40px_rgba(10,191,163,0.05)] backdrop-blur-sm"
        >
          <Corners />

          {/* sweeping scan bar */}
          <motion.div
            aria-hidden
            variants={sweepVariants}
            className="pointer-events-none absolute inset-y-0 left-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-[#0ABFA3]/30 to-transparent"
          />

          <div className="relative flex items-start gap-6">
            {/* glowing number node */}
            <motion.div variants={nodeVariants} className="relative shrink-0">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-[#0ABFA3]/50 blur-md"
                animate={{ opacity: [0.5, 0.2, 0.5], scale: [1, 1.25, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span
                className="relative flex h-10 w-10 items-center justify-center rounded-full font-syne text-[12px] font-extrabold text-white"
                style={{ background: "#0ABFA3" }}
              >
                {item.step}
              </span>
            </motion.div>

            <motion.div variants={textVariants}>
              <p className="mb-1 font-syne text-[16px] font-bold text-body">{item.title}</p>
              <p className="text-[13px] font-dm leading-relaxed text-muted">{item.desc}</p>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Founder photo card — same HUD panel style as the process step cards. */
export function ProcessPhotoCard() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={cardVariants}
      className="relative overflow-hidden rounded-card border border-[#155E53]/40 bg-[#0b0d10]/80 p-3 shadow-[0_0_40px_rgba(10,191,163,0.05)] backdrop-blur-sm"
    >
      <Corners />

      {/* sweeping scan bar */}
      <motion.div
        aria-hidden
        variants={sweepVariants}
        className="pointer-events-none absolute inset-y-0 left-0 w-32 -skew-x-12 bg-gradient-to-r from-transparent via-[#0ABFA3]/25 to-transparent"
      />

      {/* pulsing corner glow */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-[#0ABFA3]/15 blur-2xl"
        animate={{ opacity: [0.6, 0.2, 0.6], scale: [1, 1.15, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* photo */}
      <motion.div variants={textVariants} className="relative overflow-hidden rounded-lg">
        <Image
          src="/image/bossgelomapagmahal.png"
          alt="Jose Angelo Tapang — CEO & Founder, AKT Virtual Assistance Services"
          width={600}
          height={750}
          className="h-auto w-full object-cover"
          priority
        />
        {/* bottom name badge */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-5 pt-10 pb-4">
          <p className="font-syne text-[15px] font-bold text-white" style={{ letterSpacing: "-0.01em" }}>
            Jose Angelo Tapang
          </p>
          <p className="text-[11px] font-dm font-semibold uppercase tracking-[0.18em] text-[#0ABFA3]">
            CEO &amp; Founder
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Corners() {
  const base = "pointer-events-none absolute h-3 w-3 border-[#0ABFA3]/50";
  return (
    <>
      <span className={`${base} left-1.5 top-1.5 rounded-tl border-l border-t`} />
      <span className={`${base} right-1.5 top-1.5 rounded-tr border-r border-t`} />
      <span className={`${base} bottom-1.5 left-1.5 rounded-bl border-b border-l`} />
      <span className={`${base} bottom-1.5 right-1.5 rounded-br border-b border-r`} />
    </>
  );
}
