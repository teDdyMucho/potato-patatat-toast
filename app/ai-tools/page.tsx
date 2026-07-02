"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Loader2,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// `contactNeed` is sent to /api/leads as the lead's "need" tag. `requirePhone`
// marks tools where a phone number is essential (Retell AI needs one to
// actually place/receive calls). `sampleItems`/`sampleNote` back the preview
// shown once someone unlocks the sample by submitting the gate form.
const tools = [
  {
    slug: "retell-ai",
    category: "Voice AI",
    name: "Retell AI",
    description:
      "AI voice agent that answers, screens, and qualifies inbound and outbound calls 24/7 — books appointments straight into your calendar and hands off warm leads to your team.",
    icon: Phone,
    color: "#0ABFA3",
    bg: "#062B26",
    tag: "Powered by Retell AI",
    badge: "Most Popular",
    contactNeed: "Retell AI / VAPI",
    requirePhone: true,
    sampleTitle: "Sample call",
    sampleItems: [
      { label: "Caller", text: "Hi, I saw your ad — do you guys help with lead follow-up?" },
      { label: "AI Agent", text: "Yes! We can set up an AI voice agent that answers every call, qualifies the lead, and books them straight into your calendar. Can I grab your name and best callback number?" },
      { label: "Caller", text: "Sure, it's Mike, 555-2010." },
      { label: "AI Agent", text: "Thanks, Mike! I've got you down for a free strategy call Thursday at 2 PM — you'll get a text confirmation shortly." },
    ],
    sampleNote: "Answers in under 2 seconds, works 24/7, and never misses a call.",
  },
  {
    slug: "nurturing-ghl",
    category: "GoHighLevel AI",
    name: "Nurturing Sequence on GHL",
    description:
      "Automated multi-touch email + SMS nurture sequence built inside GoHighLevel — keeps leads warm with personalized, timed follow-ups until they're ready to buy.",
    icon: Workflow,
    color: "#0ABFA3",
    bg: "#073B34",
    tag: "Built on GoHighLevel",
    badge: null,
    contactNeed: "GoHighLevel Setup",
    requirePhone: false,
    sampleTitle: "Sample nurture timeline",
    sampleItems: [
      { label: "Day 0", text: "Welcome email — introduces your business and sets expectations." },
      { label: "Day 1", text: "SMS check-in — quick, friendly nudge to stay top of mind." },
      { label: "Day 3", text: "Value email — a case study or testimonial that builds trust." },
      { label: "Day 6", text: "SMS + email combo — a direct offer or clear next step." },
      { label: "Day 10", text: "Final follow-up — last touch before moving to long-term nurture." },
    ],
    sampleNote: "Fully automated inside your GoHighLevel account — no manual follow-up needed.",
  },
  {
    slug: "outreach-ghl",
    category: "GoHighLevel AI",
    name: "Outreach Sequence on GHL",
    description:
      "Done-for-you cold outreach automation in GoHighLevel — multi-channel touchpoints, smart delays, and reply detection so your pipeline fills itself.",
    icon: Send,
    color: "#0ABFA3",
    bg: "#073B34",
    tag: "Built on GoHighLevel",
    badge: "New",
    contactNeed: "GoHighLevel Setup",
    requirePhone: false,
    sampleTitle: "Sample outreach cadence",
    sampleItems: [
      { label: "Day 0", text: "Cold email #1 — a personalized opener based on their industry." },
      { label: "Day 2", text: "LinkedIn connection request with a short note." },
      { label: "Day 4", text: "Cold email #2 — follow-up with a specific value proposition." },
      { label: "Day 7", text: "SMS touch, when a number is available." },
      { label: "Day 10", text: "Break-up email — final attempt that keeps the door open." },
    ],
    sampleNote: "The sequence pauses automatically the moment a lead replies.",
  },
  {
    slug: "chatbot-ghl",
    category: "GoHighLevel AI",
    name: "Chat Bot on GHL",
    description:
      "AI chatbot embedded in your website and GoHighLevel conversations — answers FAQs, qualifies visitors, and routes hot leads to your sales team in real time.",
    icon: MessageSquare,
    color: "#0ABFA3",
    bg: "#062B26",
    tag: "Built on GoHighLevel",
    badge: "New",
    contactNeed: "CloseBot / Sales AI",
    requirePhone: false,
    sampleTitle: "Sample chat",
    sampleItems: [
      { label: "Visitor", text: "Hey, do you guys build websites too?" },
      { label: "AI Chatbot", text: "We sure do! We also build AI voice agents and full GoHighLevel automation. Want me to connect you with our team?" },
      { label: "Visitor", text: "Yes please" },
      { label: "AI Chatbot", text: "Awesome — what's the best email to reach you at?" },
    ],
    sampleNote: "Embeds on your website and syncs replies straight into GoHighLevel conversations.",
  },
];

const categories = ["All", "Voice AI", "GoHighLevel AI"];

function AIToolsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, ready, isAdmin, isStaff } = useAuth();
  const [active, setActive] = useState("All");

  const [activeTool, setActiveTool] = useState<(typeof tools)[number] | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [gateForm, setGateForm] = useState({ firstName: "", email: "", phone: "" });
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [gateError, setGateError] = useState("");

  // Regular users get the personalised dashboard; admin/staff stay on this
  // page. Skipped while a tool's sample modal is open (or about to be reopened
  // via ?openTool=) so a regular customer coming back from login still gets
  // to see the sample before being sent to their dashboard.
  const pendingOpenTool = searchParams.get("openTool");
  useEffect(() => {
    if (ready && user && !isAdmin && !isStaff && !pendingOpenTool && !activeTool) {
      router.replace("/dashboard");
    }
  }, [ready, user, isAdmin, isStaff, pendingOpenTool, activeTool, router]);

  const filtered =
    active === "All" ? tools : tools.filter((t) => t.category === active);

  const openSample = (tool: (typeof tools)[number]) => {
    setActiveTool(tool);
    setUnlocked(false);
    setGateError("");
    setGateForm({
      firstName: user ? user.name.trim().split(" ")[0] ?? "" : "",
      email: user?.email ?? "",
      phone: "",
    });
  };

  const closeSample = () => setActiveTool(null);

  const handleGetStarted = (tool: (typeof tools)[number]) => {
    // Not logged in — send them to log in first, then bounce back here to
    // reopen this tool's sample modal automatically.
    if (ready && !user) {
      router.push(`/login?redirect=${encodeURIComponent(`/ai-tools?openTool=${tool.slug}`)}`);
      return;
    }
    openSample(tool);
  };

  // Coming back from a login redirect (?openTool=<slug>) — reopen the tool's
  // sample modal now that we're logged in, then clean the URL.
  useEffect(() => {
    if (!ready || !user || !pendingOpenTool) return;
    const tool = tools.find((t) => t.slug === pendingOpenTool);
    if (tool) openSample(tool);
    router.replace("/ai-tools");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user, pendingOpenTool]);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTool) return;
    setGateError("");
    setGateSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: gateForm.firstName,
          email: gateForm.email,
          phone: gateForm.phone,
          need: activeTool.contactNeed,
          message: `Requested a sample of "${activeTool.name}" from the AI Tools page.`,
          userId: user?.id ?? null,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setUnlocked(true);
    } catch (err) {
      setGateError(
        err instanceof Error ? err.message : "Couldn't unlock the sample. Please try again.",
      );
    } finally {
      setGateSubmitting(false);
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
                      <button
                        type="button"
                        onClick={() => handleGetStarted(tool)}
                        className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[12px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: "#0ABFA3" }}
                      >
                        <Zap size={12} fill="white" />
                        Get Started
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

      {/* ── Sample unlock / preview modal ── */}
      <AnimatePresence>
        {activeTool && (
          <>
            <motion.div
              key="sample-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={closeSample}
            />
            <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                key="sample-panel"
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 20 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl shadow-black/60"
                style={{ maxHeight: "min(88vh, 640px)" }}
              >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: activeTool.bg }}>
                      <activeTool.icon size={17} style={{ color: activeTool.color }} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="font-syne text-[15px] font-bold text-white">{activeTool.name}</p>
                      <p className="text-[12px] font-dm text-white/40">{activeTool.tag}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeSample}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                    aria-label="Close"
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto p-6">
                  {!unlocked ? (
                    <form onSubmit={handleUnlock}>
                      <p className="mb-5 text-[13px] font-dm leading-relaxed text-white/50">
                        Tell us where to reach you and we&apos;ll unlock a live sample of {activeTool.name} right here.
                      </p>

                      <div className="mb-4">
                        <label className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                          First Name <span className="text-[#0ABFA3]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          autoComplete="given-name"
                          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] font-dm text-white placeholder:text-white/25 transition-colors focus:border-[#0ABFA3]/60 focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/20"
                          placeholder="Your first name"
                          value={gateForm.firstName}
                          onChange={(e) => setGateForm({ ...gateForm, firstName: e.target.value })}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                          Email <span className="text-[#0ABFA3]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] font-dm text-white placeholder:text-white/25 transition-colors focus:border-[#0ABFA3]/60 focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/20"
                          placeholder="your@email.com"
                          value={gateForm.email}
                          onChange={(e) => setGateForm({ ...gateForm, email: e.target.value })}
                        />
                      </div>

                      {activeTool.requirePhone && (
                        <div className="mb-4">
                          <label className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-[0.14em] text-white/40">
                            Phone <span className="text-[#0ABFA3]">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            autoComplete="tel"
                            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[14px] font-dm text-white placeholder:text-white/25 transition-colors focus:border-[#0ABFA3]/60 focus:outline-none focus:ring-1 focus:ring-[#0ABFA3]/20"
                            placeholder="+1 555 000 0000"
                            value={gateForm.phone}
                            onChange={(e) => setGateForm({ ...gateForm, phone: e.target.value })}
                          />
                        </div>
                      )}

                      {gateError && (
                        <p className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-dm text-red-300" role="alert">
                          {gateError}
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={gateSubmitting}
                        whileHover={{ scale: gateSubmitting ? 1 : 1.01 }}
                        whileTap={{ scale: gateSubmitting ? 1 : 0.98 }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-dm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                        style={{ background: "linear-gradient(135deg, #0ABFA3 0%, #089080 100%)" }}
                      >
                        {gateSubmitting ? (
                          <><Loader2 size={16} className="animate-spin" /> Unlocking…</>
                        ) : (
                          <><Sparkles size={15} /> Show Me the Sample</>
                        )}
                      </motion.button>
                    </form>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                      <div className="mb-4 flex items-center gap-2 text-[12px] font-dm font-semibold" style={{ color: "#0ABFA3" }}>
                        <CheckCircle size={14} />
                        {activeTool.sampleTitle}
                      </div>
                      <div className="mb-5 space-y-3">
                        {activeTool.sampleItems.map((item, i) => (
                          <div key={i} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                            <p className="mb-1 text-[10px] font-dm font-semibold uppercase tracking-widest" style={{ color: "#0ABFA3" }}>
                              {item.label}
                            </p>
                            <p className="text-[13px] font-dm leading-relaxed text-white/70">{item.text}</p>
                          </div>
                        ))}
                      </div>
                      <p className="mb-6 text-[12px] font-dm leading-relaxed text-white/40">
                        {activeTool.sampleNote}
                      </p>
                      <Link
                        href="/contact"
                        onClick={closeSample}
                        className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-dm font-bold text-white transition-opacity hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #0ABFA3 0%, #089080 100%)" }}
                      >
                        Book a Free Consultation
                        <ArrowUpRight size={15} />
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default function AIToolsPage() {
  return (
    <Suspense fallback={null}>
      <AIToolsContent />
    </Suspense>
  );
}
