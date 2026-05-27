import Link from "next/link";
import {
  ArrowUpRight,
  BarChart2,
  FileText,
  Inbox,
  Users,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const metadata = { title: "Admin · Overview | AKT" };
export const dynamic = "force-dynamic";

// Real total-user count, or null when the service key isn't configured yet.
async function getUserCount(): Promise<number | null> {
  try {
    const admin = createSupabaseAdminClient();
    const { count, error } = await admin
      .from("profiles")
      .select("id", { count: "exact", head: true });
    return error ? null : count ?? null;
  } catch {
    return null;
  }
}

// Tool sessions recorded since midnight, or null if not configured yet.
async function getSessionsToday(): Promise<number | null> {
  try {
    const admin = createSupabaseAdminClient();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const { count, error } = await admin
      .from("tool_usage")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfToday.toISOString());
    return error ? null : count ?? null;
  } catch {
    return null;
  }
}

// Total blog posts (published + drafts), or null if not configured yet.
async function getContentCount(): Promise<number | null> {
  try {
    const admin = createSupabaseAdminClient();
    const { count, error } = await admin
      .from("blog_posts")
      .select("id", { count: "exact", head: true });
    return error ? null : count ?? null;
  } catch {
    return null;
  }
}

// Leads not yet closed (new + contacted), or null if not configured yet.
async function getOpenLeads(): Promise<number | null> {
  try {
    const admin = createSupabaseAdminClient();
    const { count, error } = await admin
      .from("leads")
      .select("id", { count: "exact", head: true })
      .neq("status", "closed");
    return error ? null : count ?? null;
  } catch {
    return null;
  }
}

const modules = [
  {
    href: "/admin/users",
    icon: Users,
    title: "Users & access",
    desc: "Registered users, roles, sign-up activity, promote / suspend.",
  },
  {
    href: "/admin/usage",
    icon: BarChart2,
    title: "AI tool usage",
    desc: "Which tools run, how often, and by whom.",
  },
  {
    href: "/admin/content",
    icon: FileText,
    title: "Content",
    desc: "Blog posts, partner case studies, and the AI tools catalog.",
  },
  {
    href: "/admin/leads",
    icon: Inbox,
    title: "Leads",
    desc: "Contact-form submissions and Book Call inquiries.",
  },
];

export default async function AdminOverviewPage() {
  const [userCount, sessionsToday, contentCount, openLeads] = await Promise.all([
    getUserCount(),
    getSessionsToday(),
    getContentCount(),
    getOpenLeads(),
  ]);

  const stats = [
    {
      label: "Total users",
      value: userCount === null ? "—" : userCount.toLocaleString(),
      hint: userCount === null ? "Set service key" : "Registered accounts",
      icon: Users,
      placeholder: userCount === null,
    },
    {
      label: "Sessions today",
      value: sessionsToday === null ? "—" : sessionsToday.toLocaleString(),
      hint: sessionsToday === null ? "Set service key" : "AI tool runs",
      icon: BarChart2,
      placeholder: sessionsToday === null,
    },
    {
      label: "Open leads",
      value: openLeads === null ? "—" : openLeads.toLocaleString(),
      hint: openLeads === null ? "Set service key" : "Awaiting follow-up",
      icon: Inbox,
      placeholder: openLeads === null,
    },
    {
      label: "Content items",
      value: contentCount === null ? "—" : contentCount.toLocaleString(),
      hint: contentCount === null ? "Set service key" : "Blog posts",
      icon: FileText,
      placeholder: contentCount === null,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="accent-bar mb-3 text-[12px] font-dm font-semibold uppercase tracking-widest text-muted">
          Dashboard
        </p>
        <h2
          className="font-syne text-body"
          style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          Overview
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] font-dm leading-relaxed text-muted">
          Welcome to the AKT admin. KPIs below are placeholders until each module
          is wired to live data — see the build tracker in{" "}
          <span className="text-primary">docs/ADMIN_PAGE.md</span>.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Module shortcuts */}
      <h3
        className="mb-5 mt-12 font-syne text-body"
        style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.01em" }}
      >
        Manage
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.href}
              href={m.href}
              className="glow-card group relative flex flex-col rounded-card border border-border bg-surface p-6 transition-all duration-200 hover:shadow-card"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{ background: "#073B34" }}
                >
                  <Icon size={20} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-muted transition-colors group-hover:text-primary"
                />
              </div>
              <h4
                className="font-syne text-body text-[16px] font-bold transition-colors group-hover:text-primary"
                style={{ letterSpacing: "-0.01em" }}
              >
                {m.title}
              </h4>
              <p className="mt-2 text-[13px] font-dm leading-relaxed text-muted">
                {m.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
