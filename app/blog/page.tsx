import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Calendar, ArrowUpRight, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { BLOG_COLUMNS, rowToPost, type BlogRow } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | AKT Virtual Assistance Services — AI, VA & Business Growth",
  description:
    "Expert insights on AI automation, Filipino virtual assistants, GoHighLevel, Retell AI, VAPI, CloseBot, and business growth strategies from AKT.",
};

// Always render fresh so admin edits show without a redeploy.
export const dynamic = "force-dynamic";

type PostCard = {
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  href: string;
  tags: string[];
  featured: boolean;
  imageUrl?: string | null;
};

const blogDateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

// Fetch only real published posts from Supabase. Returns [] when empty.
async function getPosts(): Promise<PostCard[]> {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(BLOG_COLUMNS)
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) return [];

    return (data as BlogRow[]).map((row) => {
      const p = rowToPost(row);
      return {
        category: p.category,
        date: blogDateFmt.format(new Date(p.publishedAt)),
        readTime: p.readTime,
        title: p.title,
        excerpt: p.excerpt,
        href: `/blog/${p.slug}`,
        tags: p.tags,
        featured: p.featured,
        imageUrl: p.imageUrl,
      };
    });
  } catch {
    return [];
  }
}

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

export default async function BlogPage() {
  const posts = await getPosts();
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

            {/* Empty state — no published posts yet */}
            {posts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-[#101113]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0ABFA3" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </div>
                <h2 className="font-syne text-body text-[22px] font-bold mb-2" style={{ letterSpacing: "-0.01em" }}>
                  No posts yet
                </h2>
                <p className="font-dm text-muted text-[15px] max-w-sm">
                  Blog posts published in the admin will appear here. Check back soon.
                </p>
              </div>
            )}

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
                  {featured.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.imageUrl}
                      alt=""
                      className="h-48 w-full rounded-lg object-cover md:h-auto md:w-72 md:shrink-0"
                    />
                  )}
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
                        const style = tagColors[tag] || { bg: "#073B34", text: "#0ABFA3", border: "#0ABFA3" };
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
                  {post.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="mb-4 h-40 w-full rounded-lg object-cover"
                    />
                  )}
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
                    {post.tags.length > 0 && (
                      <div className="ml-auto flex flex-wrap justify-end gap-1.5">
                        {post.tags.map((tag) => {
                          const style = tagColors[tag] || { bg: "#073B34", text: "#0ABFA3", border: "#0ABFA3" };
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
                      </div>
                    )}
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
