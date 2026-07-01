"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Globe,
  Link2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
  TrendingUp,
  User2,
  XCircle,
} from "lucide-react";

type SocialLinks = {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  x_twitter?: string | null;
};

type OwnerResearch = {
  owner_name?: string | null;
  owner_title?: string | null;
  linkedin_url?: string | null;
  source_url?: string | null;
  confidence?: string | null;
};

type GoogleProfile = {
  profile_url?: string | null;
  google_rating?: number | null;
  review_count?: number | null;
  review_sentiment?: string | null;
  positive_review_themes?: string[];
  negative_review_themes?: string[];
  recent_review_issues?: string[];
  appears_active?: boolean | null;
};

type SearchVisibility = {
  google_search_presence?: boolean;
  google_maps_presence?: boolean;
  directory_presence?: string[];
  visibility_score?: string;
  visibility_level?: string;
  seo_issues?: string[];
  missing_trust_signals?: string[];
};

type LeadQualification = {
  is_good_prospect?: boolean;
  prospect_quality?: string;
  possible_business_problems?: string[];
  automation_opportunities?: string[];
  recommended_outreach_angle?: string | null;
};

type Audit = {
  id: string;
  website_url: string;
  business_name: string | null;
  industry: string | null;
  business_category: string | null;
  business_description: string | null;
  services_offered: string[];
  location: string | null;
  service_area: string | null;
  phone: string | null;
  email: string | null;
  contact_page_url: string | null;
  social_links: SocialLinks;
  owner_research: OwnerResearch;
  google_business_profile: GoogleProfile;
  search_visibility: SearchVisibility;
  lead_qualification: LeadQualification;
  sources: string[];
  created_at: string;
};

const visibilityColor: Record<string, string> = {
  "very high": "text-emerald-400",
  high: "text-green-400",
  medium: "text-amber-400",
  low: "text-red-400",
};

const confidenceColor: Record<string, string> = {
  high: "text-emerald-400",
  medium: "text-amber-400",
  low: "text-red-400",
};

function Chip({ children, color = "default" }: { children: React.ReactNode; color?: "green" | "red" | "amber" | "default" }) {
  const cls = {
    green: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    red: "bg-red-500/10 text-red-300 border-red-500/20",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    default: "bg-white/5 text-muted border-white/10",
  }[color];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-dm font-semibold ${cls}`}>
      {children}
    </span>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-border bg-surface p-6">
      <div className="flex items-center gap-2.5 mb-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <h3 className="font-syne text-[15px] font-bold text-body">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function AuditPage() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [audit, setAudit] = useState<Audit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/login?redirect=/audit");
      return;
    }
    fetch("/api/audit")
      .then((r) => r.json())
      .then((d) => { if (d.audit) setAudit(d.audit); else setError(d.error || "No audit found."); })
      .catch(() => setError("Failed to load audit."))
      .finally(() => setLoading(false));
  }, [ready, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error || !audit) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <AlertCircle size={36} className="mx-auto mb-4 text-muted/50" />
        <p className="font-syne text-[20px] font-bold text-body mb-2">No audit available yet</p>
        <p className="text-[14px] font-dm text-muted">
          Your website audit is being processed. Check back shortly — it usually takes a few minutes.
        </p>
      </div>
    );
  }

  const sv = audit.search_visibility;
  const gbp = audit.google_business_profile;
  const lq = audit.lead_qualification;
  const own = audit.owner_research;
  const sl = audit.social_links;

  const visScore = String(sv?.visibility_score ?? "").toLowerCase();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-[12px] font-dm font-semibold uppercase tracking-widest text-muted">
          Website Audit
        </p>
        <h1
          className="font-syne text-body"
          style={{ fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          {audit.business_name ?? audit.website_url}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <a
            href={audit.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-dm text-primary hover:underline"
          >
            <Globe size={13} /> {audit.website_url}
          </a>
          {audit.industry && <Chip>{audit.industry}</Chip>}
          {audit.business_category && <Chip>{audit.business_category}</Chip>}
        </div>
      </div>

      {/* Top stats row */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          {
            label: "Visibility",
            value: sv?.visibility_level ?? "—",
            sub: sv?.visibility_score ?? "",
            color: visibilityColor[visScore] ?? "text-body",
            icon: <TrendingUp size={16} />,
          },
          {
            label: "Google Search",
            value: sv?.google_search_presence ? "Present" : "Missing",
            sub: "",
            color: sv?.google_search_presence ? "text-emerald-400" : "text-red-400",
            icon: <Search size={16} />,
          },
          {
            label: "Google Maps",
            value: sv?.google_maps_presence ? "Listed" : "Not listed",
            sub: "",
            color: sv?.google_maps_presence ? "text-emerald-400" : "text-red-400",
            icon: <MapPin size={16} />,
          },
          {
            label: "Google Rating",
            value: gbp?.google_rating != null ? `${gbp.google_rating} ★` : "—",
            sub: gbp?.review_count != null ? `${gbp.review_count} reviews` : "",
            color: "text-amber-400",
            icon: <Star size={16} />,
          },
        ].map((s) => (
          <div key={s.label} className="rounded-card border border-border bg-surface p-4">
            <div className="flex items-center gap-2 text-muted mb-2">
              {s.icon}
              <span className="text-[11px] font-dm font-semibold uppercase tracking-wide">{s.label}</span>
            </div>
            <p className={`font-syne text-[18px] font-bold ${s.color}`}>{s.value}</p>
            {s.sub && <p className="text-[12px] font-dm text-muted mt-0.5">{s.sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Business overview */}
        <Card title="Business overview" icon={<Building2 size={16} />}>
          {audit.business_description && (
            <p className="text-[14px] font-dm text-muted leading-relaxed mb-4">{audit.business_description}</p>
          )}
          <div className="space-y-2 text-[13px] font-dm">
            {audit.location && (
              <div className="flex items-start gap-2 text-muted">
                <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                {audit.location}
              </div>
            )}
            {audit.service_area && (
              <div className="flex items-start gap-2 text-muted">
                <Globe size={14} className="mt-0.5 shrink-0 text-primary" />
                Service area: {audit.service_area}
              </div>
            )}
            {audit.phone && (
              <div className="flex items-center gap-2 text-muted">
                <Phone size={14} className="shrink-0 text-primary" /> {audit.phone}
              </div>
            )}
            {audit.email && (
              <div className="flex items-center gap-2 text-muted">
                <Mail size={14} className="shrink-0 text-primary" /> {audit.email}
              </div>
            )}
            {audit.contact_page_url && (
              <a href={audit.contact_page_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:underline">
                <ExternalLink size={14} /> Contact page
              </a>
            )}
          </div>
          {(audit.services_offered?.length ?? 0) > 0 && (
            <div className="mt-4">
              <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-muted mb-2">Services</p>
              <div className="flex flex-wrap gap-1.5">
                {audit.services_offered.map((s) => <Chip key={s}>{s}</Chip>)}
              </div>
            </div>
          )}
        </Card>

        {/* Owner research */}
        <Card title="Owner research" icon={<User2 size={16} />}>
          {own?.owner_name ? (
            <div className="space-y-3">
              <div>
                <p className="font-syne text-[17px] font-bold text-body">{own.owner_name}</p>
                {own.owner_title && <p className="text-[13px] font-dm text-muted mt-0.5">{own.owner_title}</p>}
              </div>
              {own.confidence && (
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-dm text-muted">Confidence:</span>
                  <span className={`text-[12px] font-dm font-semibold capitalize ${confidenceColor[own.confidence.toLowerCase()] ?? "text-body"}`}>
                    {own.confidence}
                  </span>
                </div>
              )}
              {own.linkedin_url && (
                <a href={own.linkedin_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-dm text-primary hover:underline">
                  <Link2 size={13} /> LinkedIn profile
                </a>
              )}
              {own.source_url && (
                <p className="text-[12px] font-dm text-muted/60">Source: {own.source_url}</p>
              )}
            </div>
          ) : (
            <p className="text-[14px] font-dm text-muted">No owner data found.</p>
          )}
        </Card>

        {/* Search visibility */}
        <Card title="Search visibility" icon={<Search size={16} />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-dm text-muted">Visibility score</span>
              <span className={`font-syne text-[15px] font-bold capitalize ${visibilityColor[visScore] ?? "text-body"}`}>
                {sv?.visibility_score ?? "—"}
              </span>
            </div>
            {(sv?.directory_presence?.length ?? 0) > 0 && (
              <div>
                <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-muted mb-2">Listed on</p>
                <div className="flex flex-wrap gap-1.5">
                  {sv.directory_presence!.map((d) => <Chip key={d} color="green">{d}</Chip>)}
                </div>
              </div>
            )}
            {(sv?.seo_issues?.length ?? 0) > 0 && (
              <div>
                <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-muted mb-2">SEO issues</p>
                <ul className="space-y-1">
                  {sv.seo_issues!.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] font-dm text-red-300">
                      <XCircle size={13} className="mt-0.5 shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(sv?.missing_trust_signals?.length ?? 0) > 0 && (
              <div>
                <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-muted mb-2">Missing trust signals</p>
                <ul className="space-y-1">
                  {sv.missing_trust_signals!.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] font-dm text-amber-300">
                      <AlertCircle size={13} className="mt-0.5 shrink-0" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>

        {/* Google Business Profile */}
        <Card title="Google Business Profile" icon={<Star size={16} />}>
          {gbp?.profile_url ? (
            <a href={gbp.profile_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-dm text-primary hover:underline mb-4">
              <ExternalLink size={13} /> View profile
            </a>
          ) : (
            <p className="text-[13px] font-dm text-muted mb-4">No Google Business Profile found.</p>
          )}
          {gbp?.google_rating != null && (
            <div className="flex items-center gap-2 mb-3">
              <span className="font-syne text-[22px] font-bold text-amber-400">{gbp.google_rating}</span>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < Math.round(gbp.google_rating!) ? "text-amber-400 fill-amber-400" : "text-muted"} />
                  ))}
                </div>
                {gbp.review_count != null && (
                  <p className="text-[11px] font-dm text-muted">{gbp.review_count} reviews</p>
                )}
              </div>
            </div>
          )}
          {(gbp?.positive_review_themes?.length ?? 0) > 0 && (
            <div className="mb-3">
              <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-muted mb-1.5">Positive themes</p>
              <div className="flex flex-wrap gap-1.5">
                {gbp.positive_review_themes!.map((t) => <Chip key={t} color="green">{t}</Chip>)}
              </div>
            </div>
          )}
          {(gbp?.negative_review_themes?.length ?? 0) > 0 && (
            <div>
              <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-muted mb-1.5">Negative themes</p>
              <div className="flex flex-wrap gap-1.5">
                {gbp.negative_review_themes!.map((t) => <Chip key={t} color="red">{t}</Chip>)}
              </div>
            </div>
          )}
        </Card>

        {/* Lead qualification */}
        <Card title="Lead qualification" icon={<CheckCircle2 size={16} />}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {lq?.is_good_prospect ? (
                <CheckCircle2 size={20} className="text-emerald-400" />
              ) : (
                <XCircle size={20} className="text-red-400" />
              )}
              <div>
                <p className="font-syne text-[15px] font-bold text-body">
                  {lq?.is_good_prospect ? "Good prospect" : "Not a prospect"}
                </p>
                {lq?.prospect_quality && (
                  <p className="text-[12px] font-dm text-muted">{lq.prospect_quality}</p>
                )}
              </div>
            </div>
            {(lq?.possible_business_problems?.length ?? 0) > 0 && (
              <div>
                <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-muted mb-2">Business problems</p>
                <ul className="space-y-1">
                  {lq.possible_business_problems!.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-[13px] font-dm text-muted">
                      <ChevronRight size={13} className="mt-0.5 shrink-0 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(lq?.automation_opportunities?.length ?? 0) > 0 && (
              <div>
                <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-muted mb-2">Automation opportunities</p>
                <ul className="space-y-1">
                  {lq.automation_opportunities!.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-[13px] font-dm text-muted">
                      <ChevronRight size={13} className="mt-0.5 shrink-0 text-primary" /> {o}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {lq?.recommended_outreach_angle && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                <p className="text-[11px] font-dm font-semibold uppercase tracking-wide text-primary mb-1">Outreach angle</p>
                <p className="text-[13px] font-dm text-muted">{lq.recommended_outreach_angle}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Social links */}
        <Card title="Social presence" icon={<Globe size={16} />}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: "facebook", label: "Facebook" },
              { key: "instagram", label: "Instagram" },
              { key: "linkedin", label: "LinkedIn" },
              { key: "youtube", label: "YouTube" },
              { key: "tiktok", label: "TikTok" },
              { key: "x_twitter", label: "X / Twitter" },
            ].map(({ key, label }) => {
              const url = sl?.[key as keyof SocialLinks];
              return (
                <div key={key} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 ${url ? "border-primary/20 bg-primary/5" : "border-border bg-white/[0.02] opacity-50"}`}>
                  <Link2 size={14} className={url ? "text-primary" : "text-muted"} />
                  <div className="min-w-0">
                    <p className="text-[11px] font-dm font-semibold text-muted uppercase tracking-wide">{label}</p>
                    {url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer"
                        className="block truncate text-[12px] font-dm text-primary hover:underline">
                        {url.replace(/^https?:\/\//, "")}
                      </a>
                    ) : (
                      <p className="text-[12px] font-dm text-muted/50">Not found</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Sources */}
      {(audit.sources?.length ?? 0) > 0 && (
        <div className="mt-6 rounded-card border border-border bg-surface p-6">
          <h3 className="font-syne text-[14px] font-bold text-muted uppercase tracking-wide mb-3">Sources</h3>
          <ul className="space-y-1.5">
            {audit.sources.map((s, i) => (
              <li key={i} className="text-[12px] font-dm text-muted/60 flex items-start gap-2">
                <span className="shrink-0 mt-0.5 text-primary">·</span> {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 text-right text-[12px] font-dm text-muted/40">
        Audited {new Date(audit.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
    </div>
  );
}
