import Image from "next/image";
import Link from "next/link";
import { BarChart3, BriefcaseBusiness, FileText, Inbox, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { site } from "@/lib/site-data";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Portfolio", href: "/admin/portfolio", icon: BriefcaseBusiness },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Services", href: "/admin/services", icon: Settings },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f4f8fb]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-[#d9e7f5] bg-white p-5 lg:block">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <Image src={site.logo} alt="Zigo Digital logo" width={48} height={48} className="rounded-full" />
          <div>
            <p className="font-black text-[#0b2447]">Zigo Admin</p>
            <p className="text-xs font-semibold text-[#667789]">Content control room</p>
          </div>
        </Link>
        <nav className="mt-8 grid gap-2">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-[#263747] transition hover:bg-[#eaf4ff] hover:text-[#0b5f9c]"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-5 left-5 right-5">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-full border border-[#d9e7f5] px-4 py-3 text-sm font-bold text-[#0b2447] hover:bg-[#f3f7fb]"
          >
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            View Website
          </Link>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#d9e7f5] bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <Link href="/admin/dashboard" className="flex items-center gap-3 lg:hidden">
            <Image src={site.logo} alt="Zigo Digital logo" width={40} height={40} className="rounded-full" />
            <span className="font-black text-[#0b2447]">Zigo Admin</span>
          </Link>
          <p className="hidden text-sm font-semibold text-[#667789] lg:block">Manage portfolio, blog, team, services, analytics, and enquiries.</p>
          <Link href="/admin/login" className="inline-flex items-center gap-2 text-sm font-bold text-[#0b5f9c]">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Login
          </Link>
        </header>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
