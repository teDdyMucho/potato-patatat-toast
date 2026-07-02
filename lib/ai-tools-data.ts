import { Phone, Send, Workflow, MessageSquare, type LucideIcon } from "lucide-react";

export type AiToolSampleItem = { label: string; text: string };

export type AiTool = {
  slug: string;
  category: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  tag: string;
  badge: string | null;
  /** Sent to /api/leads as the lead's "need" tag. */
  contactNeed: string;
  /** Marks tools where a phone number is essential (e.g. Retell AI needs one to actually place/receive calls). */
  requirePhone: boolean;
  sampleTitle: string;
  sampleItems: AiToolSampleItem[];
  sampleNote: string;
};

export const aiTools: AiTool[] = [
  {
    slug: "retell-ai",
    category: "Voice AI",
    name: "Retell AI",
    description:
      "AI voice agent that answers, screens, and qualifies inbound and outbound calls 24/7 — books appointments straight into your calendar and hands off warm leads to your team.",
    icon: Phone,
    color: "#0ABFA3",
    bg: "#062B26",
    tag: "Powered by Retell AI",
    badge: "Most Popular",
    contactNeed: "Retell AI / VAPI",
    requirePhone: true,
    sampleTitle: "Sample call",
    sampleItems: [
      { label: "Caller", text: "Hi, I saw your ad — do you guys help with lead follow-up?" },
      { label: "AI Agent", text: "Yes! We can set up an AI voice agent that answers every call, qualifies the lead, and books them straight into your calendar. Can I grab your name and best callback number?" },
      { label: "Caller", text: "Sure, it's Mike, 555-2010." },
      { label: "AI Agent", text: "Thanks, Mike! I've got you down for a free strategy call Thursday at 2 PM — you'll get a text confirmation shortly." },
    ],
    sampleNote: "Answers in under 2 seconds, works 24/7, and never misses a call.",
  },
  {
    slug: "nurturing-ghl",
    category: "GoHighLevel AI",
    name: "Nurturing Sequence on GHL",
    description:
      "Automated multi-touch email + SMS nurture sequence built inside GoHighLevel — keeps leads warm with personalized, timed follow-ups until they're ready to buy.",
    icon: Workflow,
    color: "#0ABFA3",
    bg: "#073B34",
    tag: "Built on GoHighLevel",
    badge: null,
    contactNeed: "GoHighLevel Setup",
    requirePhone: false,
    sampleTitle: "Sample nurture timeline",
    sampleItems: [
      { label: "Day 0", text: "Welcome email — introduces your business and sets expectations." },
      { label: "Day 1", text: "SMS check-in — quick, friendly nudge to stay top of mind." },
      { label: "Day 3", text: "Value email — a case study or testimonial that builds trust." },
      { label: "Day 6", text: "SMS + email combo — a direct offer or clear next step." },
      { label: "Day 10", text: "Final follow-up — last touch before moving to long-term nurture." },
    ],
    sampleNote: "Fully automated inside your GoHighLevel account — no manual follow-up needed.",
  },
  {
    slug: "outreach-ghl",
    category: "GoHighLevel AI",
    name: "Outreach Sequence on GHL",
    description:
      "Done-for-you cold outreach automation in GoHighLevel — multi-channel touchpoints, smart delays, and reply detection so your pipeline fills itself.",
    icon: Send,
    color: "#0ABFA3",
    bg: "#073B34",
    tag: "Built on GoHighLevel",
    badge: "New",
    contactNeed: "GoHighLevel Setup",
    requirePhone: false,
    sampleTitle: "Sample outreach cadence",
    sampleItems: [
      { label: "Day 0", text: "Cold email #1 — a personalized opener based on their industry." },
      { label: "Day 2", text: "LinkedIn connection request with a short note." },
      { label: "Day 4", text: "Cold email #2 — follow-up with a specific value proposition." },
      { label: "Day 7", text: "SMS touch, when a number is available." },
      { label: "Day 10", text: "Break-up email — final attempt that keeps the door open." },
    ],
    sampleNote: "The sequence pauses automatically the moment a lead replies.",
  },
  {
    slug: "chatbot-ghl",
    category: "GoHighLevel AI",
    name: "Chat Bot on GHL",
    description:
      "AI chatbot embedded in your website and GoHighLevel conversations — answers FAQs, qualifies visitors, and routes hot leads to your sales team in real time.",
    icon: MessageSquare,
    color: "#0ABFA3",
    bg: "#062B26",
    tag: "Built on GoHighLevel",
    badge: "New",
    contactNeed: "CloseBot / Sales AI",
    requirePhone: false,
    sampleTitle: "Sample chat",
    sampleItems: [
      { label: "Visitor", text: "Hey, do you guys build websites too?" },
      { label: "AI Chatbot", text: "We sure do! We also build AI voice agents and full GoHighLevel automation. Want me to connect you with our team?" },
      { label: "Visitor", text: "Yes please" },
      { label: "AI Chatbot", text: "Awesome — what's the best email to reach you at?" },
    ],
    sampleNote: "Embeds on your website and syncs replies straight into GoHighLevel conversations.",
  },
];

export const aiToolCategories = ["All", "Voice AI", "GoHighLevel AI"];
