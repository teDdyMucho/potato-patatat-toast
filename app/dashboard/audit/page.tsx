"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BarChart2,
  Bot,
  Briefcase,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
  ExternalLink,
  Globe,
  Link2,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Newspaper,
  Phone,
  Search,
  Settings,
  Star,
  TrendingUp,
  User2,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { sidebarState } from "@/lib/sidebar-state";
import { reviewCache } from "@/lib/review-cache";

/* ─── Types ─── */
type SocialLinks = { facebook?: string | null; instagram?: string | null; linkedin?: string | null; youtube?: string | null; tiktok?: string | null; x_twitter?: string | null };
type OwnerResearch = { owner_name?: string | null; owner_title?: string | null; linkedin_url?: string | null; source_url?: string | null; confidence?: string | null };
type GoogleProfile = { profile_url?: string | null; google_rating?: number | null; review_count?: number | null; review_sentiment?: string | null; positive_review_themes?: string[]; negative_review_themes?: string[]; recent_review_issues?: string[]; appears_active?: boolean | null };
type SearchVisibility = { google_search_presence?: boolean; google_maps_presence?: boolean; directory_presence?: string[]; visibility_score?: string; visibility_level?: string; seo_issues?: string[]; missing_trust_signals?: string[] };
type LeadQualification = { is_good_prospect?: boolean; prospect_quality?: string; possible_business_problems?: string[]; automation_opportunities?: string[]; recommended_outreach_angle?: string | null };
type Audit = { id: string; website_url: string; business_name: string | null; industry: string | null; business_category: string | null; business_description: string | null; services_offered: string[]; location: string | null; service_area: string | null; phone: string | null; email: string | null; contact_page_url: string | null; social_links: SocialLinks; owner_research: OwnerResearch; google_business_profile: GoogleProfile; search_visibility: SearchVisibility; lead_qualification: LeadQualification; sources: string[]; created_at: string };

const visibilityColor: Record<string, string> = { "very high": "text-emerald-400", high: "text-green-400", moderate: "text-amber-400", medium: "text-amber-400", low: "text-red-400" };
const confidenceColor: Record<string, string> = { high: "text-emerald-400", medium: "text-amber-400", low: "text-red-400" };

function Chip({ children, color = "default" }: { children: React.ReactNode; color?: "green" | "red" | "amber" | "default" }) {
  const cls = { green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20", red: "bg-red-500/10 text-red-300 border-red-500/20", amber: "bg-amber-500/10 text-amber-300 border-amber-500/20", default: "bg-white/5 text-white/60 border-white/10" }[color];
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-dm font-semibold ${cls}`}>{children}</span>;
}

function AuditCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#07080a] p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0ABFA3]/10 text-[#0ABFA3]">{icon}</span>
        <h3 className="font-syne text-[15px] font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ─── Page ─── */
export default function DashboardAuditPage() {
  const router = useRouter();
  const { user, ready, isAdmin, isStaff, logout } = useAuth();

  const [audit, setAudit] = useState<Audit | null>(null);
  const [loading, setLoading] = useState(true);
  const [auditError, setAuditError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(() => sidebarState.open);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [hasReview, setHasReview] = useState(() => reviewCache.hasReview);
  const [pendingCount, setPendingCount] = useState(() => reviewCache.pendingCount);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setSidebarOpen(sidebarState.toggle());
  const closeMobileDrawer = () => setMobileDrawerOpen(false);

  useEffect(() => {
    if (!ready) return;
    if (!user) { router.replace("/login?redirect=/dashboard/audit"); return; }
    if (isAdmin) { router.replace("/admin"); return; }
    if (isStaff) { router.replace("/review"); return; }
  }, [ready, user, isAdmin, isStaff, router]);

  useEffect(() => {
    if (!ready || !user) return;
    fetch("/api/audit")
      .then((r) => r.json())
      .then((d) => { if (d.audit) setAudit(d.audit); else setAuditError("No audit found."); })
      .catch(() => setAuditError("Failed to load audit."))
      .finally(() => setLoading(false));
  }, [ready, user]);

  useEffect(() => {
    if (!user || isStaff || isAdmin || reviewCache.fetched) return;
    fetch("/api/project-review/connections").then(async (res) => {
      if (!res.ok) return;
      const data = await res.json();
      const conns = data.clientConnections ?? [];
      const pending = conns.flatMap((c: { projects: { status: string }[] }) => c.projects.filter((p) => p.status === "pending")).length;
      reviewCache.set(conns.length > 0, pending);
      setHasReview(conns.length > 0);
      setPendingCount(pending);
    }).catch(() => {});
  }, [user, isStaff, isAdmin]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: MouseEvent) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileDrawerOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  if (!ready || !user) return null;

  const sv = audit?.search_visibility;
  const gbp = audit?.google_business_profile;
  const lq = audit?.lead_qualification;
  const own = audit?.owner_research;
  const sl = audit?.social_links;
  const visScore = String(sv?.visibility_score ?? "").toLowerCase();

  /* ── Sidebar shared render ── */
  const SidebarNav = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col flex-1 overflow-y-auto py-4 px-3">
      <div className="space-y-1">
        <SidebarItem icon={Bot} label="AI Tools" href="/dashboard" onClick={onClick} />
        {hasReview && <SidebarItem icon={Briefcase} label="Project Review" href="/review" badge={pendingCount > 0 ? String(pendingCount) : undefined} onClick={onClick} />}
        <SidebarItem icon={BarChart2} label="Business Audit" href="/dashboard/audit" active onClick={onClick} />
        <SidebarItem icon={Newspaper} label="Blog" href="/blog" onClick={onClick} />
        <SidebarItem icon={CalendarCheck} label="Consultation" href="/contact" onClick={onClick} />
      </div>
    </nav>
  );

  const UserSection = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <div className="border-t border-white/[0.07] p-3" ref={userMenuRef}>
      <button onClick={() => setUserMenuOpen((o) => !o)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/[0.05]">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#062B26]"><UserRound size={15} style={{ color: "#0ABFA3" }} /></div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-dm font-semibold text-white">{user.name.split(" ")[0]}</p>
          <p className="truncate text-[10px] font-dm text-white/40">{user.email}</p>
        </div>
        <ChevronDown size={13} className={`shrink-0 text-white/40 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {userMenuOpen && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.15 }} className="mt-1 overflow-hidden rounded-xl border border-white/10 bg-[#0f1012] shadow-xl">
            <Link href="/account" onClick={() => { setUserMenuOpen(false); onLinkClick?.(); }} className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-dm text-white/70 transition-colors hover:bg-white/5 hover:text-white"><Settings size={14} /> Manage Account</Link>
            <button onClick={() => { logout(); setUserMenuOpen(false); }} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] font-dm text-white/70 transition-colors hover:bg-white/5 hover:text-white"><LogOut size={14} /> Log out</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="relative flex h-screen flex-col bg-[#050608] lg:flex-row">

      {/* Mobile top bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#07080a] px-4 py-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Image src="/image/akt_logo.png" alt="AKT" width={421} height={377} className="h-8 w-auto" />
          <div className="leading-none">
            <p className="font-syne text-[13px] font-extrabold tracking-wide text-white">AKT</p>
            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">Workspace</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-dm font-semibold text-white/60">Business Audit</span>
          <button onClick={() => setMobileDrawerOpen(true)} aria-label="Open menu" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"><Menu size={18} /></button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" onClick={closeMobileDrawer} />
            <motion.aside key="drawer" initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", stiffness: 380, damping: 35 }} className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.07] bg-[#07080a] shadow-2xl lg:hidden">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <Link href="/dashboard" onClick={closeMobileDrawer} className="flex items-center gap-3">
                  <Image src="/image/akt_logo.png" alt="AKT" width={421} height={377} className="h-9 w-auto" />
                  <div className="leading-none"><p className="font-syne text-[14px] font-extrabold tracking-wide text-white">AKT</p><p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">Workspace</p></div>
                </Link>
                <button onClick={closeMobileDrawer} aria-label="Close menu" className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-colors hover:text-white"><X size={16} /></button>
              </div>
              <SidebarNav onClick={closeMobileDrawer} />
              <UserSection onLinkClick={closeMobileDrawer} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="relative hidden shrink-0 flex-col border-r border-white/[0.07] bg-[#07080a] transition-[width] duration-300 ease-in-out lg:flex" style={{ width: sidebarOpen ? 220 : 0, overflow: "hidden", minWidth: 0 }}>
        <div style={{ width: 220, minWidth: 220 }} className="flex h-full flex-col overflow-hidden">
          <div className="flex items-center gap-3 border-b border-white/[0.07] px-5 py-5">
            <Link href="/dashboard" className="flex items-center gap-3">
              <Image src="/image/akt_logo.png" alt="AKT" width={421} height={377} className="h-9 w-auto" />
              <div className="leading-none"><p className="font-syne text-[14px] font-extrabold tracking-wide text-white">AKT</p><p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">Workspace</p></div>
            </Link>
          </div>
          <SidebarNav />
          <UserSection />
        </div>
      </aside>

      {/* Sidebar toggle */}
      <button onClick={toggleSidebar} aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"} className="absolute z-30 hidden items-center justify-center text-white/50 transition-[left,color] duration-300 hover:text-white lg:flex" style={{ left: sidebarOpen ? 220 : 0, top: "50%", transform: "translateX(-50%) translateY(-50%)", width: 20, height: 52, background: "#1a1d22", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
        {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="shrink-0 border-b border-white/[0.06] bg-[#070809] px-6 py-5 lg:px-8 lg:py-7">
          <p className="mb-0.5 text-[11px] font-dm font-semibold uppercase tracking-widest" style={{ color: "#0ABFA3" }}>Your Business</p>
          <h1 className="font-syne font-extrabold text-white" style={{ fontSize: "clamp(18px, 4vw, 26px)", letterSpacing: "-0.02em" }}>
            {audit?.business_name ?? "Business Audit"}
          </h1>
          {audit?.website_url && (
            <a href={audit.website_url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-dm text-white/40 hover:text-[#0ABFA3] transition-colors">
              <Globe size={12} /> {audit.website_url}
            </a>
          )}
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <Loader2 size={28} className="animate-spin" style={{ color: "#0ABFA3" }} />
            </div>
          ) : auditError || !audit ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
              <AlertCircle size={36} className="mb-4 text-white/20" />
              <p className="font-syne text-[20px] font-bold text-white mb-2">No audit available yet</p>
              <p className="text-[14px] font-dm text-white/40 max-w-sm">Your website audit is being processed. Check back shortly — it usually takes a few minutes.</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

              {/* Stat cards */}
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Visibility", value: sv?.visibility_level ?? "—", sub: sv?.visibility_score ?? "", color: visibilityColor[visScore] ?? "text-white", icon: <TrendingUp size={15} /> },
                  { label: "Google Search", value: sv?.google_search_presence ? "Present" : "Missing", sub: "", color: sv?.google_search_presence ? "text-emerald-400" : "text-red-400", icon: <Search size={15} /> },
                  { label: "Google Maps", value: sv?.google_maps_presence ? "Listed" : "Not listed", sub: "", color: sv?.google_maps_presence ? "text-emerald-400" : "text-red-400", icon: <MapPin size={15} /> },
                  { label: "Google Rating", value: gbp?.google_rating != null ? `${gbp.google_rating} ★` : "—", sub: gbp?.review_count != null ? `${gbp.review_count} reviews` : "", color: "text-amber-400", icon: <Star size={15} /> },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/[0.07] bg-[#07080a] p-4">
                    <div className="flex items-center gap-2 text-white/40 mb-2">{s.icon}<span className="text-[10px] font-dm font-semibold uppercase tracking-wide">{s.label}</span></div>
                    <p className={`font-syne text-[17px] font-bold ${s.color}`}>{s.value}</p>
                    {s.sub && <p className="text-[11px] font-dm text-white/40 mt-0.5">{s.sub}</p>}
                  </div>
                ))}
              </div>

              {/* Cards grid */}
              <div className="grid gap-5 lg:grid-cols-2">

                {/* Business overview */}
                <AuditCard title="Business overview" icon={<Building2 size={16} />}>
                  {audit.industry && <div className="mb-3 flex flex-wrap gap-1.5">{audit.industry && <Chip>{audit.industry}</Chip>}{audit.business_category && <Chip>{audit.business_category}</Chip>}</div>}
                  {audit.business_description && <p className="text-[13px] font-dm text-white/50 leading-relaxed mb-4">{audit.business_description}</p>}
                  <div className="space-y-2 text-[13px] font-dm">
                    {audit.location && <div className="flex items-start gap-2 text-white/50"><MapPin size={13} className="mt-0.5 shrink-0" style={{ color: "#0ABFA3" }} />{audit.location}</div>}
                    {audit.service_area && <div className="flex items-start gap-2 text-white/50"><Globe size={13} className="mt-0.5 shrink-0" style={{ color: "#0ABFA3" }} />Service area: {audit.service_area}</div>}
                    {audit.phone && <div className="flex items-center gap-2 text-white/50"><Phone size={13} className="shrink-0" style={{ color: "#0ABFA3" }} />{audit.phone}</div>}
                    {audit.email && <div className="flex items-center gap-2 text-white/50"><Mail size={13} className="shrink-0" style={{ color: "#0ABFA3" }} />{audit.email}</div>}
                    {audit.contact_page_url && <a href={audit.contact_page_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline" style={{ color: "#0ABFA3" }}><ExternalLink size={13} />Contact page</a>}
                  </div>
                  {(audit.services_offered?.length ?? 0) > 0 && (
                    <div className="mt-4">
                      <p className="text-[10px] font-dm font-semibold uppercase tracking-wide text-white/30 mb-2">Services</p>
                      <div className="flex flex-wrap gap-1.5">{audit.services_offered.map((s) => <Chip key={s}>{s}</Chip>)}</div>
                    </div>
                  )}
                </AuditCard>

                {/* Owner research */}
                <AuditCard title="Owner research" icon={<User2 size={16} />}>
                  {own?.owner_name ? (
                    <div className="space-y-3">
                      <div>
                        <p className="font-syne text-[17px] font-bold text-white">{own.owner_name}</p>
                        {own.owner_title && <p className="text-[13px] font-dm text-white/50 mt-0.5">{own.owner_title}</p>}
                      </div>
                      {own.confidence && <div className="flex items-center gap-2"><span className="text-[12px] font-dm text-white/40">Confidence:</span><span className={`text-[12px] font-dm font-semibold capitalize ${confidenceColor[own.confidence.toLowerCase()] ?? "text-white"}`}>{own.confidence}</span></div>}
                      {own.linkedin_url && <a href={own.linkedin_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-dm hover:underline" style={{ color: "#0ABFA3" }}><Link2 size={13} />LinkedIn profile</a>}
                      {own.source_url && <p className="text-[11px] font-dm text-white/30">Source: {own.source_url}</p>}
                    </div>
                  ) : <p className="text-[13px] font-dm text-white/40">No owner data found.</p>}
                </AuditCard>

                {/* Search visibility */}
                <AuditCard title="Search visibility" icon={<Search size={16} />}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-dm text-white/50">Visibility score</span>
                      <span className={`font-syne text-[15px] font-bold capitalize ${visibilityColor[visScore] ?? "text-white"}`}>{sv?.visibility_score ?? "—"}</span>
                    </div>
                    {(sv?.directory_presence?.length ?? 0) > 0 && <div><p className="text-[10px] font-dm font-semibold uppercase tracking-wide text-white/30 mb-2">Listed on</p><div className="flex flex-wrap gap-1.5">{sv!.directory_presence!.map((d) => <Chip key={d} color="green">{d}</Chip>)}</div></div>}
                    {(sv?.seo_issues?.length ?? 0) > 0 && <div><p className="text-[10px] font-dm font-semibold uppercase tracking-wide text-white/30 mb-2">SEO issues</p><ul className="space-y-1">{sv!.seo_issues!.map((i) => <li key={i} className="flex items-start gap-2 text-[13px] font-dm text-red-400"><XCircle size={13} className="mt-0.5 shrink-0" />{i}</li>)}</ul></div>}
                    {(sv?.missing_trust_signals?.length ?? 0) > 0 && <div><p className="text-[10px] font-dm font-semibold uppercase tracking-wide text-white/30 mb-2">Missing trust signals</p><ul className="space-y-1">{sv!.missing_trust_signals!.map((i) => <li key={i} className="flex items-start gap-2 text-[13px] font-dm text-amber-400"><AlertCircle size={13} className="mt-0.5 shrink-0" />{i}</li>)}</ul></div>}
                  </div>
                </AuditCard>

                {/* Google Business Profile */}
                <AuditCard title="Google Business Profile" icon={<Star size={16} />}>
                  {gbp?.profile_url ? <a href={gbp.profile_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-dm hover:underline mb-4" style={{ color: "#0ABFA3" }}><ExternalLink size={13} />View profile</a> : <p className="text-[13px] font-dm text-white/40 mb-4">No Google Business Profile found.</p>}
                  {gbp?.google_rating != null && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-syne text-[22px] font-bold text-amber-400">{gbp.google_rating}</span>
                      <div>
                        <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={i < Math.round(gbp.google_rating!) ? "text-amber-400 fill-amber-400" : "text-white/20"} />)}</div>
                        {gbp.review_count != null && <p className="text-[11px] font-dm text-white/40">{gbp.review_count} reviews</p>}
                      </div>
                    </div>
                  )}
                  {(gbp?.positive_review_themes?.length ?? 0) > 0 && <div className="mb-3"><p className="text-[10px] font-dm font-semibold uppercase tracking-wide text-white/30 mb-1.5">Positive themes</p><div className="flex flex-wrap gap-1.5">{gbp!.positive_review_themes!.map((t) => <Chip key={t} color="green">{t}</Chip>)}</div></div>}
                  {(gbp?.negative_review_themes?.length ?? 0) > 0 && <div><p className="text-[10px] font-dm font-semibold uppercase tracking-wide text-white/30 mb-1.5">Negative themes</p><div className="flex flex-wrap gap-1.5">{gbp!.negative_review_themes!.map((t) => <Chip key={t} color="red">{t}</Chip>)}</div></div>}
                </AuditCard>

                {/* Lead qualification */}
                <AuditCard title="Lead qualification" icon={<CheckCircle2 size={16} />}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {lq?.is_good_prospect ? <CheckCircle2 size={20} className="text-emerald-400" /> : <XCircle size={20} className="text-red-400" />}
                      <div>
                        <p className="font-syne text-[15px] font-bold text-white">{lq?.is_good_prospect ? "Good prospect" : "Not a prospect"}</p>
                        {lq?.prospect_quality && <p className="text-[12px] font-dm text-white/40">{lq.prospect_quality}</p>}
                      </div>
                    </div>
                    {(lq?.possible_business_problems?.length ?? 0) > 0 && <div><p className="text-[10px] font-dm font-semibold uppercase tracking-wide text-white/30 mb-2">Business problems</p><ul className="space-y-1">{lq!.possible_business_problems!.map((p) => <li key={p} className="flex items-start gap-2 text-[13px] font-dm text-white/50"><ChevronRightIcon size={13} className="mt-0.5 shrink-0" style={{ color: "#0ABFA3" }} />{p}</li>)}</ul></div>}
                    {(lq?.automation_opportunities?.length ?? 0) > 0 && <div><p className="text-[10px] font-dm font-semibold uppercase tracking-wide text-white/30 mb-2">Automation opportunities</p><ul className="space-y-1">{lq!.automation_opportunities!.map((o) => <li key={o} className="flex items-start gap-2 text-[13px] font-dm text-white/50"><ChevronRightIcon size={13} className="mt-0.5 shrink-0" style={{ color: "#0ABFA3" }} />{o}</li>)}</ul></div>}
                    {lq?.recommended_outreach_angle && <div className="rounded-lg border px-4 py-3" style={{ borderColor: "rgba(10,191,163,0.2)", background: "rgba(10,191,163,0.05)" }}><p className="text-[10px] font-dm font-semibold uppercase tracking-wide mb-1" style={{ color: "#0ABFA3" }}>Outreach angle</p><p className="text-[13px] font-dm text-white/50">{lq.recommended_outreach_angle}</p></div>}
                  </div>
                </AuditCard>

                {/* Social presence */}
                <AuditCard title="Social presence" icon={<Globe size={16} />}>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ key: "facebook", label: "Facebook" }, { key: "instagram", label: "Instagram" }, { key: "linkedin", label: "LinkedIn" }, { key: "youtube", label: "YouTube" }, { key: "tiktok", label: "TikTok" }, { key: "x_twitter", label: "X / Twitter" }].map(({ key, label }) => {
                      const url = sl?.[key as keyof SocialLinks];
                      return (
                        <div key={key} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 ${url ? "border-[#0ABFA3]/20 bg-[#0ABFA3]/5" : "border-white/[0.06] opacity-50"}`}>
                          <Link2 size={13} style={{ color: url ? "#0ABFA3" : "rgba(255,255,255,0.3)" }} />
                          <div className="min-w-0">
                            <p className="text-[10px] font-dm font-semibold text-white/30 uppercase tracking-wide">{label}</p>
                            {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="block truncate text-[12px] font-dm hover:underline" style={{ color: "#0ABFA3" }}>{url.replace(/^https?:\/\//, "")}</a> : <p className="text-[11px] font-dm text-white/25">Not found</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AuditCard>
              </div>

              {/* Sources */}
              {(audit.sources?.length ?? 0) > 0 && (
                <div className="mt-5 rounded-xl border border-white/[0.07] bg-[#07080a] p-5">
                  <p className="text-[10px] font-dm font-semibold uppercase tracking-wide text-white/30 mb-3">Sources</p>
                  <ul className="space-y-1.5">{audit.sources.map((s, i) => <li key={i} className="text-[12px] font-dm text-white/30 flex items-start gap-2"><span className="shrink-0 mt-0.5" style={{ color: "#0ABFA3" }}>·</span>{s}</li>)}</ul>
                </div>
              )}

              <p className="mt-5 text-right text-[11px] font-dm text-white/20">
                Audited {new Date(audit.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Sidebar item ─── */
function SidebarItem({ icon: Icon, label, href, active, badge, onClick }: { icon: React.ElementType; label: string; href: string; active?: boolean; badge?: string; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-dm font-medium transition-colors ${active ? "bg-white/[0.07] text-white" : "text-white/50 hover:bg-white/[0.04] hover:text-white/80"}`}>
      <Icon size={16} style={active ? { color: "#0ABFA3" } : {}} />
      <span className="flex-1 truncate">{label}</span>
      {badge && <span className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold text-white" style={{ background: "#0ABFA3" }}>{badge}</span>}
    </Link>
  );
}
