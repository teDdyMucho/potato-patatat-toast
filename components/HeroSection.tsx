"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const rotatingWords = [
  "Virtual Assistants.",
  "AI Automation.",
  "Call Centers.",
  "Lead Generation.",
  "Growth Systems.",
];

const stats = [
  { value: "6", label: "Continents Served", suffix: "" },
  { value: "2020", label: "Founded", suffix: "" },
  { value: "50+", label: "Active Clients", suffix: "" },
  { value: "$M+", label: "Revenue Generated", suffix: "" },
];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const word = rotatingWords[wordIndex];

    if (typing) {
      if (displayed.length < word.length) {
        const t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, wordIndex]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-0 bg-[#101113] overflow-hidden">
      {/* Subtle radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #062B26 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-black text-[12px] font-dm font-semibold text-muted">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent"
              style={{ boxShadow: "0 0 6px #0ABFA3" }}
            />
            Now serving clients across 6 continents
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1
            className="font-syne text-body leading-tight mb-2 animate-fade-up"
            style={{
              fontSize: "clamp(42px, 6vw, 76px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
            }}
          >
            Scale Your Business With
          </h1>
          <h1
            className="font-syne leading-tight animate-fade-up delay-100"
            style={{
              fontSize: "clamp(42px, 6vw, 76px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#0ABFA3",
            }}
          >
            {displayed}
            <span className="cursor-blink text-accent">|</span>
          </h1>
        </div>

        {/* Subheadline */}
        <p
          className="text-center text-muted font-dm max-w-2xl mx-auto mb-10 animate-fade-up delay-200"
          style={{ fontSize: "18px", lineHeight: "1.65" }}
        >
          AKT Virtual Assistance Services provides elite Filipino virtual
          assistants, AI infrastructure, and automation systems for SMBs
          worldwide — from GoHighLevel to Retell AI, VAPI, and beyond.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up delay-300">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md text-[15px] font-dm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors"
          >
            Book Free Consultation
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md text-[15px] font-dm font-semibold transition-colors border border-border text-body bg-[#101113] hover:border-primary hover:text-primary"
          >
            <Zap size={16} className="text-accent" />
            Try AI Tools Free
          </Link>
        </div>

        {/* Stats row */}
        <div className="border-t border-border pt-10 pb-12 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up delay-400">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-syne text-body mb-1"
                style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {s.value}
                <span style={{ color: "#0ABFA3" }}>{s.suffix}</span>
              </p>
              <p className="text-[13px] font-dm text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tool badges */}
        <div className="pb-16 flex flex-wrap justify-center gap-2 animate-fade-up delay-500">
          {[
            "GoHighLevel",
            "Retell AI",
            "VAPI",
            "CloseBot",
            "Claude AI",
            "OpenAI",
            "Filipino VAs",
          ].map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 rounded-full text-[11px] font-dm font-semibold border"
              style={{
                background: "#F0FDF9",
                color: "#0ABFA3",
                borderColor: "#0ABFA3",
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Wave separator */}
      <div className="hero-wave" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "56px" }}
        >
          <path
            d="M0 0C360 56 1080 56 1440 0V56H0V0Z"
            fill="#101113"
          />
        </svg>
      </div>
    </section>
  );
}
