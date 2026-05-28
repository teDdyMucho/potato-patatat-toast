"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import {
  Zap,
  ArrowUpRight,
  MessageSquare,
  FileText,
  BarChart2,
  Settings,
  Bot,
  Mail,
  Calendar,
  Target,
  Wand2,
} from "lucide-react";
import Link from "next/link";

const tools = [
  {
    category: "Sales AI",
    name: "Lead Qualifier",
    description:
      "Paste your lead list and instantly get qualification scores, lead intent analysis, and personalized outreach angles for each prospect. Powered by Claude AI.",
    icon: BarChart2,
    color: "#0ABFA3",
    bg: "#062B26",
    sessions: "1,247",
    badge: "Most Popular",
  },
  {
    category: "Sales AI",
    name: "Cold Email Generator",
    description:
      "Input your ICP, service, and value proposition — receive a complete multi-touch cold email sequence ready to deploy in your outreach tool.",
    icon: Mail,
    color: "#0ABFA3",
    bg: "#062B26",
    sessions: "892",
    badge: null,
  },
  {
    category: "Sales AI",
    name: "Objection Handler",
    description:
      "Enter a sales objection and get professional, conversion-tested responses. Train your team or deploy directly in scripts.",
    icon: MessageSquare,
    color: "#0ABFA3",
    bg: "#062B26",
    sessions: "534",
    badge: null,
  },
  {
    category: "Content AI",
    name: "Blog Post Writer",
    description:
      "SEO-optimized, E-E-A-T-ready blog posts targeting your exact keyword. 1500–3000 words, structured with H2/H3, FAQ, and internal link suggestions.",
    icon: FileText,
    color: "#0ABFA3",
    bg: "#073B34",
    sessions: "673",
    badge: null,
  },
  {
    category: "Content AI",
    name: "Social Caption Generator",
    description:
      "Generate platform-optimized captions for LinkedIn, Facebook, and Instagram from your content URL or paste-in text. Includes hashtag suggestions.",
    icon: MessageSquare,
    color: "#0ABFA3",
    bg: "#073B34",
    sessions: "1,103",
    badge: "Most Used",
  },
  {
    category: "Content AI",
    name: "SEO Brief Generator",
    description:
      "Enter a target keyword and get a complete SEO content brief: intent analysis, outline, word count, related keywords, and competitor angle suggestions.",
    icon: Target,
    color: "#0ABFA3",
    bg: "#073B34",
    sessions: "445",
    badge: null,
  },
  {
    category: "Productivity AI",
    name: "Meeting Summarizer",
    description:
      "Paste meeting notes or transcript — get structured action items, key decisions, follow-up owners, and deadlines in seconds.",
    icon: Calendar,
    color: "#0ABFA3",
    bg: "#062B26",
    sessions: "456",
    badge: null,
  },
  {
    category: "Productivity AI",
    name: "Email Responder",
    description:
      "Paste any email and get a professional, tone-matched response draft ready to send or edit. Set the tone: formal, friendly, or assertive.",
    icon: Mail,
    color: "#0ABFA3",
    bg: "#062B26",
    sessions: "612",
    badge: null,
  },
  {
    category: "Automation AI",
    name: "GoHighLevel Prompt Helper",
    description:
      "Generate GoHighLevel workflow triggers, email/SMS sequences, pipeline stage automations, and AI follow-up prompts — copy and deploy instantly.",
    icon: Settings,
    color: "#0ABFA3",
    bg: "#073B34",
    sessions: "788",
    badge: "New",
  },
  {
    category: "Automation AI",
    name: "Workflow Builder Assistant",
    description:
      "Describe your business process and get a step-by-step automation workflow mapped out — with suggested tools, triggers, and actions.",
    icon: Bot,
    color: "#0ABFA3",
    bg: "#073B34",
    sessions: "329",
    badge: null,
  },
  {
    category: "Design AI",
    name: "Design Adjuster",
    description:
      "Upload a property photo, then brush a mask over just the area you want to change — a wall, the flooring, countertops, fixtures, or an empty room to restage. AI edits only inside your selection (inpainting) while everything outside it stays pixel-perfect, so you can tweak or restyle one region at a time and iterate, instead of regenerating the whole image.",
    icon: Wand2,
    color: "#0ABFA3",
    bg: "#073B34",
    sessions: "128",
    badge: "New",
  },
];

const categories = [
  "All",
  "Sales AI",
  "Content AI",
  "Design AI",
  "Productivity AI",
  "Automation AI",
];

export default function AIToolsPage() {
  const router = useRouter();
  const { user, ready } = useAuth();
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? tools : tools.filter((t) => t.category === active);

  // Tools that have their own dedicated page.
  const toolPages: Record<string, string> = {
    "Design Adjuster": "/ai-tools/design-adjuster",
  };

  const handleTry = (toolName: string) => {
    const dest = toolPages[toolName] ?? null;

    // Gate behind login: not signed in → send to the login page, then come back.
    if (ready && !user) {
      router.push(`/login?redirect=${encodeURIComponent(dest ?? "/ai-tools")}`);
      return;
    }

    // Signed in: open the tool's page if it has one.
    if (dest) router.push(dest);
    // (Other tools don't have a run experience wired up yet.)
  };

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
                Free AI tools.
                <br />
                <span style={{ color: "#0ABFA3" }}>Real business results.</span>
              </h1>
              <p className="text-[16px] font-dm text-muted leading-relaxed">
                Built with Claude AI — try AKT&apos;s AI tools for free. Create a
                free account, no commitment. Experience the quality of our AI
                work firsthand before you hire us to build it for your business.
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

                    {/* Footer: sessions + action */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-dm text-muted">
                        <span className="font-semibold text-body">{tool.sessions}</span> sessions
                      </span>
                      <button
                        onClick={() => handleTry(tool.name)}
                        className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[12px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "#0ABFA3" }}
                      >
                        <Zap size={12} fill="white" />
                        Try Now
                      </button>
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
