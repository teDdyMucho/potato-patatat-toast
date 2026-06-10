"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart2,
  Bot,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  LogOut,
  Mail,
  Megaphone,
  MessageSquare,
  Settings,
  Sparkles,
  Target,
  UserRound,
  Wand2,
  Zap,
  CalendarCheck,
  ChevronDown,
  Newspaper,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { isCtaDismissed, dismissCta } from "@/lib/sidebar-cta";
import { reviewCache } from "@/lib/review-cache";
import { sidebarState } from "@/lib/sidebar-state";
import { recentTools } from "@/lib/recent-tools";

/* ─── Tool definitions ─── */
const tools = [
  { category: "Sales AI",       name: "Lead Qualifier",            description: "Qualify leads instantly with AI-powered intent analysis and personalized outreach angles.", icon: BarChart2,     href: "/ai-tools", badge: "Most Popular" },
  { category: "Sales AI",       name: "Cold Email Generator",      description: "Generate complete multi-touch cold email sequences ready to deploy.",                         icon: Mail,          href: "/ai-tools", badge: null },
  { category: "Sales AI",       name: "Objection Handler",         description: "Get conversion-tested responses to any sales objection, instantly.",                          icon: MessageSquare, href: "/ai-tools", badge: null },
  { category: "Content AI",     name: "Blog Post Writer",          description: "SEO-optimized, E-E-A-T-ready blog posts with H2/H3 structure and FAQ.",                       icon: FileText,      href: "/ai-tools", badge: null },
  { category: "Content AI",     name: "Social Caption Generator",  description: "Platform-optimized captions for LinkedIn, Facebook, and Instagram.",                          icon: MessageSquare, href: "/ai-tools", badge: "Most Used" },
  { category: "Content AI",     name: "SEO Brief Generator",       description: "Full SEO content brief: intent, outline, keywords, and competitor angles.",                   icon: Target,        href: "/ai-tools", badge: null },
  { category: "Productivity AI",name: "Meeting Summarizer",        description: "Turn meeting notes into action items, decisions, and deadlines.",                             icon: Calendar,      href: "/ai-tools", badge: null },
  { category: "Productivity AI",name: "Email Responder",           description: "Professional, tone-matched email response drafts ready to send.",                             icon: Mail,          href: "/ai-tools", badge: null },
  { category: "Automation AI",  name: "GoHighLevel Prompt Helper", description: "Generate GHL workflow triggers, sequences, and AI follow-up prompts.",                        icon: Settings,      href: "/ai-tools", badge: "New" },
  { category: "Automation AI",  name: "Workflow Builder Assistant",description: "Map out business automation workflows with suggested tools and triggers.",                    icon: Bot,           href: "/ai-tools", badge: null },
  { category: "Design AI",      name: "Design Adjuster",           description: "Mask and AI-edit any region of a photo while keeping the rest pixel-perfect.",               icon: Wand2,         href: "/ai-tools/design-adjuster", badge: "New" },
  { category: "Marketing AI",   name: "Business FB Ads",           description: "High-converting Facebook and Instagram ad copy tailored to your offer.",                      icon: Megaphone,     href: "/ai-tools", badge: "New" },
];

const CATEGORIES = ["All", "Sales AI", "Content AI", "Design AI", "Productivity AI", "Automation AI", "Marketing AI"];

function greeting(name: string) {
  const h = new Date().getHours();
  const time = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return `${time}, ${name.split(" ")[0]}`;
}

/* ─── Page ─── */
export default function DashboardPage() {
  const router = useRouter();
  const { user, ready, isStaff, isAdmin, logout } = useAuth();

  const [activeCategory, setActiveCategory] = useState("All");
  const [recent, setRecent] = useState(() => recentTools.list);
  const [hasReview, setHasReview] = useState(() => reviewCache.hasReview);
  const [pendingCount, setPendingCount] = useState(() => reviewCache.pendingCount);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showCta, setShowCta] = useState(() => !isCtaDismissed());
  const [sidebarOpen, setSidebarOpen] = useState(() => sidebarState.open);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setSidebarOpen(sidebarState.toggle());

  useEffect(() => {
    if (!ready) return;
    if (!user) { router.replace("/login?redirect=/dashboard"); return; }
    if (isAdmin) { router.replace("/admin"); return; }
    if (isStaff) { router.replace("/review"); return; }
  }, [ready, user, isAdmin, isStaff, router]);

  const checkReview = useCallback(async () => {
    if (!user) return;
    if (isStaff || isAdmin) {
      reviewCache.set(true, 0);
      setHasReview(true);
      return;
    }
    if (reviewCache.fetched) return; // already fetched this session
    try {
      const res = await fetch("/api/project-review/connections");
      if (res.ok) {
        const data = await res.json();
        const conns = data.clientConnections ?? [];
        const pending = conns.flatMap((c: { projects: { status: string }[] }) =>
          c.projects.filter((p) => p.status === "pending"),
        ).length;
        reviewCache.set(conns.length > 0, pending);
        setHasReview(conns.length > 0);
        setPendingCount(pending);
      }
    } catch {}
  }, [user, isStaff, isAdmin]);

  useEffect(() => { checkReview(); }, [checkReview]);
  useEffect(() => recentTools.subscribe(() => setRecent([...recentTools.list])), []);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  if (!ready || !user) return null;

  const filtered = activeCategory === "All" ? tools : tools.filter((t) => t.category === activeCategory);

  return (
    <div className="relative flex h-screen bg-[#050608]">

      {/* ══════════ SIDEBAR ══════════ */}
      <aside
        className="relative flex shrink-0 flex-col border-r border-white/[0.07] bg-[#07080a] transition-[width] duration-300 ease-in-out"
        style={{ width: sidebarOpen ? 220 : 0, overflow: "hidden", minWidth: 0 }}
      >
        <div style={{ width: 220, minWidth: 220 }} className="flex h-full flex-col overflow-hidden">

        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image src="/image/akt_logo.png" alt="AKT" width={421} height={377} className="h-9 w-auto" />
            <div className="leading-none">
              <p className="font-syne text-[14px] font-extrabold tracking-wide text-white">AKT</p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">Workspace</p>
            </div>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {/* AI Tools — always shown */}
            <SidebarItem
              icon={Bot}
              label="AI Tools"
              href="/dashboard"
              active
            />

            {/* Review — only shown when user has access */}
            {hasReview && (
              <SidebarItem
                icon={Briefcase}
                label="Project Review"
                href="/review"
                badge={pendingCount > 0 ? String(pendingCount) : undefined}
              />
            )}

            <SidebarItem icon={Newspaper} label="Blog" href="/blog" />
            <SidebarItem icon={CalendarCheck} label="Consultation" href="/contact" />
          </div>

          {/* Recent Activity */}
          {recent.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 flex items-center gap-2 px-1">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-[10px] font-dm font-semibold uppercase tracking-[0.15em] text-white/25">Recent</span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>
              <div className="space-y-0.5">
                {recent.map((t) => (
                  <Link
                    key={t.name}
                    href={t.href}
                    onClick={() => recentTools.add(t.name, t.category, t.href)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#0ABFA3" }} />
                    <span className="truncate text-[12px] font-dm text-white/45 hover:text-white/70">{t.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Consultation CTA */}
          {showCta && (
            <div className="mt-auto pt-4">
              <div
                className="relative rounded-xl border p-4"
                style={{ background: "#062B26", borderColor: "#155E53" }}
              >
                <button
                  onClick={() => { dismissCta(); setShowCta(false); }}
                  className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-white/10 hover:text-white/70"
                  aria-label="Dismiss"
                >
                  <X size={11} />
                </button>
                <p className="font-syne text-[13px] font-bold text-white leading-snug mb-1 pr-5">
                  Want AKT to build this for your business?
                </p>
                <p className="text-[11px] font-dm text-white/50 mb-3 leading-relaxed">
                  Book a free consultation and we&apos;ll map out how AKT can help.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-lg py-2 text-[12px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#0ABFA3" }}
                >
                  Book a free consultation
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* User section */}
        <div className="border-t border-white/[0.07] p-3" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen((o) => !o)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.05]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#062B26]">
              <UserRound size={15} style={{ color: "#0ABFA3" }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-dm font-semibold text-white">{user.name.split(" ")[0]}</p>
              <p className="truncate text-[10px] font-dm text-muted">{user.email}</p>
            </div>
            <ChevronDown size={13} className={`shrink-0 text-muted transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="mt-1 overflow-hidden rounded-xl border border-white/10 bg-[#0f1012] shadow-xl"
              >
                <Link
                  href="/account"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-dm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <Settings size={14} /> Manage Account
                </Link>
                <button
                  onClick={() => { logout(); setUserMenuOpen(false); }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] font-dm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <LogOut size={14} /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div> {/* end inner fixed-width div */}
      </aside>

      {/* Toggle button — on the sidebar border, centered vertically */}
      <button
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        className="absolute z-30 flex items-center justify-center text-white/50 transition-[left,color] duration-300 hover:text-white"
        style={{
          left: sidebarOpen ? 220 : 0,
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          width: 20,
          height: 52,
          background: "#1a1d22",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}
      >
        {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Welcome header */}
        <header className="relative shrink-0 overflow-hidden border-b border-white/[0.06] bg-[#070809] px-8 py-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #0ABFA3 0%, transparent 70%)" }} />
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p className="mb-1 text-[11px] font-dm font-semibold uppercase tracking-widest" style={{ color: "#0ABFA3" }}>Your Workspace</p>
            <h1 className="font-syne text-[26px] font-extrabold text-white" style={{ letterSpacing: "-0.02em" }}>
              {greeting(user.name)}
            </h1>
            <p className="mt-1 text-[13px] font-dm text-muted">Your AI tools are ready. Pick up where you left off.</p>

            {/* Stats */}
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { label: "Tools Available", value: String(tools.length), icon: Zap },
                { label: "Categories",      value: String(CATEGORIES.length - 1), icon: Sparkles },
                { label: "Always Free",     value: "100%", icon: Clock },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-2">
                  <s.icon size={13} style={{ color: "#0ABFA3" }} />
                  <span className="font-syne text-[15px] font-bold text-white">{s.value}</span>
                  <span className="text-[11px] font-dm text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </header>

        {/* Tools area */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>

            {/* Category pills */}
            <div className="mb-6 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full border px-4 py-1.5 text-[12px] font-dm font-semibold transition-all ${
                    activeCategory === cat
                      ? "border-[#0ABFA3] bg-[#0ABFA3]/10 text-[#0ABFA3]"
                      : "border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-body"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tool grid */}
            <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((tool, i) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={tool.name}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: i * 0.025 }}
                    >
                      <Link
                        href={tool.href}
                        onClick={() => recentTools.add(tool.name, tool.category, tool.href)}
                        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b0d10] p-5 transition-all hover:border-[#0ABFA3]/40 hover:shadow-[0_4px_30px_rgba(10,191,163,0.08)]"
                      >
                        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.025] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <span className="pointer-events-none absolute left-2 top-2 h-3 w-3 rounded-tl border-l border-t border-[#0ABFA3]/20" />
                        <span className="pointer-events-none absolute right-2 top-2 h-3 w-3 rounded-tr border-r border-t border-[#0ABFA3]/20" />
                        <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 rounded-bl border-b border-l border-[#0ABFA3]/20" />
                        <span className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 rounded-br border-b border-r border-[#0ABFA3]/20" />

                        <div className="mb-4 flex items-start justify-between gap-2">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: "#062B26" }}>
                            <Icon size={18} style={{ color: "#0ABFA3" }} />
                          </div>
                          {tool.badge && (
                            <span className="rounded-full border border-[#0ABFA3]/30 bg-[#0ABFA3]/10 px-2 py-0.5 text-[10px] font-dm font-semibold" style={{ color: "#0ABFA3" }}>
                              {tool.badge}
                            </span>
                          )}
                        </div>

                        <p className="mb-1 text-[10px] font-dm font-semibold uppercase tracking-widest text-muted">{tool.category}</p>
                        <p className="mb-2 font-syne text-[14px] font-bold leading-snug text-white" style={{ letterSpacing: "-0.01em" }}>{tool.name}</p>
                        <p className="flex-1 text-[12px] font-dm leading-relaxed text-muted">{tool.description}</p>

                        <div className="mt-4 flex items-center gap-1 text-[12px] font-dm font-semibold" style={{ color: "#0ABFA3" }}>
                          Launch <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar item ─── */
function SidebarItem({
  icon: Icon,
  label,
  href,
  active = false,
  badge,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-dm font-semibold transition-all ${
        active
          ? "bg-[#0ABFA3]/10 text-[#0ABFA3]"
          : "text-white/55 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white" style={{ background: "#F59E0B" }}>
          {badge}
        </span>
      )}
    </Link>
  );
}
