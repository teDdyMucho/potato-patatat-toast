"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  BarChart2,
  CalendarDays,
  RefreshCw,
  TriangleAlert,
  Users,
  Zap,
} from "lucide-react";
import type { UsageSummary } from "@/lib/types/admin";

const dateTimeFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function fmtWhen(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(+d) ? "—" : dateTimeFmt.format(d);
}

export default function UsageClient() {
  const [data, setData] = useState<UsageSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/usage", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || `Request failed (${res.status})`);
      setData(json as UsageSummary);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load usage.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const kpis = [
    { label: "Total sessions", value: data?.totalSessions, icon: BarChart2 },
    { label: "Today", value: data?.sessionsToday, icon: CalendarDays },
    { label: "Last 7 days", value: data?.sessions7d, icon: Activity },
    { label: "Unique users", value: data?.uniqueUsers, icon: Users },
  ];

  const maxTool = data?.perTool[0]?.count ?? 0;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="accent-bar mb-3 text-[12px] font-dm font-semibold uppercase tracking-widest text-muted">
            AI tool usage
          </p>
          <h2
            className="font-syne text-body"
            style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Usage
          </h2>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-[13px] font-dm font-semibold text-body transition-colors hover:bg-white/5 disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-dm text-red-300">
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-red-300/70">
              Confirm <span className="font-mono">SUPABASE_SERVICE_ROLE_KEY</span> is
              set and the <span className="font-mono">tool_usage</span> table exists
              (run <span className="font-mono">docs/sql/tool-usage.sql</span>).
            </p>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="glow-card group relative flex flex-col rounded-card border border-border bg-surface p-6"
            >
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg"
                style={{ background: "#062B26" }}
              >
                <Icon size={20} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
              </div>
              <span className="text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
                {k.label}
              </span>
              <span
                className="mt-1 font-syne text-body"
                style={{ fontSize: "30px", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {loading || !data ? (
                  <span className="inline-block h-7 w-12 animate-pulse rounded bg-white/5 align-middle" />
                ) : (
                  (k.value ?? 0).toLocaleString()
                )}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Per-tool breakdown */}
        <section className="rounded-card border border-border bg-surface p-6 lg:col-span-2">
          <h3
            className="mb-5 font-syne text-body"
            style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Sessions by tool
          </h3>
          {loading ? (
            <BarSkeleton />
          ) : !data || data.perTool.length === 0 ? (
            <EmptyHint
              icon={BarChart2}
              text="No tool runs recorded yet. Usage appears here once someone runs a tool."
            />
          ) : (
            <ul className="space-y-3.5">
              {data.perTool.map((t) => (
                <li key={t.tool}>
                  <div className="mb-1.5 flex items-center justify-between text-[13px] font-dm">
                    <span className="text-body">{t.tool}</span>
                    <span className="font-semibold text-muted">{t.count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${maxTool ? Math.max(4, (t.count / maxTool) * 100) : 0}%`,
                        background: "#0ABFA3",
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Top users */}
        <section className="rounded-card border border-border bg-surface p-6">
          <h3
            className="mb-5 font-syne text-body"
            style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Top users
          </h3>
          {loading ? (
            <BarSkeleton rows={5} />
          ) : !data || data.topUsers.length === 0 ? (
            <EmptyHint icon={Users} text="No users yet." />
          ) : (
            <ul className="space-y-3">
              {data.topUsers.map((u) => (
                <li key={u.email} className="flex items-center justify-between gap-3 text-[13px] font-dm">
                  <span className="truncate text-body" title={u.email}>
                    {u.email}
                  </span>
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{ background: "#062B26", color: "#0ABFA3" }}
                  >
                    {u.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Recent activity */}
      <section className="mt-6 rounded-card border border-border bg-surface p-6">
        <h3
          className="mb-5 font-syne text-body"
          style={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.01em" }}
        >
          Recent activity
        </h3>
        {loading ? (
          <BarSkeleton rows={5} />
        ) : !data || data.recent.length === 0 ? (
          <EmptyHint icon={Activity} text="No recent activity." />
        ) : (
          <ul className="divide-y divide-border">
            {data.recent.map((r, i) => (
              <li key={i} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: "#073B34" }}
                  >
                    <Zap size={14} style={{ color: "#0ABFA3" }} />
                  </span>
                  <div>
                    <div className="font-dm text-[13px] font-semibold text-body">{r.tool}</div>
                    <div className="font-dm text-[12px] text-muted">{r.email ?? "anonymous"}</div>
                  </div>
                </div>
                <span className="font-dm text-[12px] text-muted">{fmtWhen(r.createdAt)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function EmptyHint({ icon: Icon, text }: { icon: typeof BarChart2; text: string }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <Icon size={26} className="mb-3 text-muted/50" />
      <p className="max-w-xs font-dm text-[13px] text-muted">{text}</p>
    </div>
  );
}

function BarSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-3 flex-1 animate-pulse rounded bg-white/5" />
        </div>
      ))}
    </div>
  );
}
