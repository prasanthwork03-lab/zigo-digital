import Link from "next/link";
import {
  ArrowRight,
  LineChart,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Route,
  Search,
  Share2,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/lib/types";

const icons: Record<string, LucideIcon> = {
  LineChart,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Route,
  Search,
  Share2,
  Video,
  Workflow,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon] || Megaphone;

  return (
    <article className="group flex h-full flex-col rounded-lg border border-[#d9e7f5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#b8d5f0] hover:shadow-xl hover:shadow-[#0b5f9c]/10">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0b5f9c] transition group-hover:bg-[#0b5f9c] group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2 className="text-xl font-black text-[#0b2447]">{service.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-[#526170]">{service.shortDescription}</p>
      <Link
        href={`/services#${service.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0b5f9c]"
      >
        Explore service
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
}
