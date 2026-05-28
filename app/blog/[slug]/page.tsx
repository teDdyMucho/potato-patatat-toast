import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { BLOG_COLUMNS, rowToPost, type BlogRow } from "@/lib/blog";

export const dynamic = "force-dynamic";

type Article = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  imageUrl: string | null;
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

// Published post by slug from Supabase, else the static fallback, else null.
async function getArticle(slug: string): Promise<Article | null> {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase
      .from("blog_posts")
      .select(BLOG_COLUMNS)
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();

    if (data) {
      const p = rowToPost(data as BlogRow);
      return {
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        category: p.category,
        tags: p.tags,
        readTime: p.readTime,
        date: dateFmt.format(new Date(p.publishedAt)),
        imageUrl: p.imageUrl,
      };
    }
  } catch {
    // fall through
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: "Post not found | AKT" };
  return {
    title: `${article.title} | AKT Blog`,
    description: article.excerpt,
    keywords: article.tags.length ? article.tags : undefined,
    alternates: { canonical: `https://aktservices.org/blog/${params.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://aktservices.org/blog/${params.slug}`,
      siteName: "AKT Virtual Assistance Services",
      type: "article",
      images: article.imageUrl ? [{ url: article.imageUrl, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.imageUrl ? [article.imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const paragraphs = article.content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  function renderBlock(block: string, i: number) {
    // --- → green divider line
    if (/^-{3,}$/.test(block)) {
      return <hr key={i} className="border-0 h-px bg-[#0ABFA3]/40 my-2" />;
    }
    // # Heading → bold display heading
    if (block.startsWith("#")) {
      const level = block.match(/^(#+)/)?.[1].length ?? 1;
      const text = block.replace(/^#+\s*/, "");
      const sizeMap: Record<number, string> = {
        1: "clamp(24px, 3vw, 32px)",
        2: "clamp(20px, 2.5vw, 26px)",
        3: "clamp(17px, 2vw, 22px)",
      };
      return (
        <p
          key={i}
          className="font-syne font-bold text-white mt-8 mb-2"
          style={{ fontSize: sizeMap[Math.min(level, 3)], letterSpacing: "-0.02em", lineHeight: 1.2 }}
        >
          {text}
        </p>
      );
    }
    // Block of * bullet lines → green bullet list
    if (block.split("\n").every((line) => line.trimStart().startsWith("*"))) {
      const lines = block.split("\n").map((l) => l.replace(/^\s*\*\s*/, "").trim()).filter(Boolean);
      return (
        <ul key={i} className="space-y-2 my-1">
          {lines.map((line, j) => (
            <li key={j} className="flex items-start gap-2.5 text-[16px] font-dm leading-[1.8] text-body/90">
              <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#0ABFA3] shadow-[0_0_6px_rgba(10,191,163,0.7)]" />
              {line}
            </li>
          ))}
        </ul>
      );
    }
    // Mixed block — some lines may start with * inside a paragraph
    const lines = block.split("\n");
    if (lines.some((l) => l.trimStart().startsWith("*"))) {
      return (
        <div key={i} className="space-y-1.5">
          {lines.map((line, j) => {
            const isBullet = line.trimStart().startsWith("*");
            if (isBullet) {
              return (
                <div key={j} className="flex items-start gap-2.5 text-[16px] font-dm leading-[1.8] text-body/90">
                  <span className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-[#0ABFA3] shadow-[0_0_6px_rgba(10,191,163,0.7)]" />
                  {line.replace(/^\s*\*\s*/, "").trim()}
                </div>
              );
            }
            return <p key={j} className="text-[16px] font-dm leading-[1.8] text-body/90">{line}</p>;
          })}
        </div>
      );
    }
    // Default → plain paragraph
    return (
      <p key={i} className="whitespace-pre-wrap text-[16px] font-dm leading-[1.8] text-body/90">
        {block}
      </p>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.imageUrl ?? undefined,
    datePublished: article.date,
    author: { "@type": "Organization", name: "AKT Virtual Assistance Services", url: "https://aktservices.org" },
    publisher: { "@type": "Organization", name: "AKT Virtual Assistance Services", url: "https://aktservices.org" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://aktservices.org/blog/${params.slug}` },
    keywords: article.tags.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="pt-16">
        {/* Header */}
        <section className="border-b border-border bg-[#101113] py-14">
          <div className="mx-auto max-w-3xl px-6">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-dm text-muted transition-colors hover:text-primary"
            >
              <ArrowLeft size={15} /> Back to blog
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              {article.category && (
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[11px] font-dm font-semibold"
                  style={{ background: "#062B26", color: "#0ABFA3", borderColor: "#155E53" }}
                >
                  {article.category}
                </span>
              )}
              <span className="flex items-center gap-1 text-[12px] font-dm text-muted">
                <Calendar size={12} /> {article.date}
              </span>
              {article.readTime && (
                <span className="flex items-center gap-1 text-[12px] font-dm text-muted">
                  <Clock size={12} /> {article.readTime}
                </span>
              )}
            </div>

            <h1
              className="font-syne text-body"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}
            >
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-5 text-[17px] font-dm leading-relaxed text-muted">
                {article.excerpt}
              </p>
            )}
          </div>
        </section>

        {/* Body */}
        <article className="bg-black py-14">
          <div className="mx-auto max-w-3xl px-6">
            {article.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.imageUrl}
                alt={article.title}
                className="mb-10 max-h-[460px] w-full rounded-card border border-border object-cover"
              />
            )}

            {paragraphs.length > 0 ? (
              <div className="space-y-5">
                {paragraphs.map((block, i) => renderBlock(block, i))}
              </div>
            ) : (
              <p className="text-[15px] font-dm italic leading-relaxed text-muted">
                The full article is coming soon.
              </p>
            )}

            {article.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 text-[12px] font-dm font-semibold"
                    style={{ background: "#062B26", color: "#0ABFA3", borderColor: "#155E53" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div
              className="mt-12 rounded-card border p-8 text-center"
              style={{ background: "#062B26", borderColor: "#155E53" }}
            >
              <h3 className="font-syne text-[20px] font-bold text-body" style={{ letterSpacing: "-0.01em" }}>
                Want AKT to build this for your business?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-[14px] font-dm text-muted">
                Book a free consultation and we&apos;ll map out exactly how AKT can help.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-md px-6 py-3 text-[14px] font-dm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "#0ABFA3" }}
              >
                Book a free consultation
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
