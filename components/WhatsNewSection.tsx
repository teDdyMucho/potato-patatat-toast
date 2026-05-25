import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";

const posts = [
  {
    category: "AI & Automation",
    date: "May 18, 2026",
    title: "How We Set Up GoHighLevel Automation for a 7-Figure Real Estate Firm",
    excerpt:
      "A step-by-step look at how AKT deployed GoHighLevel CRM + AI follow-up sequences that cut client response time by 80%.",
    href: "/blog/gohighlevel-real-estate-automation",
    tag: "GoHighLevel",
  },
  {
    category: "VA Industry",
    date: "May 12, 2026",
    title: "VAPI vs Retell AI: Which AI Voice Agent Is Right for Your Business?",
    excerpt:
      "We've deployed both. Here's our unfiltered comparison based on real client deployments across call centers and SMB operations.",
    href: "/blog/vapi-vs-retell-ai",
    tag: "VAPI · Retell AI",
  },
  {
    category: "Business Growth",
    date: "May 5, 2026",
    title: "Why Filipino VAs Outperform: The AKT Hiring & Training Process",
    excerpt:
      "Inside AKT's proprietary VA onboarding system — how we select, train, and deploy elite Filipino talent for global businesses.",
    href: "/blog/filipino-va-hiring-process",
    tag: "Filipino VAs",
  },
];

export default function WhatsNewSection() {
  return (
    <section id="whats-new" className="py-24 bg-black section-sep">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-3">
              What Is New
            </p>
            <h2
              className="font-syne text-body"
              style={{ fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Latest from AKT
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[13px] font-dm font-medium text-primary hover:text-primary-hover transition-colors shrink-0"
          >
            View all posts
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={post.href}
              className="group bg-[#101113] rounded-card border border-border p-6 flex flex-col hover:border-primary transition-all duration-200 hover:shadow-card"
            >
              {/* Category + Date */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full border"
                  style={{
                    background: "#062B26",
                    color: "#0ABFA3",
                    borderColor: "#155E53",
                  }}
                >
                  {post.category}
                </span>
                <span className="text-[11px] font-dm text-muted flex items-center gap-1">
                  <Calendar size={11} />
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-syne text-body mb-3 group-hover:text-primary transition-colors"
                style={{ fontSize: "17px", fontWeight: 700, lineHeight: "1.35", letterSpacing: "-0.01em" }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[13px] font-dm text-muted leading-relaxed flex-1 mb-5">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full border"
                  style={{
                    background: "#073B34",
                    color: "#0ABFA3",
                    borderColor: "#0ABFA3",
                  }}
                >
                  {post.tag}
                </span>
                <span className="text-[12px] font-dm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read more <ArrowUpRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
