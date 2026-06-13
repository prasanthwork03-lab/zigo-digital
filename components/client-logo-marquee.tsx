/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { PortfolioCase } from "@/lib/types";
import { clientLogos } from "@/lib/site-data";

export type ClientLogoMarqueeItem = {
  name: string;
  src: string;
  href?: string;
};

export function logosFromPortfolioCases(portfolioCases: PortfolioCase[]): ClientLogoMarqueeItem[] {
  const logoMap = new Map<string, ClientLogoMarqueeItem>();

  portfolioCases
    .filter((item) => item.published && item.logoImage)
    .forEach((item) => {
      const key = item.logoImage || item.clientName;

      if (!logoMap.has(key)) {
        logoMap.set(key, {
          name: item.clientName,
          src: item.logoImage || "",
          href: `/portfolio/${item.slug}`,
        });
      }
    });

  return Array.from(logoMap.values());
}

export function ClientLogoMarquee({ logos }: { logos?: ClientLogoMarqueeItem[] }) {
  const logoItems: ClientLogoMarqueeItem[] = logos?.length ? logos : clientLogos;
  const repeatedLogos = [...logoItems, ...logoItems];

  if (!logoItems.length) {
    return null;
  }

  return (
    <section className="overflow-hidden border-y border-[#d9e7f5] bg-white py-8">
      <style>
        {`
          .logo-marquee {
            -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
            mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          }

          .logo-marquee-track {
            animation: logo-marquee-right-to-left 34s linear infinite;
            will-change: transform;
          }

          .logo-marquee:hover .logo-marquee-track {
            animation-play-state: paused;
          }

          @keyframes logo-marquee-right-to-left {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .logo-marquee-track {
              animation-duration: 80s;
            }
          }
        `}
      </style>
      <div className="mx-auto mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold uppercase text-[#c2932e]">Clients We Worked With</p>
      </div>
      <div className="logo-marquee overflow-hidden">
        <div className="logo-marquee-track flex w-max items-center gap-5 px-5">
          {repeatedLogos.map((logo, index) => {
            const isDuplicate = index >= logoItems.length;
            const logoContent = (
              <img
                src={logo.src}
                alt={isDuplicate ? "" : `${logo.name} logo`}
                aria-hidden={isDuplicate}
                className="max-h-20 w-auto max-w-full object-contain"
              />
            );

            return logo.href && !isDuplicate ? (
              <Link
                key={`${logo.name}-${index}`}
                href={logo.href}
                className="flex h-24 w-52 shrink-0 items-center justify-center rounded-lg border border-[#d9e7f5] bg-[#fbfdff] px-5 shadow-sm transition hover:-translate-y-1 hover:border-[#0b5f9c] hover:shadow-lg hover:shadow-[#0b5f9c]/10 sm:h-28 sm:w-64"
                aria-label={`View ${logo.name} case study`}
              >
                {logoContent}
              </Link>
            ) : (
              <div
                key={`${logo.name}-${index}`}
                className="flex h-24 w-52 shrink-0 items-center justify-center rounded-lg border border-[#d9e7f5] bg-[#fbfdff] px-5 shadow-sm sm:h-28 sm:w-64"
              >
                {logoContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
