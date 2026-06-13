import Link from "next/link";
import { ArrowRight, BookOpenText, BriefcaseBusiness, CheckCircle2, Eye, Inbox, Settings, Users } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAnalyticsSummary, getBlogPosts, getEnquiries, getPortfolioCases, getServices, getTeamMembers } from "@/lib/cms";
import { isSupabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [portfolioCases, services, teamMembers, enquiries, blogPosts, analytics] = await Promise.all([
    getPortfolioCases(),
    getServices(),
    getTeamMembers(),
    getEnquiries(),
    getBlogPosts(),
    getAnalyticsSummary(),
  ]);
  const cards = [
    {
      label: "Portfolio Cases",
      value: portfolioCases.length,
      href: "/admin/portfolio",
      icon: BriefcaseBusiness,
    },
    {
      label: "Blog Posts",
      value: blogPosts.length,
      href: "/admin/blog",
      icon: BookOpenText,
    },
    {
      label: "Team Members",
      value: teamMembers.length,
      href: "/admin/team",
      icon: Users,
    },
    {
      label: "Services",
      value: services.length,
      href: "/admin/services",
      icon: Settings,
    },
    {
      label: "Enquiries",
      value: enquiries.length,
      href: "/admin/enquiries",
      icon: Inbox,
    },
    {
      label: "Page Views",
      value: analytics.totalPageViews,
      href: "/admin/dashboard",
      icon: Eye,
    },
    {
      label: "Website Visitors",
      value: analytics.uniqueVisitors,
      href: "/admin/dashboard",
      icon: Users,
    },
  ];

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#c2932e]">Dashboard</p>
            <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Website content overview</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#526170]">
              Manage portfolio case studies, blog posts, team members, service pages, enquiries, and website visitor insights from one simple dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/blog/new"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white hover:bg-[#0b2447]"
            >
              Write Blog
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/admin/portfolio/new"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#d9e7f5] bg-white px-5 text-sm font-bold text-[#0b5f9c] hover:bg-[#f3f8fd]"
            >
              Add Case Study
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <CheckCircle2 className={`mt-0.5 h-5 w-5 ${isSupabaseConfigured ? "text-[#1f9f5f]" : "text-[#c2932e]"}`} />
            <div>
              <h2 className="font-black text-[#0b2447]">
                {isSupabaseConfigured ? "Supabase connected" : "Supabase keys pending"}
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#526170]">
                {isSupabaseConfigured
                  ? "Admin forms will save data to your configured Supabase project."
                  : "The dashboard is ready. Add keys in .env.local and run the SQL in supabase/schema.sql to enable live login, storage, CRUD, and enquiry persistence."}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                href={card.href}
                className="rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0b5f9c]/10"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0b5f9c]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#8a9bad]" aria-hidden="true" />
                </div>
                <p className="mt-5 text-3xl font-black text-[#0b2447]">{card.value}</p>
                <p className="mt-1 text-sm font-bold text-[#667789]">{card.label}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-[#c2932e]">Analytics</p>
                <h2 className="mt-1 text-xl font-black text-[#0b2447]">Most visited pages</h2>
              </div>
              <Eye className="h-5 w-5 text-[#0b5f9c]" aria-hidden="true" />
            </div>
            <div className="mt-5 grid gap-3">
              {analytics.pageViews.slice(0, 6).map((page) => (
                <div key={page.path} className="flex items-center justify-between gap-4 rounded-lg bg-[#f4f8fb] px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-[#0b2447]">{page.title || page.path}</p>
                    <p className="truncate text-xs font-semibold text-[#667789]">{page.path}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-black text-[#0b5f9c]">
                    {page.views} views
                  </span>
                </div>
              ))}
              {!analytics.pageViews.length ? (
                <p className="rounded-lg bg-[#f4f8fb] px-4 py-4 text-sm font-semibold text-[#667789]">
                  Visitor tracking is active. Page views will appear here after people browse the site.
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-[#c2932e]">Live Activity</p>
                <h2 className="mt-1 text-xl font-black text-[#0b2447]">Recent visits</h2>
              </div>
              <Users className="h-5 w-5 text-[#0b5f9c]" aria-hidden="true" />
            </div>
            <div className="mt-5 grid gap-3">
              {analytics.recentVisits.slice(0, 6).map((visit) => (
                <div key={visit.id} className="rounded-lg bg-[#f4f8fb] px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="truncate text-sm font-black text-[#0b2447]">{visit.title || visit.path}</p>
                    <span className="shrink-0 text-xs font-bold text-[#667789]">
                      {new Date(visit.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs font-semibold text-[#667789]">{visit.path}</p>
                </div>
              ))}
              {!analytics.recentVisits.length ? (
                <p className="rounded-lg bg-[#f4f8fb] px-4 py-4 text-sm font-semibold text-[#667789]">
                  No visits recorded yet. Open a public page once and refresh this dashboard.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
