"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Briefcase,
  CalendarCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { isCtaDismissed, dismissCta } from "@/lib/sidebar-cta";
import { reviewCache } from "@/lib/review-cache";
import { sidebarState } from "@/lib/sidebar-state";
import { recentTools } from "@/lib/recent-tools";

/* ── Sidebar nav item ── */
function SidebarItem({
  icon: Icon,
  label,
  href,
  badge,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-dm font-semibold transition-all ${
        active
          ? "bg-[#0ABFA3]/10 text-[#0ABFA3]"
          : "text-white/55 hover:bg-white/[0.04] hover:text-white"
      }`}
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span
          className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
          style={{ background: "#F59E0B" }}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

/* ── Reusable nav content (used in both desktop sidebar and mobile drawer) ── */
function NavContent({
  pathname,
  hasReview,
  pendingCount,
  recent,
  showCta,
  user,
  userMenuOpen,
  setUserMenuOpen,
  userMenuRef,
  onNavigate,
  onDismissCta,
  onLogout,
}: {
  pathname: string;
  hasReview: boolean;
  pendingCount: number;
  recent: { name: string; href: string }[];
  showCta: boolean;
  user: { name: string; email: string };
  userMenuOpen: boolean;
  setUserMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  userMenuRef: React.RefObject<HTMLDivElement>;
  onNavigate?: () => void;
  onDismissCta: () => void;
  onLogout: () => void;
}) {
  return (
    <>
      {/* Nav items */}
      <nav className="flex flex-col flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          <SidebarItem icon={Bot} label="AI Tools" href="/dashboard" active={pathname === "/dashboard"} onClick={onNavigate} />
          {hasReview && (
            <SidebarItem
              icon={Briefcase}
              label="Project Review"
              href="/review"
              active={pathname.startsWith("/review")}
              badge={pendingCount > 0 ? String(pendingCount) : undefined}
              onClick={onNavigate}
            />
          )}
          <SidebarItem icon={Newspaper} label="Blog" href="/blog" active={pathname.startsWith("/blog")} onClick={onNavigate} />
          <SidebarItem icon={CalendarCheck} label="Consultation" href="/contact" active={pathname.startsWith("/contact")} onClick={onNavigate} />
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
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors hover:bg-white/[0.04]"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#0ABFA3" }} />
                  <span className="truncate text-[12px] font-dm text-white/45">{t.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Consultation CTA */}
        {showCta && (
          <div className="mt-auto pt-4">
            <div className="relative rounded-xl border p-4" style={{ background: "#062B26", borderColor: "#155E53" }}>
              <button
                onClick={onDismissCta}
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
                onClick={onNavigate}
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
                onClick={() => { setUserMenuOpen(false); onNavigate?.(); }}
                className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-dm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Settings size={14} /> Manage Account
              </Link>
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] font-dm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                <LogOut size={14} /> Log out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

/* ── Shell — wraps page content with sidebar when logged in ── */
export default function DashboardShell({ children, noScroll }: { children: React.ReactNode; noScroll?: boolean }) {
  const pathname = usePathname();
  const { user, ready, isStaff, isAdmin, logout } = useAuth();

  const [hasReview, setHasReview] = useState(() => reviewCache.hasReview);
  const [pendingCount, setPendingCount] = useState(() => reviewCache.pendingCount);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showCta, setShowCta] = useState(() => !isCtaDismissed());
  const [sidebarOpen, setSidebarOpen] = useState(() => sidebarState.open);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [recent, setRecent] = useState(() => recentTools.list);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setSidebarOpen(sidebarState.toggle());
  const closeMobileDrawer = () => setMobileDrawerOpen(false);

  useEffect(() => recentTools.subscribe(() => setRecent([...recentTools.list])), []);

  // Close mobile drawer on route change
  useEffect(() => { setMobileDrawerOpen(false); }, [pathname]);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileDrawerOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const checkReview = useCallback(async () => {
    if (!user) return;
    if (isStaff || isAdmin) {
      reviewCache.set(true, 0);
      setHasReview(true);
      return;
    }
    if (reviewCache.fetched) return;
    try {
      const res = await fetch("/api/project-review/connections");
      if (res.ok) {
        const data = await res.json();
        const conns: { projects: { status: string }[] }[] = data.clientConnections ?? [];
        const allProjects = conns.flatMap((c) => c.projects ?? []);
        const pending = allProjects.filter((p) => p.status === "pending").length;
        const hasProjects = allProjects.length > 0;
        reviewCache.set(hasProjects, pending);
        setHasReview(hasProjects);
        setPendingCount(pending);
      }
    } catch {}
  }, [user, isStaff, isAdmin]);

  useEffect(() => { if (user) checkReview(); }, [user, checkReview]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  // Guest, admin, or staff — use the regular top nav
  if (!ready || !user || isAdmin || isStaff) {
    if (noScroll) {
      return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#050608]">
          <Nav />
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
        </div>
      );
    }
    return (
      <>
        <Nav />
        {children}
        <Footer />
      </>
    );
  }

  const navProps = {
    pathname,
    hasReview,
    pendingCount,
    recent,
    showCta,
    user,
    userMenuOpen,
    setUserMenuOpen,
    userMenuRef,
    onDismissCta: () => { dismissCta(); setShowCta(false); },
    onLogout: () => { logout(); setUserMenuOpen(false); setMobileDrawerOpen(false); },
  };

  // Logged-in — responsive layout
  return (
    <div className="relative flex h-screen flex-col bg-[#050608] lg:flex-row">

      {/* ── Mobile top bar (hidden on lg+) ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#07080a] px-4 py-3 lg:hidden">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <Image src="/image/akt_logo.png" alt="AKT" width={421} height={377} className="h-8 w-auto" />
          <div className="leading-none">
            <p className="font-syne text-[13px] font-extrabold tracking-wide text-white">AKT</p>
            <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">Workspace</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {/* Active page indicator */}
          <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-dm font-semibold text-white/60">
            {pathname === "/dashboard" ? "AI Tools"
              : pathname.startsWith("/review") ? "Project Review"
              : pathname.startsWith("/blog") ? "Blog"
              : pathname.startsWith("/contact") ? "Consultation"
              : "Workspace"}
          </span>
          {/* Burger button */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* ── Mobile drawer overlay ── */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={closeMobileDrawer}
            />

            {/* Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 380, damping: 35 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/[0.07] bg-[#07080a] shadow-2xl lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <Link href="/dashboard" onClick={closeMobileDrawer} className="flex items-center gap-3">
                  <Image src="/image/akt_logo.png" alt="AKT" width={421} height={377} className="h-9 w-auto" />
                  <div className="leading-none">
                    <p className="font-syne text-[14px] font-extrabold tracking-wide text-white">AKT</p>
                    <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">Workspace</p>
                  </div>
                </Link>
                <button
                  onClick={closeMobileDrawer}
                  aria-label="Close menu"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 text-white/50 transition-colors hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <NavContent {...navProps} onNavigate={closeMobileDrawer} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar (hidden on mobile) ── */}
      <aside
        className="relative hidden shrink-0 flex-col border-r border-white/[0.07] bg-[#07080a] transition-[width] duration-300 ease-in-out lg:flex"
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

          <NavContent {...navProps} />
        </div>
      </aside>

      {/* Desktop sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        className="absolute z-30 hidden items-center justify-center text-white/50 transition-[left,color] duration-300 hover:text-white lg:flex"
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

      {/* Page content */}
      <div className="flex flex-1 flex-col overflow-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
