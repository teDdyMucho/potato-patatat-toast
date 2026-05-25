import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Share2, Mail, MapPin, ArrowUpRight } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Virtual Assistants", href: "/about#services" },
    { label: "AI Infrastructure", href: "/about#services" },
    { label: "Automation Systems", href: "/about#services" },
    { label: "Call Center", href: "/about#services" },
    { label: "Lead Generation", href: "/about#services" },
  ],
  "AI Tools": [
    { label: "Sales AI", href: "/ai-tools" },
    { label: "Content AI", href: "/ai-tools" },
    { label: "Productivity AI", href: "/ai-tools" },
    { label: "Automation AI", href: "/ai-tools" },
    { label: "Try AI Now →", href: "/ai-tools" },
  ],
  Company: [
    { label: "About AKT", href: "/about" },
    { label: "Partners", href: "/partners" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#1C1C1E" }} className="text-[#9CA3AF]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/image/akt_logo.png"
                alt="AKT logo"
                width={421}
                height={377}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-[14px] font-dm leading-relaxed max-w-xs mb-6">
              Elite Filipino virtual assistants and AI automation for SMBs
              across 6 continents. Founded 2020 by Jose Angelo Tapang.
            </p>
            <div className="flex items-start gap-2 mb-3 text-[13px]">
              <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
              <span>Philippines (Serving Worldwide)</span>
            </div>
            <div className="flex items-center gap-2 mb-6 text-[13px]">
              <Mail size={14} className="shrink-0 text-accent" />
              <a
                href="mailto:admin@aktservices.org"
                className="hover:text-white transition-colors"
              >
                admin@aktservices.org
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/in/jatakt"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#2C2C2E] hover:border-[#3C3C3E] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <ExternalLink size={14} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100075861475134"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#2C2C2E] hover:border-[#3C3C3E] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Share2 size={14} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <h4
                className="text-white text-[12px] font-syne uppercase tracking-widest mb-4"
                style={{ fontWeight: 700 }}
              >
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[13px] font-dm hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="rounded-card p-6 sm:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "#242426" }}
        >
          <div>
            <p
              className="font-syne text-white text-[20px] mb-1"
              style={{ fontWeight: 700 }}
            >
              Ready to scale with AI?
            </p>
            <p className="text-[14px] font-dm text-[#9CA3AF]">
              Book a free 30-minute consultation — no commitment required.
            </p>
          </div>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-[14px] font-dm font-semibold text-white whitespace-nowrap transition-colors"
            style={{ background: "#0ABFA3" }}
          >
            Book Free Consultation
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2C2C2E] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] font-dm">
          <p>© 2026 AKT Virtual Assistance Services. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>aktservices.org</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
