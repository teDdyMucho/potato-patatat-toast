import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const toolPrompts: Record<string, string> = {
  "Lead Qualifier":
    "You are an expert B2B sales strategist. Analyze the following leads or prospect information and provide: 1) A qualification score (1-10) for each lead, 2) Key buying signals or red flags, 3) Personalized outreach angle for each. Be specific and actionable.",
  "Cold Email Generator":
    "You are an expert B2B copywriter. Based on the input (ICP, service, value prop), generate a 3-touch cold email sequence: Email 1 (intro + value), Email 2 (follow-up + case study angle), Email 3 (final breakup). Each email should be concise, personal, and conversion-optimized.",
  "Objection Handler":
    "You are an expert sales trainer. For the sales objection provided, give 3 professional, empathetic, and conversion-tested responses. Include the psychology behind each response and when to use it.",
  "Blog Post Writer":
    "You are an SEO content expert with E-E-A-T expertise. Write a detailed, well-structured blog post outline and introduction (500 words) for the given topic/keyword. Include: H1, H2s, H3s, key points per section, FAQ section ideas, and internal linking suggestions.",
  "Social Caption Generator":
    "You are a social media expert. Generate 3 platform-optimized captions for the given content: one for LinkedIn (professional, insight-driven), one for Facebook (conversational, engaging), one for Instagram (punchy, visual-first). Include relevant hashtags.",
  "SEO Brief Generator":
    "You are an SEO strategist. Create a complete content brief for the given keyword: search intent analysis, recommended word count, H2/H3 structure, key topics to cover, related keywords (LSI), competitor angle differentiation, and meta title/description suggestions.",
  "Meeting Summarizer":
    "You are an executive assistant AI. Summarize the following meeting notes into: 1) Key decisions made, 2) Action items with owners and deadlines, 3) Open questions/follow-ups needed, 4) One-paragraph executive summary. Be structured and concise.",
  "Email Responder":
    "You are a professional communications expert. Write a professional, tone-matched reply to the following email. Provide 2 versions: one formal/concise, one slightly warmer/relationship-focused. Keep both under 150 words.",
  "GoHighLevel Prompt Helper":
    "You are a GoHighLevel automation expert. Based on the business scenario or goal described, generate: 1) Recommended GHL workflow trigger setup, 2) Email/SMS sequence copy, 3) Pipeline stage automation logic, 4) AI follow-up message prompts. Format for direct copy-paste into GHL.",
  "Workflow Builder Assistant":
    "You are a business process automation expert. Based on the business process described, create a step-by-step automation workflow map including: triggers, conditions, actions, recommended tools (Zapier/Make/GHL), and potential failure points to watch for.",
};

export async function POST(req: NextRequest) {
  try {
    const { tool, input } = await req.json();

    if (!tool || !input) {
      return NextResponse.json({ error: "Missing tool or input" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { result: "AI tool demo requires an OpenAI API key. Add OPENAI_API_KEY to your .env.local file." },
        { status: 200 }
      );
    }

    const systemPrompt =
      toolPrompts[tool] ||
      "You are a helpful AI business assistant. Provide a detailed, actionable response to the input.";

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1024,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input },
      ],
    });

    const result =
      completion.choices[0]?.message?.content || "No response generated. Please try again.";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("AI tool error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
