import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { aiTools } from "@/lib/ai-tools-data";

export function generateStaticParams() {
  return aiTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = aiTools.find((t) => t.slug === slug);
  if (!tool) return { title: "Sample not found | AKT" };
  return {
    title: `${tool.name} sample | AKT AI Tools`,
    description: tool.description,
  };
}

export default async function AiToolSamplePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = aiTools.find((t) => t.slug === slug);
  if (!tool) notFound();

  const Icon = tool.icon;

  return (
    <>
      <Nav />
      <main className="relative min-h-screen overflow-hidden bg-[#050608] pt-16">
        {/* Futuristic backdrop, matching the AI Tools hub */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#0ABFA3 1px, transparent 1px), linear-gradient(90deg, #0ABFA3 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#0ABFA3]/10 blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-14">
          <Link
            href="/ai-tools"
            className="mb-8 inline-flex items-center gap-1.5 text-[13px] font-dm text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft size={15} /> Back to AI Tools
          </Link>

          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{ background: tool.bg }}
            >
              <Icon size={26} style={{ color: tool.color }} strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[11px] font-dm font-semibold uppercase tracking-widest text-muted">
                {tool.tag}
              </p>
              <h1
                className="font-syne text-body"
                style={{ fontSize: "clamp(24px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.02em" }}
              >
                {tool.name}
              </h1>
            </div>
          </div>

          <p className="mb-10 max-w-2xl text-[15px] font-dm leading-relaxed text-muted">
            {tool.description}
          </p>

          {/* Sample content */}
          <div className="rounded-card border border-border bg-[#101113] p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2 text-[12px] font-dm font-semibold" style={{ color: "#0ABFA3" }}>
              <CheckCircle size={14} />
              {tool.sampleTitle}
            </div>
            <div className="space-y-3">
              {tool.sampleItems.map((item, i) => {
                const isAi = item.label.toLowerCase().includes("ai");
                return (
                  <div key={i} className={`flex ${isAi ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                        isAi ? "rounded-tr-sm text-white" : "rounded-tl-sm border border-border bg-white/[0.04]"
                      }`}
                      style={isAi ? { background: "linear-gradient(135deg, #0ABFA3 0%, #089080 100%)" } : undefined}
                    >
                      <p
                        className="mb-1 text-[10px] font-dm font-semibold uppercase tracking-widest"
                        style={{ color: isAi ? "rgba(255,255,255,0.75)" : "#0ABFA3" }}
                      >
                        {item.label}
                      </p>
                      <p className={`text-[14px] font-dm leading-relaxed ${isAi ? "text-white" : "text-body/80"}`}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-[13px] font-dm leading-relaxed text-muted">
              {tool.sampleNote}
            </p>
          </div>

          {/* CTA */}
          <div
            className="mt-10 rounded-card border p-8 text-center"
            style={{ background: "#062B26", borderColor: "#155E53" }}
          >
            <h2 className="font-syne text-body text-[20px] font-bold mb-2" style={{ letterSpacing: "-0.01em" }}>
              Want this built for your business?
            </h2>
            <p className="mb-6 text-[14px] font-dm text-muted max-w-md mx-auto">
              We&apos;ll set up {tool.name} for your business, tailored to how
              you actually work — no templates, no guesswork.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[14px] font-dm font-semibold text-white transition-colors"
              style={{ background: "#0ABFA3" }}
            >
              Book a Free Consultation
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
