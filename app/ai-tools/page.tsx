"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import {
  Zap,
  ArrowUpRight,
  MessageSquare,
  Phone,
  Send,
  Workflow,
} from "lucide-react";
import Link from "next/link";

const tools = [
  {
    category: "Voice AI",
    name: "Retell AI",
    description:
      "AI voice agent that answers, screens, and qualifies inbound and outbound calls 24/7 — books appointments straight into your calendar and hands off warm leads to your team.",
    icon: Phone,
    color: "#0ABFA3",
    bg: "#062B26",
    tag: "Powered by Retell AI",
    badge: "Most Popular",
  },
  {
    category: "GoHighLevel AI",
    name: "Nurturing Sequence on GHL",
    description:
      "Automated multi-touch email + SMS nurture sequence built inside GoHighLevel — keeps leads warm with personalized, timed follow-ups until they're ready to buy.",
    icon: Workflow,
    color: "#0ABFA3",
    bg: "#073B34",
    tag: "Built on GoHighLevel",
    badge: null,
  },
  {
    category: "GoHighLevel AI",
    name: "Outreach Sequence on GHL",
    description:
      "Done-for-you cold outreach automation in GoHighLevel — multi-channel touchpoints, smart delays, and reply detection so your pipeline fills itself.",
    icon: Send,
    color: "#0ABFA3",
    bg: "#073B34",
    tag: "Built on GoHighLevel",
    badge: "New",
  },
  {
    category: "GoHighLevel AI",
    name: "Chat Bot on GHL",
    description:
      "AI chatbot embedded in your website and GoHighLevel conversations — answers FAQs, qualifies visitors, and routes hot leads to your sales team in real time.",
    icon: MessageSquare,
    color: "#0ABFA3",
    bg: "#062B26",
    tag: "Built on GoHighLevel",
    badge: "New",
  },
];

const categories = ["All", "Voice AI", "GoHighLevel AI"];

export default function AIToolsPage() {
  const router = useRouter();
  const { user, ready, isAdmin, isStaff } = useAuth();
  const [active, setActive] = useState("All");

  // Regular users get the personalised dashboard; admin/staff stay on this page
  useEffect(() => {
    if (ready && user && !isAdmin && !isStaff) router.replace("/dashboard");
  }, [ready, user, isAdmin, isStaff, router]);

  const filtered =
    active === "All" ? tools : tools.filter((t) => t.category === active);

  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-[#101113] border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
                AI Tools Hub
              </p>
              <h1
                className="font-syne text-body mb-4"
                style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                Signature AI systems.
                <br />
                <span style={{ color: "#0ABFA3" }}>Real business results.</span>
              </h1>
              <p className="text-[16px] font-dm text-muted leading-relaxed">
                The AI voice agents, GoHighLevel automations, and chatbots AKT
                builds and deploys for clients. Book a free consultation and
                we&apos;ll set one up for your business.
              </p>
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="relative overflow-hidden py-16 bg-[#050608]">
          {/* Futuristic backdrop (same as the Design Adjuster) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#0ABFA3 1px, transparent 1px), linear-gradient(90deg, #0ABFA3 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#0ABFA3]/10 blur-[160px]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Filter — single swipeable row on mobile, wraps on larger screens */}
            <div className="scrollbar-none -mx-6 mb-10 flex gap-2.5 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {categories.map((cat, i) => {
                const isActive = active === cat;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActive(cat)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[12px] font-dm font-semibold transition-colors duration-200 ${
                      isActive
                        ? "border-transparent text-white"
                        : "border-border bg-white/[0.03] text-muted hover:border-[#0ABFA3]/50 hover:text-[#7fffee]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="aiToolsActivePill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "#0ABFA3",
                          boxShadow: "0 0 18px rgba(10,191,163,0.45)",
                        }}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Tools — card grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <div
                    key={i}
                    className="glow-card group relative flex flex-col rounded-card border border-border bg-[#101113] p-6 transition-all duration-200 hover:shadow-card"
                  >
                    {/* Header: icon + badge */}
                    <div className="mb-4 flex items-start justify-between">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-lg"
                        style={{ background: tool.bg }}
                      >
                        <Icon size={20} style={{ color: tool.color }} strokeWidth={1.75} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full px-2.5 py-0.5 text-[10px] font-dm font-semibold"
                          style={{ background: "#062B26", color: "#0ABFA3" }}
                        >
                          {tool.category}
                        </span>
                        {tool.badge && (
                          <span
                            className="rounded-full px-2.5 py-0.5 text-[10px] font-dm font-bold"
                            style={{ background: "#073B34", color: "#0ABFA3" }}
                          >
                            {tool.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body */}
                    <h3
                      className="font-syne text-body text-[16px] font-bold mb-2 group-hover:text-primary transition-colors"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {tool.name}
                    </h3>
                    <p className="flex-1 text-[13px] font-dm text-muted leading-relaxed mb-5">
                      {tool.description}
                    </p>

                    {/* Footer: tag + action */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-dm text-muted">{tool.tag}</span>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[12px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "#0ABFA3" }}
                      >
                        <Zap size={12} fill="white" />
                        Get Started
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Custom AI CTA */}
        <section className="py-16 bg-[#101113] border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div
              className="rounded-card p-10 text-center border"
              style={{ background: "#062B26", borderColor: "#155E53" }}
            >
              <h3
                className="font-syne text-body text-[24px] font-bold mb-3"
                style={{ letterSpacing: "-0.01em" }}
              >
                Want custom AI tools built for your business?
              </h3>
              <p className="text-[15px] font-dm text-muted mb-7 max-w-lg mx-auto">
                AKT builds bespoke AI agents and automation workflows using
                Claude, OpenAI, GoHighLevel, Retell AI, and VAPI — tailored
                exactly to your business operations.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[14px] font-dm font-semibold text-white transition-colors"
                style={{ background: "#0ABFA3" }}
              >
                Get a Custom AI Build
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
