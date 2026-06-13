import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PortfolioCase } from "@/lib/types";

export function PortfolioCard({ item }: { item: PortfolioCase }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-[#d9e7f5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b5f9c]/10">
      <div className="relative min-h-72 overflow-hidden bg-[#0b2447] p-6 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(208,163,69,0.35),transparent_34%),linear-gradient(135deg,#0b2447,#0b5f9c_55%,#2f766d)]" />
        <div className="relative flex min-h-60 flex-col justify-between gap-5">
          {item.logoImage ? (
            <div className="flex h-28 w-full items-center justify-center rounded-md border border-white/20 bg-white p-3 shadow-lg shadow-[#071827]/15">
              <Image
                src={item.logoImage}
                alt={`${item.clientName} logo`}
                width={260}
                height={120}
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
          <div>
            <p className="text-sm font-bold text-[#f2d68b]">{item.industry}</p>
            <h2 className="mt-3 max-w-sm text-2xl font-black leading-tight">{item.coverLabel}</h2>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {item.servicesProvided.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-[#f3f7fb] px-3 py-1 text-xs font-bold text-[#0b5f9c]">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-5 text-xl font-black text-[#0b2447]">{item.clientName}</h3>
        <p className="mt-3 text-sm leading-6 text-[#526170]">{item.shortDescription}</p>
        <Link
          href={`/portfolio/${item.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0b5f9c]"
        >
          View Case Study
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
