import Link from "next/link";
import { Quote, ArrowUpRight, TrendingUp, Users, Globe, DollarSign } from "lucide-react";

const metrics = [
  {
    icon: DollarSign,
    value: "$M+",
    label: "Revenue Generated",
    sub: "For partner clients since 2020",
    color: "#0ABFA3",
    bg: "#062B26",
  },
  {
    icon: Users,
    value: "50+",
    label: "Active Clients",
    sub: "Across SMBs, agencies & enterprises",
    color: "#0ABFA3",
    bg: "#073B34",
  },
  {
    icon: Globe,
    value: "6",
    label: "Continents Served",
    sub: "Americas, Europe, APAC, ME, Africa & PH",
    color: "#0ABFA3",
    bg: "#062B26",
  },
  {
    icon: TrendingUp,
    value: "4 Yrs",
    label: "Proto Financial Partnership",
    sub: "2020–2024 — call center & lead gen",
    color: "#0ABFA3",
    bg: "#073B34",
  },
];

const testimonials = [
  {
    quote:
      "AKT built our entire GoHighLevel system from scratch — automations, pipelines, AI follow-up sequences. Our team went from manually chasing leads to having the system do it all.",
    name: "Client, Real Estate Agency",
    location: "United States",
    tag: "GoHighLevel",
  },
  {
    quote:
      "The Filipino VAs AKT placed for us are exceptional — professional, responsive, and genuinely skilled. They outperform in-house hires at a fraction of the cost.",
    name: "Client, SaaS Company",
    location: "United Kingdom",
    tag: "Filipino VAs",
  },
  {
    quote:
      "Our Retell AI voice agent went live in under 2 weeks. Inbound calls are now handled automatically — qualified leads are pushed straight into our CRM.",
    name: "Client, Financial Services",
    location: "Australia",
    tag: "Retell AI",
  },
];

const partners = [
  "Proto Financial",
  "GoHighLevel",
  "Retell AI",
  "VAPI",
  "CloseBot",
  "Anthropic",
  "OpenAI",
];

export default function ProofSection() {
  return (
    <section id="proof" className="py-24 bg-[#101113] section-sep">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-3">
            What We Proved
          </p>
          <h2
            className="font-syne text-body mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Results that speak.
          </h2>
          <p className="text-[16px] font-dm text-muted leading-relaxed">
            Since 2020, AKT has driven measurable outcomes for clients across
            every major industry. Here&apos;s what we&apos;ve proven.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="rounded-card border border-border p-6 bg-[#101113] hover:border-primary hover:shadow-card transition-all duration-200"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: m.bg }}
                >
                  <Icon size={18} style={{ color: m.color }} strokeWidth={1.75} />
                </div>
                <p
                  className="font-syne text-body mb-1"
                  style={{ fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em" }}
                >
                  {m.value}
                </p>
                <p className="text-[14px] font-dm font-semibold text-body mb-1">{m.label}</p>
                <p className="text-[12px] font-dm text-muted leading-snug">{m.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-card border border-border p-6 bg-[#101113] hover:border-primary hover:shadow-card transition-all duration-200 flex flex-col"
            >
              <Quote
                size={20}
                className="mb-4 text-accent shrink-0"
                strokeWidth={1.5}
              />
              <p className="text-[14px] font-dm text-body leading-relaxed flex-1 mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-dm font-semibold text-body">{t.name}</p>
                  <p className="text-[12px] font-dm text-muted">{t.location}</p>
                </div>
                <span
                  className="text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full border"
                  style={{
                    background: "#073B34",
                    color: "#0ABFA3",
                    borderColor: "#0ABFA3",
                  }}
                >
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Partners / Integrations strip */}
        <div className="border border-border rounded-card p-8 bg-black">
          <p className="text-center text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-6">
            Tools & Partners We Work With
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {partners.map((p) => (
              <span
                key={p}
                className="px-5 py-2 rounded-md border border-border bg-[#101113] text-[13px] font-dm font-semibold text-body hover:border-primary hover:text-primary transition-colors cursor-default"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-[14px] font-dm font-medium text-primary hover:text-primary-hover transition-colors"
          >
            See full case studies
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
