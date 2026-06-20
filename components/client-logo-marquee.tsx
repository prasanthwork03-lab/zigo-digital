/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import type { CSSProperties } from "react";
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

export function ClientLogoTrustGrid({ logos }: { logos?: ClientLogoMarqueeItem[] }) {
  const logoItems: ClientLogoMarqueeItem[] = logos?.length ? logos : clientLogos;

  if (!logoItems.length) {
    return null;
  }

  return (
    <section className="mesh-bg border-y border-[#d9e7f5] px-4 py-20 sm:px-6 lg:px-8">
      <style>
        {`
          .logo-trust-grid {
            perspective: 1000px;
          }

          .logo-trust-grid .logo-trust-tile {
            animation: logo-trust-rise 560ms ease both;
            animation-delay: calc(var(--logo-index) * 70ms);
          }

          .logo-trust-grid .logo-trust-tile::before {
            background: linear-gradient(90deg, transparent, rgba(11, 95, 156, 0.18), transparent);
            content: "";
            inset: 0;
            pointer-events: none;
            position: absolute;
            transform: translateX(-120%);
            transition: transform 700ms ease;
          }

          .logo-trust-grid .logo-trust-tile:hover::before {
            transform: translateX(120%);
          }

          .logo-trust-grid .logo-trust-tile:hover img {
            filter: saturate(1.08) contrast(1.03);
          }

          @keyframes logo-trust-rise {
            from {
              opacity: 0;
              transform: translateY(14px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .logo-trust-grid .logo-trust-tile {
              animation: none;
            }
          }
        `}
      </style>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#c2932e]">Trusted by Growing Brands</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight text-[#0b2447] sm:text-4xl lg:text-5xl">
              Real client proof before you book a call.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#526170]">
              A proof wall of businesses that trusted Zigo Digital for content, ads, websites, automation, and
              enquiry-focused growth systems.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Trust", "Proof-led content"],
              ["Leads", "Enquiry systems"],
              ["Growth", "Client outcomes"],
            ].map(([label, text]) => (
              <div key={label} className="rounded-lg border border-[#d9e7f5] bg-white/85 px-4 py-3 shadow-sm">
                <p className="text-xs font-black uppercase text-[#c2932e]">{label}</p>
                <p className="mt-1 text-sm font-black text-[#0b5f9c]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="logo-trust-grid mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {logoItems.map((logo, index) => {
            const tileClassName =
              "logo-trust-tile group relative flex h-36 min-h-36 items-center justify-center overflow-hidden rounded-lg border border-[#d9e7f5] bg-white px-6 py-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0b5f9c] hover:shadow-xl hover:shadow-[#0b5f9c]/10";
            const logoContent = (
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                className="relative z-10 max-h-24 w-auto max-w-full object-contain transition duration-300 group-hover:scale-105"
              />
            );

            return logo.href ? (
              <Link
                key={`${logo.name}-${logo.src}`}
                href={logo.href}
                className={tileClassName}
                style={{ "--logo-index": index } as CSSProperties}
                aria-label={`View ${logo.name} case study`}
              >
                {logoContent}
              </Link>
            ) : (
              <div
                key={`${logo.name}-${logo.src}`}
                className={tileClassName}
                style={{ "--logo-index": index } as CSSProperties}
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
