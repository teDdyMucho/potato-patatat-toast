import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free AI Tools for Business | Powered by Claude AI — AKT",
  description:
    "Try AKT's free AI tools built with Claude: Lead Qualifier, Cold Email Generator, Blog Writer, SEO Brief, GoHighLevel Prompt Helper, Design Adjuster, and more. Free account, no commitment.",
  keywords: [
    "free AI tools for business",
    "Claude AI tools",
    "lead qualifier AI tool",
    "cold email generator AI",
    "SEO brief generator",
    "GoHighLevel prompt generator",
    "AI content writer free",
    "business automation tools free",
    "AKT AI tools",
    "AI tools for SMB",
  ],
  openGraph: {
    title: "Free AI Tools for Business | Powered by Claude AI — AKT",
    description:
      "Lead Qualifier, Cold Email Generator, SEO Brief, GoHighLevel Prompt Helper, AI Design Adjuster. Free tools built with Claude AI — try before you hire.",
    url: "https://aktservices.org/ai-tools",
    siteName: "AKT Virtual Assistance Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Tools for Business — AKT",
    description: "Try AKT's Claude-powered AI tools for free. No commitment — experience our AI quality firsthand.",
  },
  alternates: { canonical: "https://aktservices.org/ai-tools" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AKT AI Tools Hub",
  url: "https://aktservices.org/ai-tools",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Free AI-powered business tools built with Claude AI: Lead Qualifier, Cold Email Generator, Blog Post Writer, SEO Brief Generator, GoHighLevel Prompt Helper, Design Adjuster, and more.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free to use with a free account registration.",
  },
  provider: {
    "@type": "Organization",
    name: "AKT Virtual Assistance Services",
    url: "https://aktservices.org",
  },
};

export default function AIToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
