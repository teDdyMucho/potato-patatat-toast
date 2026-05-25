import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PartnerGrid from "@/components/PartnerGrid";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | AKT Virtual Assistance Services",
  description:
    "AKT partners — businesses we've worked with across real estate, finance, SaaS, and beyond.",
};

export default function PartnersPage() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-10 bg-[#101113] border-b border-border">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="accent-bar text-[11px] font-dm font-semibold text-muted uppercase tracking-widest mb-2">
                Portfolio
              </p>
              <h1
                className="font-syne text-body"
                style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                Businesses we&apos;ve built for.{" "}
                <span style={{ color: "#0ABFA3" }}>Real results.</span>
              </h1>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-dm font-semibold text-white transition-colors shrink-0"
              style={{ background: "#0ABFA3" }}
            >
              Hire Us
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>

        {/* Partner Grid */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <PartnerGrid />

            {/* CTA */}
            <div
              className="mt-16 rounded-card p-6 sm:p-10 text-center border"
              style={{ background: "#062B26", borderColor: "#155E53" }}
            >
              <h3
                className="font-syne text-body text-[24px] font-bold mb-3"
                style={{ letterSpacing: "-0.01em" }}
              >
                Ready to be our next partner?
              </h3>
              <p className="text-[15px] font-dm text-muted mb-7 max-w-md mx-auto">
                Book a free consultation and let&apos;s map out exactly what
                AKT can build for your business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[14px] font-dm font-semibold text-white transition-colors"
                style={{ background: "#0ABFA3" }}
              >
                Book Free Consultation
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
