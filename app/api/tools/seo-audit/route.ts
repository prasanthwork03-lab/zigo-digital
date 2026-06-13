import { NextResponse } from "next/server";
import { site } from "@/lib/site-data";

type AuditStatus = "good" | "warning" | "critical";

type AuditCheck = {
  label: string;
  status: AuditStatus;
  detail: string;
  recommendation: string;
};

const stopWords = new Set([
  "the",
  "and",
  "for",
  "with",
  "your",
  "you",
  "are",
  "this",
  "that",
  "from",
  "have",
  "has",
  "into",
  "our",
  "not",
  "but",
  "all",
  "can",
  "will",
  "their",
  "about",
  "service",
  "services",
]);

function cleanText(value = "") {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFirst(html: string, pattern: RegExp) {
  const match = html.match(pattern);
  return cleanText(match?.[1] || "");
}

function extractAttribute(tag: string, attribute: string) {
  const pattern = new RegExp(`${attribute}\\s*=\\s*["']([^"']*)["']`, "i");
  return tag.match(pattern)?.[1]?.trim() || "";
}

function extractMeta(html: string, key: string) {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${key}["'][^>]*>`, "i"),
    new RegExp(`<meta[^>]+property=["']${key}["'][^>]*>`, "i"),
  ];

  for (const pattern of patterns) {
    const tag = html.match(pattern)?.[0] || "";
    const content = extractAttribute(tag, "content");

    if (content) {
      return content;
    }
  }

  return "";
}

function extractTags(html: string, tagName: string) {
  return Array.from(html.matchAll(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi"))).map((match) =>
    cleanText(match[1]),
  );
}

function scoreCheck(condition: boolean, points: number) {
  return condition ? points : 0;
}

function topTerms(text: string) {
  const counts = new Map<string, number>();

  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word))
    .forEach((word) => counts.set(word, (counts.get(word) || 0) + 1));

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([term, count]) => ({ term, count }));
}

function normalizeAuditUrl(value: string) {
  const trimmed = value.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return new URL(withProtocol);
}

function isBlockedHost(url: URL) {
  if (process.env.NODE_ENV !== "production") {
    return false;
  }

  const host = url.hostname.toLowerCase();
  return (
    host === "localhost" ||
    host.endsWith(".local") ||
    host === "0.0.0.0" ||
    host.startsWith("127.") ||
    host.startsWith("10.") ||
    host.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  );
}

async function fetchWithTimeout(url: string, timeoutMs = 12000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "ZigoDigital-SEOTool/1.0 (+https://zigodigital.com)",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkUrl(url: string) {
  try {
    const response = await fetchWithTimeout(url, 8000);
    return {
      ok: response.ok,
      status: response.status,
    };
  } catch {
    return {
      ok: false,
      status: 0,
    };
  }
}

export async function POST(request: Request) {
  let submittedUrl = "";

  try {
    const body = (await request.json()) as { url?: string };
    submittedUrl = body.url || "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  let auditUrl: URL;

  try {
    auditUrl = normalizeAuditUrl(submittedUrl);
  } catch {
    return NextResponse.json({ error: "Enter a valid website URL." }, { status: 400 });
  }

  if (!["http:", "https:"].includes(auditUrl.protocol) || isBlockedHost(auditUrl)) {
    return NextResponse.json({ error: "Enter a public http or https website URL." }, { status: 400 });
  }

  let response: Response;

  try {
    response = await fetchWithTimeout(auditUrl.toString());
  } catch {
    return NextResponse.json({ error: "Could not reach this website. Check the URL and try again." }, { status: 422 });
  }

  const contentType = response.headers.get("content-type") || "";
  const html = (await response.text()).slice(0, 2_500_000);
  const finalUrl = new URL(response.url || auditUrl.toString());
  const origin = finalUrl.origin;
  const pageText = cleanText(html);
  const words = pageText.split(/\s+/).filter(Boolean);

  const title = extractFirst(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = extractMeta(html, "description");
  const robotsMeta = extractMeta(html, "robots");
  const viewport = extractMeta(html, "viewport");
  const canonicalTag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0] || "";
  const canonical = extractAttribute(canonicalTag, "href");
  const ogTitle = extractMeta(html, "og:title");
  const ogDescription = extractMeta(html, "og:description");
  const ogImage = extractMeta(html, "og:image");
  const twitterCard = extractMeta(html, "twitter:card");
  const h1 = extractTags(html, "h1");
  const h2 = extractTags(html, "h2");
  const h3 = extractTags(html, "h3");
  const imageTags = Array.from(html.matchAll(/<img\b[^>]*>/gi)).map((match) => match[0]);
  const imagesMissingAlt = imageTags.filter((tag) => !extractAttribute(tag, "alt")).length;
  const anchorTags = Array.from(html.matchAll(/<a\b[^>]*>/gi)).map((match) => match[0]);
  const hrefs = anchorTags.map((tag) => extractAttribute(tag, "href")).filter(Boolean);
  const internalLinks = hrefs.filter((href) => {
    try {
      return new URL(href, finalUrl).hostname === finalUrl.hostname;
    } catch {
      return false;
    }
  });
  const externalLinks = hrefs.filter((href) => {
    try {
      return new URL(href, finalUrl).hostname !== finalUrl.hostname && /^https?:/i.test(new URL(href, finalUrl).protocol);
    } catch {
      return false;
    }
  });
  const nofollowLinks = anchorTags.filter((tag) => /rel=["'][^"']*nofollow/i.test(tag)).length;
  const schemaBlocks = Array.from(html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)).map(
    (match) => match[1].trim(),
  );
  const schemaTypes = schemaBlocks
    .flatMap((block) => {
      try {
        const parsed = JSON.parse(block) as { "@type"?: string; "@graph"?: Array<{ "@type"?: string }> };
        return [parsed["@type"], ...(parsed["@graph"]?.map((item) => item["@type"]) || [])].filter(Boolean);
      } catch {
        return [];
      }
    })
    .map(String);
  const hasFaqSchema = schemaTypes.some((type) => type.toLowerCase().includes("faq"));
  const hasArticleSchema = schemaTypes.some((type) => /article|blogposting/i.test(type));
  const questionHeadings = [...h2, ...h3].filter((heading) => /^(what|why|how|when|where|which|can|does|is)\b/i.test(heading));
  const contactSignals = /(whatsapp|contact|call now|book|consultation|phone|enquiry|inquiry)/i.test(pageText);
  const robots = await checkUrl(`${origin}/robots.txt`);
  const sitemap = await checkUrl(`${origin}/sitemap.xml`);

  const checks: AuditCheck[] = [
    {
      label: "HTTP status",
      status: response.ok ? "good" : "critical",
      detail: `Returned ${response.status}.`,
      recommendation: response.ok ? "No action needed." : "Fix server errors or redirect issues before SEO work.",
    },
    {
      label: "Title tag",
      status: title.length >= 30 && title.length <= 65 ? "good" : title ? "warning" : "critical",
      detail: title ? `${title.length} characters: ${title}` : "Missing title tag.",
      recommendation: "Keep the title around 30-65 characters with the main service and brand.",
    },
    {
      label: "Meta description",
      status: description.length >= 120 && description.length <= 160 ? "good" : description ? "warning" : "critical",
      detail: description ? `${description.length} characters.` : "Missing meta description.",
      recommendation: "Write a 120-160 character benefit-led description with a clear search intent.",
    },
    {
      label: "H1 structure",
      status: h1.length === 1 ? "good" : h1.length ? "warning" : "critical",
      detail: `${h1.length} H1 heading${h1.length === 1 ? "" : "s"} found.`,
      recommendation: "Use one clear H1 that explains the main topic or offer of the page.",
    },
    {
      label: "Canonical URL",
      status: canonical ? "good" : "warning",
      detail: canonical || "Missing canonical tag.",
      recommendation: "Add a canonical URL to control duplicate page signals.",
    },
    {
      label: "Mobile viewport",
      status: viewport ? "good" : "critical",
      detail: viewport || "Missing viewport meta tag.",
      recommendation: "Add a responsive viewport tag for mobile search quality.",
    },
    {
      label: "Image alt text",
      status: imagesMissingAlt === 0 ? "good" : imagesMissingAlt <= 3 ? "warning" : "critical",
      detail: `${imagesMissingAlt} of ${imageTags.length} images missing alt text.`,
      recommendation: "Add descriptive alt text to important images and leave decorative images empty only when intentional.",
    },
    {
      label: "Structured data",
      status: schemaBlocks.length ? "good" : "warning",
      detail: schemaBlocks.length ? `Found ${schemaBlocks.length} JSON-LD block(s): ${schemaTypes.join(", ") || "types not detected"}.` : "No JSON-LD schema found.",
      recommendation: "Add Organization, LocalBusiness, Service, FAQ, Article, or BlogPosting schema where relevant.",
    },
    {
      label: "Social preview tags",
      status: ogTitle && ogDescription && ogImage && twitterCard ? "good" : ogTitle || ogDescription || ogImage ? "warning" : "critical",
      detail: `OG title: ${ogTitle ? "found" : "missing"}, OG description: ${ogDescription ? "found" : "missing"}, OG image: ${ogImage ? "found" : "missing"}, Twitter card: ${twitterCard ? "found" : "missing"}.`,
      recommendation: "Add Open Graph and Twitter preview tags so shared links look trustworthy on social and messaging platforms.",
    },
    {
      label: "Robots and sitemap",
      status: robots.ok && sitemap.ok ? "good" : robots.ok || sitemap.ok ? "warning" : "critical",
      detail: `robots.txt: ${robots.status || "not found"}, sitemap.xml: ${sitemap.status || "not found"}.`,
      recommendation: "Publish robots.txt and sitemap.xml so search engines can crawl important pages.",
    },
    {
      label: "AEO / AI answer readiness",
      status: hasFaqSchema || questionHeadings.length >= 2 ? "good" : "warning",
      detail: `${questionHeadings.length} question-style heading(s), FAQ schema ${hasFaqSchema ? "found" : "not found"}, article schema ${hasArticleSchema ? "found" : "not found"}.`,
      recommendation: "Add question-led sections, short direct answers, FAQs, and schema to improve AI answer visibility.",
    },
    {
      label: "Conversion trust signals",
      status: contactSignals ? "good" : "warning",
      detail: contactSignals ? "Contact, booking, WhatsApp, or enquiry language detected." : "Weak contact/conversion language detected.",
      recommendation: "Add trust proof, clear CTAs, phone/WhatsApp links, testimonials, and case study links.",
    },
  ];

  const score =
    scoreCheck(response.ok, 8) +
    scoreCheck(title.length >= 30 && title.length <= 65, 10) +
    scoreCheck(description.length >= 120 && description.length <= 160, 10) +
    scoreCheck(h1.length === 1, 9) +
    scoreCheck(Boolean(canonical), 7) +
    scoreCheck(Boolean(viewport), 7) +
    scoreCheck(imagesMissingAlt === 0, 8) +
    scoreCheck(schemaBlocks.length > 0, 8) +
    scoreCheck(Boolean(ogTitle && ogDescription && ogImage && twitterCard), 5) +
    scoreCheck(robots.ok, 5) +
    scoreCheck(sitemap.ok, 5) +
    scoreCheck(words.length >= 500, 8) +
    scoreCheck(internalLinks.length >= 5, 5) +
    scoreCheck(hasFaqSchema || questionHeadings.length >= 2, 5) +
    scoreCheck(contactSignals, 5);

  const criticalChecks = checks.filter((check) => check.status === "critical");
  const warningChecks = checks.filter((check) => check.status === "warning");
  const recommendations = [...criticalChecks, ...warningChecks].slice(0, 10).map((check) => ({
    priority: check.status === "critical" ? "High" : "Medium",
    action: check.recommendation,
    reason: check.detail,
  }));

  return NextResponse.json({
    brand: {
      name: site.name,
      logo: site.logo,
      email: site.email,
      phone: site.phone,
    },
    auditedUrl: auditUrl.toString(),
    finalUrl: finalUrl.toString(),
    generatedAt: new Date().toISOString(),
    score: Math.min(score, 100),
    grade: score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Needs Work" : "Critical Fix Needed",
    executiveSummary: {
      title: title || "Missing title",
      description: description || "Missing meta description",
      contentType,
      indexability: /noindex/i.test(robotsMeta) ? "Noindex detected" : "Indexable signal looks clear",
      strongestArea:
        checks.filter((check) => check.status === "good").length >= 7
          ? "The page has several healthy SEO foundations."
          : "The page needs stronger SEO foundations before scaling traffic.",
      biggestRisk: criticalChecks[0]?.label || warningChecks[0]?.label || "No major risk detected",
    },
    metrics: {
      wordCount: words.length,
      titleLength: title.length,
      descriptionLength: description.length,
      h1Count: h1.length,
      h2Count: h2.length,
      h3Count: h3.length,
      imageCount: imageTags.length,
      imagesMissingAlt,
      internalLinks: internalLinks.length,
      externalLinks: externalLinks.length,
      nofollowLinks,
      schemaBlocks: schemaBlocks.length,
      topTerms: topTerms(pageText),
    },
    checks,
    recommendations,
    opportunities: [
      "Create one primary service keyword focus for this page.",
      "Add proof blocks: testimonials, case study links, before-after results, or client logos.",
      "Add FAQ content that answers buyer objections in plain language.",
      "Use internal links from blog, services, and portfolio pages to support this URL.",
      "Add clear WhatsApp/call CTA text above the fold and near the end of the page.",
    ],
  });
}
