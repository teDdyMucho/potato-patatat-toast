"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BarChart2,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const navItems = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Users & access", href: "/admin/users", icon: Users },
  { label: "AI tool usage", href: "/admin/usage", icon: BarChart2 },
  { label: "Content", href: "/admin/content", icon: FileText },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
}

/**
 * Admin chrome: collapsible left sidebar + top bar. Distinct from the public
 * Nav/Footer but on-palette (#1C1C1E sidebar, teal active accent, Syne/DM Sans).
 * The server guard in app/admin/layout.tsx has already confirmed admin access.
 */
export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = navItems.find((i) => isActive(pathname, i.href, i.exact));
  const pageTitle = current?.label ?? "Admin";

  const navList = (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(pathname, item.href, item.exact);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-dm font-medium transition-colors ${
              active
                ? "bg-white/[0.06] text-white"
                : "text-white/55 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            {/* teal active rail */}
            <span
              className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[#0ABFA3] transition-opacity ${
                active ? "opacity-100" : "opacity-0"
              }`}
            />
            <Icon
              size={18}
              strokeWidth={2}
              className={active ? "text-[#0ABFA3]" : "text-white/45 group-hover:text-white/80"}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-body">
      {/* ── Sidebar (desktop) ── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-[#1C1C1E] lg:flex">
        <SidebarHeader />
        <div className="flex-1 overflow-y-auto py-4">{navList}</div>
        <SidebarFooter email={email} onLogout={logout} />
      </aside>

      {/* ── Sidebar (mobile drawer) ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 flex-col border-r border-border bg-[#1C1C1E]">
            <div className="flex items-center justify-between pr-3">
              <SidebarHeader />
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-2 text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <PanelLeftClose size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">{navList}</div>
            <SidebarFooter email={email} onLogout={logout} />
          </aside>
        </div>
      )}

      {/* ── Main column ── */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-border bg-[#0a0a0c]/90 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-md border border-white/15 p-2 text-white/70 transition-colors hover:text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
            <h1
              className="font-syne text-body"
              style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              {pageTitle}
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3.5 py-2 text-[13px] font-dm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            View site
            <ArrowUpRight size={14} />
          </Link>
        </header>

        <main className="px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarHeader() {
  return (
    <Link href="/admin" className="flex items-center gap-3 border-b border-border px-5 py-5">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg font-syne text-[15px] font-extrabold text-white"
        style={{ background: "#073B34" }}
      >
        A
      </span>
      <span className="leading-none">
        <span className="block font-syne text-[15px] font-extrabold tracking-wide text-white">
          AKT
        </span>
        <span className="mt-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0ABFA3]">
          <ShieldCheck size={11} /> Admin
        </span>
      </span>
    </Link>
  );
}

function SidebarFooter({ email, onLogout }: { email: string; onLogout: () => void }) {
  return (
    <div className="border-t border-border p-3">
      <div className="mb-2 truncate px-3 text-[12px] font-dm text-white/45" title={email}>
        {email}
      </div>
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[14px] font-dm font-medium text-white/55 transition-colors hover:bg-white/[0.04] hover:text-white"
      >
        <LogOut size={18} strokeWidth={2} className="text-white/45" />
        Log out
      </button>
    </div>
  );
}
