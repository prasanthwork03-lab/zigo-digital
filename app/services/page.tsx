import type { Metadata } from "next";
import { PublicShell } from "@/components/public-shell";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { ServiceShowcase } from "@/components/service-showcase";
import { getServices } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Zigo Digital services including Meta Ads, Google Ads, websites, automation, video editing, creative design, SEO, social media, and sales funnels.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <PublicShell>
      <section className="mesh-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Growth services built to attract, convince, and convert."
              text="From ads and websites to automation, videos, design, SEO, and follow-up, every service is shaped around one goal: better enquiries that are easier to turn into customers."
              align="center"
              level="h1"
            />
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <ServiceCard service={service} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ServiceShowcase services={services} />
    </PublicShell>
  );
}
