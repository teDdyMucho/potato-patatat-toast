import Link from "next/link";
import {
  Users,
  Bot,
  Workflow,
  PhoneCall,
  Target,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Elite Virtual Assistants",
    description:
      "Rigorously vetted Filipino VAs trained in modern business tools. From executive support to specialized ops roles — we place the right talent for your exact needs.",
    tags: ["Admin", "Sales Support", "Research", "CRM"],
    color: "#0ABFA3",
    bg: "#062B26",
  },
  {
    icon: Bot,
    title: "AI Infrastructure Buildout",
    description:
      "We design and deploy full AI stacks for your business — from Claude AI agents to OpenAI GPT workflows. Purpose-built, not template-configured.",
    tags: ["Claude AI", "OpenAI", "Custom Agents"],
    color: "#0ABFA3",
    bg: "#073B34",
  },
  {
    icon: Workflow,
    title: "GoHighLevel Setup & Management",
    description:
      "AKT is a specialist GoHighLevel agency. We build, configure, and operate your entire GHL ecosystem — CRM, pipelines, automations, and AI follow-ups.",
    tags: ["GHL CRM", "Automation", "Pipelines"],
    color: "#0ABFA3",
    bg: "#062B26",
  },
  {
    icon: PhoneCall,
    title: "AI Voice Agents",
    description:
      "Deploy Retell AI and VAPI-powered voice agents for inbound/outbound calling. We set up, train, and manage AI phone agents that sound human and convert.",
    tags: ["Retell AI", "VAPI", "Call Center"],
    color: "#0ABFA3",
    bg: "#073B34",
  },
  {
    icon: Target,
    title: "Lead Generation Systems",
    description:
      "End-to-end lead gen — from ICP targeting and outreach sequences to CloseBot AI-powered sales automation. We build the pipeline, you close the deals.",
    tags: ["CloseBot", "Outreach", "Lead Nurture"],
    color: "#0ABFA3",
    bg: "#062B26",
  },
  {
    icon: Workflow,
    title: "Automation & Integration",
    description:
      "Connect your tools, eliminate repetitive tasks, and let AI handle the work. We build automation workflows across your entire business stack.",
    tags: ["Zapier", "Make", "Custom API"],
    color: "#0ABFA3",
    bg: "#073B34",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[#101113] section-sep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="accent-bar text-[12px] font-dm font-semibold text-muted uppercase tracking-widest mb-3">
            What We Bring to the Table
          </p>
          <h2
            className="font-syne text-body mb-4"
            style={{ fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            Human expertise meets AI precision.
          </h2>
          <p className="text-[16px] font-dm text-muted leading-relaxed">
            From a single VA placement to a fully-automated AI business stack —
            AKT delivers the complete operational layer your company needs to
            scale without headcount bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group bg-[#101113] rounded-card border border-border p-6 hover:border-primary hover:shadow-card transition-all duration-200 flex flex-col"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{ background: s.bg }}
                >
                  <Icon size={20} style={{ color: s.color }} strokeWidth={1.75} />
                </div>
                <h3
                  className="font-syne text-body mb-2.5 group-hover:text-primary transition-colors"
                  style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.01em" }}
                >
                  {s.title}
                </h3>
                <p className="text-[13px] font-dm text-muted leading-relaxed flex-1 mb-5">
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-dm font-semibold px-2.5 py-0.5 rounded-full border"
                      style={{ background: "#073B34", color: "#0ABFA3", borderColor: "#0ABFA3" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-[14px] font-dm font-semibold text-white bg-primary hover:bg-primary-hover transition-colors"
          >
            Discuss Your Needs
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
