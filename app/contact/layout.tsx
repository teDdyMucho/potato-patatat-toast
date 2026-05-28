import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consultation | AKT Virtual Assistance Services",
  description:
    "Book a free consultation with AKT. We'll audit your tools, map your automation gaps, and show you exactly what GoHighLevel, n8n, Retell AI, and Filipino VAs can do for your business.",
  keywords: [
    "book AI automation consultation",
    "GoHighLevel setup consultation",
    "free consultation virtual assistant",
    "hire AI automation agency",
    "contact AKT services",
    "AI automation quote",
    "GHL setup quote",
    "business automation consultation",
  ],
  openGraph: {
    title: "Book a Free Consultation | AKT Virtual Assistance Services",
    description:
      "Free consultation: we audit your operations, map automation gaps, and show you what AKT can build. GoHighLevel, n8n, Retell AI, Filipino VAs.",
    url: "https://aktservices.org/contact",
    siteName: "AKT Virtual Assistance Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Consultation | AKT",
    description: "Free consultation with AKT — AI automation and VA services for your business.",
  },
  alternates: { canonical: "https://aktservices.org/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "AKT Virtual Assistance Services — Contact",
  url: "https://aktservices.org/contact",
  description:
    "Book a free consultation with AKT Virtual Assistance Services to discuss GoHighLevel automation, n8n workflows, Retell AI voice agents, and Filipino virtual assistant services.",
  mainEntity: {
    "@type": "Organization",
    name: "AKT Virtual Assistance Services",
    url: "https://aktservices.org",
    email: "admin@aktservices.org",
    foundingDate: "2020",
    areaServed: "Worldwide",
    contactPoint: {
      "@type": "ContactPoint",
      email: "admin@aktservices.org",
      contactType: "Sales",
      availableLanguage: "English",
    },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
