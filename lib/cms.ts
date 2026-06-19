import { mkdir, readFile, stat, writeFile } from "fs/promises";
import path from "path";
import { createSupabaseAdminClient } from "@/lib/supabase";
import {
  blogPosts as fallbackBlogPosts,
  portfolioCases as fallbackPortfolioCases,
  services as fallbackServices,
  teamMembers as fallbackTeamMembers,
} from "@/lib/site-data";
import type {
  AnalyticsSummary,
  AnalyticsVisit,
  BlogPost,
  Enquiry,
  PortfolioCase,
  Service,
  TeamMember,
} from "@/lib/types";
import { slugify } from "@/lib/utils";

type CmsData = {
  portfolioCases: PortfolioCase[];
  services: Service[];
  teamMembers: TeamMember[];
  enquiries: Enquiry[];
  blogPosts: BlogPost[];
  analytics: AnalyticsSummary;
};

type DataRecord = Record<string, unknown>;

const cmsFilePath = path.join(process.cwd(), "data", "cms.json");
let localCmsCache: { mtimeMs: number; data: CmsData } | null = null;

function initialCmsData(): CmsData {
  return {
    portfolioCases: structuredClone(fallbackPortfolioCases),
    services: structuredClone(fallbackServices),
    teamMembers: structuredClone(fallbackTeamMembers),
    blogPosts: structuredClone(fallbackBlogPosts),
    enquiries: [],
    analytics: {
      totalPageViews: 0,
      uniqueVisitors: 0,
      pageViews: [],
      recentVisits: [],
      visitorIds: [],
    },
  };
}

async function readLocalCms(): Promise<CmsData> {
  try {
    const fileStat = await stat(cmsFilePath);

    if (localCmsCache?.mtimeMs === fileStat.mtimeMs) {
      return structuredClone(localCmsCache.data);
    }

    const raw = await readFile(cmsFilePath, "utf8");
    const parsed = JSON.parse(raw) as Partial<CmsData>;
    const data = {
      ...initialCmsData(),
      ...parsed,
      portfolioCases: parsed.portfolioCases?.length ? parsed.portfolioCases : initialCmsData().portfolioCases,
      services: parsed.services?.length ? parsed.services : initialCmsData().services,
      teamMembers: parsed.teamMembers?.length ? parsed.teamMembers : initialCmsData().teamMembers,
      blogPosts: parsed.blogPosts ?? initialCmsData().blogPosts,
      enquiries: parsed.enquiries ?? [],
      analytics: {
        ...initialCmsData().analytics,
        ...parsed.analytics,
        pageViews: parsed.analytics?.pageViews ?? [],
        recentVisits: parsed.analytics?.recentVisits ?? [],
        visitorIds: parsed.analytics?.visitorIds ?? [],
      },
    };

    localCmsCache = {
      mtimeMs: fileStat.mtimeMs,
      data: structuredClone(data),
    };

    return data;
  } catch {
    const data = initialCmsData();
    localCmsCache = {
      mtimeMs: 0,
      data: structuredClone(data),
    };

    return data;
  }
}

async function writeLocalCms(data: CmsData) {
  await mkdir(path.dirname(cmsFilePath), { recursive: true });
  await writeFile(cmsFilePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  const fileStat = await stat(cmsFilePath);
  localCmsCache = {
    mtimeMs: fileStat.mtimeMs,
    data: structuredClone(data),
  };
}

function readString(record: DataRecord, key: string, fallback = "") {
  const value = record[key];
  return typeof value === "string" ? value : fallback;
}

function readArray(record: DataRecord, key: string) {
  const value = record[key];

  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }

  return [];
}

export function parseMetricsSummary(value: string): { label: string; value: string }[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [label, ...rest] = item.split(":");
      return {
        label: label.trim(),
        value: rest.join(":").trim() || "Updated",
      };
    });
}

function metricSummaryFromJson(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value) && "summary" in value) {
    return String((value as { summary?: unknown }).summary || "");
  }

  return "";
}

function arrayFromJson(value: unknown, key: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }

  const entry = (value as Record<string, unknown>)[key];

  return Array.isArray(entry) ? entry.map(String).filter(Boolean) : [];
}

function mapPortfolioCase(record: DataRecord): PortfolioCase {
  const clientName = readString(record, "client_name");
  const slug = readString(record, "slug", slugify(clientName));
  const metricsSummary = metricSummaryFromJson(record.metrics_json);
  const galleryImages = readArray(record, "gallery_images");
  const videoUrls = readArray(record, "video_urls");
  const resultImageUrls = readArray(record, "result_image_urls");
  const websiteLinks = readArray(record, "website_links");

  return {
    id: readString(record, "id", crypto.randomUUID()),
    clientName,
    slug,
    industry: readString(record, "industry"),
    logoImage: readString(record, "logo_image_url") || readString(record, "cover_image_url") || undefined,
    shortDescription: readString(record, "short_description"),
    problem: readString(record, "problem"),
    goal: readString(record, "goal"),
    solution: readString(record, "solution"),
    servicesProvided: readArray(record, "services_provided"),
    platformsUsed: readArray(record, "platforms_used"),
    strategy: readArray(record, "strategy"),
    execution: readArray(record, "execution"),
    resultsSummary: readString(record, "results_summary"),
    metrics: parseMetricsSummary(metricsSummary),
    coverLabel: readString(record, "cover_label", clientName),
    galleryImages: galleryImages.length ? galleryImages : arrayFromJson(record.metrics_json, "galleryImages"),
    videoUrls: videoUrls.length ? videoUrls : arrayFromJson(record.metrics_json, "videoUrls"),
    resultImageUrls: resultImageUrls.length ? resultImageUrls : arrayFromJson(record.metrics_json, "resultImageUrls"),
    websiteLinks: websiteLinks.length ? websiteLinks : arrayFromJson(record.metrics_json, "websiteLinks"),
    testimonial: readString(record, "testimonial"),
    published: Boolean(record.published),
  };
}

function mapService(record: DataRecord): Service {
  const title = readString(record, "title");

  return {
    id: readString(record, "id", crypto.randomUUID()),
    title,
    slug: readString(record, "slug", slugify(title)),
    shortDescription: readString(record, "short_description"),
    painPoint: readString(record, "pain_point"),
    zigoDoes: readString(record, "detailed_description"),
    deliverables: readArray(record, "deliverables"),
    icon: readString(record, "icon", "Megaphone"),
    active: Boolean(record.active),
    displayOrder: Number(record.display_order || 10),
  };
}

function mapTeamMember(record: DataRecord): TeamMember {
  return {
    id: readString(record, "id", crypto.randomUUID()),
    name: readString(record, "name"),
    role: readString(record, "role"),
    imageUrl: readString(record, "image_url"),
    bio: readString(record, "bio"),
    skills: readArray(record, "skills"),
    instagramUrl: readString(record, "instagram_url") || undefined,
    linkedinUrl: readString(record, "linkedin_url") || undefined,
    displayOrder: Number(record.display_order || 10),
    active: Boolean(record.active),
  };
}

function mapEnquiry(record: DataRecord): Enquiry {
  return {
    id: readString(record, "id", crypto.randomUUID()),
    name: readString(record, "name"),
    businessName: readString(record, "business_name"),
    phone: readString(record, "phone"),
    email: readString(record, "email"),
    serviceNeeded: readString(record, "service_needed"),
    message: readString(record, "message"),
    status: readString(record, "status", "new"),
    createdAt: readString(record, "created_at", new Date().toISOString()),
  };
}

function mapBlogPost(record: DataRecord): BlogPost {
  const title = readString(record, "title");
  const publishedAt = readString(record, "published_at") || readString(record, "publishedAt", new Date().toISOString());
  const updatedAt = readString(record, "updated_at") || readString(record, "updatedAt", publishedAt);

  return {
    id: readString(record, "id", crypto.randomUUID()),
    title,
    slug: readString(record, "slug", slugify(title)),
    excerpt: readString(record, "excerpt"),
    content: readString(record, "content"),
    category: readString(record, "category", "Marketing"),
    tags: readArray(record, "tags"),
    coverImage: readString(record, "cover_image_url") || readString(record, "coverImage") || undefined,
    author: readString(record, "author", "Prasanth M"),
    published: Boolean(record.published),
    featured: Boolean(record.featured),
    publishedAt,
    updatedAt,
    seoTitle: readString(record, "seo_title") || readString(record, "seoTitle") || undefined,
    seoDescription: readString(record, "seo_description") || readString(record, "seoDescription") || undefined,
    canonicalUrl: readString(record, "canonical_url") || readString(record, "canonicalUrl") || undefined,
  };
}

function mapAnalyticsVisit(record: DataRecord): AnalyticsVisit {
  return {
    id: readString(record, "id", crypto.randomUUID()),
    visitorId: readString(record, "visitor_id") || readString(record, "visitorId"),
    path: readString(record, "path", "/"),
    title: readString(record, "title"),
    referrer: readString(record, "referrer"),
    userAgent: readString(record, "user_agent") || readString(record, "userAgent"),
    createdAt: readString(record, "created_at") || readString(record, "createdAt", new Date().toISOString()),
  };
}

function summarizeVisits(visits: AnalyticsVisit[]): AnalyticsSummary {
  const pageViewMap = new Map<string, { path: string; title: string; views: number; lastVisitedAt: string }>();
  const visitorIds = Array.from(new Set(visits.map((visit) => visit.visitorId).filter(Boolean)));

  visits.forEach((visit) => {
    const existing = pageViewMap.get(visit.path);

    if (existing) {
      existing.views += 1;
      if (visit.createdAt > existing.lastVisitedAt) {
        existing.lastVisitedAt = visit.createdAt;
        existing.title = visit.title;
      }
    } else {
      pageViewMap.set(visit.path, {
        path: visit.path,
        title: visit.title,
        views: 1,
        lastVisitedAt: visit.createdAt,
      });
    }
  });

  return {
    totalPageViews: visits.length,
    uniqueVisitors: visitorIds.length,
    visitorIds,
    pageViews: Array.from(pageViewMap.values()).sort((a, b) => b.views - a.views),
    recentVisits: [...visits].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 25),
  };
}

export async function getPortfolioCases() {
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { data, error } = await supabase.from("portfolio_cases").select("*").order("created_at", { ascending: false });

    if (!error && data?.length) {
      return data.map((item) => mapPortfolioCase(item));
    }
  }

  return (await readLocalCms()).portfolioCases;
}

export async function getServices() {
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { data, error } = await supabase.from("services").select("*").order("display_order", { ascending: true });

    if (!error && data?.length) {
      return data.map((item) => mapService(item));
    }
  }

  return (await readLocalCms()).services;
}

export async function getTeamMembers() {
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { data, error } = await supabase.from("team_members").select("*").order("display_order", { ascending: true });

    if (!error && data?.length) {
      return data.map((item) => mapTeamMember(item));
    }
  }

  return (await readLocalCms()).teamMembers;
}

export async function getEnquiries() {
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });

    if (!error && data) {
      return data.map((item) => mapEnquiry(item));
    }
  }

  return (await readLocalCms()).enquiries;
}

export async function getBlogPosts() {
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { data, error } = await supabase.from("blog_posts").select("*").order("published_at", { ascending: false });

    if (!error && data) {
      return data.map((item) => mapBlogPost(item));
    }
  }

  return (await readLocalCms()).blogPosts;
}

export async function getAnalyticsSummary() {
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { data, error } = await supabase
      .from("analytics_visits")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5000);

    if (!error && data) {
      return summarizeVisits(data.map((item) => mapAnalyticsVisit(item)));
    }
  }

  return (await readLocalCms()).analytics;
}

export async function upsertLocalPortfolioCase(item: PortfolioCase) {
  const data = await readLocalCms();
  const index = data.portfolioCases.findIndex((entry) => entry.id === item.id || entry.slug === item.slug);

  if (index >= 0) {
    data.portfolioCases[index] = item;
  } else {
    data.portfolioCases.unshift(item);
  }

  await writeLocalCms(data);
}

export async function deleteLocalPortfolioCase(id: string) {
  const data = await readLocalCms();
  data.portfolioCases = data.portfolioCases.filter((item) => item.id !== id);
  await writeLocalCms(data);
}

export async function upsertLocalTeamMember(item: TeamMember) {
  const data = await readLocalCms();
  const index = data.teamMembers.findIndex((entry) => entry.id === item.id);

  if (index >= 0) {
    data.teamMembers[index] = item;
  } else {
    data.teamMembers.push(item);
  }

  await writeLocalCms(data);
}

export async function deleteLocalTeamMember(id: string) {
  const data = await readLocalCms();
  data.teamMembers = data.teamMembers.filter((item) => item.id !== id);
  await writeLocalCms(data);
}

export async function upsertLocalService(item: Service) {
  const data = await readLocalCms();
  const index = data.services.findIndex((entry) => entry.id === item.id || entry.slug === item.slug);

  if (index >= 0) {
    data.services[index] = item;
  } else {
    data.services.push(item);
  }

  await writeLocalCms(data);
}

export async function addLocalEnquiry(item: Enquiry) {
  const data = await readLocalCms();
  data.enquiries.unshift(item);
  await writeLocalCms(data);
}

export async function deleteLocalEnquiry(id: string) {
  const data = await readLocalCms();
  data.enquiries = data.enquiries.filter((item) => item.id !== id);
  await writeLocalCms(data);
}

export async function upsertLocalBlogPost(item: BlogPost) {
  const data = await readLocalCms();
  const index = data.blogPosts.findIndex((entry) => entry.id === item.id || entry.slug === item.slug);

  if (index >= 0) {
    data.blogPosts[index] = item;
  } else {
    data.blogPosts.unshift(item);
  }

  await writeLocalCms(data);
}

export async function deleteLocalBlogPost(id: string) {
  const data = await readLocalCms();
  data.blogPosts = data.blogPosts.filter((item) => item.id !== id);
  await writeLocalCms(data);
}

export async function recordAnalyticsVisit(item: AnalyticsVisit) {
  const supabase = createSupabaseAdminClient();

  if (supabase) {
    const { error } = await supabase.from("analytics_visits").insert({
      id: item.id,
      visitor_id: item.visitorId,
      path: item.path,
      title: item.title,
      referrer: item.referrer,
      user_agent: item.userAgent,
      created_at: item.createdAt,
    });

    if (!error) {
      return;
    }
  }

  const data = await readLocalCms();
  const existingPageView = data.analytics.pageViews.find((pageView) => pageView.path === item.path);

  if (existingPageView) {
    existingPageView.views += 1;
    existingPageView.title = item.title || existingPageView.title;
    existingPageView.lastVisitedAt = item.createdAt;
  } else {
    data.analytics.pageViews.push({
      path: item.path,
      title: item.title,
      views: 1,
      lastVisitedAt: item.createdAt,
    });
  }

  if (!data.analytics.visitorIds.includes(item.visitorId)) {
    data.analytics.visitorIds.push(item.visitorId);
  }

  data.analytics.totalPageViews += 1;
  data.analytics.uniqueVisitors = data.analytics.visitorIds.length;
  data.analytics.recentVisits.unshift(item);
  data.analytics.recentVisits = data.analytics.recentVisits.slice(0, 25);
  data.analytics.pageViews.sort((a, b) => b.views - a.views);

  await writeLocalCms(data);
}
