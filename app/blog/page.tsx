import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Calendar, ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | AKT Virtual Assistance Services — AI, VA & Business Growth",
  description:
    "Expert insights on AI automation, Filipino virtual assistants, GoHighLevel, Retell AI, VAPI, CloseBot, and business growth strategies from AKT.",
};

const posts = [
  {
    category: "AI & Automation",
    date: "May 18, 2026",
    readTime: "8 min read",
    title: "How We Set Up GoHighLevel Automation for a 7-Figure Real Estate Firm",
    excerpt:
      "A step-by-step breakdown of how AKT deployed GoHighLevel CRM + AI follow-up sequences that cut client response time by 80% — and the exact workflow structure we used.",
    href: "/blog/gohighlevel-real-estate-automation",
    tags: ["GoHighLevel", "Automation"],
    featured: true,
  },
  {
    category: "AI & Automation",
    date: "May 12, 2026",
    readTime: "11 min read",
    title: "VAPI vs Retell AI: Which AI Voice Agent Is Right for Your Business in 2026?",
    excerpt:
      "We've deployed both at scale. Here's our unfiltered comparison based on real client deployments — pricing, call quality, integration capabilities, and who each one is best suited for.",
    href: "/blog/vapi-vs-retell-ai",
    tags: ["VAPI", "Retell AI"],
    featured: false,
  },
  {
    category: "VA Industry",
    date: "May 5, 2026",
    readTime: "7 min read",
    title: "Why Filipino VAs Outperform: The AKT Hiring & Training Process",
    excerpt:
      "Inside AKT's proprietary VA onboarding system — how we select, assess, and deploy elite Filipino talent for global businesses, and why the Philippines remains the world's best VA source.",
    href: "/blog/filipino-va-hiring-process",
    tags: ["Filipino VAs", "Operations"],
    featured: false,
  },
  {
    category: "AI & Automation",
    date: "Apr 28, 2026",
    readTime: "9 min read",
    title: "What Is CloseBot AI? A Complete Guide to AI-Powered Sales Automation",
    excerpt:
      "CloseBot is transforming how SMBs handle sales conversations. Here's everything you need to know — what it does, how to set it up, and why AKT uses it for client lead pipelines.",
    href: "/blog/closebot-ai-guide",
    tags: ["CloseBot", "Sales AI"],
    featured: false,
  },
  {
    category: "Business Growth",
    date: "Apr 21, 2026",
    readTime: "6 min read",
    title: "How to Set Up GoHighLevel with a Virtual Assistant: The Complete Guide",
    excerpt:
      "One of the most-asked questions we get: can a VA manage GoHighLevel? Yes — here's how to set up GHL, train your VA, and build a system that runs without you.",
    href: "/blog/gohighlevel-virtual-assistant-setup",
    tags: ["GoHighLevel", "Filipino VAs"],
    featured: false,
  },
  {
    category: "AI & Automation",
    date: "Apr 14, 2026",
    readTime: "10 min read",
    title: "Claude AI for Business: How to Use Anthropic's Claude in Your Operations",
    excerpt:
      "Claude AI is the most capable business AI model available today. Here's how AKT uses Claude to build automation workflows, content systems, and AI agents for SMB clients worldwide.",
    href: "/blog/claude-ai-for-business",
    tags: ["Claude AI", "Anthropic"],
    featured: false,
  },
];


const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  "GoHighLevel": { bg: "#073B34", text: "#0ABFA3", border: "#0ABFA3" },
  "Retell AI": { bg: "#062B26", text: "#0ABFA3", border: "#155E53" },
  "VAPI": { bg: "#062B26", text: "#0ABFA3", border: "#155E53" },
  "CloseBot": { bg: "#073B34", text: "#0ABFA3", border: "#0ABFA3" },
  "Claude AI": { bg: "#062B26", text: "#0ABFA3", border: "#155E53" },
  "Anthropic": { bg: "#062B26", text: "#0ABFA3", border: "#155E53" },
  "Filipino VAs": { bg: "#073B34", text: "#0ABFA3", border: "#0ABFA3" },
  "Automation": { bg: "#062B26", text: "#0ABFA3", border: "#155E53" },
  "Sales AI": { bg: "#073B34", text: "#0ABFA3", border: "#0ABFA3" },
  "Operations": { bg: "#062B26", text: "#0ABFA3", border: "#155E53" },
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 bg-[#101113] border-b border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl">
              <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-4">
                Blog & Resources
              </p>
              <h1
                className="font-syne text-body mb-4"
                style={{ fontSize: "clamp(32px, 4.5vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                AI, VA & Business Growth
              </h1>
              <p className="text-[16px] font-dm text-muted leading-relaxed">
                Expert insights from AKT — practical guides on AI automation,
                virtual assistants, GoHighLevel, Retell AI, VAPI, and scaling
                your business with modern tools.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            {/* Featured post */}
            {featured && (
              <div className="mb-12">
                <p className="text-[11px] font-dm font-semibold uppercase tracking-widest text-muted mb-4">
                  Featured Post
                </p>
                <Link
                  href={featured.href}
                  className="group bg-[#101113] rounded-card border border-border p-8 flex flex-col md:flex-row gap-8 hover:border-primary hover:shadow-card transition-all duration-200 block"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span
                        className="text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full border"
                        style={{ background: "#062B26", color: "#0ABFA3", borderColor: "#155E53" }}
                      >
                        {featured.category}
                      </span>
                      <span className="text-[12px] font-dm text-muted flex items-center gap-1">
                        <Calendar size={11} /> {featured.date}
                      </span>
                      <span className="text-[12px] font-dm text-muted flex items-center gap-1">
                        <Clock size={11} /> {featured.readTime}
                      </span>
                    </div>
                    <h2
                      className="font-syne text-body mb-3 group-hover:text-primary transition-colors"
                      style={{ fontSize: "clamp(20px, 2.5vw, 26px)", fontWeight: 700, letterSpacing: "-0.01em" }}
                    >
                      {featured.title}
                    </h2>
                    <p className="text-[14px] font-dm text-muted leading-relaxed mb-5 max-w-xl">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {featured.tags.map((tag) => {
                        const style = tagColors[tag] || { bg: "#101113", text: "#A1A1AA", border: "#2C2C2E" };
                        return (
                          <span
                            key={tag}
                            className="text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full border"
                            style={{ background: style.bg, color: style.text, borderColor: style.border }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                      <span className="ml-auto text-[12px] font-dm text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read post <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Post grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <Link
                  key={i}
                  href={post.href}
                  className="group bg-[#101113] rounded-card border border-border p-6 flex flex-col hover:border-primary hover:shadow-card transition-all duration-200"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                      className="text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full border"
                      style={{ background: "#062B26", color: "#0ABFA3", borderColor: "#155E53" }}
                    >
                      {post.category}
                    </span>
                  </div>

                  <h3
                    className="font-syne text-body mb-2.5 group-hover:text-primary transition-colors flex-1"
                    style={{ fontSize: "16px", fontWeight: 700, lineHeight: "1.4", letterSpacing: "-0.01em" }}
                  >
                    {post.title}
                  </h3>

                  <p className="text-[13px] font-dm text-muted leading-relaxed mb-5">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-auto pt-4 border-t border-border">
                    <span className="text-[11px] font-dm text-muted flex items-center gap-1">
                      <Calendar size={10} /> {post.date}
                    </span>
                    <span className="text-[11px] font-dm text-muted flex items-center gap-1">
                      <Clock size={10} /> {post.readTime}
                    </span>
                    {post.tags.slice(0, 1).map((tag) => {
                      const style = tagColors[tag] || { bg: "#101113", text: "#A1A1AA", border: "#2C2C2E" };
                      return (
                        <span
                          key={tag}
                          className="ml-auto text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full border"
                          style={{ background: style.bg, color: style.text, borderColor: style.border }}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-[#101113] border-t border-border">
          <div className="max-w-7xl mx-auto px-6">
            <div
              className="rounded-card p-10 text-center border"
              style={{ background: "#062B26", borderColor: "#155E53" }}
            >
              <h3
                className="font-syne text-body text-[22px] font-bold mb-2"
                style={{ letterSpacing: "-0.01em" }}
              >
                Monthly AI in Business Newsletter
              </h3>
              <p className="text-[15px] font-dm text-muted mb-7 max-w-md mx-auto">
                Get the best AI automation insights, VA industry news, and
                practical growth tips — delivered monthly. Free.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-md border border-border text-[14px] font-dm text-body focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md text-[14px] font-dm font-semibold text-white transition-colors whitespace-nowrap"
                  style={{ background: "#0ABFA3" }}
                >
                  Subscribe Free
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
