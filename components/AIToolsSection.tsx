"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, ArrowUpRight, MessageSquare, FileText, BarChart2, Settings } from "lucide-react";

const tools = [
  {
    category: "Sales AI",
    name: "Lead Qualifier",
    description:
      "Paste a list of leads and get instant qualification scores with personalized outreach angles. Powered by Claude AI.",
    icon: BarChart2,
    color: "#0ABFA3",
    bg: "#062B26",
    sessions: "1,247",
  },
  {
    category: "Sales AI",
    name: "Cold Email Generator",
    description:
      "Input your ICP, service, and value prop — get a multi-touch cold email sequence ready to deploy.",
    icon: MessageSquare,
    color: "#0ABFA3",
    bg: "#062B26",
    sessions: "892",
  },
  {
    category: "Content AI",
    name: "Blog Post Writer",
    description:
      "SEO-optimized, E-E-A-T-ready blog posts targeting your exact keyword. 1500–3000 words, structured and ready to publish.",
    icon: FileText,
    color: "#0ABFA3",
    bg: "#073B34",
    sessions: "673",
  },
  {
    category: "Content AI",
    name: "Social Caption Generator",
    description:
      "Generate LinkedIn, Facebook, and Instagram captions from your content or URL in seconds.",
    icon: MessageSquare,
    color: "#0ABFA3",
    bg: "#073B34",
    sessions: "1,103",
  },
  {
    category: "Productivity AI",
    name: "Meeting Summarizer",
    description:
      "Paste meeting notes or transcript — get action items, decisions, and follow-ups in structured format.",
    icon: FileText,
    color: "#0ABFA3",
    bg: "#062B26",
    sessions: "456",
  },
  {
    category: "Automation AI",
    name: "GoHighLevel Prompt Helper",
    description:
      "Generate GHL workflow triggers, email/SMS sequences, and pipeline automation prompts — copy and deploy instantly.",
    icon: Settings,
    color: "#0ABFA3",
    bg: "#073B34",
    sessions: "788",
  },
];

const categories = ["All", "Sales AI", "Content AI", "Productivity AI", "Automation AI"];

export default function AIToolsSection() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? tools : tools.filter((t) => t.category === active);

  return (
    <section id="ai-tools" className="py-24 bg-black section-sep">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-3">
              Try AI Now
            </p>
            <h2
              className="font-syne text-body mb-3"
              style={{ fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Free AI Tools for Business
            </h2>
            <p className="text-[15px] font-dm text-muted max-w-xl">
              Built with Claude AI — try AKT&apos;s AI tools for free, no login
              required. Experience the quality of our AI work firsthand.
            </p>
          </div>
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-1.5 text-[13px] font-dm font-medium text-primary hover:text-primary-hover transition-colors shrink-0"
          >
            See all tools
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-1.5 rounded-full text-[12px] font-dm font-semibold transition-all duration-150"
              style={{
                background: active === cat ? "#0ABFA3" : "white",
                color: active === cat ? "white" : "#A1A1AA",
                border: `1px solid ${active === cat ? "#0ABFA3" : "#2C2C2E"}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tool cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <div
                key={i}
                className="group bg-[#101113] rounded-card border border-border p-6 hover:border-primary hover:shadow-card transition-all duration-200 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: tool.bg }}
                  >
                    <Icon size={20} style={{ color: tool.color }} strokeWidth={1.75} />
                  </div>
                  <span
                    className="text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full border"
                    style={{
                      background: "#062B26",
                      color: "#0ABFA3",
                      borderColor: "#155E53",
                    }}
                  >
                    {tool.category}
                  </span>
                </div>

                <h3
                  className="font-syne text-body mb-2 group-hover:text-primary transition-colors"
                  style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.01em" }}
                >
                  {tool.name}
                </h3>

                <p className="text-[13px] font-dm text-muted leading-relaxed flex-1 mb-5">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-dm text-muted">
                    <span className="font-semibold text-body">{tool.sessions}</span> sessions
                  </span>
                  <Link
                    href="/ai-tools"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-[12px] font-dm font-semibold transition-colors"
                    style={{
                      background: "#0ABFA3",
                      color: "white",
                    }}
                  >
                    <Zap size={12} fill="white" />
                    Try Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA banner */}
        <div
          className="rounded-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 border"
          style={{ background: "#062B26", borderColor: "#155E53" }}
        >
          <div>
            <p
              className="font-syne text-body text-[20px] mb-1"
              style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              Want custom AI tools for your business?
            </p>
            <p className="text-[14px] font-dm text-muted">
              AKT builds bespoke AI workflows using Claude, OpenAI, and your
              existing tech stack.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[14px] font-dm font-semibold text-white whitespace-nowrap transition-colors"
            style={{ background: "#0ABFA3" }}
          >
            Get Custom AI Build
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
