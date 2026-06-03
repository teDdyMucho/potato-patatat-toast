import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Consultation | AKT Virtual Assistance Services",
  description:
    "Book a free consultation with AKT. We'll audit your tools, map your automation gaps, and show you exactly what GoHighLevel, n8n, Retell AI, and Filipino VAs can do for your US, Canadian, UK, or Australian business.",
  keywords: [
    "book AI automation consultation",
    "GoHighLevel setup consultation",
    "free consultation virtual assistant",
    "hire AI automation agency",
    "contact AKT services",
    "AI automation quote",
    "GHL setup quote",
    "business automation consultation US",
    "hire Filipino VA",
    "automation agency consultation Canada",
  ],
  openGraph: {
    title: "Book a Free Consultation | AKT Virtual Assistance Services",
    description:
      "Free consultation: we audit your operations, map automation gaps, and show you what AKT can build. GoHighLevel, n8n, Retell AI, Filipino VAs — for US, Canada, UK & Australia.",
    url: "https://aktservices.org/contact",
    siteName: "AKT Virtual Assistance Services",
    type: "website",
    images: [
      {
        url: "https://aktservices.org/image/akt_og.png",
        width: 1200,
        height: 630,
        alt: "AKT Virtual Assistance Services — Book a Free Consultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Consultation | AKT",
    description: "Free consultation with AKT — AI automation and VA services for US, Canada, UK & Australia.",
    images: ["https://aktservices.org/image/akt_og.png"],
  },
  alternates: { canonical: "https://aktservices.org/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://aktservices.org/contact#contactpage",
      name: "Book a Free Consultation — AKT Virtual Assistance Services",
      url: "https://aktservices.org/contact",
      description:
        "Book a free consultation with AKT Virtual Assistance Services. We serve businesses in the United States, Canada, United Kingdom, and Australia. Discuss GoHighLevel automation, n8n workflows, Retell AI voice agents, and Filipino virtual assistant services.",
      mainEntity: {
        "@id": "https://aktservices.org/#organization",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://aktservices.org" },
          { "@type": "ListItem", position: 2, name: "Contact", item: "https://aktservices.org/contact" },
        ],
      },
    },
    {
      "@type": "ContactPoint",
      "@id": "https://aktservices.org/contact#contactpoint",
      contactType: "sales",
      email: "admin@aktservices.org",
      availableLanguage: "English",
      areaServed: [
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "Canada" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Australia" },
      ],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
  ],
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
