import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone, Sparkles } from "lucide-react";
import { ClientLogoMarquee, logosFromPortfolioCases } from "@/components/client-logo-marquee";
import { HeroMarketingVisual } from "@/components/hero-marketing-visual";
import { PortfolioCard } from "@/components/portfolio-card";
import { PublicShell } from "@/components/public-shell";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { getPortfolioCases, getServices } from "@/lib/cms";
import { processSteps, site, stats } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, portfolioCases] = await Promise.all([getServices(), getPortfolioCases()]);
  const featuredServices = services.slice(0, 6);
  const featuredCases = portfolioCases.filter((item) => item.published).slice(0, 3);
  const clientLogos = logosFromPortfolioCases(portfolioCases);

  return (
    <PublicShell>
      <section className="mesh-bg relative overflow-hidden">
        <div className="mx-auto grid min-h-[calc(100svh-73px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e7f5] bg-white/80 px-4 py-2 text-sm font-bold text-[#0b5f9c] shadow-sm">
                <Sparkles className="h-4 w-4 text-[#c2932e]" aria-hidden="true" />
                One Agency for Complete Digital Growth
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.08] text-[#0b2447] sm:text-5xl lg:text-6xl">
                We Build Brands That Generate Leads, Sales & Growth
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#526170]">
                From content creation to paid ads, websites, automation and sales funnels - Zigo Digital handles your
                complete digital growth journey.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-6 text-sm font-bold text-white shadow-xl shadow-[#0b5f9c]/20 transition hover:bg-[#0b2447]"
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#c6d7e8] bg-white px-6 text-sm font-bold text-[#0b2447] transition hover:border-[#0b5f9c] hover:text-[#0b5f9c]"
                >
                  View Portfolio
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-[#526170]">
                <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 hover:text-[#0b5f9c]">
                  <Phone className="h-4 w-4 text-[#c2932e]" aria-hidden="true" />
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="hover:text-[#0b5f9c]">
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <HeroMarketingVisual />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-[#d9e7f5] bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {stats.map((item) => (
            <div key={item.label} className="rounded-lg bg-[#f6faff] p-5 text-center">
              <p className="text-2xl font-black text-[#0b5f9c]">{item.value}</p>
              <p className="mt-1 text-sm font-bold text-[#526170]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <ClientLogoMarquee logos={clientLogos} />

      <section className="bg-[#fbfdff] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Digital systems built around growth, trust, and conversion."
              text="Every service is designed to connect with the next step: content creates trust, ads create demand, websites convert traffic, and automation improves follow-up."
            />
            <Link
              href="/services"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#c6d7e8] bg-white px-5 text-sm font-bold text-[#0b2447] hover:border-[#0b5f9c] hover:text-[#0b5f9c]"
            >
              All Services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="dark-mesh px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase text-[#f2d68b]">Core Promise</p>
                <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                  One team. One strategy. Complete digital growth.
                </h2>
                <p className="mt-5 text-base leading-7 text-[#d7e2ee]">
                  Zigo Digital is not here to only post content or run ads. We build complete digital systems that
                  attract the right audience, convert interest into enquiries, and help your team follow up with clarity.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="rounded-lg border border-white/12 bg-white/8 p-5 backdrop-blur">
                    <p className="text-sm font-black text-[#f2d68b]">0{index + 1}</p>
                    <h3 className="mt-3 text-xl font-black">{step.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#d7e2ee]">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Portfolio"
              title="Case studies that show the system behind the result."
              text="Each portfolio story is structured around the client problem, goal, strategy, execution, and growth outcome."
            />
            <Link
              href="/portfolio"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#c6d7e8] px-5 text-sm font-bold text-[#0b2447] hover:border-[#0b5f9c] hover:text-[#0b5f9c]"
            >
              View Portfolio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <Stagger className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredCases.map((item) => (
              <StaggerItem key={item.id}>
                <PortfolioCard item={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-[#c2932e]">Ready to grow?</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-[#0b2447] sm:text-4xl">
                Let us build your digital growth system.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#526170]">
                Content, ads, website, automation, and sales strategy - aligned under one team.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-6 text-sm font-bold text-white hover:bg-[#0b2447]"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </PublicShell>
  );
}
