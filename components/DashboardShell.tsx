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

/* Sidebar nav item */
function SidebarItem({
  icon: Icon,
  label,
  href,
  badge,
  active,
}: {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
  active?: boolean;
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

/* Shell — wraps page content with sidebar when logged in */
export default function DashboardShell({ children, noScroll }: { children: React.ReactNode; noScroll?: boolean }) {
  const pathname = usePathname();
  const { user, ready, isStaff, isAdmin, logout } = useAuth();

  const [hasReview, setHasReview] = useState(() => reviewCache.hasReview);
  const [pendingCount, setPendingCount] = useState(() => reviewCache.pendingCount);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showCta, setShowCta] = useState(() => !isCtaDismissed());
  const [sidebarOpen, setSidebarOpen] = useState(() => sidebarState.open);
  const [recent, setRecent] = useState(() => recentTools.list);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setSidebarOpen(sidebarState.toggle());

  useEffect(() => recentTools.subscribe(() => setRecent([...recentTools.list])), []);

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
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
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

  // Logged-in — sidebar layout
  return (
    <div className="relative flex h-screen bg-[#050608]">
      {/* Sidebar */}
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
        <nav className="flex flex-col flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            <SidebarItem
              icon={Bot}
              label="AI Tools"
              href="/dashboard"
              active={pathname === "/dashboard"}
            />
            {hasReview && (
              <SidebarItem
                icon={Briefcase}
                label="Project Review"
                href="/review"
                active={pathname.startsWith("/review")}
                badge={pendingCount > 0 ? String(pendingCount) : undefined}
              />
            )}
            <SidebarItem
              icon={Newspaper}
              label="Blog"
              href="/blog"
              active={pathname.startsWith("/blog")}
            />
            <SidebarItem
              icon={CalendarCheck}
              label="Consultation"
              href="/contact"
              active={pathname.startsWith("/contact")}
            />
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

        {/* User */}
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

      {/* Toggle button — sits on the sidebar border, centered vertically */}
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

      {/* Page content */}
      <div className="flex flex-1 flex-col overflow-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
