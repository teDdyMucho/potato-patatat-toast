import type { LucideIcon } from "lucide-react";

/** Placeholder for admin modules not yet built. Keeps the shell navigable. */
export default function ComingSoon({
  icon: Icon,
  title,
  phase,
  description,
}: {
  icon: LucideIcon;
  title: string;
  phase: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="relative max-w-md overflow-hidden rounded-card border border-border bg-surface p-10 text-center">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#0ABFA3]/12 blur-[90px]" />
        <div className="relative">
          <div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ background: "#073B34" }}
          >
            <Icon size={26} style={{ color: "#0ABFA3" }} strokeWidth={1.75} />
          </div>
          <p className="accent-bar mb-3 text-[12px] font-dm font-semibold uppercase tracking-widest text-muted">
            {phase}
          </p>
          <h2
            className="font-syne text-body"
            style={{ fontSize: "24px", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            {title}
          </h2>
          <p className="mt-3 text-[15px] font-dm leading-relaxed text-muted">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
