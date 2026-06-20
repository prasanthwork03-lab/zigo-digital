import type { Metadata } from "next";
import { ClientLogoMarquee, logosFromPortfolioCases } from "@/components/client-logo-marquee";
import { PortfolioCard } from "@/components/portfolio-card";
import { PublicShell } from "@/components/public-shell";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioCases } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Zigo Digital portfolio case studies with client problems, strategy, execution, metrics, and results.",
};

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const portfolioCases = await getPortfolioCases();
  const publishedCases = portfolioCases.filter((item) => item.published);
  const clientLogos = logosFromPortfolioCases(publishedCases);

  return (
    <PublicShell>
      <section className="mesh-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Portfolio"
              title="Separate case studies for every client growth story."
              text="Each portfolio item opens into a detailed case study with problem, goal, services, strategy, execution, results, metrics, and testimonial."
              align="center"
              level="h1"
            />
          </Reveal>
          <Stagger className="mt-10 grid gap-6 lg:grid-cols-3">
            {publishedCases.map((item) => (
              <StaggerItem key={item.id}>
                <PortfolioCard item={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <ClientLogoMarquee logos={clientLogos} />
    </PublicShell>
  );
}
