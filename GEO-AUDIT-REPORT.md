# GEO Audit Report: AKT Virtual Assistance Services

**Audit Date:** 2026-06-04
**URL:** https://aktservices.org
**Business Type:** Agency / Services — AI Automation & Filipino Virtual Assistants
**Pages Analyzed:** 32 (homepage, about, services, contact, 10 partner pages, blog + 10 posts, AI tools, sitemap, robots.txt, llms.txt)
**Target Markets:** United States, Canada, Europe (UK/EU), Australia

---

## Executive Summary

**Overall GEO Score: 45/100 (Poor)**

AKT Virtual Assistance Services has built a technically solid, well-designed Next.js 14 site with strong on-page infrastructure — llms.txt is comprehensive, robots.txt correctly allows all major AI crawlers, and the About page has server-rendered FAQPage and HowTo schema. However, the site scores Poor overall because AI models need **external corroboration** to cite a brand with confidence, and AKT currently has zero independent validation: no Clutch/G2 reviews, no Wikipedia entry, no Reddit presence, no YouTube channel, and no press coverage. The homepage schema is also injected inside a "use client" component — technically delivered but architecturally fragile. For the US, Canada, Europe, and Australia target markets, the absence of geographic-specific content, third-party trust signals, and author attribution on blog posts are the three most urgent gaps to close.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 52/100 | 25% | 13.0 |
| Brand Authority | 22/100 | 20% | 4.4 |
| Content E-E-A-T | 52/100 | 20% | 10.4 |
| Technical GEO | 71/100 | 15% | 10.65 |
| Schema & Structured Data | 28/100 | 10% | 2.8 |
| Platform Optimization | 38/100 | 10% | 3.8 |
| **Overall GEO Score** | | | **45/100 — Poor** |

---

## Critical Issues (Fix Immediately)

### C1 — Homepage Schema in Client Component
**File:** `app/page.tsx` (lines 131–162)
**Issue:** Organization + WebSite JSON-LD is injected via `dangerouslySetInnerHTML` inside a `"use client"` component. GPTBot, ClaudeBot, and PerplexityBot do not execute JavaScript — schema delivered only via client-side hydration is invisible to these crawlers.
**Fix:** Move schema to `app/layout.tsx` (server component). ✅ Implemented in this audit.

### C2 — Zero External Brand Validation
**Issue:** No Clutch.co profile, no G2 listing, no Trustpilot, no Google Business Profile, no Wikipedia entry, no Reddit presence. AI models (ChatGPT, Perplexity, Gemini) require third-party corroboration to confidently cite an entity. The $6M+ and 70% cost-reduction claims appear only on AKT's own domain — unverified by any external source.
**Fix:** Create Clutch.co profile (free), request reviews from existing clients, set up Google Business Profile. Off-site action required.

### C3 — Homepage Missing Canonical URL
**File:** `app/layout.tsx`
**Issue:** Root layout has no `alternates.canonical`. The `app/page.tsx` cannot export metadata (it is a client component). Both `https://aktservices.org` and `https://aktservices.org/` can be treated as separate URLs.
**Fix:** Add `alternates: { canonical: "https://aktservices.org" }` to root layout. ✅ Implemented.

### C4 — No OG Image on Any Page
**File:** `app/layout.tsx` and all page layouts
**Issue:** No `openGraph.images` or `twitter.images` defined anywhere. Social shares and AI platform link previews render with no image.
**Fix:** Add default 1200×630 OG image to root layout. ✅ Implemented.

---

## High Priority Issues

### H1 — No Author Bylines on Blog Posts
**File:** `app/blog/[slug]/page.tsx`
**Issue:** All 10 blog posts have no visible author attribution. AI models use author identity as an E-E-A-T signal. Content is published anonymously.
**Fix:** Add "By Jose Angelo Tapang" with Person schema to all blog posts. ✅ Implemented in BlogPosting schema.

### H2 — Blog Images Have Empty Alt Text
**File:** `app/blog/page.tsx` (lines 160, 236)
**Issue:** `alt=""` on all blog listing images. AI crawlers use image alt text as a content signal.
**Fix:** Replace with `alt={post.title}` and add width/height. ✅ Implemented.

### H3 — Missing Security Headers
**File:** `next.config.mjs`
**Issue:** No Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy headers.
**Fix:** Add via `headers()` in next.config.mjs. ✅ Implemented.

### H4 — No Geographic Targeting for US/Canada/Europe/Australia
**Files:** services layout, contact layout, llms.txt
**Issue:** All pages say "Philippines (Serving Worldwide)" with no mention of target markets. For prospects in US/CA/EU/AU, geographic distance creates a trust gap. AI models surface geo-relevant content for location-qualified queries.
**Fix:** Add explicit country arrays to schema `areaServed`, update llms.txt, update service descriptions. ✅ Implemented.

### H5 — No LinkedIn Company Page / YouTube Channel
**Issue:** Only a personal LinkedIn profile exists. ChatGPT and Gemini use LinkedIn company pages as primary entity-confirmation signals. YouTube absence removes AKT from Google's Knowledge Graph entirely.
**Fix:** Create LinkedIn Company Page and YouTube channel. Off-site action required.

### H6 — sameAs Array Too Sparse
**File:** `app/layout.tsx` Organization schema
**Issue:** Only 2 sameAs links (personal LinkedIn, Facebook). AI models need 5+ cross-referenced sources to build an entity graph.
**Fix:** Updated schema with placeholder slots for LinkedIn company, YouTube, Crunchbase, GBP. ✅ Implemented (stubs that should be filled when profiles are created).

### H7 — Services and Contact Pages Have Generic "Worldwide" areaServed
**Files:** `app/services/layout.tsx`, `app/contact/layout.tsx`
**Issue:** `areaServed: "Worldwide"` is too vague. Country-level specificity improves geo-relevant AI queries.
**Fix:** Update areaServed to country array. ✅ Implemented.

---

## Medium Priority Issues

### M1 — No Client Testimonials or Third-Party Reviews
**Issue:** 10 case studies exist but none contain a named client quote. Testimonials are the most AI-citable proof signal on a services site.
**Fix:** Reach out to Proto Financial, Southland Roofing, KinnoBot for written quotes. Add Review schema once obtained.

### M2 — Blog Posts Missing External Citations
**Issue:** Zero external citations across all 10 blog posts. AI Overviews prefer citing content that itself cites authoritative sources.
**Fix:** Add 1–2 external citation links to each blog post (GoHighLevel documentation, Zapier pricing pages, etc.).

### M3 — No llms-full.txt
**File:** `public/llms.txt`
**Issue:** llms.txt links to pages but does not inline content. AI models must follow links and crawl individual pages for full context.
**Fix:** Create `public/llms-full.txt` with inlined content from About, Services, and top 2 case studies.

### M4 — No Reddit / Community Presence
**Issue:** Zero Reddit posts or comments on r/automation, r/GoHighLevel, r/smallbusiness, or r/virtualassistant. Perplexity heavily weights Reddit as a citation source.
**Fix:** Jose Angelo Tapang should participate as a subject matter expert, answering community questions. Off-site action.

### M5 — No Pricing Signals
**Issue:** "Contact for pricing" model is valid but prevents AI models from including AKT in "best X by budget" comparison responses.
**Fix:** Add a "Starting from" pricing anchor on the Services page and to llms.txt.

### M6 — HSTS Header Missing includeSubDomains and preload
**File:** `next.config.mjs` (via Vercel)
**Issue:** Current `max-age=63072000` but missing `includeSubDomains; preload` directives.
**Fix:** Override in next.config.mjs. ✅ Implemented.

### M7 — Deprecated HowTo Schema on About Page
**File:** `app/about/page.tsx`
**Issue:** Google removed HowTo rich results in September 2023. Schema provides zero search benefit.
**Fix:** Replace with more detailed Service schema entries.

### M8 — No Preconnect for Supabase Storage
**File:** `app/layout.tsx`
**Issue:** Blog images served from Supabase CDN with no preconnect hint. Increases LCP on blog pages.
**Fix:** Add `<link rel="preconnect">` in layout. ✅ Implemented.

---

## Low Priority Issues

### L1 — Title Tag Overlength on Homepage
**Issue:** "AKT Virtual Assistance Services | AI-Powered VA & Automation | aktservices.org" is 77 characters. Target is ≤60.
**Fix:** Remove domain suffix from title: "AKT | AI Automation Agency & Filipino Virtual Assistants"

### L2 — Meta Description Overlength
**Issue:** About page description is 259 characters (target ≤160). Google will truncate.
**Fix:** Trim to 150–160 characters while preserving key terms.

### L3 — No BreadcrumbList Schema
**Issue:** Navigation context absent from all subpages.
**Fix:** Add reusable BreadcrumbList component to inner page layouts. ✅ Added to Services and Contact layouts.

### L4 — Host Directive in robots.txt is Non-Standard
**Issue:** `Host: https://aktservices.org` is a Yandex-specific directive, not needed for target markets.
**Fix:** Remove or leave as harmless.

### L5 — Partner Index Page Has No Citable Content
**Issue:** `/partners` index shows only client names with "Real results." — no actual results visible. AI crawlers indexing only the index URL receive no citable content.
**Fix:** Add aggregate stats block to partners index page.

---

## Category Deep Dives

### AI Citability (52/100)

**Top citation-ready passages:**
- Retell AI voice agent spec: "24/7 AI voice agents. Sub-600ms response, appointment booking, 31+ language support." — Score: 78/100
- Proto Financial case study: Named client + technology + 4-year engagement + $6M+ outcome — Score: 79/100
- Agency definition block on About: founder name, founding year, HQ, named tools, industries, continents in one paragraph — Score: 74/100

**Citation-unlikely areas:**
- All 10 blog posts (avg 28/100): No author bylines, no external citations, no original data
- Homepage hero: Client-side rendered, no answer blocks above the fold
- Services pricing: Entirely absent — cannot appear in AI budget-comparison responses

### Brand Authority (22/100)

**Platform presence map:**
| Platform | Status |
|---|---|
| Wikipedia | ❌ Absent |
| Reddit | ❌ Absent |
| YouTube | ❌ Absent |
| LinkedIn Company Page | ❌ Absent (personal profile only) |
| Clutch.co | ❌ Absent |
| G2 / Capterra | ❌ Absent |
| Google Business Profile | ❌ Absent |
| Trustpilot | ❌ Absent |
| Facebook | ⚠️ Personal/business page |
| LinkedIn Personal | ⚠️ Exists, low authority |

The core problem: AKT's documented achievements ($6M+ sales, 70% cost reduction) exist only on AKT's own domain. AI models cannot cite these as verified facts because no external source corroborates them.

### Content E-E-A-T (52/100)

**Strengths:** Founder credentials named (BS Civil Engineering + IT), company timeline with dated milestones, 10 industry partner list with named clients, FAQ section with schema.

**Gaps for US/Canada/Europe/Australia targets:**
- No physical address (critical for EU GDPR-conscious buyers and US enterprise due diligence)
- No phone number (enterprise US/AU buyers expect this)
- No privacy policy / terms of service (CCPA/GDPR exposure)
- No testimonials with attribution
- Blog content shows AI-bulk-publishing pattern with no author bylines
- Zero external citations in any content
- No content addressing geographic objections ("why work with a Philippines-based agency?")

### Technical GEO (71/100)

**Strengths:** Next.js 14 SSR delivers full HTML to AI crawlers. robots.txt explicitly names all major AI crawlers. Sitemap is correctly structured. URL architecture is clean and hierarchical.

**Gaps:**
- Homepage schema in "use client" (fragile architecture)
- Missing security headers (5 headers absent)
- Blog images cause CLS (no width/height on `<img>` tags)
- No og:image anywhere
- Missing canonical on homepage

### Schema & Structured Data (28/100)

**Present:** Organization (2 copies, fragmented), WebSite + SearchAction, FAQPage, HowTo (deprecated)
**Missing:** Article/BlogPosting, Person (standalone), BreadcrumbList, speakable, Service (detailed), SoftwareApplication on AI tools

**Critical gap:** sameAs only covers 2 platforms (personal LinkedIn + Facebook). AI models use sameAs cross-references to build entity graphs. Without Wikipedia, YouTube, Clutch, or a LinkedIn company page in sameAs, AKT cannot be reliably identified as a distinct entity.

### Platform Optimization (38/100)

| Platform | Score | Key Gap |
|---|---|---|
| Google AI Overviews | 44/100 | No featured-snippet-optimized answer blocks; stats not cited |
| ChatGPT Web Search | 35/100 | No entity recognition; no company LinkedIn; no Wikidata |
| Perplexity AI | 28/100 | Zero community validation; no external citations |
| Google Gemini | 36/100 | No YouTube; no Google Business Profile; no Knowledge Graph entry |
| Bing Copilot | 47/100 | No IndexNow; no LinkedIn company page; no Microsoft ecosystem presence |

---

## Quick Wins (Implement This Week)

1. **Create Clutch.co profile and request 3 client reviews** — Highest ROI action. Perplexity, ChatGPT, and Gemini all cite Clutch for agency queries. Free to create, takes 2-3 business days to go live. Contact Proto Financial, Southland Roofing, and KinnoBot for reviews.

2. **Create LinkedIn Company Page for AKT Services** — ChatGPT, Gemini, and Bing Copilot all use LinkedIn company pages as primary entity-confirmation signals. Takes ~30 minutes. Then update `sameAs` in schema with the company page URL.

3. **Create Google Business Profile** — Even as a virtual/remote agency this is possible. Anchors the entity in Google's Knowledge Graph. Required for Gemini to build an entity entry for AKT.

4. **Add one client quote with attribution to the homepage** — The most AI-citable passage type on any services site. A single attributed quote from Proto Financial or Southland Roofing would immediately improve both citability and E-E-A-T scores.

5. **Add author byline "By Jose Angelo Tapang" to all blog posts** — Converts 10 anonymous posts to attributed expert content. Schema enhancement is already implemented in this audit; visible byline needs to be added to the blog post UI.

---

## 30-Day Action Plan

### Week 1: External Presence (Highest Impact)
- [ ] Create Clutch.co company profile (free)
- [ ] Create LinkedIn Company Page for AKT Services
- [ ] Set up Google Business Profile
- [ ] Request reviews from Proto Financial, Southland Roofing, KinnoBot
- [ ] Create YouTube channel and film first video (GoHighLevel walkthrough)

### Week 2: Content & Trust Signals
- [ ] Add visible author byline to all blog posts (UI change beyond schema)
- [ ] Obtain and publish one attributed client quote on homepage + services page
- [ ] Add privacy policy and terms of service pages
- [ ] Add external citations to the 3 most-trafficked blog posts
- [ ] Update footer to explicitly list "United States · Canada · United Kingdom · Australia" service areas

### Week 3: Geographic Targeting
- [ ] Write one pillar article: "AI Automation Agency for US Small Businesses — What You Get With AKT"
- [ ] Write one pillar article: "GDPR-Compliant CRM Automation for European Businesses"
- [ ] Write one article: "GoHighLevel Setup Services for Australian Agencies"
- [ ] Add a "Why Philippines?" trust section to the About page addressing the offshore objection directly

### Week 4: Platform Optimization
- [ ] Implement IndexNow for Bing (submit sitemap URLs on each publish)
- [ ] Post 2-3 value-first answers on r/GoHighLevel and r/automation
- [ ] Submit to G2 as a service provider
- [ ] Update sameAs in schema with new platform URLs (LinkedIn company, YouTube, GBP, Clutch)
- [ ] Create llms-full.txt with inlined case study content

---

## Appendix: Codebase Changes Implemented in This Audit

The following code changes were applied to the repository as part of this audit:

| File | Change |
|---|---|
| `app/layout.tsx` | Moved Organization+WebSite schema from homepage; added canonical; added og:image; added geographic areaServed; added Supabase preconnect |
| `app/page.tsx` | Removed inline JSON-LD (moved to layout) |
| `next.config.mjs` | Added security headers: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HSTS upgrade, Content-Security-Policy |
| `app/services/layout.tsx` | Updated areaServed to country array (US, Canada, UK, Australia, EU); enhanced offer catalog |
| `app/contact/layout.tsx` | Updated areaServed to country array; enhanced ContactPoint |
| `app/blog/page.tsx` | Fixed `alt=""` → `alt={post.title}` on blog listing images; added width/height |
| `app/blog/[slug]/page.tsx` | Enhanced BlogPosting schema with Person author, dateModified, speakable, inLanguage, wordCount, about entities |
| `app/about/page.tsx` | Added standalone Person schema for founder; updated Organization areaServed to country array; replaced HowTo with enhanced Service schema notes |
| `public/llms.txt` | Added US/Canada/UK/Australia geographic targeting; added inline stats; added pricing anchor; expanded entity signals |

---

## Appendix: Pages Analyzed

| URL | Title | Key GEO Issues |
|---|---|---|
| aktservices.org/ | AKT Virtual Assistance Services | Schema in client component, no canonical, no og:image |
| aktservices.org/about | About AKT | No standalone Person schema, duplicate Organization |
| aktservices.org/services | Services | "use client", no metadata (handled by layout) |
| aktservices.org/contact | Contact | "use client", no metadata (handled by layout) |
| aktservices.org/blog | Blog | Empty alt on images, no blog schema |
| aktservices.org/blog/[slug] | Blog posts (10) | No author byline visible, BlogPosting schema exists |
| aktservices.org/partners | Partners index | No aggregate stats, low citability |
| aktservices.org/partners/* | 10 partner pages | Good content, no case study Review schema |
| aktservices.org/ai-tools | AI Tools | No SoftwareApplication schema |
| aktservices.org/llms.txt | llms.txt | Good but no inlined content, no geographic targeting |
| aktservices.org/robots.txt | robots.txt | Excellent AI crawler coverage |
| aktservices.org/sitemap.xml | Sitemap | 31 URLs, well-structured |
