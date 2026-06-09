"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Ban,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  ShieldOff,
  TriangleAlert,
  UserCheck,
  Users,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import type { AdminUser } from "@/lib/types/admin";

type ActionKey = `${string}:${"role" | "status"}`;

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function fmtDate(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(+d) ? "—" : dateFmt.format(d);
}

export default function UsersClient() {
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [acting, setActing] = useState<ActionKey | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
      setUsers(data.users as AdminUser[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q),
    );
  }, [users, query]);

  const setRole = async (u: AdminUser, role: "user" | "admin") => {
    setActing(`${u.id}:role`);
    setError("");
    try {
      const res = await fetch(`/api/admin/users/${u.id}/role`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update role.");
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role } : x)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update role.");
    } finally {
      setActing(null);
    }
  };

  const setStatus = async (u: AdminUser, status: "active" | "suspended") => {
    if (status === "suspended" && !confirm(`Suspend ${u.email}? They won't be able to log in.`)) {
      return;
    }
    setActing(`${u.id}:status`);
    setError("");
    try {
      const res = await fetch(`/api/admin/users/${u.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update status.");
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, status } : x)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update status.");
    } finally {
      setActing(null);
    }
  };

  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <p className="accent-bar mb-3 text-[12px] font-dm font-semibold uppercase tracking-widest text-muted">
          Users &amp; access
        </p>
        <h2
          className="font-syne text-body"
          style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          Users
        </h2>
        <p className="mt-2 text-[15px] font-dm text-muted">
          {loading
            ? "Loading…"
            : `${users.length} ${users.length === 1 ? "user" : "users"} · ${adminCount} admin${adminCount === 1 ? "" : "s"}`}
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email"
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-3.5 text-[14px] font-dm text-body placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
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
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-dm text-red-300">
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-red-300/70">
              If this is a configuration error, confirm{" "}
              <span className="font-mono">SUPABASE_SERVICE_ROLE_KEY</span> is set
              and the <span className="font-mono">profiles</span> table exists.
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-card border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                {["User", "Role", "Status", "Provider", "Joined", "Last sign-in", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-[11px] font-dm font-semibold uppercase tracking-wide text-muted"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows />
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <Users size={28} className="mx-auto mb-3 text-muted/50" />
                    <p className="font-dm text-[14px] text-muted">
                      {users.length === 0 ? "No users yet." : "No users match your search."}
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((u) => {
                  const isSelf = !!user && u.email.toLowerCase() === user.email.toLowerCase();
                  const roleBusy = acting === `${u.id}:role`;
                  const statusBusy = acting === `${u.id}:status`;
                  return (
                    <tr
                      key={u.id}
                      className="border-b border-border last:border-0 transition-colors hover:bg-white/[0.02]"
                    >
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="font-dm text-[14px] font-semibold text-body">
                          {u.name}
                          {isSelf && (
                            <span className="ml-2 text-[11px] font-normal text-muted">(you)</span>
                          )}
                        </div>
                        <div className="font-dm text-[12px] text-muted">{u.email}</div>
                      </td>
                      {/* Role */}
                      <td className="px-5 py-4">
                        <RoleBadge role={u.role} />
                      </td>
                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge status={u.status} />
                      </td>
                      {/* Provider */}
                      <td className="px-5 py-4">
                        <span className="font-dm text-[13px] capitalize text-muted">
                          {u.provider}
                        </span>
                      </td>
                      {/* Joined */}
                      <td className="px-5 py-4 font-dm text-[13px] text-muted">
                        {fmtDate(u.createdAt)}
                      </td>
                      {/* Last sign-in */}
                      <td className="px-5 py-4 font-dm text-[13px] text-muted">
                        {fmtDate(u.lastSignInAt)}
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {u.role === "admin" ? (
                            <ActionButton
                              busy={roleBusy}
                              disabled={isSelf || statusBusy}
                              onClick={() => setRole(u, "user")}
                              icon={ShieldOff}
                              label="Remove admin"
                              title={isSelf ? "You can't remove your own admin access" : "Remove admin"}
                            />
                          ) : (
                            <ActionButton
                              busy={roleBusy}
                              disabled={statusBusy}
                              onClick={() => setRole(u, "admin")}
                              icon={ShieldCheck}
                              label="Make admin"
                              accent
                            />
                          )}
                          {u.status === "active" ? (
                            <ActionButton
                              busy={statusBusy}
                              disabled={isSelf || roleBusy}
                              onClick={() => setStatus(u, "suspended")}
                              icon={Ban}
                              label="Suspend"
                              title={isSelf ? "You can't suspend yourself" : "Suspend"}
                              danger
                            />
                          ) : (
                            <ActionButton
                              busy={statusBusy}
                              disabled={roleBusy}
                              onClick={() => setStatus(u, "active")}
                              icon={UserCheck}
                              label="Reactivate"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: "user" | "admin" | "staff" }) {
  if (role === "admin") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-dm font-semibold"
        style={{ background: "#062B26", color: "#0ABFA3" }}
      >
        <ShieldCheck size={12} />
        Admin
      </span>
    );
  }
  if (role === "staff") {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-dm font-semibold"
        style={{ background: "#1a1208", color: "#F59E0B" }}
      >
        <ShieldCheck size={12} />
        Staff
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-dm font-semibold text-muted">
      User
    </span>
  );
}

function StatusBadge({ status }: { status: "active" | "suspended" }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-dm font-semibold ${
        active ? "bg-white/5 text-body" : "bg-red-500/10 text-red-300"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${active ? "bg-[#0ABFA3]" : "bg-red-400"}`}
      />
      {active ? "Active" : "Suspended"}
    </span>
  );
}

function ActionButton({
  busy,
  disabled,
  onClick,
  icon: Icon,
  label,
  title,
  accent,
  danger,
}: {
  busy: boolean;
  disabled?: boolean;
  onClick: () => void;
  icon: typeof ShieldCheck;
  label: string;
  title?: string;
  accent?: boolean;
  danger?: boolean;
}) {
  const tone = accent
    ? "border-[#0ABFA3]/40 text-[#0ABFA3] hover:bg-[#0ABFA3]/10"
    : danger
      ? "border-border text-muted hover:border-red-500/40 hover:text-red-300"
      : "border-border text-body hover:bg-white/5";
  return (
    <button
      onClick={onClick}
      disabled={busy || disabled}
      title={title ?? label}
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[12px] font-dm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${tone}`}
    >
      {busy ? <Loader2 size={13} className="animate-spin" /> : <Icon size={13} />}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-border last:border-0">
          {Array.from({ length: 7 }).map((__, j) => (
            <td key={j} className="px-5 py-4">
              <div className="h-4 w-full max-w-[120px] animate-pulse rounded bg-white/5" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
