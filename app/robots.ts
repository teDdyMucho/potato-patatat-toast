import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All standard web crawlers — full access
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/"],
      },
      {
        // OpenAI crawlers — explicitly allowed (GEO signal)
        userAgent: ["GPTBot", "ChatGPT-User", "OAI-SearchBot"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/"],
      },
      {
        // Anthropic crawlers — explicitly allowed
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/"],
      },
      {
        // Perplexity AI — explicitly allowed
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/"],
      },
      {
        // Google AI crawlers (Gemini, SGE, AI Overviews)
        userAgent: ["Google-Extended", "Googlebot"],
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/"],
      },
      {
        // Meta AI crawler — explicitly allowed
        userAgent: "FacebookBot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/"],
      },
    ],
    sitemap: "https://aktservices.org/sitemap.xml",
    host: "https://aktservices.org",
  };
}
