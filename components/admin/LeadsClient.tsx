"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Building2,
  Clock,
  Inbox,
  Loader2,
  Mail,
  Phone,
  RefreshCw,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import type { Lead, LeadStatus } from "@/lib/types/admin";

const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});
const fmtDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(+d) ? "—" : dateFmt.format(d);
};

type Filter = "all" | LeadStatus;

export default function LeadsClient() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
      setLeads(data.leads as Lead[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load leads.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const counts = useMemo(() => {
    const c = { all: leads.length, new: 0, contacted: 0, closed: 0 };
    for (const l of leads) c[l.status]++;
    return c;
  }, [leads]);

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const patch = async (lead: Lead, body: Partial<Pick<Lead, "status" | "notes">>) => {
    setBusyId(lead.id);
    setError("");
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Update failed.");
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? (data.lead as Lead) : l)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed.");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (lead: Lead) => {
    if (!confirm(`Delete the lead from ${lead.name}? This can't be undone.`)) return;
    setBusyId(lead.id);
    setError("");
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Delete failed.");
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="accent-bar mb-3 text-[12px] font-dm font-semibold uppercase tracking-widest text-muted">
            Contact / leads
          </p>
          <h2
            className="font-syne text-body"
            style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            Leads
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

      {/* Filter tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        {(["all", "new", "contacted", "closed"] as Filter[]).map((f) => {
          const active = filter === f;
          const label = f === "all" ? "All" : STATUS_LABEL[f];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="rounded-full px-4 py-1.5 text-[12px] font-dm font-semibold transition-colors"
              style={{
                background: active ? "#0ABFA3" : "transparent",
                color: active ? "white" : "#A1A1AA",
                border: `1px solid ${active ? "#0ABFA3" : "#2C2C2E"}`,
              }}
            >
              {label} <span className="opacity-70">({counts[f]})</span>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-dm text-red-300">
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-red-300/70">
              Confirm <span className="font-mono">SUPABASE_SERVICE_ROLE_KEY</span> is set
              and the <span className="font-mono">leads</span> table exists (run{" "}
              <span className="font-mono">docs/sql/leads.sql</span>).
            </p>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-card bg-white/5" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-card border border-border bg-surface px-5 py-16 text-center">
          <Inbox size={28} className="mx-auto mb-3 text-muted/50" />
          <p className="font-dm text-[14px] text-muted">
            {leads.length === 0 ? "No leads yet." : "No leads in this view."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              busy={busyId === lead.id}
              onStatus={(status) => patch(lead, { status })}
              onSaveNotes={(notes) => patch(lead, { notes })}
              onDelete={() => remove(lead)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function LeadCard({
  lead,
  busy,
  onStatus,
  onSaveNotes,
  onDelete,
}: {
  lead: Lead;
  busy: boolean;
  onStatus: (s: LeadStatus) => void;
  onSaveNotes: (notes: string) => void;
  onDelete: () => void;
}) {
  const [notes, setNotes] = useState(lead.notes);
  const notesDirty = notes !== lead.notes;

  return (
    <div className="rounded-card border border-border bg-surface p-5 sm:p-6">
      {/* Top row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h3 className="font-syne text-[17px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>
              {lead.name}
            </h3>
            <StatusBadge status={lead.status} />
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 font-dm text-[13px] text-muted">
            <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 hover:text-primary">
              <Mail size={13} /> {lead.email}
            </a>
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 hover:text-primary">
                <Phone size={13} /> {lead.phone}
              </a>
            )}
            {lead.company && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 size={13} /> {lead.company}
              </span>
            )}
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-dm text-[12px] text-muted">
          <Clock size={12} /> {fmtDate(lead.createdAt)}
        </span>
      </div>

      {/* Need + message */}
      {lead.need && (
        <span
          className="mt-4 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-dm font-semibold"
          style={{ background: "#062B26", color: "#0ABFA3" }}
        >
          {lead.need}
        </span>
      )}
      {lead.message && (
        <p className="mt-3 whitespace-pre-wrap rounded-lg bg-background px-4 py-3 text-[14px] font-dm leading-relaxed text-body/90">
          {lead.message}
        </p>
      )}
      {lead.contactTime && (
        <p className="mt-2 font-dm text-[12px] text-muted">
          Preferred contact time: <span className="text-body/80">{lead.contactTime}</span>
        </p>
      )}

      {/* Notes */}
      <div className="mt-4">
        <span className="mb-2 block text-[11px] font-dm font-semibold uppercase tracking-wide text-muted">
          Internal notes
        </span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          placeholder="Add a private note…"
          className="w-full resize-y rounded-lg border border-border bg-background px-3.5 py-2.5 text-[13px] font-dm leading-relaxed text-body placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
        {notesDirty && (
          <button
            onClick={() => onSaveNotes(notes)}
            disabled={busy}
            className="mt-2 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-dm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ background: "#0ABFA3" }}
          >
            {busy ? <Loader2 size={13} className="animate-spin" /> : null}
            Save note
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="inline-flex rounded-lg border border-border p-0.5">
          {(["new", "contacted", "closed"] as LeadStatus[]).map((s) => {
            const active = lead.status === s;
            return (
              <button
                key={s}
                onClick={() => !active && onStatus(s)}
                disabled={busy}
                className={`rounded-md px-3 py-1.5 text-[12px] font-dm font-semibold transition-colors disabled:opacity-60 ${
                  active ? "text-white" : "text-muted hover:text-body"
                }`}
                style={active ? { background: "#0ABFA3" } : undefined}
              >
                {STATUS_LABEL[s]}
              </button>
            );
          })}
        </div>
        <button
          onClick={onDelete}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[12px] font-dm font-semibold text-muted transition-colors hover:border-red-500/40 hover:text-red-300 disabled:opacity-50"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: LeadStatus }) {
  const map: Record<LeadStatus, { bg: string; color: string }> = {
    new: { bg: "#062B26", color: "#0ABFA3" },
    contacted: { bg: "rgba(245,158,11,0.12)", color: "#fbbf24" },
    closed: { bg: "rgba(255,255,255,0.06)", color: "#A1A1AA" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-dm font-semibold"
      style={{ background: s.bg, color: s.color }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
