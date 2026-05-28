import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | GoHighLevel, AI Automation & VA Services — AKT",
  description:
    "AKT offers GoHighLevel CRM setup, n8n workflow automation, Retell AI voice agents, custom AI chatbots, and elite Filipino virtual assistants. Full AI infrastructure for SMBs worldwide.",
  keywords: [
    "GoHighLevel setup service",
    "n8n automation agency",
    "Retell AI voice agent service",
    "AI automation services",
    "Filipino virtual assistant agency",
    "GHL CRM management",
    "AI chatbot development",
    "workflow automation agency",
    "VA services Philippines",
    "business automation consultant",
  ],
  openGraph: {
    title: "Services | GoHighLevel, AI Automation & VA Services — AKT",
    description:
      "GoHighLevel, n8n, Retell AI, voice agents, chatbots, and elite Filipino VAs. One agency for your full AI automation stack.",
    url: "https://aktservices.org/services",
    siteName: "AKT Virtual Assistance Services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | AKT — GoHighLevel & AI Automation Agency",
    description:
      "GoHighLevel setup, n8n workflows, Retell AI voice agents, and Filipino VAs — all under one agency.",
  },
  alternates: { canonical: "https://aktservices.org/services" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AKT AI Automation & Virtual Assistant Services",
  provider: {
    "@type": "Organization",
    name: "AKT Virtual Assistance Services",
    url: "https://aktservices.org",
  },
  description:
    "GoHighLevel CRM setup and automation, n8n workflow builds, Retell AI voice agent development, custom AI chatbots, and elite Filipino virtual assistant services for SMBs worldwide.",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AKT Service Catalog",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "GoHighLevel CRM Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "n8n Workflow Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Retell AI Voice Agents" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom AI Chatbots" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Filipino Virtual Assistant Services" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Infrastructure Buildouts" } },
    ],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
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
