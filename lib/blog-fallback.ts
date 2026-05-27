/**
 * Static blog posts used as a fallback when Supabase is empty/unconfigured, so
 * the public /blog list AND /blog/<slug> pages keep working without the DB.
 * Once posts exist in `blog_posts`, the DB takes over.
 */
export type FallbackPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
  date: string; // display label, e.g. "May 18, 2026"
  imageUrl?: string | null;
  content?: string;
};

export const fallbackPosts: FallbackPost[] = [
  {
    slug: "gohighlevel-real-estate-automation",
    category: "AI & Automation",
    date: "May 18, 2026",
    readTime: "8 min read",
    title: "How We Set Up GoHighLevel Automation for a 7-Figure Real Estate Firm",
    excerpt:
      "A step-by-step breakdown of how AKT deployed GoHighLevel CRM + AI follow-up sequences that cut client response time by 80% — and the exact workflow structure we used.",
    tags: ["GoHighLevel", "Automation"],
    featured: true,
  },
  {
    slug: "vapi-vs-retell-ai",
    category: "AI & Automation",
    date: "May 12, 2026",
    readTime: "11 min read",
    title: "VAPI vs Retell AI: Which AI Voice Agent Is Right for Your Business in 2026?",
    excerpt:
      "We've deployed both at scale. Here's our unfiltered comparison based on real client deployments — pricing, call quality, integration capabilities, and who each one is best suited for.",
    tags: ["VAPI", "Retell AI"],
    featured: false,
  },
  {
    slug: "filipino-va-hiring-process",
    category: "VA Industry",
    date: "May 5, 2026",
    readTime: "7 min read",
    title: "Why Filipino VAs Outperform: The AKT Hiring & Training Process",
    excerpt:
      "Inside AKT's proprietary VA onboarding system — how we select, assess, and deploy elite Filipino talent for global businesses, and why the Philippines remains the world's best VA source.",
    tags: ["Filipino VAs", "Operations"],
    featured: false,
  },
  {
    slug: "closebot-ai-guide",
    category: "AI & Automation",
    date: "Apr 28, 2026",
    readTime: "9 min read",
    title: "What Is CloseBot AI? A Complete Guide to AI-Powered Sales Automation",
    excerpt:
      "CloseBot is transforming how SMBs handle sales conversations. Here's everything you need to know — what it does, how to set it up, and why AKT uses it for client lead pipelines.",
    tags: ["CloseBot", "Sales AI"],
    featured: false,
  },
  {
    slug: "gohighlevel-virtual-assistant-setup",
    category: "Business Growth",
    date: "Apr 21, 2026",
    readTime: "6 min read",
    title: "How to Set Up GoHighLevel with a Virtual Assistant: The Complete Guide",
    excerpt:
      "One of the most-asked questions we get: can a VA manage GoHighLevel? Yes — here's how to set up GHL, train your VA, and build a system that runs without you.",
    tags: ["GoHighLevel", "Filipino VAs"],
    featured: false,
  },
  {
    slug: "claude-ai-for-business",
    category: "AI & Automation",
    date: "Apr 14, 2026",
    readTime: "10 min read",
    title: "Claude AI for Business: How to Use Anthropic's Claude in Your Operations",
    excerpt:
      "Claude AI is the most capable business AI model available today. Here's how AKT uses Claude to build automation workflows, content systems, and AI agents for SMB clients worldwide.",
    tags: ["Claude AI", "Anthropic"],
    featured: false,
  },
];

export function getFallbackPost(slug: string): FallbackPost | undefined {
  return fallbackPosts.find((p) => p.slug === slug);
}
