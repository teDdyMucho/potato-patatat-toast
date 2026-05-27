import type { LucideIcon } from "lucide-react";

/** KPI card for the admin overview. Uses the site's glow-card hover treatment. */
export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  placeholder = false,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  /** Dims the value + adds a tag when the number isn't wired to real data yet. */
  placeholder?: boolean;
}) {
  return (
    <div className="glow-card group relative flex flex-col rounded-card border border-border bg-surface p-6 transition-all duration-200 hover:shadow-card">
      <div className="mb-4 flex items-start justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-lg"
          style={{ background: "#062B26" }}
        >
          <Icon size={20} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
        </div>
        {placeholder && (
          <span
            className="rounded-full px-2.5 py-0.5 text-[10px] font-dm font-semibold"
            style={{ background: "#073B34", color: "#0ABFA3" }}
          >
            Sample
          </span>
        )}
      </div>
      <span className="text-[12px] font-dm font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
      <span
        className={`mt-1 font-syne ${placeholder ? "text-body/40" : "text-body"}`}
        style={{ fontSize: "30px", fontWeight: 800, letterSpacing: "-0.02em" }}
      >
        {value}
      </span>
      {hint && <span className="mt-1 text-[12px] font-dm text-muted">{hint}</span>}
    </div>
  );
}
