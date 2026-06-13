import type { MetadataRoute } from "next";
import { getBlogPosts, getPortfolioCases } from "@/lib/cms";
import { navItems } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const now = new Date();
  const [portfolioCases, blogPosts] = await Promise.all([getPortfolioCases(), getBlogPosts()]);

  const publicRoutes = navItems.map((item) => ({
    url: `${siteUrl}${item.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const toolRoutes = [
    {
      url: `${siteUrl}/tools/seo-audit`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    },
  ];

  const caseRoutes = portfolioCases
    .filter((item) => item.published)
    .map((item) => ({
      url: `${siteUrl}/portfolio/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const blogRoutes = blogPosts
    .filter((item) => item.published)
    .map((item) => ({
      url: `${siteUrl}/blog/${item.slug}`,
      lastModified: new Date(item.updatedAt || item.publishedAt),
      changeFrequency: "weekly" as const,
      priority: item.featured ? 0.8 : 0.7,
    }));

  return [...publicRoutes, ...toolRoutes, ...caseRoutes, ...blogRoutes];
}
