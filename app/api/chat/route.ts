import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are AKT's AI assistant on aktservices.com. AKT Virtual Assistance Services is a Philippine-based AI automation agency that builds:
- Salesforce email automation and MCA outreach systems
- n8n workflow automation (Zapier migration, custom pipelines)
- GoHighLevel CRM systems and AI assistants
- Retell AI voice agents for 24/7 call handling and appointment booking
- Custom AI chatbots (chat + SMS, cheaper than Closebot)
- AI content creation platforms (Veo 3.1, Kling, Imagen, Grok Imagine)
- Lead scraping engines with AI qualification
- Multilingual AI agents for real estate
- Business analytics dashboards
- Monday.com automation and job management systems
- Full-stack business automation for agencies, crypto studios, roofing, distribution, finance, and more

Keep every reply SHORT — 1 to 3 sentences max. Be helpful and direct. Speak naturally, not like a brochure.

If someone asks about pricing, timelines, or wants to work with AKT, encourage them to book a free consultation. If they ask what AKT builds, briefly describe the relevant service. Never write long paragraphs.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 180,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content ?? "Sorry, something went wrong.",
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { reply: "Connection error. Please try again." },
      { status: 500 }
    );
  }
}
