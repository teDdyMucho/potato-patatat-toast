"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
];

const categories = [
  "All",
  "Sales AI",
  "Content AI",
  "Productivity AI",
  "Automation AI",
];

export default function AIToolsPage() {
  const [active, setActive] = useState("All");
  const [activeToolIndex, setActiveToolIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const filtered =
    active === "All" ? tools : tools.filter((t) => t.category === active);

  const handleTry = async (toolName: string, index: number) => {
    setActiveToolIndex(index);
    setOutput("");
  };

  const handleRun = async () => {
    if (!inputValue.trim() || activeToolIndex === null) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/ai-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: filtered[activeToolIndex]?.name,
          input: inputValue,
        }),
      });
      const data = await res.json();
      setOutput(data.result || "No output returned.");
    } catch {
      setOutput("Error connecting to AI. Please try again.");
    } finally {
      setLoading(false);
    }
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
                Built with Claude AI — try AKT&apos;s AI tools for free. No
                login, no commitment. Experience the quality of our AI work
                firsthand before you hire us to build it for your business.
              </p>
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActive(cat);
                    setActiveToolIndex(null);
                    setOutput("");
                    setInputValue("");
                  }}
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tool cards */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 content-start">
                {filtered.map((tool, i) => {
                  const Icon = tool.icon;
                  const isActive = activeToolIndex === i;
                  return (
                    <div
                      key={i}
                      className="group bg-[#101113] rounded-card flex flex-col transition-all duration-200 overflow-hidden"
                      style={{
                        border: isActive
                          ? "1.5px solid #0ABFA3"
                          : "1px solid #2C2C2E",
                        boxShadow: isActive ? "0 4px 16px rgba(29,111,235,0.10)" : "none",
                      }}
                    >
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: tool.bg }}
                          >
                            <Icon size={18} style={{ color: tool.color }} strokeWidth={1.75} />
                          </div>
                          <div className="flex items-center gap-2">
                            {tool.badge && (
                              <span
                                className="text-[10px] font-dm font-bold px-2 py-0.5 rounded-full"
                                style={{
                                  background:
                                    tool.badge === "New" ? "#073B34" : "#062B26",
                                  color:
                                    tool.badge === "New" ? "#0ABFA3" : "#0ABFA3",
                                }}
                              >
                                {tool.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <h3
                          className="font-syne text-body text-[15px] font-bold mb-1.5"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {tool.name}
                        </h3>
                        <p className="text-[12px] font-dm text-muted leading-relaxed mb-3">
                          {tool.description}
                        </p>
                        <p className="text-[11px] font-dm text-muted">
                          <span className="font-semibold text-body">{tool.sessions}</span> sessions
                        </p>
                      </div>
                      <div className="px-5 pb-4">
                        <button
                          onClick={() => handleTry(tool.name, i)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-md text-[12px] font-dm font-semibold transition-colors"
                          style={{
                            background: isActive ? "#0ABFA3" : "#0ABFA3",
                            color: "white",
                          }}
                        >
                          <Zap size={12} fill="white" />
                          {isActive ? "Selected" : "Try Now"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live demo panel */}
              <div className="lg:col-span-1">
                <div
                  className="sticky top-20 bg-[#101113] rounded-card border border-border p-6"
                  style={{ minHeight: "400px" }}
                >
                  {activeToolIndex === null ? (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                        style={{ background: "#073B34" }}
                      >
                        <Zap size={22} style={{ color: "#0ABFA3" }} />
                      </div>
                      <p
                        className="font-syne text-body text-[15px] font-bold mb-2"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        Pick a tool to try
                      </p>
                      <p className="text-[13px] font-dm text-muted">
                        Select any tool from the list to run it live — powered by Claude AI.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-5">
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center"
                          style={{ background: filtered[activeToolIndex].bg }}
                        >
                          {(() => {
                            const Icon = filtered[activeToolIndex].icon;
                            return (
                              <Icon
                                size={14}
                                style={{ color: filtered[activeToolIndex].color }}
                                strokeWidth={1.75}
                              />
                            );
                          })()}
                        </div>
                        <span
                          className="font-syne text-body text-[14px] font-bold"
                          style={{ letterSpacing: "-0.01em" }}
                        >
                          {filtered[activeToolIndex].name}
                        </span>
                      </div>

                      <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                        Your Input
                      </label>
                      <textarea
                        className="w-full border border-border rounded-md p-3 text-[13px] font-dm text-body resize-none focus:outline-none focus:border-primary transition-colors"
                        rows={5}
                        placeholder="Enter your content, leads, topic, or question here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />

                      <button
                        onClick={handleRun}
                        disabled={!inputValue.trim() || loading}
                        className="w-full mt-3 py-2.5 rounded-md text-[13px] font-dm font-semibold text-white transition-colors disabled:opacity-50"
                        style={{ background: "#0ABFA3" }}
                      >
                        {loading ? "Running Claude AI..." : "Run Tool →"}
                      </button>

                      {output && (
                        <div className="mt-5">
                          <label className="block text-[12px] font-dm font-semibold text-muted uppercase tracking-wide mb-2">
                            AI Output
                          </label>
                          <div
                            className="rounded-md p-4 text-[13px] font-dm text-body leading-relaxed whitespace-pre-wrap border"
                            style={{ background: "#101113", borderColor: "#2C2C2E" }}
                          >
                            {output}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
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
