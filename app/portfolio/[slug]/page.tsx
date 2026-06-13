import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { ClientLogoMarquee, logosFromPortfolioCases } from "@/components/client-logo-marquee";
import { PublicShell } from "@/components/public-shell";
import { Reveal } from "@/components/reveal";
import { getPortfolioCases } from "@/lib/cms";
import { site } from "@/lib/site-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const portfolioCases = await getPortfolioCases();
  return portfolioCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const portfolioCases = await getPortfolioCases();
  const item = portfolioCases.find((caseStudy) => caseStudy.slug === slug);

  if (!item) {
    return {
      title: "Case Study",
    };
  }

  return {
    title: `${item.clientName} Case Study`,
    description: item.shortDescription,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const portfolioCases = await getPortfolioCases();
  const item = portfolioCases.find((caseStudy) => caseStudy.slug === slug && caseStudy.published);

  if (!item) {
    notFound();
  }

  const clientLogos = logosFromPortfolioCases(portfolioCases);
  const heroLogo = item.logoImage ?? site.logo;
  const heroLogoAlt = item.logoImage ? `${item.clientName} logo` : "Zigo Digital logo";

  return (
    <PublicShell>
      <section className="dark-mesh px-4 py-20 text-white sm:px-6 lg:px-8">
        <style>
          {`
            .case-hero-card {
              animation: case-card-glow 7s ease-in-out infinite;
            }

            .case-logo-panel {
              animation: case-logo-float 5s ease-in-out infinite;
            }

            .case-logo-scan {
              animation: case-logo-scan 4.8s ease-in-out infinite;
            }

            @keyframes case-card-glow {
              0%, 100% {
                box-shadow: 0 24px 70px rgba(7, 24, 39, 0.24);
              }

              50% {
                box-shadow: 0 30px 90px rgba(11, 95, 156, 0.34);
              }
            }

            @keyframes case-logo-float {
              0%, 100% {
                transform: translateY(0);
              }

              50% {
                transform: translateY(-8px);
              }
            }

            @keyframes case-logo-scan {
              0% {
                transform: translateX(-150%) skewX(-18deg);
                opacity: 0;
              }

              35% {
                opacity: 0.8;
              }

              70%, 100% {
                transform: translateX(360%) skewX(-18deg);
                opacity: 0;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .case-hero-card,
              .case-logo-panel,
              .case-logo-scan {
                animation-duration: 14s;
              }
            }
          `}
        </style>
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="text-sm font-bold uppercase text-[#f2d68b]">Case Study</p>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">{item.clientName}</h1>
            <p className="mt-4 text-lg font-semibold text-[#d7e2ee]">{item.industry}</p>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#d7e2ee]">{item.shortDescription}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {item.servicesProvided.map((service) => (
                <span key={service} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white">
                  {service}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="case-hero-card relative min-h-[31rem] overflow-hidden rounded-lg border border-white/12 bg-white/8 p-6 sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(208,163,69,0.32),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(47,118,109,0.34),transparent_34%)]" />
              <div className="relative flex min-h-[27rem] flex-col justify-between gap-10">
                <div className="case-logo-panel relative mx-auto flex h-48 w-full max-w-md items-center justify-center overflow-hidden rounded-lg border border-white/25 bg-white p-5 shadow-2xl shadow-[#071827]/25">
                  <span className="case-logo-scan pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                  <Image
                    src={heroLogo}
                    alt={heroLogoAlt}
                    width={420}
                    height={220}
                    className="relative z-10 h-full w-full object-contain"
                    priority
                  />
                </div>
                <div>
                <p className="text-sm font-bold text-[#f2d68b]">{item.coverLabel}</p>
                <h2 className="mt-3 max-w-md text-3xl font-black leading-tight">{item.resultsSummary}</h2>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ClientLogoMarquee logos={clientLogos} />

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {[
            ["Problem", item.problem],
            ["Goal", item.goal],
            ["Solution", item.solution],
          ].map(([title, text]) => (
            <Reveal key={title}>
              <div className="h-full rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-6">
                <h2 className="text-xl font-black text-[#0b2447]">{title}</h2>
                <p className="mt-4 text-sm leading-6 text-[#526170]">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#f4f8fb] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-lg border border-[#d9e7f5] bg-white p-6">
              <h2 className="text-2xl font-black text-[#0b2447]">Strategy</h2>
              <div className="mt-5 grid gap-3">
                {item.strategy.map((point) => (
                  <div key={point} className="flex gap-3 text-sm leading-6 text-[#526170]">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0b5f9c]" aria-hidden="true" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-lg border border-[#d9e7f5] bg-white p-6">
              <h2 className="text-2xl font-black text-[#0b2447]">Execution</h2>
              <div className="mt-5 grid gap-3">
                {item.execution.map((point) => (
                  <div key={point} className="flex gap-3 text-sm leading-6 text-[#526170]">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0b5f9c]" aria-hidden="true" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-6 text-center">
                <p className="text-3xl font-black text-[#0b5f9c]">{metric.value}</p>
                <p className="mt-2 text-sm font-bold text-[#526170]">{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-6">
              <h2 className="text-2xl font-black text-[#0b2447]">Platforms Used</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.platformsUsed.map((platform) => (
                  <span key={platform} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0b5f9c]">
                    {platform}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-6">
              <Quote className="h-8 w-8 text-[#c2932e]" aria-hidden="true" />
              <p className="mt-4 text-lg font-bold leading-8 text-[#0b2447]">{item.testimonial}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b5f9c] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-[#f2d68b]">Want results like this?</p>
            <h2 className="mt-3 text-3xl font-black">Contact Zigo Digital.</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#0b5f9c] hover:bg-[#f8fbff]"
          >
            Book Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </PublicShell>
  );
}
